import type { NextApiRequest, NextApiResponse } from "next";
import { SessionData } from "@/types";

export const runtime = "edge";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SessionData>,
) {
  if (req.method !== "GET") return res.status(405);
  try {
    return fetch("https://api.staging.avaturn.live/api/v1/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AVATURN_LIVE_TOKEN || ""}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        extra: {
          background: "transparent",
          conversation_engine: {
            "type": "external",
            "url": "ws://api.yolk-conversation-engine-staging.nc.in3d.io/ws?sessionId=b5a4c82d-ff84-4f7d-895f-16ed10ea51cc"
          }
        }
      }),
    });
  } catch (err) {
    console.log('error:', err)
    throw err;
  }
}
