function MenuButton(props) {
  return (
    <div
      className={`z-10 transition-all hover:rotate-90 select-none absolute top-[32px] left-[32px] md:top-[48px] md:left-[48px] lg:top-[64px] lg:left-[64px] cursor-pointer flex justify-center items-center w-[66px] h-[66px] md:w-[88px] md:h-[88px] lg:w-[100px] lg:h-[100px] ${
        props.theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
      onClick={props.onClick}
    >
      <span className="font-bigShouldersDisplay text-5xl md:text-6xl md:text-7xl font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </span>
    </div>
  );
}

export default MenuButton;
