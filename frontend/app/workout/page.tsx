'use client'
import React, { useEffect, useState } from 'react';
import {Navbar} from '../components/Navbar';
import {WorkOut} from '../components/WorkOut';
import { Workout } from '../types/ExerciseServiceTypes';
import { api } from '../utils/api';
import { cookies } from '../utils/cookieHandler';
import { useCheckUserToken } from '../utils/authenticator';
import { jwtDecode } from 'jwt-decode';
function MyWorkOutsPage() {
  const [workouts,setWorkouts] = useState<Workout[] | null>()
  useEffect(() => {
    //useCheckUserToken();
    const token = cookies.token.get()
    if(token === undefined || token === null){
      //TODO redirect to home page
      return
    }
    console.log(jwtDecode(token))
    
    let res;
     async () => {
      res = await api.getAllWorkouts(token) 
     }
     console.log("result",res)
    setWorkouts(res)
  },[])
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center ">
        <div className="max-w-screen-lg w-full mt-10 p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#2f2f2f', minHeight: '80vh' }}>




          {workouts !== null && workouts !== undefined && (workouts?.length > 0) ?(workouts?.map((workout) => {
            return (
              <WorkOut workout={workout}/>
          )
          })) :
          (<p className="flex justify-center items-center h-full text-4xl font-bold text-white dark:text-white">There are no workouts yet ...</p> )}



        </div>  
      </div>
    </div>
  );
}

export default MyWorkOutsPage;
