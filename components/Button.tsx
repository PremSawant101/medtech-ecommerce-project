import Image from "next/image";

type ButtonProps = {
  bgColor: string;
  title: string;
  onClick?: () => void;
  disabled?: boolean;   // ✅ add this
};

const Button = ({ bgColor, title, onClick, disabled }: ButtonProps) => {

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`text-xl flex items-center text-white px-8 py-4 rounded-full transition
        ${disabled
          ? "bg-gray-400 cursor-not-allowed"
          : bgColor === "black"
            ? "bg-black hover:scale-105"
            : "bg-[#4E482E] hover:scale-105"
        }
      `}
    >
      {title}

      <Image
        src="/images/navbar/arrow-up-right.png"
        alt="Arrow"
        width={20}
        height={20}
        className="w-5 ml-2"
      />
    </button>
  );
};

export default Button;