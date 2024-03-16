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
export default function WorkoutPage({ params }: { params: { id: string } }) {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(workout);
    api.updateWorkout(jwtDecode(cookies.token.get()).username, workout); // Log the updated array of exercises
  };

  const handleExerciseChange = (newWeightValue: string, exercise: Exercise) => {
    const updatedExercises = workout?.exercises.map((ex) => {
      if (ex.id === exercise.id) {
        return { ...ex, weight: Number(newWeightValue) };
      }
      return ex;
    });
    setWorkout((prevWorkout) =>
      prevWorkout ? { ...prevWorkout, exercises: updatedExercises } : null
    );
  };

  return (
    <div>
      {workout ? (
        <>
          <h1>{workout.startTime}</h1>
          <form onSubmit={handleSubmit}>
            {workout.exercises.map((exercise: Exercise, i: number) => (
              <ExerciseComponent
                key={i}
                exercise={exercise}
                changeWeight={(value) => handleExerciseChange(value, exercise)}
              />
            ))}

            <button
              
              className="bg-green-600 hover:bg-green-800 text-white font-bold py-[3vh] px-[7vh]  rounded my-[10vh] ml-[94vh]"
            >
              Submit
            </button>
            
          </form>
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}
