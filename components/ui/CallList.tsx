// @ts-nocheck
'use client'

import { useGetCalls } from '@/hooks/useGetCalls';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import MeetingCard from '../MeetingCard';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import Loader from '@/components/Loader';

const CallList = ({type}: {type: 'ended' | 'recordings' | 'upcoming'}) => {

  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const router = useRouter();

  if (isLoading) return <Loader />


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

  useEffect(() => { 
    const fetchRecordings = async () => {
      const callData = await Promise.call(callRecordings.
      map((meeting) => meeting.queryRecordings()))

      const recordings = callData
      .filter(call => call.recordings.length > 0)
      .flatMap(call => call.recordings)

//what is a flatmap?
//flatMap is a method that is used to flatten an array of arrays into a single array.
//it is similar to map, but it returns a single array instead of an array of arrays.
//it is used to flatten an array of arrays into a single array.
//example: const array = [[1, 2], [3, 4], [5, 6]];
//const flattened = array.flatMap(subArray => subArray);
//console.log(flattened); // [1, 2, 3, 4, 5, 6]
//for our case [['rec1' , 'rec2'], ['rec3]]
//['rec1', 'rec2', 'rec3']

    setRecordings(recordings);

    }
  if (type === 'recordings') fetchRecordings();
  }, [type, callRecordings]);


  const calls = getCalls() ?? [];
  const demoUpcomingMeetings =
    type === 'upcoming' && (!calls || calls.length === 0)
      ? [
          {
            id: 'demo-upcoming-1',
            state: {
              custom: { description: 'Product kickoff sync' },
              startsAt: new Date(Date.now() + 60 * 60 * 1000),
            },
            start_time: new Date(Date.now() + 60 * 60 * 1000),
            url: '#',
          },
        ]
      : [];
  const noCallsMessage = getNoCallsMessage();

  const getMeetingDescription = (meeting: Call | CallRecording) => {
    const description = (meeting as Call).state?.custom?.description;
    return description && description.length > 0
      ? description.substring(0, 25)
      : 'No description';
  };

  const getMeetingDate = (meeting: Call | CallRecording) => {
    const call = meeting as Call;
    const startsAt =
      call.state?.startsAt ??
      call.state?.starts_at ??
      (meeting as CallRecording)?.start_time ??
      null;

    if (!startsAt) return 'No start time';

    const dateInstance =
      startsAt instanceof Date ? startsAt : new Date(startsAt as Date | string);

    if (Number.isNaN(dateInstance.getTime())) return 'Invalid date';
    return dateInstance.toLocaleString();
  };

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ? calls.map((meeting:Call | CallRecording) => (
        <MeetingCard

        key={(meeting as Call).id}
        icon={
          type === 'ended'
          ? '/icons/previous.svg'
          : type === 'upcoming'
          ? '/icons/upcoming.svg'
          : '/icons/recordings.svg'
        }
        title={getMeetingDescription(meeting)}
        date={getMeetingDate(meeting)}
        isPreviousMeeting={type === 'ended'}
        buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
        buttonText={type === 'recordings' ? 'Play' : 'Start'}
        handleClick={type === 'recordings' ? () => router.push(`${meeting.url}`) : () => router.push(`/meeting/${meeting.id}`)}
        link={type === 'recordings'
          ? meeting.url
          : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
        
        
        
        
        />
      )) : demoUpcomingMeetings.length > 0 ? demoUpcomingMeetings.map((meeting: Call) => (
        <MeetingCard
          key={meeting.id}
          icon='/icons/upcoming.svg'
          title={meeting.state.custom.description}
          date={meeting.state.startsAt.toLocaleString()}
          buttonText='Start'
          handleClick={() => router.push('/meeting/demo-upcoming-1')}
          link='#'
        />
      )) : (
        <h1>{noCallsMessage}</h1>
      )}

    </div>
  )
}

export default CallList