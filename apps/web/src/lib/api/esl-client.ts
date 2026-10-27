import "server-only";

import { env } from "@/env";
import axios from "axios";

export const eslApi = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${env.ESL_TOKEN}`
  }
});
