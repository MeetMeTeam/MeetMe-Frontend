import React from "react";

const BannerAdvert = () => {
  const images = ["ฺBanner1.png", "Banner2.png"];
  const [pic, setPic] = React.useState("Banner2.png");
  const [index, setIndex] = React.useState(0);




  return (
    <div className="max-w-[822px]">
      <div className=" h-fit rounded-2xl relative flex justify-center items-center">
        {/* <img className=' z-40 absolute lg:w-[140px] w-[70px]   lg:left-[-50px] ' src={process.env.PUBLIC_URL + '/logo_banner.svg'} /> */}
        <div
          className="bg-yellow-80 absolute
            py-2 px-8 drop-shadow-lg 
            lg:top-[-30px] top-[-20px] left-[0px]
            font-bold lg:text-[24px] text-[10px] rounded-2xl text-black
            z-40
          "
        >
          News
        </div>

        <img className='rounded-2xl object-contain  left-[-20px] z-20'
          src={process.env.PUBLIC_URL + "Banner1.png"} />

      </div>
    </div>
  );
};

export default BannerAdvert;