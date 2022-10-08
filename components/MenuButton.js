function MenuButton(props) {
  return (
    <div
      className={`select-none absolute top-[64px] left-[64px] cursor-pointer flex justify-center items-center w-[100px] h-[100px] ${
        props.theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
      onClick={props.onClick}
    >
      <span className="font-bigShouldersDisplay text-7xl font-bold">B</span>
    </div>
  );
}

export default MenuButton;
