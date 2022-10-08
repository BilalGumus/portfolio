import MenuButton from "./MenuButton";

function Home({ handleOpenMenu }) {
  return (
    <div className="flex relative swiper-no-swiping">
      <div className="hidden lg:block w-[33vw] bg-home bg-no-repeat bg-cover bg-center" />
      <MenuButton onClick={handleOpenMenu} theme="dark" />
      <div className="h-screen grow flex justify-center items-center">
        <h1 className="font-inter text-[144px] font-bold leading-[128px]">
          <span>Bilal</span>
          <br />
          <span className="ml-[190px]">Gümüş</span>
          <br />
          <div className="flex">
            <span>Dev.</span>
            <span className="text-[36px] font-normal align-top leading-normal">
              &#169;2022
            </span>
          </div>
        </h1>
      </div>
    </div>
  );
}

export default Home;
