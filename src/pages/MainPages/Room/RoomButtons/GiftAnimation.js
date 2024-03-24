import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../../../lotties/rose.json";
import animationDataLover from "../../../../lotties/love.json";
import animationDataBox from "../../../../lotties/gift.json";
import animationDataCandy1 from "../../../../lotties/candy1.json";
import animationDataCandy2 from "../../../../lotties/candy2.json";
import styles from "../../../../shared/css/animationBounce.module.css";

import { useSelector } from "react-redux";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const defaultOptionsLover = {
  loop: true,
  autoplay: true,
  animationData: animationDataLover,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptionsBOx = {
  loop: false,
  autoplay: true,
  animationData: animationDataBox,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptionsCandy1 = {
  loop: true,
  autoplay: true,
  animationData: animationDataCandy1,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const defaultOptionsCandy2 = {
  loop: true,
  autoplay: true,
  animationData: animationDataCandy2,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export default function GiftAnimation(props) {
  let otherGift = useSelector((state) => state.alert.otherSendGift);
  const [isShowAnimation, setIsShowAnimation] = useState(false);
  const [isNewJoin, setIsNewJoin] = React.useState(true);

  useEffect(() => {
    if (!isNewJoin) {
      showAnimation();
    }
    setIsNewJoin(false);
  }, [otherGift]);

  function showAnimation() {
    if (otherGift?.selectUser.id === props.id) {
      setIsShowAnimation(true);
      setTimeout(() => {
        setIsShowAnimation(false);
      }, 13000);
    }
  }

  return (
    <div>
      {isShowAnimation && (
        <div>
          {otherGift?.selectUser.id === props.id && (
            <div>
              {otherGift?.selectGift._id === "65fef0dd8ebc3b328d47e8ca" && (
                <div className="absolute top-0 left-0 z-[1000000]">
                  <Lottie options={defaultOptions} height={400} width={400} />
                </div>
              )}

              {otherGift?.selectGift._id === "65fef0fd8ebc3b328d47e8cb" && (
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                z-[1000000]"
                >
                  <Lottie
                    options={defaultOptionsLover}
                    height={400}
                    width={400}
                  />
                </div>
              )}
              {otherGift?.selectGift._id === "65feeb4fe6229fbdf2cbc242" && (
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                z-[1000000]"
                >
                  <Lottie
                    options={defaultOptionsBOx}
                    height={200}
                    width={200}
                  />
                </div>
              )}

              {otherGift?.selectGift._id === "65fef12a8ebc3b328d47e8cc" && (
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                z-[1000000] flex flex-col"
                >
                  <div className={styles.imgBounce}>
                    <Lottie
                      options={defaultOptionsCandy1}
                      height={400}
                      width={400}
                    />
                  </div>

                  <Lottie
                    options={defaultOptionsCandy2}
                    height={200}
                    width={200}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
