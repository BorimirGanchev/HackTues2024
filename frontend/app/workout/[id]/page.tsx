"use client";
import { ExerciseComponent } from "@/app/components/Exercise";
import { useAsync } from "@/app/utils/useAsync";
import { api } from "../../utils/api";
import { jwtDecode } from "jwt-decode";
import { cookies } from "@/app/utils/cookieHandler";
import { useState, useEffect } from "react";
import {
  Exercise,
  Workout,
} from "../../../../backend/workouts_service/src/db/db";

function WorkoutPage({ params }: { params: { id: string } }) {
  const { id: idString } = params;
  const id = Number(idString);

  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const username = jwtDecode(cookies.token.get()).username;
        const fetchedWorkout = await api.getWorkout(username, id);
        setWorkout(fetchedWorkout);
      } catch (error) {
        console.error("Error fetching workout:", error);
        // Optionally handle error, e.g., redirect to error page
      }
    };

    fetchWorkout();

    // Cleanup function if needed
    return () => {
      // Cleanup code here if needed
    };
  }, [id]);

  return (
    <div>
      {workout ? (
        <>
          <h1>{workout.startTime}</h1>
          {workout.exercises.map((exercise: Exercise, i: number) => (
            <ExerciseComponent key={i} exercise={exercise} />
          ))}
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

export default WorkoutPage;
