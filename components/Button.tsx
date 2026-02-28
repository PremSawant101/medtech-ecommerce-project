import Image from "next/image";

type ButtonProps = {
  bgColor: string;
  title: string;
  onClick?: () => void;   // 👈 add this
};

const Button = ({ bgColor, title, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}   // 👈 attach here
      className={`text-xl flex text-white items-center cursor-pointer ${
        bgColor === "black"
          ? "bg-black"
          : "bg-[#4E482E]"
      } px-8 py-4 rounded-full hover:scale-105 transition`}
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