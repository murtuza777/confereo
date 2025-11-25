// @ts-nocheck
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