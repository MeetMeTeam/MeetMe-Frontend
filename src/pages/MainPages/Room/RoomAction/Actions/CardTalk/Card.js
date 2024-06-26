import React from "react";
import styles from "../../../../../../shared/css/cardFilp.module.css";

export default function Card(props) {
  const divStyle = {
    backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/card_talk%2F3.png?alt=media&token=c985f9ca-825f-4162-8d51-80603922ab8a")`,
    backgroundSize: "cover",
  };

  return (
    <div className="">
      <div className={styles.flipCard + props.widthCustom}>
        <div className={styles.flipCardInner}>
          <div
            style={divStyle}
            className={
              styles.flipCardFront + " flex w-full flex-col items-start pl-6"
            }
          >
            <div className="text-white font-bold text-[40px] mt-6">
              CARD TALK
            </div>
            <div className="font-bold text-[#403D44] text-[40px] mt-[-20px]">
              {props.cardType}
              GENERAL
            </div>
          </div>
          <div
            className={
              styles.flipCardBack +
              "  bg-white rounded-2xl border-[10px] border-[#55C2BC] text-black"
            }
          >
            <p className="mt-6 text-[20px] font-bold">Question</p>
            <p className="text-[#403D44] font-bold">{props.cardSender}</p>
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                wordWrap: "anywhere",
              }}
              className="text-center h-full flex items-center justify-center px-2 mt-[-40px]"
            >
              {props.cardText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
