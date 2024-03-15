"use client";
import axios, { AxiosResponse } from "axios";
import { Exercise, Workout } from "../types/ExerciseServiceTypes";

// const data: { workouts: Workout[] } = {
//   workouts: [
//     {
//       start: Date.now(),
//       name: "Pull up bar ab workout",
//       exercises: [],
//       end: Date.now(),
//     },
//     {
//       name: "Pull up bar ab workout",
//       exercises: [],
//       start: Date.now(),
//       end: Date.now(),
//     },
//     {
//       name: "Pull up bar ab workout",
//       exercises: [],
//       start: Date.now(),
//       end: Date.now(),
//     },
//     {
//       name: "Pull up bar ab workout",
//       exercises: [],
//       start: Date.now(),
//       end: Date.now(),
//     },
//     {
//       name: "Pull up bar ab workout",
//       exercises: [],
//       start: Date.now(),
//       end: Date.now(),
//     },
//     {
//       name: "Pull up bar ab workout",
//       exercises: [],
//       start: Date.now(),
//       end: Date.now(),
//     },
//     {
//       name: "Pull up bar ab workout",
//       exercises: [],
//       start: Date.now(),
//       end: Date.now(),
//     },
//     {
//       name: "Pull up bar ab workout",
//       exercises: [],
//       start: Date.now(),
//       end: Date.now(),
//     },
//   ],
// };

interface IApi {
  getAllWorkouts(username: string): Promise<Workout[]>;
  getWorkout(username: string, id: number): Promise<Workout>;
}

// class Api implements IApi {
//   getAllWorkouts() {
//     return data.workouts;
//   }

//   getWorkout(username: string, id: number): Workout {
//     return data.workouts[id];
//   }
// }

// function createApiDefenitions(schema){

// } TODO

class ExercisesApi implements IApi {
  private baseUrl;
  constructor(url: string) {
    this.baseUrl = url;
  }

  async getAllWorkouts(username: string): Promise<Workout[]> {
    const res: AxiosResponse<Workout[]> = await axios.get(
      `${this.baseUrl}/workouts/all/${username}`
    );
    console.log(res);
    return res.data;
  }

  async getWorkout(username: string, id: number): Promise<Workout> {
    const res: AxiosResponse<Workout> = await axios.post(
      `${this.baseUrl}/workouts/${id}`,
      {
        username: username,
      }
    );
    return res.data;
  }
}

export const api: IApi = new ExercisesApi("http://localhost:3001");
