import { redirect } from 'next/navigation'

import { UserNameForm } from '@/components/user/UserNameForm'
import { authOptions, getAuthSession } from '@/lib/auth'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage account and website settings.',
}

export default async function SettingsPage() {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  return (
    <div className='max-w-4xl mx-auto  p-4 md:py-12'>
      <div className='grid items-start gap-8'>
        <h1 className='font-bold text-3xl md:text-4xl'>Settings</h1>

        <div className='grid gap-10'>
          <UserNameForm />
        </div>
      </div>
    </div>
  )
}