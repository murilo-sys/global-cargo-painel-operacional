import { EslClient } from "../integrations/esl/EslClient";
import { FreightRepository } from "../repositories/freight.repository";
import { ManifestRepository } from "../repositories/manifest.repository";
import { PickupRepository } from "../repositories/pickup.repository";
import { freightsApiSchema } from "../integrations/esl/schemas/freights.schema";
import { manifestApiSchema } from "../integrations/esl/schemas/manifests.schema";
import { pickupApiSchema } from "../integrations/esl/schemas/pickups.schema";
import { mapEslFreightsToDto } from "../integrations/esl/mappers/freight.mapper";
import { mapEslManifestsToDto } from "../integrations/esl/mappers/manifest.mapper";
import { mapEslPickupsToDto } from "../integrations/esl/mappers/pickup.mapper";
import { removeDuplicates } from "../util/removeDuplicates";
import { getRecentDateRange, filterDaysAgo } from "../util/dates";
import { env } from "../env";

export type SyncReportType = "freights" | "manifests" | "pickups";

export class SyncReportUseCase {
  constructor(
    private readonly eslClient: EslClient,
    private readonly freightRepository: FreightRepository,
    private readonly manifestRepository: ManifestRepository,
    private readonly pickupRepository: PickupRepository
  ) {}

  async execute(reportType: SyncReportType, directDownloadUrl?: string): Promise<void> {
    switch (reportType) {
      case "freights":
        await this.syncFreights(directDownloadUrl);
        break;
      case "manifests":
        await this.syncManifests(directDownloadUrl);
        break;
      case "pickups":
        await this.syncPickups(directDownloadUrl);
        break;
      default:
        throw new Error(`Tipo de relatório não suportado: ${reportType}`);
    }
  }

  private async syncFreights(directDownloadUrl?: string): Promise<void> {
    let downloadUrl = directDownloadUrl;
    if (!downloadUrl) {
      const showUrl = await this.eslClient.requestArchive(env.ESL_URL_FREIGHTS, {
        search: {
          freights: {
            updated_at: getRecentDateRange(env.DAYS_AGO_FILTER_SYNC)
          }
        }
      });
      downloadUrl = await this.eslClient.verifyArchive(showUrl);
    }

    const json = await this.eslClient.downloadArchive(downloadUrl);

    const startedAt = new Date();
    const parsed = freightsApiSchema.parse(json);
    const dtos = mapEslFreightsToDto(parsed, startedAt);
    const unique = removeDuplicates(dtos, (item) => item.id);

    await this.freightRepository.upsertMany(unique);
    await this.freightRepository.deleteMissing(
      filterDaysAgo(env.DAYS_AGO_FILTER_SYNC),
      startedAt.toISOString()
    );
  }

  private async syncManifests(directDownloadUrl?: string): Promise<void> {
    let downloadUrl = directDownloadUrl;
    if (!downloadUrl) {
      const showUrl = await this.eslClient.requestArchive(env.ESL_URL_MANIFEST, {
        search: {
          manifests: {
            updated_at: getRecentDateRange(env.DAYS_AGO_FILTER_SYNC)
          }
        }
      });
      downloadUrl = await this.eslClient.verifyArchive(showUrl);
    }

    const json = await this.eslClient.downloadArchive(downloadUrl);

    const parsed = manifestApiSchema.parse(json);
    const { manifests, relations } = mapEslManifestsToDto(parsed);

    const uniqueManifests = removeDuplicates(manifests, (m) => m.id);
    const uniqueRelations = removeDuplicates(relations, (r) => `${r.freight_id}-${r.manifest_id}`);

    await this.manifestRepository.upsertMany(uniqueManifests);
    await this.manifestRepository.upsertRelations(uniqueRelations);
  }

  private async syncPickups(directDownloadUrl?: string): Promise<void> {
    let downloadUrl = directDownloadUrl;
    if (!downloadUrl) {
      const showUrl = await this.eslClient.requestArchive(env.ESL_URL_PICKUPS, {
        search: {
          picks: {
            request_date: getRecentDateRange(env.DAYS_AGO_FILTER_PICKUP_SYNC)
          }
        }
      });
      downloadUrl = await this.eslClient.verifyArchive(showUrl);
    }

    const json = await this.eslClient.downloadArchive(downloadUrl);

    const parsed = pickupApiSchema.parse(json);
    const dtos = mapEslPickupsToDto(parsed);
    const unique = removeDuplicates(dtos, (p) => p.id);

    await this.pickupRepository.upsertMany(unique);
  }
}
