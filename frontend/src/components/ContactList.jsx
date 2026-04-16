import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import UsersLoadingSkeleton from './UserLoadingSkeleton'

function ContactList() {
    const { getAllContacts, allContacts, setSelectedUser, isUserLoading } = useChatStore()
    const { onlineUsers } = useAuthStore()
        
    useEffect(() => {
        getAllContacts()
    }, [getAllContacts])
        
    if (isUserLoading) return <UsersLoadingSkeleton />

    return (
        <div className="flex flex-col divide-y">
        {allContacts.map((contact) => {
            const isOnline = onlineUsers.includes(contact._id)

            return (
            <div
                key={contact._id}
                onClick={() => setSelectedUser(contact)}
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-base-200 transition"
            >
                
                {/* AVATAR */}
                <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                <div className="w-12 rounded-full">
                    <img
                    src={contact.profilePic || "/avatar.png"}
                    alt={contact.fullName}
                    />
                </div>
                </div>

                {/* USER INFO */}
                <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">
                    {contact.fullName}
                </h4>

                <p className="text-sm text-base-content/60">
                    {isOnline ? "Online" : "Offline"}
                </p>
                </div>

            </div>
            )
        })}
        </div>
    )
}

export default ContactList
