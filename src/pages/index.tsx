import { useOpenAI } from "@/hooks/use-openai.hook";
import { Inter } from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";
import { AvaturnHead } from "@avaturn-live/web-sdk";
import { Play, LoaderCircle, ArrowUpRight } from "lucide-react";
import { SessionData, Settings } from "@/types";
import Image from "next/image";
import { TokenPopup } from "@/components/token-popup";
import axios from "axios";
import cn from "classnames";
import { useAppHeight } from "@/hooks/use-app-height.hook";
import randomColor from "randomcolor";

const inter = Inter({ subsets: ["latin"] });

export const runtime = "experimental-edge";
export default function Home() {
  useAppHeight();
  const [settings, setSettings] = useState<Settings>({
    apiKey: "",
    gptKey: "",
    mode: "echo",
  });
  const [viewMode, setViewMode] = useState<"full" | "pip">("full");
  const [isLoading, setIsLoading] = useState(false);
  const avatar = useRef<AvaturnHead | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const [inited, setInited] = useState(false);
  const [modalBg, setModalBg] = useState("#fff");
  const openai = useOpenAI(settings?.gptKey || null, {
    onResponse: useCallback((message) => {
      avatar.current?.task(message);
    }, []),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    if (!inited) {
      await initSession();
    }

    if (settings.mode === "echo") {
      avatar.current?.task(text).catch((_) => console.log("Cancelled error"));
    } else openai.send(text);

    setText("");
    setIsLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setModalBg(randomColor());
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const initSession = async () => {
    if (avatar.current && avatar.current.inited) return;

    return axios.get<SessionData>("api/session/new").then(({ data }) => {
      if (!videoRef.current) return;

      avatar.current = new AvaturnHead(videoRef.current, {
        sessionToken: data.token,
        apiHost: "https://api.avaturn.live",
        preloadBundle: true,
      });
      avatar.current.on("init", () => {
        console.log("avatar inited");
      });
      avatar.current.on("avatar_ended_speaking", () => {
        console.log("avatar_ended_speaking");
      });
      return avatar.current.init().then(() => {
        setInited(true);
      });
    });
  };
  const switchView = () => {
    setViewMode((prev) => {
      if (!avatar.current || !modalRef.current || !videoRef.current)
        return prev;

      avatar.current.attachDOMNode(
        prev === "full" ? modalRef.current : videoRef.current,
      );
      return prev === "full" ? "pip" : "full";
    });
  };
  const changeLang = () => {
    avatar.current?.changeVoice({
      engine: "elevenlabs",
      voice_id: "VR6AewLTigWG4xSOukaG",
    });
  };

  const initOpenAi = (token: string) => {
    setSettings((prev) => ({ ...prev, gptKey: token, mode: "openai" }));
  };

  return (
    <main
      className={`flex min-h-[--app-height] overflow-hidden flex-col bg-white items-center justify-end ${inter.className}`}
    >
      <div
        className={
          "fixed bottom-5 right-5 w-80 aspect-video z-40 transition-colors"
        }
        style={{ background: modalBg }}
        ref={modalRef}
      ></div>
      <div className="flex items-center absolute top-10 left-10 z-40 gap-2.5">
        <button
          onClick={switchView}
          className="border-2 shadow rounded-md py-2 px-4"
        >
          Switch view
        </button>
        <button
          onClick={changeLang}
          className="border-2 shadow rounded-md py-2 px-4"
        >
          Change lang
        </button>
      </div>
      <div className="flex flex-auto w-full h-full md:max-h-full relative bg-white overflow-hidden">
        <Image
          fill
          className={cn("z-10 object-cover object-bottom absolute", {
            "opacity-0": inited,
          })}
          unoptimized
          src="/avatar_preview.png"
          style={{ right: "initial", top: "initial" }}
          alt="avatar"
        />
        <div
          ref={videoRef}
          className="z-10 object-cover object-bottom absolute w-full h-full"
        />
        <div className="absolute bottom-0 left-0 h-[15%] w-full z-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      <div className="absolute flex flex-col items-center md:items-start bottom-0 left-0 z-20 p-[6%] w-full">
        <div className="flex items-center mb-[10px] w-full max-w-[493px]">
          {/* <Select /> */}

          {!openai.inited && (
            <TokenPopup onSubmit={initOpenAi}>
              {(props) => (
                <button
                  type="button"
                  className="rounded-[30px] bg-[#F3F3F3] px-3 flex items-center h-[36px] w-full max-w-[50%] md:w-fit"
                  {...props}
                >
                  <Image width={16} height={16} src="/gpt.svg" alt="gpt" />
                  <span className="flex text-sm font-bold mx-[6px] whitespace-nowrap w-full">
                    Try it with GPT
                  </span>
                  <ArrowUpRight className="hidden sm:block" />
                </button>
              )}
            </TokenPopup>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-[#EDEDEDB2] bg-opacity-70 flex items-center justify-center rounded-[30px] pl-[18px] pr-2 max-w-[493px] h-[52px] w-full"
        >
          <input
            placeholder="Interact with Anna"
            className="outline-none text-black w-full bg-transparent border-none text-[16px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="flex rounded-full min-w-[34px] w-[34px] h-[34px] bg-black items-center justify-center ml-[10px]">
            {isLoading ? (
              <LoaderCircle className="stroke-white animate-spin transition" />
            ) : (
              <Play className="fill-white store-white" />
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
