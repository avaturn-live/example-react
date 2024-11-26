import { useState } from "react";
import { Settings } from "@/types";

export const SettingsFrom = ({
  onSubmit,
}: {
  onSubmit: (settings: Settings) => void;
}) => {
  const [settings, setSettings] = useState<Settings>({
    gptKey: "",
    apiKey: "",
    mode: "echo",
  });

  const isFormValid = (_settings: Settings): boolean => {
    return _settings.mode === "openai"
      ? !!(_settings.apiKey && _settings.gptKey)
      : !!_settings.apiKey;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid(settings)) return;
    onSubmit(settings);
  };
  const handleSelectMode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings((prev) => ({
      ...prev,
      mode: e.target.value === "echo" ? "echo" : "openai",
    }));
  };
  const handleChangeKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-screen justify-center items-center"
    >
      <div className="p-4 flex w-96 bg-white shadow flex-col items-center justify-center rounded">
        <label className="flex flex-col w-full">
          <span>Select session mode</span>
          <select
            className="rounded text-black py-[0.1rem] mb-2 border-2 border-zinc-200"
            name="mode"
            onChange={handleSelectMode}
            value={settings.mode}
          >
            <option value="echo">Echo</option>
            <option value="openai">OpenAi</option>
          </select>
        </label>

        <input
          className="rounded text-black mb-2 w-full px-1 border-2 border-zinc-200"
          type="password"
          placeholder="API key"
          name="apiKey"
          value={settings.apiKey}
          onChange={handleChangeKey}
        />
        {settings.mode === "openai" && (
          <input
            className="rounded text-black mb-2 w-full px-1 border-2 border-zinc-200"
            type="password"
            placeholder="GPT key"
            name="gptKey"
            value={settings.gptKey}
            onChange={handleChangeKey}
          />
        )}
        <button
          type="submit"
          disabled={!isFormValid(settings)}
          className="bg-blue-900 px-4 py-1 rounded disabled:opacity-30 text-white"
        >
          Start live session
        </button>
      </div>
    </form>
  );
};
