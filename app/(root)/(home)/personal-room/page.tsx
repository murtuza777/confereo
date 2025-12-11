"use client";

import { useUser } from '@clerk/nextjs';
import React from 'react';

const Table = ({title, description}: {title:string ; description:string;}) => (
  <div className= 'flex flex-col items-start gap-2 xl:flex-row'> 
    <h1 className='text-base font-medium text-white lg:text-xl xl:min-w-32px' >{title}:</h1>
    <h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl text-white'>{description}</h1>
  </div>
)

export default function PersonalRoomPage() {
  const { user } = useUser();
  const displayName = user?.username || user?.firstName || 'My';
  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold text-white'>Personal Room</h1>
      <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
        <Table title='topic' description={`${displayName}'s Meeting Room`} />
      </div>
    </div>
  );
}