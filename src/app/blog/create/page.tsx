import { Editor } from '@/components/Editor'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Blog',
};

const page = async () => {
  return (
    <div className='flex flex-col items-center gap-6 mt-4 mb-20'>
      
      <Editor />

      <div className='flex w-full justify-center'>
        <Button type='submit' className='w-1/4' form='post-form'>
          Publish Blog
        </Button>
      </div>
    </div>
  )
}

export default page
