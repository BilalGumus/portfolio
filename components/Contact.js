function Contact() {
  return (
    <div className="flex h-full relative">
      <div className="h-screen grow flex justify-center items-center">
        <div className="text-center leading-none">
          <h2 className="font-inter text-[48px] xs:text-[64px] font-bold mb-[16px] lg:mb-[32px]">
            Contact
          </h2>
          <h3 className="font-inter text-[18px] xs:text-[24px] font-normal mb-[72px] hover:underline">
            <a
              href="mailto:bilal.gumus@yahoo.com"
              alt="Send mail to Bilal Gümüş"
            >
              bilal.gumus@yahoo.com
            </a>
          </h3>
          <h4 className="flex justify-center gap-[24px] text-[#BBBBBB] font-inter text-[18px] font-normal">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/BilalGumus/"
              alt="Bilal Gümüş GitHub Profile"
              className="underline hover:text-white"
            >
              GitHub
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/bilalgumus/"
              alt="Bilal Gümüş LinkedIn Profile"
              className="underline hover:text-white"
            >
              LinkedIn
            </a>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Contact;
