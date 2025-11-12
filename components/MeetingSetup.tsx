'use client';

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react'

interface MeetingSetupProps {
    setIsSetupComplete: (value: boolean) => void;
}

const MeetingSetup = ({ setIsSetupComplete }: MeetingSetupProps) => {
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
    const call = useCall();

    if(!call){
        throw new Error('usecall must be used within Streamcall component');
    }

    useEffect(() => {
        if(isMicCamToggledOn){
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable();
            call?.microphone.enable();
        }
    
    },[isMicCamToggledOn,call?.camera,call?.microphone])

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold'>Meeting Setup</h1>
        <VideoPreview />
        <div className='flex h-screen w-full flex-col items-center justify-center gap-3'>
            <label className='flex h-16 items-center justify-center gap-3'>
                <input type='checkbox'
                checked={isMicCamToggledOn}
                onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
                />
                Join with mic and cam off
            </label>
           <DeviceSettings />
           <button className='rounded-md bg-green-500 px-4 py-2.5'>
            Join Meeting
           </button>
        </div>
    </div>
  )
}

export default MeetingSetup