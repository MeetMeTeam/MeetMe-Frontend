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
    <div>
        <div className="bg-yellow-90 h-[150px] rounded-2xl relative flex justify-center items-center">
        <img className=' z-40 absolute w-[140px] top-[-60px] left-[-20px] z-20' src={process.env.PUBLIC_URL + '/logo_banner.svg'} />
        <div 
        className="bg-yellow-80 absolute
         py-2 px-8 drop-shadow-lg left-[85px]
         top-[-20px]
         font-bold text-[24px] rounded-2xl text-black
         z-40
         "
         >
          News
          </div>

          <img className=' h-[150px]  rounded-2xl z-0  top-[-60px] left-[-20px] z-20' 
          src={process.env.PUBLIC_URL + '/banner-test.png'} />

        </div>
    </div>
  );
};

export default BannerAdvert;
