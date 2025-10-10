import React, { ReactNode } from 'react'

interface MeetingModalProps{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    buttontext?: string;
    handleClick: () => void;
    children?: ReactNode;
    image?: string;
}

const MeetingModal = ({isOpen, onClose, title, className, buttontext, handleClick, children}: MeetingModalProps) => {
  return (
    <div>MeetingModal</div>
  )
}

export default MeetingModal