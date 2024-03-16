import express, { Request, Response } from 'express'; //? gives error but code compiles so its probably from vscode
import { db } from './db/db';
import cors from 'cors';
const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

app.post('/workouts/user/new/:username', async (req, res) => {
  const newUser = await db.createUser(req.params.username);
  return res.status(200).json(newUser);
});

app.post('/workouts/new', async (req, res) => {
  const { exercises, username, startTime, endTime } = req.body;
  await db.createWorkout(username, startTime, endTime, exercises);
  return res.status(200).json('success');
});

app.get('/workouts/all/:username', async (req: Request, res: Response) => {
  const { username } = req.params;
  const workouts = await db.getAllWorkouts(username);
  return res.status(200).json(workouts);
});

app.get('/workouts/get/:id/:username', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const username = req.params.username;
  const workout = await db.getWorkout(username, id);
  if (workout) {
    res.json(workout);
  } else {
    res.status(404).json({ error: 'Workout not found' });
  }
});


