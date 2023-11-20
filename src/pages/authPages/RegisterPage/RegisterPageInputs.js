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
  } = props;

  return (
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
          type="number"
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
            type="text"
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
  );
};

export default RegisterPageInputs;
