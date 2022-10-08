import MenuButton from "./MenuButton";

function Contact({ handleOpenMenu }) {
  return (
    <div className="flex relative swiper-no-swiping">
      <div className="hidden lg:block w-[33vw] bg-contact bg-no-repeat bg-cover bg-center" />
      <MenuButton onClick={handleOpenMenu} theme="dark" />
      <div className="h-screen grow flex justify-center items-center">
        <div className="text-center leading-none">
          <h1 className="font-inter text-[144px] font-bold mb-[64px]">
            Contact
          </h1>
          <h2 className="font-inter text-[36px] font-normal mb-[32px]">
            <a
              href="mailto:bilal.gumus@yahoo.com"
              alt="Send mail to Bilal Gümüş"
            >
              bilal.gumus@yahoo.com
            </a>
          </h2>
          <h6 className="flex justify-center gap-[24px] text-[#BBBBBB] font-inter text-[36px] font-normal">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/BilalGumus/"
              alt="Bilal Gümüş GitHub Profile"
              className="underline"
            >
              GitHub
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/bilalgumus/"
              alt="Bilal Gümüş LinkedIn Profile"
              className="underline"
            >
              LinkedIn
            </a>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Contact;
