import { twMerge } from "tailwind-merge";
interface IButtonProps {
  text: string;
  onClick: () => void;
  style?: "blue" | "outlined-red";
}

export const Button = ({ onClick, text, style = "blue" }: IButtonProps) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={twMerge(
          "py-1 px-5 rounded-md font-semibold transition-all hover:shadow-lg",
          style === "blue" && "bg-indigo-600 text-white hover:bg-indigo-700",
          style === "outlined-red" &&
            "bg-transparent text-red-500 border-red-500 border hover:bg-red-500 hover:text-white hover:border-white"
        )}
      >
        {text}
      </button>
    </>
  );
};
