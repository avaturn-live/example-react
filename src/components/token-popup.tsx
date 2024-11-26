import { X, Cloud } from "lucide-react";
import { ReactNode, useState } from "react";

export const TokenPopup = ({
  onSubmit,
  children,
}: {
  onSubmit: (token: string) => void;
  children: (props: { onClick: () => void }) => ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    onSubmit(token);
    setIsOpen(false);
    console.log("test");
  };
  return (
    <>
      {children({ onClick: () => setIsOpen(true) })}
      {isOpen && (
        <div className="z-50 fixed top-0 left-0 bg-white bg-opacity-30 backdrop-blur flex h-full  w-full flex-col items-center justify-center">
          <div className="flex flex-col bg-white rounded shadow p-6 relative md:min-w-[462px] md:w-fit w-full max-w-[90vw]">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-[16px] right-[16px] w-4 h-4"
            >
              <X size={16} />
            </button>

            <div className="flex items-center">
              <Cloud size={24} />
              <span className="ml-[10px] text-md font-semibold">
                Enter your OpenAi API token
              </span>
            </div>
            <p className="text-sm text-[#71717A] pr-[20%] my-[10px]">
              Some text about API and how work with it. Put here everything and
              be cool.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="border-[1px] rounded-md w-full px-3 h-[36px] mb-4"
                placeholder="Place your token here"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <button
                type="submit"
                className="w-full h-[44px] bg-[#12121b] text-[#fafafa] flex items-center justify-center rounded-md"
              >
                Connect your LLM to Avaturn.Live
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
