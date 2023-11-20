/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import InputWithLabel from "../../../shared/components/InputWithLabel";

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
    setCharacter
  } = props;

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
      <div className="flex space-x-4">
          <div className="w-1/2 space-y-4">
        <InputWithLabel
          value={mail}
          setValue={setMail}
          label="E-mail address"
          type="text"
          placeholder="Enter e-mail address"
        />
        <InputWithLabel
          value={displayname}
          setValue={setDisplayname}
          label="Displayname"
          type="text"
          placeholder="Enter a username"
        />
        <InputWithLabel
          value={password}
          setValue={setPassword}
          label="Password"
          type="password"
          placeholder="*********"
        />
      </div>
      <div className="w-1/2 space-y-4">
        <InputWithLabel
          value={username}
          setValue={setUsername}
          label="Username"
          type="text"
          placeholder="Enter Username"
        />
        <div className="flex flex-row items-center">
          <InputWithLabel
            value={day}
            setValue={setDay}
            label="Date of birth"
            type="number"
            placeholder="DD"
            width="100%"
          />
          <div className="text-[30px] pt-[20px]">/ </div>

          <InputWithLabel
            value={month}
            setValue={setMonth}
            label=" ⠀⠀"
            type="number"
            placeholder="MM"
            width="100%"
          />
          <div className="text-[30px] pt-[20px]">/ </div>

          <InputWithLabel
            value={year}
            setValue={setYear}
            label=" ⠀⠀"
            type="number"
            placeholder="YYYY"
            width="100%"
          />
        </div>

        <InputWithLabel
          value={rePassword}
          setValue={setRePassword}
          label="Re-password"
          type="password"
          placeholder="*********"
        />
      </div>
      </div>
    
      <div className="mb-4">
        <div className="text-[#666666] font-bold my-2"> CHARACTER </div>
        <div className="flex space-x-4">
        {characters.map((characters) => (
          <img
            key={characters.src}
            src={"/RegisterPage/" + characters.src +".png"}
            class={`transition  hover:scale-125  duration-200 cursor-pointer w-[100px] rounded-2xl drop-shadow-md ${character === characters.src ? " border-purple-60 border-2": ""}`}
            onClick={()=>setCharacter(characters.src)}
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterPageInputs;
