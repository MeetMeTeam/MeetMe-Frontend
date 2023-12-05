import React from "react";

const BannerAdvert = () => {
   // ประกาศตัวแปร array สำหรับเก็บชื่อรูป
   const images = ["ฺBanner.png", "ฺBanner-test.png"];
   const [pic, setPic] = React.useState("Banner.png");

   let index = 0;
 
   const changeImage = () => {
     index = (index + 1) % images.length;
    
   };
 
   setInterval(changeImage, 2000);
  return (
    <div className="max-w-[822px]">
        <div className=" h-fit rounded-2xl relative flex justify-center items-center">
        <img className=' z-40 absolute lg:w-[140px] w-[70px] lg:top-[-100px]  lg:left-[-50px] top-[-40px] left-[-30px]' src={process.env.PUBLIC_URL + '/logo_banner.svg'} />
        <div 
        className="bg-yellow-80 absolute
         py-2 px-8 drop-shadow-lg lg:left-[55px]
         lg:top-[-30px] top-[-20px] left-[25px]
         font-bold lg:text-[24px] text-[10px] rounded-2xl text-black
         z-40
         "
         >
          News
          </div>

          <img className='rounded-2xl object-contain top-[-60px] left-[-20px] z-20' 
          src={process.env.PUBLIC_URL + '/Banner-test.png'} />

        </div>
    </div>
  );
};

export default BannerAdvert;
