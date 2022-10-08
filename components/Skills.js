import MenuButton from "./MenuButton";

function Skills({ handleOpenMenu }) {
  return (
    <div className="flex h-screen relative pb-[36px] swiper-no-swiping">
      <MenuButton onClick={handleOpenMenu} />
      <div className="flex flex-col justify-end h-full p-[64px] w-full">
        <h1 className="font-ptSerif text-[36px] font-normal mb-[64px]">
          Skills —
        </h1>
        <div className="grid w-full grid-cols-2">
          <div>
            <h2 className="text-white font-inter text-[64px] font-bold leading-none">
              HTML & CSS
            </h2>
            <h2 className="text-white font-inter text-[64px] font-bold leading-none">
              MaterialUI
            </h2>
            <h2 className="text-white font-inter text-[64px] font-bold leading-none">
              TailwindCSS
            </h2>
            <h2 className="text-white font-inter text-[64px] font-bold leading-none">
              ReactJS
            </h2>
            <h2 className="text-white font-inter text-[64px] font-bold leading-none">
              NextJS
            </h2>
          </div>
          <div>
            <h2 className="text-white font-inter text-[64px] font-bold leading-none">
              NodeJS
            </h2>
            <h2 className="text-white font-inter text-[64px] font-bold leading-none">
              Express
            </h2>
            <h2 className="text-white font-inter text-[64px] font-bold leading-none">
              Apollo
            </h2>
            <h2 className="text-white font-inter text-[64px] font-bold leading-none">
              GraphQL
            </h2>
            <h2 className="text-white font-inter text-[64px] font-bold leading-none">
              PostgreSQL
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
