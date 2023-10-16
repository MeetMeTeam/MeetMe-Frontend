import React from "react";

const BannerAdvert = () => {
  return (
    <div>
        <div className="bg-yellow-90 h-[150px] rounded-2xl relative flex justify-center items-center">
        <img className='absolute w-[140px] top-[-60px] left-[-20px] z-20' src={process.env.PUBLIC_URL + '/logo_banner.svg'} />
        <div 
        className="bg-yellow-80 absolute
         py-2 px-8 drop-shadow-lg left-[85px]
         top-[-20px]
         font-bold text-[24px] rounded-2xl text-black
         "
         >
          News
          </div>

          <div className="font-bold text-[20px] drop-shadow-md text-purple-80">
            Coming Soon..
          </div>
        </div>
    </div>
  );
};

export default BannerAdvert;
