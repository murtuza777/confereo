import React from 'react'

export default function MeetingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="meeting-layout">
      {children}
    </div>
  )
}