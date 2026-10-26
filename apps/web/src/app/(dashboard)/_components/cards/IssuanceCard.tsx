import type { IssuancesMetrics } from "@roteirizador/backend";
import { File } from "lucide-react";
import Link from "next/link";
import React from "react";

interface IssuanceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: IssuancesMetrics;
}

const HREF_REDIRECT_BASE = "/issuances";

export function IssuanceCard({ data, className }: IssuanceCardProps) {
  return (
    <div className={className ? className : ""}>
      <div className="relative bg-blue-900 p-4 rounded-2xl shadow-xl">
        {/* Background Icon */}
        <div className="pointer-events-none absolute flex inset-0 justify-center items-center w-full opacity-5">
          <File size={110} />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-center">Emissões</h2>

          <div className="grid grid-rows-3 gap-3">
            <Link
              href={`${HREF_REDIRECT_BASE}?status=Pendente`}
              className="cursor-pointer hover:-translate-y-1 transition-transform flex flex-col justify-center items-center"
            >
              <span className="text-2xl font-bold leading-4">{data?.pendings ?? 0}</span>
              <span className="text-lg">Pendentes</span>
            </Link>

            <Link
              href={`${HREF_REDIRECT_BASE}?status=Emitido`}
              className="cursor-pointer hover:-translate-y-1 transition-transform flex flex-col justify-center items-center"
            >
              <span className="text-2xl font-bold leading-4">{data?.issued ?? 0}</span>
              <span className="text-lg">Emitidos</span>
            </Link>

            <Link
              href={`${HREF_REDIRECT_BASE}?status=Manifestado`}
              className="cursor-pointer hover:-translate-y-1 transition-transform flex flex-col justify-center items-center"
            >
              <span className="text-2xl font-bold leading-4">{data?.manifested ?? 0}</span>
              <span className="text-lg">Manifestados</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
