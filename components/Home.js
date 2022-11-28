function Home() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute top-[32px] right-[32px] md:top-[48px] md:right-[48px] lg:top-[64px] lg:right-[64px]">
        <h1 className="font-inter leading-none">PORTFOLIO ©2022</h1>
      </div>
      <div className="h-screen flex flex-col gap-8 justify-center items-center p-[32px] md:p-[48px] lg:p-[64px]">
        <h1 className="font-inter font-bold leading-[1.2] text-center text-[48px] xs:text-[64px] sm:text-[72px] md:text-[96px] lg:text-[128px]">
          BİLAL GÜMÜŞ
        </h1>
        <a href="mailto:bilal.gumus@yahoo.com" alt="Send mail to Bilal Gümüş">
          <button className="button">Request CV</button>
        </a>
      </div>
      <div className="absolute bottom-[32px] right-[32px] md:bottom-[48px] md:right-[48px] lg:bottom-[64px] lg:right-[64px]">
        <h1 className="self-end text-right font-inter leading-none text-[#424245] text-[24px] xs:text-[48px] sm:text-[64px]">
          Full Stack Web <br /> Developer
        </h1>
      </div>
    </div>
  );
}

export default Home;
