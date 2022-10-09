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
    <div className="fixed w-screen h-screen z-20 bg-[#121212] px-[16px] py-[32px] xs:px-[32px] xs:py-[48px] lg:px-[64px] lg:py-[96px] overflow-auto">
      <div className="relative">
        <div className="relative pt-[48px] lg:pt-0">
          {MENU_ITEMS.map((item, index) => (
            <div
              key={index}
              className="flex items-end gap-[24px] md:gap-[32px] lg:gap-[64px] mb-[18px] md:mb-[24px] lg:mb-[32px]"
            >
              <span className="text-white font-inter text-[18px] xs:text-[24px] md:text-[32px] lg:text-[36px] font-normal leading-normal">
                N&#xb0;{index + 1}
              </span>
              <h1
                className="cursor-pointer text-white font-inter text-[32px] sm:text-[48px] md:text-[64px] lg:text-[92px] font-bold leading-none ease-in-out duration-300 hover:tracking-[14px]"
                onClick={async () => {
                  await swiperInstance.slideTo(index);
                  handleCloseMenu();
                }}
              >
                {item}
              </h1>
            </div>
          ))}
        </div>
        <div
          className="absolute cursor-pointer right-0 top-0"
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
