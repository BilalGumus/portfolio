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
    <div className="fixed w-screen h-screen z-20 bg-[#121212] px-[64px] py-[96px] overflow-auto">
      <div className="relative">
        {MENU_ITEMS.map((item, index) => (
          <div key={index} className="flex items-end gap-[64px] mb-[32px]">
            <span className="text-white font-inter text-[36px] font-normal leading-normal">
              N&#xb0;{index + 1}
            </span>
            <h1
              className="cursor-pointer text-white font-inter text-[96px] font-bold leading-none ease-in-out duration-300 hover:tracking-[14px]"
              onClick={async () => {
                await swiperInstance.slideTo(index);
                handleCloseMenu();
              }}
            >
              {item}
            </h1>
          </div>
        ))}
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
