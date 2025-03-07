import type { NextApiRequest, NextApiResponse } from "next";
import { SessionData } from "@/types";

export const runtime = "edge";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SessionData>,
) {
  if (req.method !== "GET") return res.status(405);
  try {
    return fetch("https://api.avaturn.live/api/v1/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AVATURN_LIVE_TOKEN || ""}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ extra: { background: "transparent" } }),
    });
  } catch (err) {
    throw err;
  }
}
