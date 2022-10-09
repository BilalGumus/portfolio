import MenuButton from "./MenuButton";

function Home({ handleOpenMenu }) {
  return (
    <div className="flex relative h-full w-full">
      <div className="hidden lg:block w-[33vw] bg-home bg-no-repeat bg-cover bg-center" />
      <MenuButton onClick={handleOpenMenu} theme="dark" />
      <div className="grow flex justify-center items-center">
        <h1 className="font-inter text-[48px] xs:text-[64px] sm:text-[96px] lg:text-[128px] 2xl:text-[144px] font-bold leading-none">
          <span>Bilal</span>
          <br />
          <span>&emsp;&nbsp;Gümüş</span>
          <br />
          <div className="flex">
            <span>Dev.</span>
            <span className="text-[18px] md:text-[36px] font-normal align-top leading-normal">
              &#169;2022
            </span>
          </div>
        </h1>
      </div>
    </div>
  );
}

export default Home;
