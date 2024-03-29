import { PrismaClient, User, Exercise, Workout } from '@prisma/client';

const prisma = new PrismaClient();

class DB {
  async redactWorkout(
    workoutId: number,
    new_workout: Workout,
  ): Promise<Workout> {
    const updatedWorkout = await prisma.workout.update({
      where: {
        id: workoutId,
      },
      data: {},
    });
    return updatedWorkout;
  }

  async createUser(username: string): Promise<User> {
    try {
      // Create the user in the database
      const user = await prisma.user.create({
        data: {
          username,
        },
      });

      return user;
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  }
  async createWorkout(
    username: string,
    startTime: string,
    endTime: string,
    exercises: {
      type: string;
      reps: number;
      weight: number;
      rawData?: Record<string, any>;
    }[],
  ): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        throw new Error(`User with username ${username} not found`);
      }


      await prisma.workout.create({
        data: {
          startTime,
          endTime,
          userId: user.id,
          exercises: {
            create: exercises.map((exercise) => {
              return {
                type: exercise.type,
                reps: exercise.reps,
                weight: exercise.weight,
                rawData: exercise.rawData,
              };
            }),
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getWorkout(username: string, workoutId: number): Promise<any | null> {
    try {
      // Find the user by username
      const user = await prisma.user.findUnique({
        where: { username: username },
        include: {
          workouts: {
            include: {
              exercises: true,
            },
          },
        },
      });

      if (!user) {
        throw new Error(`User with username ${username} not found`);
      }

      // Find the workout by ID associated with the user
      const workout = user.workouts.find((workout) => workout.id === workoutId);

      return workout || null;
    } catch (error) {
      throw new Error(`Failed to get workout: ${error}`);
    }
  }

  async getAllWorkouts(username: string): Promise<any[]> {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
        include: {
          workouts: {
            include: {
              exercises: true,
            },
          },
        },
      });

      if (!user) {
        throw new Error(`User with username ${username} not found`);
      }

      return user.workouts;
    } catch (error) {
      throw new Error(`Failed to get workouts: ${error.message}`);
    }
  }
}

export const db = new DB();
export type { User, Exercise, Workout };
