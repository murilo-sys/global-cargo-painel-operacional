import { getManifestsDetailUseCase } from "@roteirizador/backend";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { TransferTable } from "./_components/TransferTable";
import { TransferTableSkeleton } from "./_components/TransferTableSkeleton";

export const metadata: Metadata = {
  title: "Transferências"
};

export default function Transfers() {
  return (
    <div className="flex flex-col gap-5">
      <Suspense fallback={<TransferTableSkeleton />}>
        <TransfersContent />
      </Suspense>
    </div>
  );
}

async function TransfersContent() {
  const manifests = await getManifestsDetailUseCase.execute();
  const serializedData = manifests.map((m) => m.toJSON());

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center gap-4">
        <Link
          href="/"
          className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-sm"
        >
          🠔 Voltar ao Painel
        </Link>
        <h2 className="font-bold text-2xl animate-in fade-in slide-in-from-left-4 duration-800">
          Transferências
        </h2>
      </div>

      <TransferTable data={serializedData} />
    </div>
  );
}
