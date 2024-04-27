import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import MainPageButton from "./SideBar/MainPageButton";
import { connect } from "react-redux";
import ActiveRoomButton from "./SideBar/ActiveRoomButton";
import SafetyDividerIcon from "@mui/icons-material/SafetyDivider";
import styles from "../../shared/css/mainPage.module.css";
import Loading from "../../shared/components/Loading";
import scollBarRoom from "../../shared/css/scollBarRoom.module.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { categoryiesList } from "../../shared/utils/categories";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
const SideBar = ({ isUserInRoom }) => {
  const activeRooms = useSelector((state) => state.room.activeRooms);

  const [isShowLoading, setIsisShowLoading] = useState(true);
  const [isShowCate, setIsShowCate] = useState(false);
  const [search, setSearch] = useState("");
  const [activeRoomsFilter, setActiveRoomsFilter] = useState([]);
  const [selectCategories, setSelectCategories] = useState([]);
  const [checkDefault, setCheckDefault] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsisShowLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    filter();
  }, [activeRooms]);
  useEffect(() => {
    filter();
  }, [search]);
  useEffect(() => {
    filter();
  }, [checkDefault]);

  useEffect(() => {
    filter();
  }, [selectCategories]);

  function filter() {
    let room = [...activeRooms];
    room = room.filter((item) => {
      return item.roomCreator.roomName
        .toLowerCase()
        .includes(search.toLowerCase());
    });

    if (selectCategories.length > 0) {
      room = room.filter((item) => {
        return item.roomCreator.detail.cate.some((category) => {
          return selectCategories.some((selectedCategory) => {
            return selectedCategory.id === category.id;
          });
        });
      });
    }

    if (!checkDefault) {
      room = room.filter((item) => {
        return item.participants[0].userId !== "default";
      });
    }
    setActiveRoomsFilter(room);
  }

  const addOrReplaceCategory = (newCategory) => {
    const categoryIndex = selectCategories.findIndex(
      (category) => category.id === newCategory.id
    );

    if (selectCategories.length === 3 && categoryIndex === -1) {
      return;
    }

    if (categoryIndex !== -1) {
      const updatedCategories = [...selectCategories];
      updatedCategories.splice(categoryIndex, 1);
      setSelectCategories(updatedCategories);
    } else {
      setSelectCategories((prevCategories) => [...prevCategories, newCategory]);
    }
  };
  const checkIsSelect = (category) => {
    return selectCategories.some(
      (selectedCategory) => selectedCategory.id === category.id
    );
  };
  return (
    <div className={scollBarRoom.scrollbar + " w-full"}>
      <div
        className={`bg-purple-60 h-[700px] md:w-[700px]  rounded-2xl px-4 pb-4  ${
          activeRooms.length === 0 ? " justify-between " : " justify-start "
        } flex flex-col  ${styles.container}`}
      >
        <div className="flex items-center">
          <div className={`text-white text-[32px] ml-4 font-bold pt-5 `}>
            Room{" "}
          </div>
        </div>
        <div className="ml-4 flex space-x-2  mb-2 py-3 text-white">
          <FilterAltIcon style={{ color: "white" }} />
          <div className="w-[200px] ml-4 flex py-0.5 px-2 bg-white rounded-lg">
            <SearchIcon style={{ color: "#985BD7" }} />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search..."
              className="w-[145px]  ml-2 text-[14px] text-purple-60 focus:ring-0 outline-none	"
            />
          </div>
          <div className="relative">
            <div
              onClick={() => setIsShowCate(!isShowCate)}
              className="bg-white h-full select-none cursor-pointer flex items-center gap-2 text-[12px] text-purple-60 justify-between rounded-lg px-3 w-[150px]"
            >
              categories
              {isShowCate ? (
                <CloseIcon style={{ fontSize: 15 }} />
              ) : (
                <ArrowDropDownIcon style={{ fontSize: 15 }} />
              )}
            </div>
            {isShowCate && (
              <div className="absolute z-10 top-[35px] rounded-md left-[0px]  bg-white w-[350px]">
                <div className="flex flex-wrap gap-2 bg-purple-70/60 drop-shadow-lg rounded-md p-4">
                  <div className="flex flex-wrap gap-1">
                    {categoryiesList.map((category) => (
                      <div
                        onClick={() => addOrReplaceCategory(category)}
                        className={
                          `${category.color} border text-[12px] select-none cursor-pointer relative text-white px-2 pr-3 py-0.5 flex items-center justify-center mt-2 rounded-2xl ` +
                          (checkIsSelect(category) && " ring-[2px] ring-black")
                        }
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            onClick={() => setCheckDefault(!checkDefault)}
            className="cursor-pointer select-none flex items-center gap-2 text-white"
          >
            default room :
            <div className="border rounded-md flex justify-center items-center w-[20px] h-[20px]">
              {checkDefault && <CheckIcon sx={{ fontSize: 15 }} />}
            </div>
          </div>
        </div>
        <div
          className={`${
            activeRoomsFilter.length === 0
              ? ""
              : " h-[650px] space-y-4 overflow-y-auto px-2  "
          }`}
        >
          {activeRooms &&
            activeRoomsFilter.map((room) => (
              <ActiveRoomButton
                roomId={room?.roomId}
                creatorUsername={room?.roomCreator.detail.userNameCreate}
                amountOfParticipants={
                  room?.participants[0]?.userId === "default" &&
                  room?.participants?.length === 1
                    ? 0
                    : room?.participants[0]?.userId === "default"
                    ? room?.participants?.length - 1
                    : room?.participants?.length
                }
                key={room?.roomId}
                isUserInRoom={isUserInRoom}
                roomName={room?.roomCreator?.roomName}
                type={room?.roomCreator?.type}
                data={room}
                theme={room?.roomCreator.detail.theme}
              />
            ))}
        </div>

        {activeRoomsFilter.length === 0 && (
          <div
            className={`w-full flex justify-center items-center h-full flex-col`}
          >
            {isShowLoading && <Loading />}
            {!isShowLoading && (
              <div className="w-full flex justify-center items-center h-full flex-col">
                <SafetyDividerIcon
                  className="text-white"
                  sx={{ fontSize: "43px" }}
                />
                <div className="text-white">
                  No room active now, create room to invite friends!
                </div>
              </div>
            )}
          </div>
        )}
        <div />
      </div>{" "}
    </div>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(SideBar);
