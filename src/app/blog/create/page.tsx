import { Editor } from '@/components/Editor'
import { Button } from '@/components/ui/button'

const page = async () => {
  return (
    <div className='flex flex-col items-center gap-6 mt-4 mb-20'>
      {/* heading */}
      {/* <div className='py-5'>
        <div className='-ml-2 -mt-2 flex flex-wrap items-baseline'>
          <h3 className='ml-2 mt-8 text-4xl font-semibold leading-6'>
            Create Blog
          </h3>
        </div>
      </div> */}

      {/* form */}
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
