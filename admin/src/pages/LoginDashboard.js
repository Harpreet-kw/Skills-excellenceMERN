import React, { useState } from "react";
import LoginRegisterForm from "../Components/LoginRegisterForm";
import LoginWrapper from "./V2/LoginWrapper";

function LoginSignup(props) {
  const { dispatch } = props;
  const [value, setValue] = useState("login");


  const formData = () => {
    return (
      <LoginWrapper setValue={setValue} value={value}>
        <LoginRegisterForm
          dispatch={dispatch}
          value={value}
          setValue={setValue}
        />
      </LoginWrapper>

    );
  };
  const renderComponents = () => {
    if (value === "login") {
      return formData();
    } else {
      return formData();
    }
  };

  return (
    <div className="">
      <div className="mx-auto ">{renderComponents()}</div>
    </div>
  );
}

export default LoginSignup;
