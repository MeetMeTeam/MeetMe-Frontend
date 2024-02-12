import React from "react";
import InputWithLabel from "../../../shared/components/InputWithLabel";

const ResetPasswordInputs = ({ mail, setMail}) => {

    return (
        <>
            <InputWithLabel
                value={mail}
                setValue={setMail}
                label="Enter Your Email"
                type="text"
                placeholder="example@gmail.com"
            />
            
        </>

    );
};

export default ResetPasswordInputs;
