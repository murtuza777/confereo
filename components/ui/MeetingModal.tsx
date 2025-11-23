import React, { ReactNode } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Image from 'next/image';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface MeetingModalProps{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    buttontext?: string;
    handleClick: () => void;
    children?: ReactNode;
    image?: string;
    buttonIcon?: string;
}

const MeetingModal = ({ isOpen, onClose, title, className, buttontext, handleClick, children, image, buttonIcon }: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("flex w-full max-w-[520px] flex-col gap-5 border-none !bg-dark-1 px-6 py-9 text-white", className)}>
        <div className='flex flex-col gap-6'>
          {image && (
            <div className='flex justify-center'>
              <img src={image} alt="image" width={72} height={72} style={{ width: 'auto', height: 'auto' }} />
            </div>
          )}
          <DialogHeader>
            <DialogTitle className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</DialogTitle>
            <DialogDescription className="sr-only">{title}</DialogDescription>
          </DialogHeader>
          {children}
          <Button className='bg-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0' onClick={handleClick}>
            {buttonIcon && (<Image src={buttonIcon} alt='buttonIcon' width={13} height={13} />)}
            &nbsp;
            {buttontext || 'schedule meeting'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MeetingModal
