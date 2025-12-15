'use client'

import React, { useState } from 'react'
import HomeCard from './ui/HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './ui/MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { toast } from 'sonner';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { Input } from "@/components/ui/input"

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

        let toastId;
        try {
            if (!Values.dateTime) {
                toast.error('Please select a date and time');
                return;
            }

            const id = crypto.randomUUID();
            const call = client.call('default',id);

            if(!call) throw new Error('Failed to create call');

            const startsAt = Values.dateTime.toISOString() || 
            new Date(Date.now()).toISOString();
            const description = Values.description || 'Instant Meeting';

            toastId = toast.loading('Creating meeting...');

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom:{
                        description
                    }
                }
            });

            setCallDetails(call);

            if(!Values.description){
                router.push(`/meeting/${call.id}`);
            }
            
            toast.success('Meeting created successfully!', {
                description: new Date(startsAt).toLocaleString(),
            });

        } catch (error) {
            console.error("Error creating meeting:", error);
            toast.error('Failed to create meeting', {
                description: 'Please try again later.',
            });
        } finally {
            if (toastId) toast.dismiss(toastId);
        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
    
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
        handleClick={() => router.push('/recordings')}
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
        {!callDetails ? (
        <MeetingModal 
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => {
            setMeetingState(undefined);
            setValues({ dateTime: new Date(), description: '', link: '' });
        }}
        title='Create meeting'
        buttontext='Create Meeting'
        handleClick={createMeeting}
           >
            <div className='flex flex-col gap-2.5'>
              <label className='text-base text-normal leading-[22px] text-sky-2'>
                Add a description
              </label>
              <Textarea 
                className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
                onChange={(e) => setValues({...Values,description:e.target.value})}
                value={Values.description}
              />
            </div>
            <div className='flex flex-col gap-2.5'>
              <label className='text-base text-normal leading-[22px] text-sky-2'>
                Select date and time
              </label>
              <ReactDatePicker
                selected={Values.dateTime}
                onChange={(date) => setValues({...Values,dateTime:date!})}
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={15}
                timeCaption='time'
                dateFormat='MM/dd/yyyy h:mm aa'
                className='w-full rounded bg-dark-3 p-2 focus:outline-none'
              />
            </div>
            </MeetingModal>
        ) : (
        <MeetingModal 
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => {
            setMeetingState(undefined);
            setCallDetails(undefined);
            setValues({ dateTime: new Date(), description: '', link: '' });
        }}
        title='Meeting created successfully!'
        className='text-center'
        buttontext='Copy Meeting Link'
        handleClick={() => {
            navigator.clipboard.writeText(`${window.location.origin}/meeting/${callDetails?.id}`);
            toast.success('Link copied to clipboard');
        }}
        image="/icons/checked.svg"
        buttonIcon="/icons/copy.svg"
    />)}
        
        {/* Join Meeting Modal */}
        <MeetingModal 
        isOpen={meetingState === 'isJoinMeeting'}
        onClose={() => setMeetingState(undefined)}
        title='type the link here'
        className='text-center'
        buttontext='Join Meeting'
        handleClick={() => router.push(Values.link)}
        >

        <Input
        placeholder='meeting link'
        className='border-none bg-dark-3 
        focus-visible:ring-0 focus-visible:ring-offset-0 p-2'
        onChange={(e) => setValues({...Values,
         link:e.target.value})}
        
        />
        </MeetingModal>
        
        </section>
  )
}

export default MeetingTypeList;
