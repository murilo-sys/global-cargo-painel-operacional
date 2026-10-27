import type { HubRegionData } from "@roteirizador/backend";
import { hubsToRegions } from "@/util/hubsToRegions";

interface RegionsProps {
  hubs: HubRegionData[];
}

export default function RegionsCheck({ hubs }: RegionsProps) {
  const regions = hubsToRegions(hubs);

  return regions.map((value) => {
    return (
      <div className="flex flex-col gap-1 bg-blue-950 rounded-2xl px-6 py-2" key={value.region}>
        <p className="font-bold text-2xl">{value.region.toLocaleUpperCase()}</p>
        <div className="grid grid-rows-6 gap-1 grid-flow-col">
          {value.hubs.map((hub) => {
            return (
              <label className="flex flex-row text-lg cursor-pointer" key={hub}>
                <input name="hubs" type="checkbox" value={hub} className="mr-1.5" />
                {` ${hub}`}
              </label>
            );
          })}
        </div>
      </div>
    );
  });
}
