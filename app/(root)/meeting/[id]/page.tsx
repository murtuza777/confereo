"use client";
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState, use } from 'react';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';

const Meeting = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  console.log('Loader component:', Loader);
  console.log('MeetingRoom component:', MeetingRoom);
  console.log('MeetingSetup component:', MeetingSetup);

  if (!isLoaded || isCallLoading) {
    return <div>Loading...</div>;
  }

  if (!call) {
    return <div>Call not found</div>;
  }

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
