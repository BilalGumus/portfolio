export const MENU_ITEMS = [
  "Home",
  "About me",
  "Skills",
  "Experience",
  "Education",
  "Contact",
];

function Menu({ handleCloseMenu, swiperInstance }) {
  return (
    <div className="fixed w-screen h-screen z-20 bg-[#030303]  overflow-auto">
      <div className="relative">
        <div className="h-screen flex flex-col justify-center relative px-[16px] py-[46px] xs:px-[32px] md:px-[72px] lg:px-[96px]">
          {MENU_ITEMS.map((item, index) => (
            <div
              key={index}
              className="flex items-end gap-[24px] md:gap-[32px] lg:gap-[48px] mb-[18px]"
            >
              <span className="text-white font-inter text-[16px] xs:text-[24px] font-normal leading-normal">
                N&#xb0;{index + 1}
              </span>
              <h4
                className="cursor-pointer text-white font-inter text-[32px] sm:text-[48px] font-bold leading-none ease-in-out duration-300 hover:tracking-none hover:sm:tracking-[2px] hover:lg:tracking-[6px]"
                onClick={async () => {
                  await swiperInstance.slideTo(index);
                  handleCloseMenu();
                }}
              >
                {item}
              </h4>
            </div>
          ))}
        </div>
        <div
          className="absolute transition-all hover:rotate-90 select-none cursor-pointer right-0 top-0 mx-[40px] my-[46px]"
          onClick={handleCloseMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-[48px] h-[48px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Menu;
