import { Editor } from '@/components/Editor'
import { Button } from '@/components/ui/button'

const page = async () => {
  return (
    <div className='flex flex-col items-start gap-6'>
      {/* heading */}
      <div className='py-5'>
        <div className='-ml-2 -mt-2 flex flex-wrap items-baseline'>
          <h3 className='ml-2 mt-8 text-4xl font-semibold leading-6'>
            Create Post
          </h3>
        </div>
      </div>

      {/* form */}
      <Editor />

      <div className='w-full flex justify-end'>
        <Button type='submit' className='w-full' form='post-form'>
          Post
        </Button>
      </div>
    </div>
  )
}

export default page
