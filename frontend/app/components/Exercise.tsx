import React from 'react'

export const Exercise = () => {
  return (
    <div>
    <h3>{exercise.name}</h3>
    <p>Sets: {exercise.sets}</p>
    <p>Reps: {exercise.repetitions}</p>
    <p>Rest: {exercise.rest} seconds</p>
  </div>
  )
}
