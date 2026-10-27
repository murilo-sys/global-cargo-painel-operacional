import type { HubRegionData } from "@roteirizador/backend";

export interface RegionGroup {
  region: string;
  hubs: string[];
}

export function hubsToRegions(hubs: HubRegionData[]): RegionGroup[] {
  const regions = new Map<string, string[]>();

  hubs.forEach((hub) => {
    if (!regions.has(hub.region)) {
      regions.set(hub.region, []);
    }
    regions.get(hub.region)!.push(hub.code);
  });

  return Array.from(regions, ([regionName, hubsList]) => ({
    region: regionName,
    hubs: hubsList
  }));
}
