import { http } from "./http";

type HealthResponse = { status: string };

export async function checkHealth(): Promise<boolean> {
  try {
    const data = await http<HealthResponse>("/api/health");
    return data.status === "ok";
  } catch {
    return false;
  }
}
