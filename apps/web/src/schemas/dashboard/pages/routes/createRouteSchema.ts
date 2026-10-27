import z from "zod";

export const createRouteSchema = z.object({
  name: z.string("Nome inválido").min(1, "Nome deve conter pelo menos 1 caracter."),
  vehicle: z.string("Veículo inválido").min(1, "Selecione um veículo"),
  hubs: z.array(z.string("Hub inválido")).min(1, "Selecione um HUB válido")
});
