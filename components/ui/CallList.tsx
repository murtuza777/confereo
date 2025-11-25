'use client'

import { useGetCalls } from '@/hooks/useGetCalls';
import { useRouter } from 'next/navigation';
import React from 'react'
import MeetingCard from '../MeetingCard';
import { Call, CallRecording } from '@stream-io/video-react-sdk';

const CallList = ({type}: {type: 'ended' | 'recordings' | 'upcoming'}) => {

  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const router = useRouter();


  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return callRecordings;  
      case 'upcoming':
        return upcomingCalls;  
      default:
        return [];
    }
  }


  
  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'NO previous Calls';
      case 'recordings':
        return 'No recording';  
      case 'upcoming':
        return 'No upcoming Calls';  
      default:
        return '';
    }
  }

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ? calls.map((meeting:Call | CallRecording) => (
        <MeetingCard/>
      )) : (
        <h1>{noCallsMessage}</h1>
      
    )}

    </div>
  )
}

export default CallList