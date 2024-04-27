import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

import { categoryiesList } from "../../../../shared/utils/categories";

const CategoriesSelect = (props) => {
  const [isShowSelect, setIsShowSelect] = useState(false);

  const addOrReplaceCategory = (newCategory) => {
    const categoryIndex = props.selectCategories.findIndex(
      (category) => category.id === newCategory.id
    );

    if (props.selectCategories.length === 3 && categoryIndex === -1) {
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
            "bg-purple-80 text-[12px] flex items-center cursor-pointer text-white px-2 p-1 mt-2 rounded-2xl"
          }
        >
          <AddIcon fontSize="small" />
          ADD
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
