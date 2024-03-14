import express, { Request, Response } from 'express'; //? gives error but code compiles so its probably from vscode
import { db } from './db/db';
const app = express();
const PORT = 6000;

const workouts = [
  { id: 1, name: 'Workout 1' },
  { id: 2, name: 'Workout 2' },
  { id: 3, name: 'Workout 3' },
];

app.use(express.json());

app.post('/workouts/new', (req, res) => {
  return res.status(200).json('success');
});

app.get('/workouts/all', (req: Request, res: Response) => {
  res.json(workouts);
});

app.get('/workouts/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const workout = workouts.find((workout) => workout.id === id);
  if (workout) {
    res.json(workout);
  } else {
    res.status(404).json({ error: 'Workout not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
