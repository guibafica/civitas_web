import { Trash2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { Button } from "./Button";

export const Table = () => {
  const currentPage = 2;

  return (
    <>
      <div className="w-screen overflow-x-auto shadow-custom-shadow rounded-xl p-6 bg-white flex flex-col gap-4">
        <div className="flex justify-end sm:justify-start">
          <Button text="+ New Course" onClick={() => {}} />
        </div>

        <table className="min-w-full bg-white">
          <thead className="bg-transparent text-slate-700 font-bold text-lg">
            <tr>
              <th className="py-2 px-4 border-b text-left">Subject</th>
              <th className="py-2 px-4 border-b text-left">Course Number</th>
              <th className="py-2 px-4 border-b text-left w-2/4">
                Description
              </th>
              <th className="py-2 px-4 border-b text-right w-1/6">Ações</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {Array(6)
              .fill(null)
              .map(() => (
                <tr className="bg-white even:bg-gray-50" key={Math.random()}>
                  <td className="py-2 px-4 border-b">Mathematics</td>
                  <td className="py-2 px-4 border-b">MATH101</td>
                  <td className="py-2 px-4 border-b">
                    An introduction to algebra, calculus, and geometry.
                  </td>

                  <td className="py-2 px-4 border-b flex items-center justify-end">
                    <Trash2
                      size={26}
                      className="text-red-500 cursor-pointer hover:text-red-700 transition-all"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="flex flex-row items-center justify-end sm:justify-between gap-2">
          <button className="text-slate-700">Previous</button>

          <div className="flex flex-row gap-2">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <button
                  key={Math.random()}
                  className={twMerge(
                    "size-8 rounded-lg hover:bg-slate-300",
                    currentPage == index + 1 ? "bg-slate-200" : "bg-white"
                  )}
                >
                  {index + 1}
                </button>
              ))}
          </div>

          <button className="text-slate-700">Next</button>
        </div>
      </div>
    </>
  );
};
