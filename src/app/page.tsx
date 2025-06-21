import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='m-10'>
      <SignInButton>
        <Button>
          Sign In
        </Button>
      </SignInButton>

    </div>
  )
}

export default page