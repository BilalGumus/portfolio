function Home() {
  return (
    <div className="relative h-full w-full">
      <div className="home-bg" /> 
      <div className="absolute top-[32px] right-[32px] md:top-[48px] md:right-[48px] lg:top-[64px] lg:right-[64px]">
        <h1 className="font-inter leading-none">PORTFOLIO ©2022</h1>
      </div>
      <div className="h-screen flex flex-col gap-8 justify-center items-center p-[32px] md:p-[48px] lg:p-[64px]">
        <h1 className="font-inter mb-24 font-bold leading-[1.2] text-center text-[48px] xs:text-[64px] sm:text-[72px] lg:text-[96px]">
          BİLAL GÜMÜŞ
        </h1>
      </div>
      <div className="absolute bottom-[32px] right-[32px] md:bottom-[48px] md:right-[48px] lg:bottom-[64px] lg:right-[64px]">
        <h1 className="self-end text-right font-inter leading-none text-[#424245] text-[24px] xs:text-[32px] sm:text-[42px] lg:text-[58px]">
          Full Stack Web <br /> Developer
        </h1>
      </div>
    </div>
  );
}

export default Home;
