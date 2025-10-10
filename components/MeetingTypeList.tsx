'use client'

import React, { useState } from 'react'
import HomeCard from './ui/HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './ui/MeetingModal';

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoinMeeting' | 'isInstantMeeting' | undefined>();
    
    const createMeeting = () => {
        // Add meeting creation logic here
    }

    return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4' >
        <HomeCard 
        img='/icons/add-meeting.svg'
        title='New Meeting'
        description='Start a instant meeting'
        handleClick={() => setMeetingState
            ('isInstantMeeting')}
            className='bg-orange-500'
        
        />
        <HomeCard 
        img='/icons/schedule.svg'
        title='Schedule Meeting'
        description='Plan your meeting'
        handleClick={() => setMeetingState
            ('isScheduleMeeting')}
            className='bg-blue-500'
        
        />
        <HomeCard 
        img='/icons/recordings.svg'
        title='View recordings'
        description='Check out your recordings'
        handleClick={() => setMeetingState
            ('isInstantMeeting')}
            className='bg-purple-500'
        
        />
        <HomeCard 
        img='/icons/join-meeting.svg'
        title='Join Meeting'
        description='Via invitation link'
        handleClick={() => setMeetingState
            ('isJoinMeeting')}
        className='bg-yellow-500'
        />
        <MeetingModal 
        isOpen={meetingState === 'isJoinMeeting'}
        onClose={() => setMeetingState(undefined)}
        title='Start an instant meeting'
        className='text-center'
        buttontext='Start Meeting'
        handleClick={() => {createMeeting()}}
        />
        </section>
  )
}

export default MeetingTypeList;