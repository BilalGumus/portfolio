import "swiper/css";
import "swiper/css/pagination";
import Head from "next/head";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper";
import Menu from "../components/Menu";
import Home from "../components/Home";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Contact from "../components/Contact";

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
        <title>Bilal Gümüş | Personal Website</title>
        <meta
          name="description"
          content="I am Bilal Gümüş and this is my personal website: Passionate Computer Engineer student who highly self-motivated to
          create applications & ReactJS lover!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {openMenu && (
        <Menu
          handleCloseMenu={handleCloseMenu}
          swiperInstance={swiperInstance}
        />
      )}
      <Swiper
        onSwiper={setSwiperInstance}
        speed={600}
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        modules={[Mousewheel]}
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
