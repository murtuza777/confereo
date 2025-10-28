'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import { type SidebarLink, sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'

const Sidebar = () => {
  const pathname = usePathname()

  if (!sidebarLinks) return null;

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[#0A192F] p-6 pt-16 text-white max-sm:hidden lg:w-[264px] border-r border-white/5">
      <div className='flex flex-col gap-6'>
        {sidebarLinks.map((link: SidebarLink) => {
          const isActive = pathname === link.route || 
            (pathname?.startsWith(link.route) && link.route !== '/');

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start transition-all hover:bg-white/5",
                isActive && "bg-[#0877FF]"
              )}
            >
              <Image 
                src={link.imgUrl}
                alt={link.label}
                width={24}
                height={24}
                style={{ width: 'auto', height: 'auto' }}
              />
              <p className="text-lg font-semibold max-lg:hidden">{link.label}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Sidebar