function Education() {
  return (
    <div className="flex h-full relative lg:pb-[36px]">
      <div className="flex flex-col justify-end md:grid w-full md:grid-cols-2 p-[32px] md:p-[48px] lg:p-[64px]">
        <div className="md:self-end">
          <h2 className="text-white font-inter font-bold text-[36px] xs:text-[48px] md:text-[56px] mb-[24px] md:mb-0">
            Education
          </h2>
        </div>
        <div className="md:self-end divide-y divide-[#4D4D4D] leading-none">
          <div className="pt-[24px] md:pt-[54px]">
            <h3 className="text-white font-inter font-bold text-[24px] md:text-[32px]">
              University of Selcuk, Computer Engineering
            </h3>
            <h4 className="text-[#BBBBBB] font-inter font-normal text-[20px] md:text-[28px]">
              2019-2023
            </h4>
            <h4 className="font-ptSerif text-[18px] md:text-[24px] font-normal leading-normal mt-[32px]">
              CGPA 3.75/4.00
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
