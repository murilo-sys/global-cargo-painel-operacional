import type { BaseValues } from "@roteirizador/backend";
import { Truck } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PickupCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: BaseValues;
  setStatus: (value: boolean) => void;
  title: string;
  status: boolean;
  href: string;
}

export function PickupCard({ data, href, setStatus, status, title, className }: PickupCardProps) {
  const HREF_REDIRECT = `/pickups?status=${href}`;

  return (
    <div className={`flex flex-col gap-1 ${className ? className : ""}`}>
      <Link href={HREF_REDIRECT} className="cursor-pointer hover:-translate-y-1 transition-transform">
        <div className="relative bg-blue-900 p-4 rounded-2xl shadow-xl">
          {/* Background Icon */}
          <div className="absolute flex inset-0 justify-center items-center w-full opacity-5 pointer-events-none">
            <Truck size={140} />
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">{`Coletas - ${title}`}</h2>

            <div className="grid gap-2 grid-rows-2 grid-cols-1 2xl:grid-rows-1 2xl:grid-cols-2">
              <div className="flex flex-col justify-center items-center">
                <span className="text-2xl font-bold leading-4">
                  {(data?.m3 ?? 0).toLocaleString("pt-BR", {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3
                  })}
                </span>
                <span className="text-lg">M³</span>
              </div>

              <div className="flex flex-col justify-center items-center">
                <span className="text-2xl font-bold leading-4">
                  {(data?.realWeight ?? 0).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </span>
                <span className="text-lg">Peso Real</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="px-4 py-2 flex flex-row gap-1 bg-blue-900 rounded-xl">
        <label className="cursor-pointer flex flex-row gap-1 items-center">
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => {
              setStatus(e.target.checked);
            }}
          />
          <span>{title}</span>
        </label>
      </div>
    </div>
  );
}
