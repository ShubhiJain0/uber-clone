import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimationWrapper from "../components/AnimationWrapper";
import { FaArrowRight } from "react-icons/fa";

const Start = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [Img, setImg] = useState(
    windowSize < 560
      ? "https://wallpapers.com/images/hd/aesthetic-retro-road-trip-vibe-uf5i4ola8eiungbw.jpg"
      : "https://wallpapercave.com/wp/wp2323010.jpg"
  );

  const imgArr = [
    "https://wallpapers.com/images/hd/aesthetic-retro-road-trip-vibe-uf5i4ola8eiungbw.jpg",
    "https://images.pexels.com/photos/1563256/pexels-photo-1563256.jpeg?cs=srgb&dl=pexels-ricardo-esquivel-1563256.jpg&fm=jpg",
    "https://i.pinimg.com/originals/06/89/d0/0689d035ee7884d041c9a87256f0fd56.jpg",
    "https://w0.peakpx.com/wallpaper/75/972/HD-wallpaper-city-road-cars-buildings-architecture.jpg",
    "https://c1.wallpaperflare.com/preview/958/541/227/city-cityscape-street-steep-street.jpg",
  ];

  const imgArr2 = [
    "https://wallpapercave.com/wp/wp2323010.jpg",
    "https://wallpapercave.com/wp/wp2323029.jpg",
    "https://images.wallpaperscraft.com/image/single/city_road_street_193051_1920x1080.jpg",
    "https://images.wallpaperscraft.com/image/single/night_city_road_lights_164297_1920x1080.jpg",
    "https://wallpapercave.com/wp/wp8139816.jpg",
  ];

  // Update image based on windowSize
  useEffect(() => {
    const currentImgArr = windowSize <= 550 ? imgArr : imgArr2;
    const idx = Math.floor(Math.random() * currentImgArr.length);
    setImg(currentImgArr[idx]);
  }, [windowSize]);

  // Image rotation interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentImgArr = windowSize <= 550 ? imgArr : imgArr2;
      const idx = Math.floor(Math.random() * currentImgArr.length);

      setImg(currentImgArr[idx]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [windowSize]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
      console.log(windowSize);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  return windowSize < 550 ? (
    <motion.div
      className="h-screen w-screen flex justify-between flex-col pt-5 bg-cover relative"
      style={{
        backgroundImage: `url(${Img})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
      }}
      animate={{
        backgroundPositionX: ["0%", "20%", "40%", "60%", "50%", "60%"], // Animating X-axis
        backgroundSize: ["140%", "145%", "150%", "155%", "160%", "170%"],
      }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Black overlay with opacity */}
      <div
        className="absolute inset-0 bg-black opacity-45"
        style={{ zIndex: 1 }} // Ensure this div is behind the content
      ></div>

      <AnimationWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <div>
          <img
            className="my-5 w-[120px] ml-5 z-[2]"
            src="https://www.freepnglogos.com/uploads/uber-logo-transparent-3.png"
            alt="Uber Logo"
          />
        </div>
      </AnimationWrapper>

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 2 }}
        className="bg-white px-4 font-bold pt-4 pb-12 z-[2]"
      >
        <h2 className="text-3xl my-4">Get started with Uber</h2>

        <Link
          to={"/user-login"}
          className=" bg-[#111] px-4 py-2 text-white font-semibold rounded-lg text-center flex justify-center gap-4 items-center"
        >
          Continue
          <FaArrowRight />
        </Link>
      </motion.div>
    </motion.div>
  ) : (
    <motion.div
      className="h-screen w-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${Img})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      animate={{
        backgroundPositionX: ["0%", "20%", "40%", "60%", "50%", "60%"], // Animating X-axis
        backgroundSize: [
          "140%",
          "145%",
          "150%",
          "155%",
          "160%",
          "170%",
          "180%",
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="absolute inset-0 bg-black opacity-35"
        style={{ zIndex: 1 }} // Ensure this div is behind the content
      ></div>

      <AnimationWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <div>
          <img
            className="absolute my-5 w-[120px] ml-5 z-[2] top-3 left-0"
            src="https://www.freepnglogos.com/uploads/uber-logo-transparent-3.png"
            alt="Uber Logo"
          />
        </div>
      </AnimationWrapper>

      <motion.div
        className="w-[30rem] h-[15rem] bg-white rounded-3xl shadow-xl flex flex-col justify-center p-4 z-[2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <h1 className="text-3xl font-medium text-center my-4">
          Get started with Uber
        </h1>
        <Link
          to={"/user-login"}
          className=" bg-[#111] px-4 py-2 text-white font-semibold rounded-lg text-center flex justify-center gap-4 items-center"
        >
          Continue
          <FaArrowRight />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Start;
