function MenuButton(props) {
  return (
    <div
      className={`select-none absolute top-[32px] left-[32px] md:top-[48px] md:left-[48px] lg:top-[64px] lg:left-[64px] cursor-pointer flex justify-center items-center w-[66px] h-[66px] md:w-[88px] md:h-[88px] lg:w-[100px] lg:h-[100px] ${
        props.theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
      onClick={props.onClick}
    >
      <span className="font-bigShouldersDisplay text-5xl md:text-6xl md:text-7xl font-bold">
        B
      </span>
    </div>
  );
}

export default MenuButton;
