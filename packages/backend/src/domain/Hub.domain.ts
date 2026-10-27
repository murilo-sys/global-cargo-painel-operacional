export class Hub {
  readonly location: string;
  readonly filial: string;
  readonly code: string;

  constructor(hub?: string) {
    // Garante que mesmo se vier vazio ou minúsculo, fica padronizado e com fallback seguro
    const safeHub = (hub || "SAO").trim().toUpperCase();

    this.code = safeHub;
    this.location = `GLOBAL AIR CARGO LTDA - ${safeHub}`;
    this.filial = `${safeHub} GLOBAL CARGO`;
  }
}
