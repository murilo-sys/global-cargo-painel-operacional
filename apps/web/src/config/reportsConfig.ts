import { env } from "@/env";
import { freightsApiSchema } from "@/schemas/integration/freights";
import { manifestApiSchema } from "@/schemas/integration/manifest";
import { pickupApiSchema } from "@/schemas/integration/pickups";
import { CleanFreight, freightMapper } from "@/mapper/integration/freights.mapper";
import { CleanManifest, manifestMapper } from "@/mapper/integration/manifest.mapper";
import { manifestFreightRelationsMapper } from "@/mapper/integration/manifestFreightRelation.mapper";
import { CleanPickup, pickupMapper } from "@/mapper/integration/pickup.mapper";
import { deleteMissingFreights, upsertFreights } from "@/repositories/freights.repository";
import { upsertManifests } from "@/repositories/manifests.repository";
import { upsertManifestsFreightsRelations } from "@/repositories/manifestsFreightsRelations.repository";
import { upsertPickups } from "@/repositories/pickups.repository";
import { ReportConfigOptions } from "@/types/reportSync";
import { getRecentDateRange } from "@/util/dates/recentDates";
import { removeDuplicates } from "@/util/removeDuplicates";
import { filterDaysAgo } from "@/util/dates/filterDaysAgo";

export const REPORTS_CONFIG: ReportConfigOptions = {
  //Freights config
  freights: {
    url: env.ESL_URL_FREIGHTS,
    body: {
      search: {
        freights: {
          updated_at: getRecentDateRange()
        }
      }
    },
    process: async (json: unknown) => {
      const startedAt = new Date().toISOString();

      const parsed = freightsApiSchema.parse(json);
      const clean = freightMapper(parsed, startedAt);
      const unique = removeDuplicates<CleanFreight>(clean, (item) => item.id);
      await upsertFreights(unique);
      await deleteMissingFreights(unique, filterDaysAgo(env.DAYS_AGO_FILTER_SYNC), startedAt);
    }
  },

  //Manifests config
  manifests: {
    url: env.ESL_URL_MANIFEST,
    body: {
      search: {
        manifests: {
          updated_at: getRecentDateRange()
        }
      }
    },
    process: async (json: unknown) => {
      const parsed = manifestApiSchema.parse(json);
      const cleanManifests = manifestMapper(parsed);

      //Mapper the manifest freight relations
      const manifestFreightRelations = manifestFreightRelationsMapper(parsed);
      //Remove duplicates
      const uniqueManifestsRelations = removeDuplicates(
        manifestFreightRelations,
        (item) => `${item.freight_id}-${item.manifest_id}`
      );

      //Remove duplicates manifests
      const uniqueManifests = removeDuplicates<CleanManifest>(cleanManifests, (item) => item.id);
      await upsertManifests(uniqueManifests);
      await upsertManifestsFreightsRelations(uniqueManifestsRelations);
    }
  },

  //Pickups config
  pickups: {
    url: env.ESL_URL_PICKUPS,
    body: {
      search: {
        picks: { request_date: getRecentDateRange(env.DAYS_AGO_FILTER_PICKUP_SYNC) }
      }
    },
    process: async (json: unknown) => {
      const parsed = pickupApiSchema.parse(json);
      const clean = pickupMapper(parsed);
      const unique = removeDuplicates<CleanPickup>(clean, (item) => item.id);
      await upsertPickups(unique);
    }
  }
};
