"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { WorkOut } from "../components/WorkOut";
import { Workout } from "../types/ExerciseServiceTypes";
import { api } from "../utils/api";
import { cookies } from "../utils/cookieHandler";
import { JwtPayload, jwtDecode } from "jwt-decode";

function MyWorkOutsPage() {
  const [workouts, setWorkouts] = useState<Workout[] | null>();

  useEffect(() => {
    const token = cookies.token.get();
    if (token === undefined || token === null) {
      //TODO redirect to home page
      return;
    }

    const decodedObject = jwtDecode(token);
    console.log(decodedObject);

    async function fetchWorkouts() {
      try {
        const res = await api.getAllWorkouts(decodedObject.username);
        setWorkouts(res);
        console.log("result", res);
      } catch (error) {
        console.error("Error fetching workouts:", error);
        // Handle error, maybe set some default value for workouts or show an error message
      }
    }

    fetchWorkouts();
  }, []);

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center ">
        <div
          className="max-w-screen-lg w-full mt-10 p-6 rounded-lg shadow-lg"
          style={{ backgroundColor: "#2f2f2f", minHeight: "80vh" }}
        >
          {workouts !== null &&
          workouts !== undefined &&
          workouts?.length > 0 ? (
            workouts?.map((workout) => {
              return <WorkOut workout={workout} key={workout.id} />;
            })
          ) : (
            <p className="flex justify-center items-center h-full text-4xl font-bold text-white dark:text-white">
              There are no workouts yet ...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyWorkOutsPage;
