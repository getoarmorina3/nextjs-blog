import SignIn from '@/components/user/SignIn'
import { FC } from 'react'

const page: FC = () => {
  return (
    <div className='h-[calc(100vh-5rem)]'>
      <div className='h-full max-w-2xl px-8 md:px-0 mx-auto flex flex-col items-center justify-center gap-20'>
        <SignIn />
      </div>
    </div>
  )
}

export default page