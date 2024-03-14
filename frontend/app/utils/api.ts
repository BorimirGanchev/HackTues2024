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
}

const data: {workouts: workout[]} = {
    workouts: [{
        start: Date.now(),
        name: "Pull up bar ab workout",
        exercises: [],
        end: Date.now()
    },
    {
        name: "Pull up bar ab workout",
        exercises: [],
        start: Date.now(),
        end: Date.now()
    },
    {
        name: "Pull up bar ab workout",
        exercises: [],
        start: Date.now(),
        end: Date.now()
    },
    {
        name: "Pull up bar ab workout",
        exercises: [],
        start: Date.now(),
        end: Date.now()
    },
    {
        name: "Pull up bar ab workout",
        exercises: [],
        start: Date.now(),
        end: Date.now()
    },
    {
        name: "Pull up bar ab workout",
        exercises: [],
        start: Date.now(),
        end: Date.now()
    },
    {
        name: "Pull up bar ab workout",
        exercises: [],
        start: Date.now(),
        end: Date.now()
    },
    {
        name: "Pull up bar ab workout",
        exercises: [],
        start: Date.now(),
        end: Date.now()
    },
]
}

interface IApi{
    getAllWorkouts(username: string): workout[]
    getWorkout(username: string,id : number): workout
}

class Api implements IApi{
    getAllWorkouts(){
        return data.workouts
    }

    getWorkout(username: string, id: number): workout {
        return data.workouts[id]
    }
}


export const api: IApi = new Api()