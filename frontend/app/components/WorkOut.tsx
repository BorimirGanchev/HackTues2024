import { api, exercise, workout } from '../utils/api';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
// import {work} from "../utils/api"

const Exercise: React.FC<{exercise: exercise}> = ({exercise}) => {
  return (
    <div>
      Reps : {exercise.reps}
      <br/>
      Weight: {exercise.weight}
    </div>
  )
}




export const  WorkOut: React.FC<{workout: workout}>= ({workout}) => {
  
  return (
    <div className="rectangle bg-gray-200 border border-gray-300 rounded-lg p-4 mb-10" style={{ backgroundColor: '#4b4243' }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-2">{`Workout started at ${workout.start}`}</p>
          <p className="font-bold text-2xl text-center lg:text-left">{workout.name}</p>
          <p className="text-gray-500 text-sm mt-2">{`Workout ended at ${workout.end}`}</p>
          {workout.exercises.map((exercise) => {
            return <Exercise exercise={exercise}/>
          })}
        </div>
        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-6" href={`/workout/${workout.id}`}>
          Review Your Workout
        </Link>
      </div>
    </div>
  )
}

export default WorkOut;