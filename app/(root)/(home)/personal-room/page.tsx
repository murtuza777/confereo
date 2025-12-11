"use client";

import { useUser } from '@clerk/nextjs';
import React from 'react';

const Table = ({title, description}: {title:string ; description:string;}) => (
  <div>
    <h1>{title}:</h1>
    <p>{description}</p>
  </div>
)

export default function PersonalRoomPage() {
  const { user } = useUser();
  const displayName = user?.username || user?.fullName || 'My';
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white">Personal Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="topic" description={`${displayName}'s Meeting Room`} />
        

      </div>
    </div>
  )
}