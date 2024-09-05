import { useCallback, useState } from "react";

interface IAddCourseInputProps {
  title: string;
  placeHolder: string;
  onTyping: (e: string) => void;
  type?: "normal" | "courseNumber";
}

export const AddCourseInput = ({
  title,
  onTyping,
  placeHolder,
  type = "normal",
}: IAddCourseInputProps) => {
  const [formattedValue, setFormattedValue] = useState<string>("");

  const handleChangeInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      let inputValue = e.currentTarget.value;

      inputValue = inputValue.replace(/\D/g, "");

      const formattedValue = inputValue.padStart(3, "0").slice(-3);

      setFormattedValue(formattedValue);
      onTyping(formattedValue);
    },
    [onTyping]
  );

  return (
    <div className="w-full">
      <div className="flex flex-row items-center">
        <h1 className="text-main-blue text-sm font-medium">{title}</h1>
        <span className="text-red-700 ml-1">*</span>
      </div>

      <div className="flex items-center justify-between border border-solid w-full transition-all border-main-blue duration-400 ease-in-out h-9 rounded-md px-2 bg-white">
        {type === "courseNumber" ? (
          <input
            onChange={(e) => handleChangeInput(e)}
            placeholder={placeHolder}
            value={formattedValue}
            className="h-full w-full text-slate-700 text-lg bg-transparent outline-none placeholder-slate-500 disabled:cursor-not-allowed"
          />
        ) : (
          <input
            onChange={(e) => onTyping(e.currentTarget.value)}
            placeholder={placeHolder}
            className="h-full w-full text-slate-700 text-lg bg-transparent outline-none placeholder-slate-500 disabled:cursor-not-allowed"
          />
        )}
      </div>
    </div>
  );
};
