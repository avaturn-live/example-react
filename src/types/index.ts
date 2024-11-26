export type Settings = {
  gptKey: string;
  apiKey: string;
  mode: "echo" | "openai";
};

export type SessionData = {
  session_token: string;
  session_id: string;
};
