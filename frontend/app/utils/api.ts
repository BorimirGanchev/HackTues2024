'use client'
export type exercise = {
    reps: number;
    weight: number;
}

 export type workout = {
    name: string
    exercises: exercise[]
    start: number
    end: number
    id: number
}

const data: {workouts: workout[]} = {
    workouts: [{
        start: Date.now(),
        name: "Pull up bar ab workout",
        exercises: [],
        end: Date.now(),
        id: 1
    },
    {
        name: "Pull up bar ab workout",
        exercises: [],
        start: Date.now(),
        end: Date.now(),
        id: 1
    },
    {
        name: "Pull up bar ab workout",
        exercises: [],
        start: Date.now(),
        end: Date.now(),
        id: 1
    },
    {
        name: "Pull up bar ab workout",
        exercises: [],
        start: Date.now(),
        end: Date.now(),
        id: 1
    },
    {
        name: "Pull up bar ab workout",
        exercises: [],
        start: Date.now(),
        end: Date.now(),
        id: 1
    },
    {
        name: "Pull up bar ab workout",
        exercises: [],
        start: Date.now(),
        end: Date.now(),
        id: 1
    },
    {
        name: "Pull up bar ab workout",
        exercises: [],
        start: Date.now(),
        end: Date.now(),
        id: 1
    },
    {
        name: "Pull up bar ab workout",
        exercises: [],
        start: Date.now(),
        end: Date.now(),
        id: 1
    },
]
}

interface IApi{
    getAllWorkouts(username: string): workout[]
    getWorkout(username: string,id : number): workout | undefined
}

class Api implements IApi{
    getAllWorkouts(){
        return data.workouts
    }

    getWorkout(username: string, id: number) {
        return data.workouts.find(workout => workout.id === id);
    }
}

// interface FitnessData {
//     sensor: string[];
//     name: string;
//     values: numbers[];
// }

// function parseFtinessData(data : FitnessData) {
//     data.name
// }


export const api: IApi = new Api()