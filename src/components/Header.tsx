import { useState, useEffect, useCallback } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";

import profilePic from "../assets/profilePic.png";

import { Input } from "./Input";

interface IHeaderProps {
  onTextSearch: (text: string) => void;
}

export const Header = ({ onTextSearch }: IHeaderProps) => {
  const handleSearch = useCallback(
    (text: string) => {
      if (text.length >= 3) {
        const handler = setTimeout(() => onTextSearch(text), 1000);

        return () => {
          clearTimeout(handler);
        };
      }

      if (text.length === 0) {
        const handler = setTimeout(() => onTextSearch(""), 1000);

        return () => {
          clearTimeout(handler);
        };
      }
    },
    [onTextSearch]
  );

  // 1 second debounce to avoid API calls with each change
  const onChangeTextDebounced = AwesomeDebouncePromise(
    async (text: string) => handleSearch(text),
    1000
  );

  return (
    <>
      <div className="w-screen h-16 fixed top-4 left-0 flex flex-row items-center justify-between px-10 max-md:justify-end max-sm:justify-center">
        <div className="flex flex-row items-center justify-start max-md:hidden">
          <h1 className="font-bold text-2xl text-indigo-950">
            Welcome,
            <span className="text-indigo-700 font-extrabold">
              {" "}
              Civitas Learning
            </span>
          </h1>
        </div>

        <div className="bg-white px-6 py-3 rounded-xl shadow-custom-shadow flex flex-row items-center justify-between max-md:justify-end">
          <div className="flex flex-row items-center justify-end gap-3 h-full max-sm:flex-row-reverse">
            <Input
              onChange={(e) => onChangeTextDebounced(e.currentTarget.value)}
            />

            <div className="h-10 w-px bg-slate-200" />

            <img
              src={profilePic}
              alt="civitas logo"
              className="size-10 rounded-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};
