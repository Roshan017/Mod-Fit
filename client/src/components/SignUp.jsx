import React from "react";
import styled from "styled-components";
import TextInput from "../components/TextInput";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginSuccess } from "../redux/reducer/userSlice";
import { UserReg } from "../api/index";

import "@fontsource/poppins/400.css"; // Regular weight
import "@fontsource/poppins/700.css"; // Bold weight

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

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handelSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      await UserReg({ name, email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          alert("Account Created Success");
          setLoading(false);
          setButtonDisabled(false);
        })
        .catch((err) => {
          alert(err.response.data.message);
          setLoading(false);
          setButtonDisabled(false);
        });
    }
  };
  return (
    <Container>
      <div>
        <Title>Welcome To ModFit👋</Title>
        <Span>Please Enter your details here </Span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextInput
          label="Username"
          placeholder="Enter your Username"
          value={name}
          handelChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your Email address"
          value={email}
          handelChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextInput
          password
          label="Password"
          placeholder="Enter your Password"
          value={password}
          handelChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          text="SignUp"
          onClick={handelSignUp}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignUp;
