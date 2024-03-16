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

interface IExerciseApi {
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

class AuthApi {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  async login(data: { [key: string]: string }) {
    return await axios.post(`${this.baseUrl}/auth/login`, {
      username: data.username,
      password: data.password,
    });
  }
  async signup(data: { [key: string]: string }) {
    return await axios.post(`${this.baseUrl}/auth/signup`, {
      username: data.username,
      password: data.password,
    });
  }
}

class ExercisesApi implements IExerciseApi {
  private baseUrl;
  constructor(url: string) {
    this.baseUrl = url;
  }

  async getAllWorkouts(username: string): Promise<Workout[]> {
    const res: AxiosResponse<Workout[]> = await axios.get(
      `${this.baseUrl}/workouts/all/${username}`
    );
    return res.data;
  }

  async getWorkout(username: string, id: number): Promise<Workout> {
    const res: AxiosResponse<Workout> = await axios.get(
      `${this.baseUrl}/workouts/get/${id}/${username}`
    );
    return res.data;
  }

  async updateWorkout(username: string, workout: Workout) {
    const res: AxiosResponse<Workout> = await axios.post(
      `${this.baseUrl}/workouts/new`,
      {
        exercises: workout.exercises,
        username: username,
        startTime: workout.startTime,
        endTime: workout.endTime,
      }
    );

    return res.data;
  }
}
const baseUrl = "https://k63mgfkn-7000.euw.devtunnels.ms";
export const api = new ExercisesApi(baseUrl);
export const authApi = new AuthApi(baseUrl);
