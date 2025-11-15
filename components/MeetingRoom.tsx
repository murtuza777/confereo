'use client';

import { cn } from '@/lib/utils';
import { PaginatedGridLayout, SpeakerLayout, CallParticipantsList, CallControls } from '@stream-io/video-react-sdk';
import React, { useState } from 'react';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

export const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full items-center justify-center'>
          <CallLayout />
        </div>
        <div className={cn('h-[calc(100vh-86px)] ml-2', { 'hidden': !showParticipants })}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 border-t border-dark-1 bg-dark-2 py-3'>
        <CallControls />
      </div>
    </section>
  );
};

export default MeetingRoom;