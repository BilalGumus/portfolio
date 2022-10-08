import MenuButton from "./MenuButton";

function Experience({ handleOpenMenu }) {
  return (
    <div className="flex h-screen relative pb-[36px] swiper-no-swiping">
      <MenuButton onClick={handleOpenMenu} />
      <div className="grid w-full grid-cols-2 p-[64px]">
        <div className="self-end">
          <h1 className="text-white font-inter text-[64px] font-bold">
            Experience
          </h1>
        </div>
        <div className="self-end divide-y divide-[#4D4D4D] leading-none">
          <div className="py-[54px]">
            <h2 className="text-white font-inter text-[36px] font-bold">
              CE Intern at Univerlist
            </h2>
            <h3 className="text-[#BBBBBB] font-inter text-[36px] font-normal">
              July 2022
            </h3>
            <h2 className="font-ptSerif text-[24px] font-normal leading-normal mt-[32px]">
              A start-up application was developed by working with ReactJS,
              Apollo, GraphQL, TypeORM and PostgreSQL.
            </h2>
            <h2 className="font-ptSerif text-[24px] font-normal leading-normal mt-[32px]">
              Video call was added with PeerJS that includes WebRTC technology.
            </h2>
          </div>
          <div className="pt-[54px]">
            <h2 className="text-white font-inter text-[36px] font-bold">
              CE Intern at Republic of Turkey General Directorate of Highways
            </h2>
            <h3 className="text-[#BBBBBB] font-inter text-[36px] font-normal">
              August 2021
            </h3>
            <h2 className="font-ptSerif text-[24px] font-normal leading-normal mt-[32px]">
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
