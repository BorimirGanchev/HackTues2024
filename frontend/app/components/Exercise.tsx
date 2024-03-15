// ExerciseComponent.tsx
import React, { useState } from 'react';
import { Exercise } from '../types/ExerciseServiceTypes'; // Assuming this is where your type is correctly defined

export const ExerciseComponent: React.FC<{exercise: Exercise}> = ({exercise}) => {
  // State to hold the weight input
  const [weight, setWeight] = useState(exercise.weight || '');

  // Function to update the weight state
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  return (
    <div>
      <h3>{exercise.name}</h3>
      <h3>{exercise.reps}</h3>
      {exercise.weight !== undefined ? ( // Assuming weight can be 0, which should be truthy in this context
        <div>{exercise.weight}</div>
      ) : (
        <form> {/* Form tag added for completeness */}
          <label htmlFor="weight-input">Weight: </label>
          <input
            id="weight-input"
            type="number" 
            value={weight}
            onChange={handleWeightChange}
          />
        </form>
      )}
    </div>
  );
};
export { Exercise };

