function Education() {
  return (
    <div className="flex h-full relative lg:pb-[36px]">
      <div className="flex flex-col justify-end md:grid w-full md:grid-cols-2 p-[32px] md:p-[48px] lg:p-[64px]">
        <div className="md:self-end">
          <h1 className="text-white font-inter font-bold text-[32px] md:text-[48px] lg:text-[64px] mb-[24px] md:mb-0">
            Education
          </h1>
        </div>
        <div className="md:self-end divide-y divide-[#4D4D4D] leading-none">
          <div className="pt-[24px] md:pt-[54px]">
            <h2 className="text-white font-inter font-bold text-[24px] md:text-[36px]">
              University of Selcuk, Computer Engineering
            </h2>
            <h3 className="text-[#BBBBBB] font-inter font-normal text-[24px] md:text-[36px]">
              2019-2023
            </h3>
            <h2 className="font-ptSerif text-[18px] md:text-[24px] font-normal leading-normal mt-[32px]">
              CGPA 3.72/4.00
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
