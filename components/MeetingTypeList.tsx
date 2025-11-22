'use client'

import React, { useState } from 'react'
import HomeCard from './ui/HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './ui/MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { toast } from 'sonner';

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoinMeeting' | 'isInstantMeeting' | undefined>();
    const {user} = useUser();
    const client = useStreamVideoClient();
    const [Values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: '',
    });
    const [callDetails, setCallDetails] = useState<Call>();

    const createMeeting = async () => {
        
        if (!client || !user) return;

        try {
            const id = crypto.randomUUID();
            const call = client.call('default',id);

            if(!call) throw new Error('Failed to create call');

            const startsAt = Values.dateTime.toISOString() || 
            new Date(Date.now()).toISOString();
            const description = Values.description || 'Instant Meeting';

            toast.loading('Creating meeting...');

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom:{
                        description
                    }
                }
            });

            setCallDetails(call);

            toast.success('Meeting created successfully!', {
                description: new Date(startsAt).toLocaleString(),
            });

            if(!Values.description){
                router.push(`/meeting/${call.id}`);
            } else {
                setCallDetails(call);
            }

        } catch (error) {
            console.error(error);
            toast.error('Failed to create meeting', {
                description: 'Please try again later.',
            });
        }
    }
    
    return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4' >
        <HomeCard 
        img='/icons/add-meeting.svg'
        title='New Meeting'
        description='Start a instant meeting'
        handleClick={() => setMeetingState('isInstantMeeting')}
        className='bg-orange-500'
        />
        <HomeCard 
        img='/icons/schedule.svg'
        title='Schedule Meeting'
        description='Plan your meeting'
        handleClick={() => setMeetingState('isScheduleMeeting')}
        className='bg-blue-500'
        />
        <HomeCard 
        img='/icons/recordings.svg'
        title='View recordings'
        description='Check out your recordings'
        handleClick={() => setMeetingState('isInstantMeeting')}
        className='bg-purple-500'
        />
        <HomeCard 
        img='/icons/join-meeting.svg'
        title='Join Meeting'
        description='Via invitation link'
        handleClick={() => setMeetingState('isJoinMeeting')}
        className='bg-yellow-500'
        />
        
        {/* Instant Meeting Modal */}
        <MeetingModal 
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title='Start an instant meeting'
        className='text-center'
        buttontext='Start Meeting'
        handleClick={() => {createMeeting(); setMeetingState(undefined);}}
        />
        
        {/* Schedule Meeting Modal */}
        <MeetingModal 
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title='Schedule a meeting'
        className='text-center'
        buttontext='Schedule Meeting'
        handleClick={() => {createMeeting(); setMeetingState(undefined);}}
        />
        { !callDetails ? (
        <MeetingModal 
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title='Create meeting'
        handleClick={() => {createMeeting(); setMeetingState(undefined);}}
           />
        ) : (
        <MeetingModal 
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title='Meeting created successfully!'
        className='text-center'
        buttontext='Copy Meeting Link'
        handleClick={() => {
            // navigator.clipboard.writeText(meetingLink);
            //toast({title:'Link copied to clipboard'})
        }}
        image="icons/checked.svg"
        buttonIcon="icons/copy.svg"
    />)}
        
        {/* Join Meeting Modal */}
        <MeetingModal 
        isOpen={meetingState === 'isJoinMeeting'}
        onClose={() => setMeetingState(undefined)}
        title='Join a meeting'
        className='text-center'
        buttontext='Join Meeting'
        handleClick={() => {createMeeting(); setMeetingState(undefined);}}
        />
        
        </section>
  )
}

export default MeetingTypeList;

