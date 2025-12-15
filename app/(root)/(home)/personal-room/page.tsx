"use client";

import { Button } from '@/components/ui/button';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const Table = ({title, description}: {title:string ; description:string;}) => (
  <div className= 'flex flex-col items-start gap-2 xl:flex-row'> 
    <h1 className='text-base font-medium text-white lg:text-xl xl:min-w-32px' >{title}:</h1>
    <h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl text-white'>{description}</h1>
  </div>
)

export default function PersonalRoomPage() {
  const { user } = useUser();
  const meetingid = user?.id;
  
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingid}?personal=true`;
  const client = useStreamVideoClient();

  const router = useRouter();

  const { call } = useGetCallById(meetingid!);

  const startRoom = async() => {

    if(!client || !user) return;

    if(!call) {
      const newCall = client.call('default',meetingid!)

    await newCall.getOrCreate({
      data: {
          starts_at: new Date().toISOString(),
          }
        })
      }
      router.push(`/meeting/${meetingid}?personal=true`)
    }
    const displayName = user?.username || user?.firstName || 'My';
    return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold text-white'>Personal Room</h1>
      <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
        <Table title='topic' description={`${displayName}'s Meeting Room`} />
        <Table title='meeting id' description={meetingid!} />
        <Table title='invite link' description={meetingLink} />
      </div>
      <div className='flex gap-5'>
        <Button className='bg-blue-600' onClick={startRoom}> Start Meeting</Button>



        <Button className='bg-dark-3' onClick={() => {
                navigator.clipboard.writeText(meetingLink);
                toast("Link Copied");
              }}
              >
               copy invitation
              </Button>
              </div>
    </div>
  );
}