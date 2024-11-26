import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import cn from "classnames";

const options = ["Mark", "Alice", "Jennifer"];

export const Select = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (
    e: React.MouseEvent<HTMLUListElement>,
    name: string,
  ) => {
    e.stopPropagation();
    setSelected(name);
    setIsOpen(false);
  };
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={() => setIsOpen((prev) => !prev)}
      className="relative bg-white cursor-pointer flex items-center border-[1px] rounded-[30px] p-[6px] w-full md:w-fit max-w-[50%]"
    >
      <div className="w-[23px] min-w-[23px] h-[23px] rounded-full bg-[#FFA7F1]" />
      <span className="text-sm min-w-[64px] mx-[6px] font-bold w-full md:w-fit">
        {selected}
      </span>
      <ChevronDown
        className={cn("min-w-5 transition", isOpen && "rotate-180")}
        size={20}
      />
      {isOpen && (
        <li className="flex flex-col absolute -top-[6px] left-0 w-full bg-white transform -translate-y-full border-2 p-1 rounded-[20px]">
          {options.map((avatar, i) => (
            <ul
              key={i}
              onClick={(e) => handleSelect(e, avatar)}
              className="p-1 rounded-[30px] hover:bg-[#F3F3F3] transition flex items-center"
            >
              <div className="w-[23px] h-[23px] rounded-full bg-[#FFA7F1]" />
              <span className="text-sm min-w-[64px] w-fit mx-[6px] font-bold">
                {avatar}
              </span>
            </ul>
          ))}
        </li>
      )}
    </div>
  );
};
