import MenuButton from "./MenuButton";

function Education({ handleOpenMenu }) {
  return (
    <div className="flex h-screen relative pb-[36px] swiper-no-swiping">
      <MenuButton onClick={handleOpenMenu} />
      <div className="grid w-full grid-cols-2 p-[64px]">
        <div className="self-end">
          <h1 className="text-white font-inter text-[64px] font-bold">
            Education
          </h1>
        </div>
        <div className="self-end divide-y divide-[#4D4D4D] leading-none">
          <div className="pt-[54px]">
            <h2 className="text-white font-inter text-[36px] font-bold">
              University of Selcuk, Computer Engineering
            </h2>
            <h3 className="text-[#BBBBBB] font-inter text-[36px] font-normal">
              2019-2023
            </h3>
            <h2 className="font-ptSerif text-[24px] font-normal leading-normal mt-[32px]">
              CGPA 3.72/4.00
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
