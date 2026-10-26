import type { ManifestMetrics } from "@roteirizador/backend";
import { Warehouse } from "lucide-react";
import Link from "next/link";
import React from "react";

interface TransferCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ManifestMetrics;
  transfer: boolean;
  setTransfer: (valor: boolean) => void;
}

const HREF_REDIRECT = "/transfers";

export function TransferCard({ data, transfer, setTransfer, className }: TransferCardProps) {
  return (
    <div className={`flex flex-col gap-1 ${className ? className : ""}`}>
      <Link
        href={HREF_REDIRECT}
        className="relative hover:-translate-y-1 transition-transform bg-blue-900 p-4 rounded-2xl shadow-xl"
      >
        {/* Background Icon */}
        <div className="absolute flex inset-0 justify-center items-center w-full opacity-5 pointer-events-none">
          <Warehouse size={100} />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Transferências</h2>
          <div className="grid gap-2 grid-rows-2 grid-cols-1 2xl:grid-rows-1 2xl:grid-cols-2">
            <div className="flex flex-col justify-center items-center">
              <span className="text-2xl font-bold leading-4">
                {(data?.totals?.m3 ?? 0).toLocaleString("pt-BR", {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3
                })}
              </span>
              <span className="text-lg">M³</span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <span className="text-2xl font-bold leading-4">
                {(data?.totals?.realWeight ?? 0).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
              <span className="text-lg">Peso Real</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="px-4 py-2 flex flex-row gap-1 bg-blue-900 rounded-xl">
        <label className="cursor-pointer flex flex-row gap-1 items-center">
          <input
            type="checkbox"
            checked={transfer}
            onChange={(e) => {
              setTransfer(e.target.checked);
            }}
          />
          <span>Em Transferência</span>
        </label>
      </div>
    </div>
  );
}
