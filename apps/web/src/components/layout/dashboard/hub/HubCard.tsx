import { hexToColor } from "@/util/luminanceToColor";
import Link from "next/link";

interface HubCardProps {
  m3: number;
  invoiceValue: number;
  realWeight: number;
  freightWeight: number;
  color: string;
  code: string;
}

export default function HubCard(hub: HubCardProps) {
  return (
    <div className="hover:-translate-y-1 transition-transform shadow-xl/50">
      <Link
        href={`/mocar?hub=${hub.code.replaceAll("- AIR", "").trim()}&modal=${hub.code.includes("AIR") ? "Aéreo" : "Rodoviário"}`}
        key={hub.code}
      >
        <div
          className="flex flex-col font-semibold gap-2 w-full p-3 shadow-lg rounded-xl"
          style={{ backgroundColor: hub.color ?? "darkblue", color: hexToColor(hub.color) }}
        >
          <p className="border-b-2 font-semibold text-xl">{hub.code}</p>
          <div className="flex flex-col gap-2">
            {/* M3 */}
            <div className="flex flex-row justify-between border-b border-dotted">
              <span className="font-semibold">M³</span>
              <span>
                {hub.m3.toFixed(3)} <span className="text-xs font-semibold">M³</span>
              </span>
            </div>

            {/* Invoice value */}
            <div className="flex flex-row justify-between border-b border-dotted">
              <span className="font-semibold">R$</span>
              <span>
                {hub.invoiceValue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}{" "}
                <span className="text-xs font-semibold">R$</span>
              </span>
            </div>

            {/* Real Weight */}
            <div className="flex flex-row justify-between border-b border-dotted">
              <span className="font-semibold">KG</span>
              <span>
                {hub.realWeight.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}{" "}
                <span className="text-xs font-semibold">KG</span>
              </span>
            </div>

            {/* Freight Weight */}
            <div className="flex flex-row justify-between border-b border-dotted">
              <span className="font-semibold">FP</span>
              <span>
                {hub.freightWeight.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}{" "}
                <span className="text-xs font-semibold">R$</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
