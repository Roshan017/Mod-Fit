import React from "react";
import styled from "styled-components";
import logo from "../utils/Images/Logo.png";
import Backgd from "../utils/Images/Background.jpeg";
import SignUp from "../components/SignUp";
import Signin from "../components/Signin";
import "@fontsource/poppins/400.css"; // Regular weight
import "@fontsource/poppins/700.css"; // Bold weight

const Container = styled.div`
  flex: 1;
  height: 100vh;

  display: flex;
  background: ${({ theme }) => theme.bg};
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  color: blue;
  background: blue;
  position: relative;

  @media (max-width: 700px) {
    display: none;
    flex: 1;
  }
  @media (max-width: 960px) {
    flex: 1;
  }
`;

const Right = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  position: absolute;
  width: 100px;

  height: 100px;
  top: 40px;
  left: 60px;
  z-index: 10;

  @media (max-width: 400px) {
    width: 50px;
    height: 50px;
  }
  @media (max-width: 960px) {
    width: 70px;
    height: 70px;
  }
`;

const Image = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Text = styled.div`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
  font-family: "Poppins", sans-serif;

  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const TextButton = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;

const Auth = () => {
  const [login, SetLogin] = React.useState(false);
  return (
    <Container>
      <Left>
        <Logo src={logo} />
        <Image src={Backgd} />
      </Left>
      <Right>
        {!login ? (
          <>
            <Signin />
            <Text>
              Don't have an Account?{" "}
              <TextButton
                onClick={() => {
                  SetLogin(true);
                }}
              >
                Signup
              </TextButton>
            </Text>
          </>
        ) : (
          <>
            <SignUp />
            <Text>
              Have an Account?{" "}
              <TextButton
                onClick={() => {
                  SetLogin(false);
                }}
              >
                SignIn
              </TextButton>
            </Text>
          </>
        )}
      </Right>
    </Container>
  );
};

export default Auth;
