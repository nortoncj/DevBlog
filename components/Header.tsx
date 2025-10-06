import React from 'react'

interface Props {
  title?: string;
}

const Header = ({ title = ""}: Props) => {
  return (
      <header className='py-14 px-4 text-center bg-gradient-to-r from-[#8b1538] to-[#E8B4B8] dark:to-[#8b1538] dark:via-[#5c0a23] '>
          <h2 className='uppercase text-2xl mx-auto max-w-2xl font-bold'>{title}</h2>
    </header>
  )
}

export default Header;