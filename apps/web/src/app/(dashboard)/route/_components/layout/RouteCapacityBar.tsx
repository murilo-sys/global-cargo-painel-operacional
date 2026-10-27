import type { RouteHubData } from "@roteirizador/backend";
import { hexToColor } from "@/util/luminanceToColor";

interface RouteCapacityBarProps {
  title: string;
  unit: string;
  maxValue: number;
  hubs: RouteHubData[];
  getValue: (hub: RouteHubData) => number;
}

export default function RouteCapacityBar({ title, unit, maxValue, hubs, getValue }: RouteCapacityBarProps) {
  const safeMax = maxValue > 0 ? maxValue : 1;
  const totalValue = hubs.reduce((acc, hub) => acc + getValue(hub), 0);
  const totalPercentage = (totalValue / safeMax) * 100;

  return (
    <div className="flex flex-col gap-1 w-full shadow-2xl">
      {/* Header (Title / Total Value) */}
      <div className="flex justify-between items-center text-xs font-semibold px-1 text-blue-200">
        <span className="uppercase tracking-wider">{title}</span>
        <span>
          {totalValue.toLocaleString("pt-BR")} / {maxValue.toLocaleString("pt-BR")} {unit} (
          {totalPercentage.toFixed(1)}%)
        </span>
      </div>

      {/* Progress bar per hub */}
      <div className="flex flex-row justify-start rounded-xl bg-blue-800 px-3 py-14 overflow-visible w-full">
        {hubs.map((hub, index) => {
          const value = getValue(hub);
          const percentage = (value / safeMax) * 100;
          const isEven = index % 2 === 0;

          return (
            <div
              key={hub.code}
              style={{ width: `${percentage < 3 ? 4 : percentage}%`, backgroundColor: hub.color }}
              className={`${index === 0 ? "rounded-bl-xl rounded-tl-xl" : ""} h-6 flex flex-row justify-center relative items-center`}
            >
              <div className="relative font-bold flex flex-col items-center">
                <span style={{ color: hexToColor(hub.color) }} className="text-xs">
                  {`${percentage.toFixed(1)}%`}
                </span>

                <div
                  className={`absolute flex items-center text-xs text-white ${
                    isEven ? "bottom-6 flex-col" : "top-6 flex-col-reverse"
                  }`}
                >
                  <p className="font-semibold">{hub.code}</p>
                  <span className="leading-none text-blue-300">|</span>
                </div>
              </div>
            </div>
          );
        })}

        {totalPercentage < 100 ? (
          <div
            style={{ width: `${100 - totalPercentage}%` }}
            className="rounded-br-xl rounded-tr-xl h-6 flex flex-row justify-center relative items-center bg-white text-black"
          >
            <div className="relative font-bold flex flex-col items-center">
              <span className="text-xs">{`${(100 - totalPercentage).toFixed(1)}%`}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
