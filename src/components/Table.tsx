import { Trash2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { Button } from "./Button";

import { ICoursesProps } from "../App";
import { useCallback } from "react";

interface ITableProps {
  data: ICoursesProps[];
  onAddCourseButtonClick: () => void;
  onDelete: (id: string) => void;

  totalPages: number;
  totalItems: number;
  currentPage: number;
  hasNextPage: boolean;
  onChangePage: (newPage: number) => void;
}

export const Table = ({
  data,
  onAddCourseButtonClick,
  onDelete,
  currentPage,
  hasNextPage,
  totalItems,
  totalPages,
  onChangePage,
}: ITableProps) => {
  const handleGoToNextPage = useCallback(() => {
    if (hasNextPage) {
      onChangePage(currentPage + 1);
    }
  }, [hasNextPage, onChangePage, currentPage]);

  const handleBackPage = useCallback(() => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  }, [onChangePage, currentPage]);

  return (
    <>
      <div className="w-screen overflow-x-auto shadow-custom-shadow rounded-xl p-6 bg-white flex flex-col gap-4">
        <div className="flex justify-end sm:justify-start">
          <Button text="+ New Course" onClick={onAddCourseButtonClick} />
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
            {data.map((row, rowIndex) => (
              <tr
                className="bg-white even:bg-gray-50"
                key={`${rowIndex} - ${row.id}`}
              >
                <td className="py-2 px-4 border-b">{row.subject}</td>
                <td className="py-2 px-4 border-b">{row.courseNumber}</td>
                <td className="py-2 px-4 border-b">{row.description}</td>

                <td className="py-2 px-4 border-b">
                  <div
                    onClick={() => onDelete(row.id)}
                    className="w-full flex flex-row items-center justify-end"
                  >
                    <Trash2
                      size={26}
                      className="text-red-500 cursor-pointer hover:text-red-700 transition-all"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1 className="text-slate-500">
          Total items:{" "}
          <span className="text-indigo-500 font-bold">{totalItems}</span>
        </h1>

        <div className="flex flex-row items-center justify-end max-sm:justify-between gap-2">
          <button
            onClick={currentPage > 1 ? handleBackPage : () => {}}
            className={twMerge(
              "text-slate-700",
              currentPage === 1 && "text-slate-300 cursor-not-allowed"
            )}
          >
            Previous
          </button>

          <div className="flex flex-row gap-2">
            {Array(totalPages)
              .fill(null)
              .map((_, index) => (
                <button
                  key={Math.random()}
                  onClick={
                    currentPage !== index + 1
                      ? () => onChangePage(index + 1)
                      : () => {}
                  }
                  className={twMerge(
                    "size-8 rounded-lg hover:bg-slate-300",
                    currentPage === index + 1 ? "bg-slate-200" : "bg-white"
                  )}
                >
                  {index + 1}
                </button>
              ))}
          </div>

          <button
            onClick={hasNextPage ? handleGoToNextPage : () => {}}
            className={twMerge(
              "text-slate-700",
              !hasNextPage && "text-slate-300 cursor-not-allowed"
            )}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
