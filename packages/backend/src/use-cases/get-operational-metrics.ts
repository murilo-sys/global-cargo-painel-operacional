import OperationalMetricsRepository from "../repositories/operational-metrics.repository";

export default class GetOperationalMetricsUseCase {
  constructor(private repository: OperationalMetricsRepository) {}

  async get() {
    return await this.repository.getMetrics();
  }
}

(async () => {
  const operationalMetrics = new GetOperationalMetricsUseCase(new OperationalMetricsRepository());

  console.log(await operationalMetrics.get());
})();
