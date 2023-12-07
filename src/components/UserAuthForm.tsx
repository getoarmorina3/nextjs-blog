'use client'

import { cn } from '../lib/utils'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { FC } from 'react'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'
import { Icons } from './ui/icons'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const loginWith = async (provider: string) => {
    setIsLoading(true);

    try {
      await signIn(provider);
    } catch (error) {
      toast({
        title: 'Error',
        description: `There was an error logging in with ${provider}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex  flex-col justify-center gap-4', className)} {...props}>
      <Button
      variant={'outline'}
        isLoading={isLoading}
        type='button'
        size='sm'
        className='w-full'
        onClick={() => loginWith('google')}
        disabled={isLoading}>
        {isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
        Google
      </Button>
      <Button
        isLoading={isLoading}
        type='button'
        size='sm'
        className='w-full'
        onClick={() => loginWith('github')}
        disabled={isLoading}>
        {isLoading ? null : <Icons.gitHub className='h-4 w-4 mr-2' />}
        Github
      </Button>
    </div>
  )
}

export default UserAuthForm