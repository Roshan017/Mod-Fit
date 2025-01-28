import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "@fontsource/poppins/400.css"; // Regular weight
import "@fontsource/poppins/700.css";
import Weeklystat from "./cards/Weeklystat";
import Countscard from "./cards/Countscard";
import { counts } from "../utils/data";
import CategoryChart from "./cards/CategoryChart";
import AddWorkout from "./AddWorkout";
import WorkoutCard from "./cards/WorkoutCard";
import { addWorkout, getuserDashboard, getWorkouts } from "../api/index";
const Container = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
  font-family: "poppins", sans-serif;
`;
const Wrapper = styled.div`
    flex: 1;
    max-width: 1400px;
    display: flex;
    flex-direction: column;
    gap: 22px;

    @media (max-width: 600px)
{
    gap:12px;    
}}
`;
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 800;
`;
const FlexWrap = styled.div`
  display: flex;
  
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px)
{
    gap: 12px;
}}
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const DashBoard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [workout, setWorkout] = useState(`#Legs
-Back Squat
-5 setsX15 reps
-30 kg
-10 min`);

  const dashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem("modfit-app-token");
    await getuserDashboard(token).then((res) => {
      setData(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };

  const getTodaysworkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("modfit-app-token");
    await getWorkouts(token, "")
      .then((res) => {
        setTodaysWorkouts(res?.data?.todaysWorkouts || []);
        console.log("Fetched Today's Workouts:", res.data); // Log fetched data
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching workouts:", err);
        setLoading(false);
      });
  };

  const addNewWorkout = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem("modfit-app-token");
    await addWorkout(token, { workoutString: workout })
      .then((res) => {
        dashboardData(); // Refetch dashboard data
        getTodaysworkout(); // Refetch today's workouts
        console.log(
          "Todays Workouts after adding new workout:",
          todaysWorkouts
        ); // Log to see if the array is updated
        setButtonLoading(false);
      })
      .catch((err) => {
        alert(err);
        setButtonLoading(false);
      });
  };

  useEffect(() => {
    dashboardData();
    getTodaysworkout();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>DashBoard</Title>
        <FlexWrap>
          {data &&
            counts.map((item) => (
              <Countscard item={item} data={data} key={item.id} />
            ))}
        </FlexWrap>
        <FlexWrap>
          <Weeklystat data={data} />
          <CategoryChart data={data} />
          <AddWorkout
            workout={workout}
            Setworkout={setWorkout}
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading}
          />
          <Section>
            <Title>Todays Workouts</Title>
            <CardWrapper>
              {todaysWorkouts.map((workout) => (
                <WorkoutCard workout={workout} />
              ))}
            </CardWrapper>
          </Section>
        </FlexWrap>
      </Wrapper>
    </Container>
  );
};

export default DashBoard;
