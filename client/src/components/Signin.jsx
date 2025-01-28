import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../components/TextInput";
import Button from "./Button";
import "@fontsource/poppins/400.css"; // Regular weight
import "@fontsource/poppins/700.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducer/userSlice";

import { UserLogin } from "../api/index";
const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  font-family: "Poppins", sans-serif;

  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  font-family: "Poppins", sans-serif;

  color: ${({ theme }) => theme.text_secondary};
`;

const Signin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handelSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      await UserLogin({ email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          //navigate("/dashboard");
          alert("Login Success");
          setLoading(false);
          setButtonDisabled(false);
        })
        .catch((err) => {
          const errorMessage = err.response?.data?.message;
          alert(errorMessage);
          console.log(errorMessage);
          setLoading(false);
          setButtonDisabled(false);
        });
    }
  };
  return (
    <Container>
      <div>
        <Title>Welcome To ModFit👋</Title>
        <Span>Please Login with your details here </Span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextInput
          label="Email Address"
          placeholder="Enter your Email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          password
          label="Password"
          placeholder="Enter your Password"
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text="SignIn"
          onClick={handelSignIn}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default Signin;
