import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
const CategoriesSelect = (props) => {
  const [isShowSelect, setIsShowSelect] = useState(false);
  const categoryiesList = [
    {
      id: 1,
      name: "🤪 Fun ",
      color: "bg-yellow-40",
    },
    {
      id: 2,
      name: "👻 Scare",
      color: "bg-purple-80",
    },
    {
      id: 3,
      name: "💌 Love",
      color: "bg-red-80",
    },
    {
      id: 4,
      name: "🎓 Education",
      color: "bg-gray-70",
    },
    {
      id: 5,
      name: "⚽ Hobbies",
      color: "bg-blue-80",
    },
  ];

  const addOrReplaceCategory = (newCategory) => {
    const categoryIndex = props.selectCategories.findIndex(
      (category) => category.id === newCategory.id
    );

    if (props.selectCategories.length === 3 && categoryIndex === -1) {
      console.log("ไม่สามารถเพิ่มต่อได้ เพราะมี 3 ตัวแล้ว");
      return;
    }

    if (categoryIndex !== -1) {
      const updatedCategories = [...props.selectCategories];
      updatedCategories.splice(categoryIndex, 1);
      props.setSelectCategories(updatedCategories);
    } else {
      props.setSelectCategories((prevCategories) => [
        ...prevCategories,
        newCategory,
      ]);
    }
  };

  const checkIsSelect = (category) => {
    return props.selectCategories.some(
      (selectedCategory) => selectedCategory.id === category.id
    );
  };

  return (
    <div>
      <div className="flex flex-row gap-1">
        <div
          onClick={() => setIsShowSelect(!isShowSelect)}
          className={
            "bg-purple-80 text-[12px] flex items-center cursor-pointer text-white px-2 mt-2 rounded-2xl"
          }
        >
          add
          <AddIcon />
        </div>
        {props.selectCategories.map((category) => (
          <div
            className={`flex items-center text-[12px]  text-white px-2 mt-2 rounded-2xl ${category.color}`}
          >
            {category.name}
          </div>
        ))}
      </div>
      {isShowSelect && (
        <div className="flex flex-wrap gap-2 mt-2 bg-purple-70 rounded-md p-2">
          <div className="flex flex-wrap gap-1">
            {categoryiesList.map((category) => (
              <div
                onClick={() => addOrReplaceCategory(category)}
                className={
                  `${category.color} text-[14px] select-none cursor-pointer relative text-white px-2 pr-3 py-0.5 flex items-center justify-center mt-2 rounded-2xl ` +
                  (checkIsSelect(category) && " ring-[2px] ring-yellow-70")
                }
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesSelect;
