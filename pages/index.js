import "swiper/css";
import "swiper/css/pagination";
import Head from "next/head";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper";
import Menu from "../components/Menu";
import Home from "../components/Home";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Contact from "../components/Contact";
import MenuButton from "../components/MenuButton";

export default function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <div>
      <Head>
        <title>Bilal Gümüş - Personal Website - Portfolio, Resume & More</title>
        <meta
          name="description"
          content="Discover the portfolio, resume, and web development services of Bilal Gümüş, a talented and experienced web developer. Explore his work and get in touch today."
        />
        <meta name="author" content="Bilal Gümüş" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="keywords" content="Personal website,Bilal Gümüş, Portfolio, Resume, Web development" />
        <meta name="language" content="English" />
        <meta name="distribution" content="web" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-navbutton-color" content="#000000" />
        <meta property="og:title" content="Bilal Gümüş - Personal Website - Portfolio, Resume & More" />
        <meta property="og:description" content="Discover the portfolio, resume, and web development services of Bilal Gümüş, a talented and experienced web developer. Explore his work and get in touch today." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bilalgumus.me/" />
        <meta property="og:site_name" content="Bilal Gümüş - Personal Website - Portfolio, Resume & More" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://bilalgumus.me/"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MenuButton onClick={handleOpenMenu} theme="dark" />
      {openMenu && (
        <Menu
          handleCloseMenu={handleCloseMenu}
          swiperInstance={swiperInstance}
        />
      )}
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        onSwiper={setSwiperInstance}
        speed={600}
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        modules={[Mousewheel, Pagination]}
        className="w-screen h-screen"
      >
        <SwiperSlide>
          <Home handleOpenMenu={handleOpenMenu} />
        </SwiperSlide>
        <SwiperSlide>
          <About handleOpenMenu={handleOpenMenu} />
        </SwiperSlide>
        <SwiperSlide>
          <Skills handleOpenMenu={handleOpenMenu} />
        </SwiperSlide>
        <SwiperSlide>
          <Experience handleOpenMenu={handleOpenMenu} />
        </SwiperSlide>
        <SwiperSlide>
          <Education handleOpenMenu={handleOpenMenu} />
        </SwiperSlide>
        <SwiperSlide>
          <Contact handleOpenMenu={handleOpenMenu} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
