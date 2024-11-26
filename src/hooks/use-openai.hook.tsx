import { useCallback, useEffect, useRef, useState } from "react";
import OpenAI from "openai";
import { ChatCompletionStream } from "openai/lib/ChatCompletionStream.mjs";

export const useOpenAI = (
  token: string | null,
  { onResponse }: { onResponse: (message: string) => void },
) => {
  const client = useRef<OpenAI | null>(null);
  const [stream, setStream] = useState<ChatCompletionStream<null> | null>(null);
  const [inited, setInited] = useState(false);

  useEffect(() => {
    if (token) {
      client.current = new OpenAI({
        apiKey: token,
        dangerouslyAllowBrowser: true,
      });
    }
    setInited(!!token);
  }, [token]);

  useEffect(() => {
    let message = "";
    stream?.on("content", (delta) => {
      message += delta;

      if (message.includes("$$")) {
        onResponse(message.replace("$$", ""));
        message = "";
      }
    });
    stream?.on("end", () => {
      onResponse(message);
      message = "";
    });
    return () => {
      stream?.controller.abort();
    };
  }, [stream, onResponse]);

  const send = useCallback(async (content: string) => {
    if (!client.current) throw new Error("OpenAI client not initialized");

    const PROMPT = "\n SPLIT ALL SENTENCES WITH $$ IN RESPONSE";

    const _stream = client.current.beta.chat.completions.stream({
      model: "gpt-4",
      messages: [{ role: "user", content: content + PROMPT }],
      stream: true,
    });

    setStream(_stream);
  }, []);
  return {
    send,
    inited,
  };
};
