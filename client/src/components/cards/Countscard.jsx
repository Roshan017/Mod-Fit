import React from "react";
import styled from "styled-components";
import "@fontsource/poppins/400.css"; // Regular weight
import "@fontsource/poppins/700.css";
const Card = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 10px;
  font-family: "poppins", sans-serif;
  padding: 24px;
  border: 1px soild ${({ theme }) => theme.text_primary + 10};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.text_secondary};
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 600px) {
    gap: 6px;
  }
`;
const Icon = styled.div`
  height: fit-content;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  ${({ color, bg }) =>
    `background: ${bg};
        color: ${color};
    `}
`;

const Desc = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 6px;
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  @media (max-width: 600px) {
    font-size: 14px;
  }
  color: ${({ theme }) => theme.primary};
`;
const Value = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  align-items: end;
  gap: 8px;
  @media (max-width: 600px) {
    font-size: 22px;
  }
  color: ${({ theme }) => theme.primary};
`;
const Span = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: 500;
  @media (max-width: 600px) {
    font-size: 12px;
  }

  ${({ positive, theme }) =>
    positive ? `color: ${theme.green}` : `color : ${theme.red}`}
`;
const Unit = styled.div``;

const Countscard = ({ item, data }) => {
  return (
    <Card>
      <Left>
        <Title>{item.name}</Title>
        <Value>
          {data && data[item.key] !== undefined
            ? data[item.key].toFixed(2)
            : "N/A"}{" "}
          <Unit>{item.unit}</Unit>
          <Span positive>(+10%)</Span>
        </Value>

        <Desc>{item.desc}</Desc>
      </Left>
      <Icon color={item.color} bg={item.lightColor}>
        {item.icon}
      </Icon>
    </Card>
  );
};

export default Countscard;
