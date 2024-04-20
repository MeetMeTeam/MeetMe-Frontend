import React from "react";

export default function AvatarItem(props) {
  return (
    <div className="grid md:grid-cols-3 max-h-[420px] overflow-auto overflow-x-hidden grid-cols-2 gap-4">
      {props.avatarList.map((item, index) => (
        <div
          key={index}
          onClick={() => props.changeAvatarPreview(item)}
          className="flex flex-col items-center"
        >
          <div
            className={
              "p-4 md:w-[150px] w-[150px] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-purple-70 " +
              (item.name ? "bg-purple-80" : "bg-purple-80/30")
            }
          >
            {item.preview ? (
              <img
                src={item.preview}
                className="w-[100px] h-[70px] object-contain"
                alt="block"
              />
            ) : (
              <span className="w-[100px] h-[70px]"></span>
            )}
            <div
              className={
                "font-bold truncate " +
                (item.name ? "text-purple-10" : "text-purple-90")
              }
            >
              {item.name || "."}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
