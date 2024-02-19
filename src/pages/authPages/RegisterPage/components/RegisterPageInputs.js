/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import InputWithLabel from "../../../../shared/components/InputWithLabel";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const RegisterPageInputs = (props) => {
  const {
    mail,
    setMail,
    username,
    setUsername,
    password,
    setPassword,
    displayname,
    setDisplayname,
    rePassword,
    setRePassword,
    day,
    setDay,
    month,
    setMonth,
    year,
    setYear,
    character,
    setCharacter,
  } = props;

  const handleChangeDay = (event) => {
    setDay(event.target.value);
  };
  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const dateDay = Array.from({ length: 31 }, (_, i) => i + 1);
  const dateYear = Array.from({ length: 2023 - 1900 + 1 }, (_, i) => 2023 - i);
  const dateMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 100,
      },
    },
  };
  const characters = [
    {
      src: "PROFILE_1",
    },
    {
      src: "PROFILE_2",
    },
    {
      src: "PROFILE_3",
    },
  ];
  return (
    <div className="flex flex-col">
      <div className="flex md:flex-row flex-col md:space-x-4">
        <div className="md:w-1/2 w-full space-y-4">
          <InputWithLabel
            data="data-email"
            value={mail}
            setValue={setMail}
            label="E-mail address"
            type="text"
            placeholder="Enter e-mail address"
          />
          <InputWithLabel
            data="data-displayname"
            value={displayname}
            setValue={setDisplayname}
            label="Displayname"
            type="text"
            placeholder="Enter a username"
          />
          <div className="pt-2">
            <InputWithLabel
              data="data-password"
              value={password}
              setValue={setPassword}
              label="Password"
              type="password"
              placeholder="*********"
            />
          </div>
        </div>

        <div className="md:w-1/2 w-full space-y-4">
          <InputWithLabel
            data="data-username"
            value={username}
            setValue={setUsername}
            label="Username"
            type="text"
            placeholder="Enter Username"
          />
          <div className=" flex flex-col">
            <div className="font-bold text-[14px] mb-[-5px] text-gray-30">
              BIRTHDAY
            </div>
            <div className="flex flex-row items-center mx-[-6px]">
              <FormControl sx={{ m: 1, width: "100%" }} size="small">
                <InputLabel id="demo-select-small-label" sx={{ color: "#ccc" }}>
                  DD
                </InputLabel>
                <Select
                  sx={{ borderRadius: "10px" }}
                  MenuProps={MenuProps}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={day}
                  label="DD"
                  onChange={handleChangeDay}
                  className="data-birthdate bg-white"
                >
                  {dateDay.map((number) => (
                    <MenuItem value={number}>{number}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className="text-[30px]">/ </div>

              <FormControl sx={{ m: 1, width: "100%" }} size="small">
                <InputLabel id="demo-select-small-label" sx={{ color: "#ccc" }}>
                  MM
                </InputLabel>
                <Select
                  MenuProps={MenuProps}
                  sx={{ borderRadius: "10px" }}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={month}
                  label="MM"
                  onChange={handleChangeMonth}
                  className="data-birthmonth bg-white"
                >
                  {dateMonth.map((number) => (
                    <MenuItem value={number}>{number}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className="text-[30px]">/ </div>

              <FormControl sx={{ m: 1, width: "100%" }} size="small">
                <InputLabel id="demo-select-small-label" sx={{ color: "#ccc" }}>
                  YYYY
                </InputLabel>
                <Select
                  MenuProps={MenuProps}
                  sx={{ borderRadius: "10px" }}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={year}
                  label="YYYY"
                  onChange={handleChangeYear}
                  className="data-birthyear bg-white"
                >
                  {dateYear.map((number) => (
                    <MenuItem value={number}>{number}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <InputWithLabel
            data="data-repassword"
            value={rePassword}
            setValue={setRePassword}
            label="Re-password"
            type="password"
            placeholder="*********"
            password={password}
          />
        </div>
      </div>

      <div className="mb-4 mt-2">
        <div className="text-[#666666] font-bold my-2"> CHARACTER </div>
        <div className="flex md:flex-row items-center flex-col md:space-x-4">
          {characters.map((characters) => (
            <img
              key={characters.src}
              src={"/registerPage/" + characters.src + ".png"}
              className={`transition  hover:scale-125  duration-200 cursor-pointer md:w-[100px] w-[150px] rounded-2xl drop-shadow-md ${
                character === characters.src ? " border-purple-60 border-2" : ""
              } data-character`}
              onClick={() => setCharacter(characters.src)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterPageInputs;
