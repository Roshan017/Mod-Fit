import "@fontsource/poppins/400.css"; // Regular weight
import "@fontsource/poppins/700.css";
import React from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  font-family: "poppins", sans-serif;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
const AddWorkout = ({ workout, Setworkout, addNewWorkout, buttonLoading }) => {
  return (
    <Card>
      <Title>Add New Workout</Title>
      <TextInput
        label="Workout"
        textArea
        rows={10}
        value={workout}
        placeholder={`Enter in this format:
        
#Category
-Workout Name
-Sets
-Reps
-Weight
-Duration
            `}
        handelChange={(e) => Setworkout(e.target.value)}
      />
      <Button
        isLoading={buttonLoading}
        isDisabled={buttonLoading}
        onClick={() => addNewWorkout()}
        text={"Add Workout"}
        small
      />
    </Card>
  );
};

export default AddWorkout;
