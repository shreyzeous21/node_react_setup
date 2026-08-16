import React from 'react'
import { FaCode } from "react-icons/fa6";

export default function Header() {
  return (
    <div className='h-16 sticky top-0 z-50 flex justify-center items-center '>
      <div className='container h-full mx-auto flex items-center justify-between w-full border-b rounded-2xl px-4'>
        <div className='flex items-center gap-2 text-cyan-400'>
          <FaCode className='size-8' /> <span className='text-xl font-bold'>Dj-Trading-Bull</span>
        </div>
        <div>Logo</div>
      </div>
    </div>
  )
}
