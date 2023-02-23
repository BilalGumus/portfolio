function Experience() {
  return (
    <div className="flex h-full relative lg:pb-[36px]">
      <div className="flex flex-col justify-end md:grid w-full md:grid-cols-2 p-[32px] md:p-[48px] lg:p-[64px]">
        <div className="md:self-end">
          <h2 className="text-white font-inter font-bold text-[36px] xs:text-[48px] md:text-[56px] mb-[24px] md:mb-0">
            Experience
          </h2>
        </div>
        <div className="md:self-end divide-y divide-[#4D4D4D] leading-none">
          <div className="py-[24px]">
            <h3 className="text-white font-inter font-bold text-[24px] md:text-[32px]">
              CE Intern at Univerlist
            </h3>
            <h4 className="text-[#BBBBBB] font-inter font-normal text-[20px] md:text-[28px]">
              July 2022
            </h4>
            <h4 className="hidden xl:block font-ptSerif text-[20px] font-normal leading-normal mt-[16px]">
              A start-up application was developed by working with ReactJS,
              Apollo, GraphQL, TypeORM and PostgreSQL.
            </h4>
            <h4 className="hidden xl:block font-ptSerif text-[20px] font-normal leading-normal mt-[8px]">
              Video call was added with PeerJS that includes WebRTC technology.
            </h4>
          </div>
          <div className="py-[24px]">
            <h3 className="text-white font-inter font-bold text-[24px] md:text-[32px]">
              CE Intern at Republic of Turkey General Directorate of Highways
            </h3>
            <h4 className="text-[#BBBBBB] font-inter font-normal text-[20px] md:text-[28px]">
              August 2021
            </h4>
            <h4 className="hidden xl:block font-ptSerif text-[20px] font-normal leading-normal mt-[16px]">
              Worked in Ilgaz 15 July Independence Tunnel for monitoring &
              command SCADA system. Created register & login microservice in
              MERN stack with Docker.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Experience;
