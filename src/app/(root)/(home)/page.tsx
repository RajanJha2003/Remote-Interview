"use client"

import ActionCard from '@/components/ActionCard'
import MeetingModal from '@/components/MeetingModal'
import { Button } from '@/components/ui/button'
import { QUICK_ACTIONS } from '@/constants'
import { useUserRole } from '@/hooks/useUserRole'
import { SignInButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
  const router=useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const {isCandidate,isInterviewer,isLoading}=useUserRole();

  const handleQuickAction=(title:string)=>{
    switch(title){
      case "New Call":
        setModalType("start")
        setShowModal(true);
        break;

       case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
        
        default:
          router.push(`/${title.toLowerCase()}`)



    }
  }

  return (
    <div className='container max-w-7xl mx-auto p-6'>
      <div className='rounded-lg bg-card p-6 border shadow-sm mb-10'>
        <h1 className='text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent'>Welcome back!</h1>
      </div>
      <p className='text-muted-foreground mt-2'>
        {
          isInterviewer ? "Manage your interviews and review candidates effectively":"Access your upcoming interviews and preparations"
        }

      </p>
      {
        !isInterviewer ? (
          <>
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => {handleQuickAction(action.title)}}
              />
            ))}



          </div>
          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modalType === "join"}
          />
          
          </>

        ):(
          <div>
            xyz
          </div>
        )
      }
      

    </div>
    
  )
}

export default page