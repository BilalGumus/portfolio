import MenuButton from "./MenuButton";

function About({ handleOpenMenu }) {
  return (
    <div className="flex h-full relative pb-[36px]">
      <MenuButton onClick={handleOpenMenu} />
      <div className="flex flex-col justify-end h-full p-[32px] md:p-[48px] lg:p-[64px]">
        <h1 className="text-white font-inter text-[36px] xs:text-[48px] md:text-[64px] font-bold">
          About me
        </h1>
        <h2 className="font-ptSerif text-[18px] xs:text-[24px] md:text-[32px] lg:text-[36px] font-normal">
          Passionate Computer Engineer student who highly self-motivated to
          create applications & possesses fulfilling assigned tasks on time and
          illustrates the true meaning of teamwork.
        </h2>
      </div>
    </div>
  );
}

export default About;
