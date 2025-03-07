export type Settings = {
  gptKey: string;
  apiKey: string;
  mode: "echo" | "openai";
};

export type SessionData = {
  token: string;
  session_id: string;
};
