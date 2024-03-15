// ExerciseComponent.tsx
import React, { useState } from "react";
import { Exercise } from "../types/ExerciseServiceTypes"; // Assuming this is where your type is correctly defined

export const ExerciseComponent: React.FC<{
  exercise: Exercise;
  changeWeight: (newWeightValue: string) => void;
}> = ({ exercise, changeWeight }) => {
  // State to hold the weight input
  const [weight, setWeight] = useState(exercise.weight || "");

  // Function to update the weight state
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  return (
    <div className="exercise-container">
      <div>Type: {exercise.type}</div>
      <h3>Reps: {exercise.reps}</h3>
      {exercise.weight !== null ? (
        <div className="weight">{exercise.weight}</div>
      ) : (
        <>
          <label htmlFor="weight-input">Weight: </label>
          <input
            id="weight-input"
            type="number"
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
            }}
            className="weight-input"
          />
          <button
            onClick={() => {
              changeWeight(weight);
            }}
          >
            Update Weight
          </button>
        </>
      )}
      <br />
    </div>
  );
};
