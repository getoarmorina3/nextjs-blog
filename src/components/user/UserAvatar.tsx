import { User } from '@prisma/client'
import { AvatarProps } from '@radix-ui/react-avatar'

import { Icons } from '../ui/icons'
import { Avatar, AvatarFallback } from '../ui/avatar'
import Image from 'next/image'

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image' | 'name'>
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className='relative aspect-square h-full w-full'>
          <Image
            src={user.image}
            alt='profile picture'
            referrerPolicy='no-referrer'
            width={32}
            height={32}
            priority={true}
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.name}</span>
          <Icons.user className='h-4 w-4' />
        </AvatarFallback>
      )}
    </Avatar>
  )
}