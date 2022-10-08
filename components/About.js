import MenuButton from "./MenuButton";

function About({ handleOpenMenu }) {
  return (
    <div className="flex h-screen relative pb-[36px] swiper-no-swiping">
      <MenuButton onClick={handleOpenMenu} />
      <div className="flex flex-col justify-end h-full p-[64px]">
        <h1 className="text-white font-inter text-[64px] font-bold">About</h1>
        <h2 className="font-ptSerif text-[36px] font-normal">
          Passionate Computer Engineer student who highly self-motivated to
          create applications & possesses fulfilling assigned tasks on time and
          illustrates the true meaning of teamwork.
        </h2>
      </div>
    </div>
  );
}

export default About;
