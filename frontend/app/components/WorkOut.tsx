import React from 'react';
import Link from 'next/link';
import { ExerciseComponent } from './Exercise';
import { Workout } from '../types/ExerciseServiceTypes';

export const WorkOut: React.FC<{ workout: Workout }> = ({ workout }) => {
  return (
    <div className="rectangle bg-gray-200 border border-gray-300 rounded-lg p-8 mb-10 " style={{ backgroundColor: '#4b4243' }}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="text-white text-2xl lg:text-3xl font-bold mb-4"> Workout {workout.id}</div>
        <Link href={`/workout/${workout.id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-6 rounded lg:mt-0 mt-4">
          Review Your Workout
        </Link>
      </div>
    </div>
  );
};

export default WorkOut;
