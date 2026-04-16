import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import { XIcon } from 'lucide-react'

function ChatHeader() {
    const { selectedUser, setSelectedUser } = useChatStore()
    const { onlineUsers } = useAuthStore()
    const isOnline = onlineUsers.includes(selectedUser._id)

    useEffect(() => {
        const handleEscKey = (event) => {
        if (event.key === "Escape") setSelectedUser(null)
        }

        window.addEventListener("keydown", handleEscKey)
        return () => window.removeEventListener("keydown", handleEscKey)
    }, [setSelectedUser])

    return (
        <div className="flex items-center justify-between p-3 border-b bg-base-100">
        
        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
            
            {/* AVATAR */}
            <div className={`avatar ${isOnline ? "online" : "offline"}`}>
            <div className="w-10 rounded-full">
                <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                />
            </div>
            </div>

            {/* USER INFO */}
            <div>
            <h3 className="font-semibold text-sm md:text-base">
                {selectedUser.fullName}
            </h3>
            <p className={`text-xs ${isOnline ? "text-green-500" : "text-base-content/50"}`}>
                {isOnline ? "Online" : "Offline"}
            </p>
            </div>
        </div>

        {/* RIGHT SIDE */}
        <button
            onClick={() => setSelectedUser(null)}
            className="btn btn-ghost btn-sm tooltip"
            data-tip="Close chat (Esc)"
        >
            <XIcon className="w-5 h-5" />
        </button>
        </div>
    )
}

export default ChatHeader
