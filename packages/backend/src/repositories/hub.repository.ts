import { db } from "../db/connection";
import { hubsTable } from "../db/schema";

export class HubRepository {
  async listAllHubs() {
    const records = await db.select({ code: hubsTable.code }).from(hubsTable);
    return records.map((h) => h.code);
  }
}
