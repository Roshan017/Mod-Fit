import React from "react";
import styled from "styled-components";
import { Link as LinkR, NavLink } from "react-router-dom";
import logo from "../utils/Images/Logo.png";
import "@fontsource/poppins/400.css"; // Regular weight
import "@fontsource/poppins/700.css";
import { MenuRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducer/userSlice";
const Nav = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-contents: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 0;
  color: white;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
`;
const NavCont = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-family: "poppins", sans-serif;
`;
const NavLogo = styled(LinkR)`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    padding; 0 6px;
    font-weight:600;
    font-size: 18px;
    text-decoration: none;
    color: ${({ theme }) => theme.black}

`;

const Mobileicon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;
const Logo = styled.img`
  height: 42px;
  background-color: black;
  padding: 10px;
  border-radius: 50%;
`;
const NavItems = styled.ul`
    width: 100%;
    dsipaly: flex;
    flex-direction: colunm;

    align-items: center;
    justify-contents: center;
    gap: 32px;
    padding: 0 6px
    list-style: none
    font-family: "poppins", sans-serif;
    @media screen and (max-width: 768px){
        display: none;
    }
    
`;
const NavLinks = styled(NavLink)`
  margin-right: 20px;
  align-items: center;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  text-decoration: none;
  cursor: pointer;
  transition: all 1s slide-in;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  }
`;
const UserCont = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  align-items: center;
  padding: 0 6px;
  color: ${({ theme }) => theme.primary};
`;
const TextButton = styled.div`
  text-align: end;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: 600;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  font-weight: 600;
  padding: 0 6px;
  list-style: none;
  width: 90%;
  color: white;
  background: ${({ theme }) => theme.black};
  position: absolute;
  top: 80px;
  left: 0;
  padding: 10px;
  transition: all 0.6s ease-in-out;

  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-10)")};

  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;
const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [isOpen, SetOpen] = React.useState(false);
  return (
    <Nav>
      <NavCont>
        <Mobileicon onClick={() => SetOpen(!isOpen)}>
          <MenuRounded sx={{ color: "black" }} />
        </Mobileicon>
        <NavLogo to="/">
          <Logo src={logo} />
          ModFit
        </NavLogo>

        <MobileMenu isOpen={isOpen}>
          <NavLinks to="/">Dashboard</NavLinks>
          <NavLinks to="/workouts">Workouts</NavLinks>
          <NavLinks to="/tutorials">Tutorials</NavLinks>
          <NavLinks to="/blogs">Blogs</NavLinks>
          <NavLinks to="/contact">Contact</NavLinks>
        </MobileMenu>
        <NavItems>
          <NavLinks to="/">Dashboard</NavLinks>
          <NavLinks to="/workouts">Workouts</NavLinks>
          <NavLinks to="/tutorials">Tutorials</NavLinks>
          <NavLinks to="/blogs">Blogs</NavLinks>
          <NavLinks to="/contact">Contact</NavLinks>
        </NavItems>
        <UserCont>
          <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
          <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
        </UserCont>
      </NavCont>
    </Nav>
  );
};

export default Navbar;
