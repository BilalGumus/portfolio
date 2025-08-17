import Image from "next/image";

export const BuyMeACoffee = () => {
  return (
    <a
      href="https://www.buymeacoffee.com/bilalgumus"
      target="_blank"
      className="transition duration-250 scale-[1] hover:scale-[1.1] flex items-center justify-center w-14 h-14 bg-[#ff861d] text-white rounded-full fixed right-[18px] bottom-[18px] shadow-lg z-[40] cursor-pointer font-semibold"
    >
      <Image
        src="/images/buymeacoffee.svg"
        alt="Buy Me A Coffee | Bilal Gümüş"
        className="h-[32px] w-[32px] m-0 p-0"
        width={32}
        height={32}
      />
    </a>
  );
};
