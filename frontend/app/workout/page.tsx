'use client'
import React, { useEffect, useState } from 'react';
import {Navbar} from '../components/Navbar';
import {WorkOut} from '../components/WorkOut';
import { api, workout } from '../utils/api';
import { cookies } from '../utils/cookieHandler';
import { useCheckUserToken } from '../utils/authenticator';
function MyWorkOutsPage() {
  const [workouts,setWorkouts] = useState<workout[] | null>()
  useEffect(() => {
    useCheckUserToken();
    const username = cookies.token.get()
    console.log('dari e tup ->', username)
    if(username === undefined || username === null){
      //TODO redirect to home page
      return
    }
    setWorkouts(api.getAllWorkouts(username))
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
          (<p className="text-center">There are no workouts yet</p>)}







        </div>  
      </div>
    </div>
  );
}

export default MyWorkOutsPage;
