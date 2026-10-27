import "server-only";
import axios from "axios";
import * as XLSX from "xlsx";

export async function downloadArchive(url: string): Promise<unknown> {
  // Delay to wait until the link is avaiable
  const delayMs = 2100;
  const attempts = 15;
  for (let index = 0; index < attempts; index++) {
    try {
      // Set delay on the begin of the function, until the link is avaiable
      await new Promise((resolve) => setTimeout(resolve, delayMs));

      //Download the archive from the url
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const buffer = Buffer.from(response.data);

      //read with xlsx
      const workbook = XLSX.read(buffer, { type: "buffer", cellDates: true });

      //Take the name from firstSheet and use it
      const firstSheetName = workbook.SheetNames[0];
      const firstSheet = workbook.Sheets[firstSheetName];

      //Transforme all data to json
      const json = XLSX.utils.sheet_to_json(firstSheet);

      //Retorn the json on sucess
      return json;
    } catch (error) {
      //Verify if is axios error and 404 status
      const is404 = axios.isAxiosError(error) && error.response?.status === 404;

      // If is404 and the index is smaller than attemps, try again
      if (is404 && index < attempts) {
        console.warn(`[downloadArchive] Couldn't download archive, trying again...`);
        continue;
      }

      throw new Error(
        `[downloadArchive ${axios.isAxiosError(error) && error.response && error.response?.status}] Error has occured: ${error}`
      );
    }
  }
}
