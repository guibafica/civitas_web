import { Search } from "lucide-react";

export const Input = () => {
  return (
    <>
      <div className="h-8 w-60 pl-4 flex flex-row items-center justify-between rounded-full border border-slate-500 overflow-hidden gap-4">
        <Search size={14} className="text-slate-500" />

        <input
          type="text"
          placeholder="Search..."
          className="w-full h-full text-slate-700 text-lg bg-transparent outline-none placeholder-slate-400 pr-4"
        />
      </div>
    </>
  );
};
