interface IButtonProps {
  text: string;
  onClick: () => void;
}

export const Button = ({ onClick, text }: IButtonProps) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="py-1 px-5 rounded-md font-semibold transition-all bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg"
      >
        {text}
      </button>
    </>
  );
};
