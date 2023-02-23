function Home() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute top-[32px] left-[32px]">
        <h1 className="font-inter leading-none">PORTFOLIO ©2023</h1>
      </div>
      <div className="relative h-screen flex flex-col gap-8 justify-center items-center p-[32px] md:p-[48px] lg:p-[64px]">
        <h1 className="font-inter mb-24 font-bold leading-[1.2] text-center text-[48px] xs:text-[64px]">
          BİLAL GÜMÜŞ
        </h1>
        <div className="gradient absolute"></div>
      </div>
      <div className="absolute bottom-[32px] right-[32px]">
        <h2 className="self-end text-right font-inter leading-none text-[#424245] text-[32px]">
          Frontend Web <br /> Developer
        </h2>
      </div>
    </div>
  );
}

export default Home;
