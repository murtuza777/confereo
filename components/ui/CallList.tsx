'use client'

import { useGetCalls } from '@/hooks/useGetCalls';
import { useRouter } from 'next/navigation';
import React from 'react'

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

  return (
    <div>CallList</div>
  )
}

export default CallList