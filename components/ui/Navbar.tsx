import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-[#0A192F] px-6 py-3 lg:px-10'>
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="confero logo"
          className='max-sm:size-10'
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">Confereo</p>
      </Link>
      <div className="flex items-center gap-4">
        
      </div>
    </nav>
  )
}

export default Navbar