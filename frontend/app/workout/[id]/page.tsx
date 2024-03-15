'use client'
import { Exercise, ExerciseComponent } from '@/app/components/Exercise';
import { useAsync } from '@/app/utils/useAsync';
import { useRouter } from 'next/router';
import { api } from '../../utils/api';



const fetchData = async (id : number) => {
  // const response = await fetch(`/api/workouts/${id}`);
  // if (!response.ok) {
  //   throw new Error('Data could not be fetched');
  // }
  return (api.getWorkout('', id));
};

function WorkoutPage({ params }: { params: { id: string } }) {
  const { id: idString } = params;
  const id = Number(idString);
  if(Number.isNaN(id)){
    return <div>Invalid routing param</div>
  }

  const { loading, error, result: workout } = useAsync(() => fetchData(id), [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.message}</div>;
  if (!workout) return <div>Could not find workout</div>;

  return (
    <div>
    <h1>{workout.name}</h1>
      {workout.exercises.map((exercise: { id: any; }, i: any)=> (<ExerciseComponent key={exercise.id} exercise={exercise} />))}
    </div>
  );
}


export default WorkoutPage;
