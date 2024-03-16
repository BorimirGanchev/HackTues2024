import React, { useState } from "react";
import { Exercise } from "../types/ExerciseServiceTypes";

export const ExerciseComponent: React.FC<{
  exercise: Exercise;
  changeWeight: (newWeightValue: string) => void;
}> = ({ exercise, changeWeight }) => {
  const [weight, setWeight] = useState(exercise.weight || "");

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  return (
    <div className="flex justify-center">
      <div className="exercise-container border border-gray-300 rounded-lg p-[10vh] mb-4 text-white text-2xl text-center my-[12vh]" style={{ backgroundColor: '#2f2f2f' }}>
        <div>Type: {exercise.type}</div>
        <h3 className="text-xl font-semibold mt-4 mb-6 my-[3vh]">Reps: {exercise.reps}</h3>
        {exercise.weight !== null ? (
          <div className="mb-4">Weight:  {exercise.weight}</div>
        ) : (
          <div className="flex items-center justify-center">
            <label htmlFor="weight-input" className="font-semibold mr-2">
              Weight:
            </label>
            <input
              id="weight-input"
              type="number"
              value={weight}
              onChange={handleWeightChange}
              className="border border-gray-300 rounded px-2 py-1 bg-gray-300 text-gray-700 mr-2"
            />
            <button
              onClick={() => changeWeight(weight)}
              className="bg-green-600 hover:bg-green-800 text-white font-bold py-1 px-4 rounded"
            >
              Update Weight
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
