function Experience() {
  return (
    <div className="flex h-full relative lg:pb-[36px]">
      <div className="flex flex-col justify-end md:grid w-full md:grid-cols-2 p-[32px] md:p-[48px] lg:p-[64px]">
        <div className="md:self-end">
          <h1 className="text-white font-inter font-bold text-[32px] md:text-[48px] lg:text-[64px] mb-[24px] md:mb-0">
            Experience
          </h1>
        </div>
        <div className="md:self-end divide-y divide-[#4D4D4D] leading-none">
          <div className="py-[24px] md:py-[54px]">
            <h2 className="text-white font-inter font-bold text-[24px] md:text-[36px]">
              CE Intern at Univerlist
            </h2>
            <h3 className="text-[#BBBBBB] font-inter font-normal text-[24px] md:text-[36px]">
              July 2022
            </h3>
            <h2 className="hidden xl:block font-ptSerif text-[24px] font-normal leading-normal mt-[32px]">
              A start-up application was developed by working with ReactJS,
              Apollo, GraphQL, TypeORM and PostgreSQL.
            </h2>
            <h2 className="hidden xl:block font-ptSerif text-[24px] font-normal leading-normal mt-[32px]">
              Video call was added with PeerJS that includes WebRTC technology.
            </h2>
          </div>
          <div className="pt-[24px] md:pt-[54px]">
            <h2 className="text-white font-inter font-bold text-[24px] md:text-[36px]">
              CE Intern at Republic of Turkey General Directorate of Highways
            </h2>
            <h3 className="text-[#BBBBBB] font-inter font-normal text-[24px] md:text-[36px]">
              August 2021
            </h3>
            <h2 className="hidden xl:block font-ptSerif text-[24px] font-normal leading-normal mt-[32px]">
              Worked in Ilgaz 15 July Independence Tunnel for monitoring &
              command SCADA system. Created register & login microservice in
              MERN stack with Docker.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Experience;
