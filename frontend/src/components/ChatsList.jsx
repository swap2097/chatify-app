// import React, { useEffect } from 'react'
// import { useChatStore } from '../store/useChatStore'
// import { useAuthStore } from '../store/useAuthStore'
// import UsersLoadingSkeleton from './UserLoadingSkeleton'
// import NoChatsFound from './NoChatsFound'

// function ChatsList() {
//     const { getMyChatPartners, chats, isUserLoading, setSelectedUser } = useChatStore()
//     const { onlineUsers } = useAuthStore()

//     useEffect(() => {
//         getMyChatPartners()
//     }, [getMyChatPartners])

//     if (isUserLoading) return <UsersLoadingSkeleton />
//     if (chats.length === 0) return <NoChatsFound />

//     return (
//         <div className="flex flex-col divide-y">
//         {chats.map((chat) => {
//             const isOnline = onlineUsers.includes(chat._id)

//             return (
//             <div
//                 key={chat._id}
//                 onClick={() => setSelectedUser(chat)}
//                 className="flex items-center gap-3 p-3 cursor-pointer hover:bg-base-200 transition"
//             >
//                 {/* AVATAR */}
//                 <div className={`avatar ${isOnline ? "online" : "offline"}`}>
//                 <div className="w-12 rounded-full">
//                     <img
//                     src={chat.profilePic || "/avatar.png"}
//                     alt={chat.fullName}
//                     />
//                 </div>
//                 </div>

//                 {/* USER INFO */}
//                 <div className="flex-1 min-w-0">
//                 <h4 className="font-medium truncate">
//                     {chat.fullName}
//                 </h4>

//                 <p className="text-sm text-base-content/60 truncate">
//                     {isOnline ? "Online" : "Offline"}
//                 </p>
//                 </div>

//                 {/* OPTIONAL RIGHT SIDE (time / unread badge) */}
//                 <div className="text-xs text-base-content/50">
//                 {/* You can later add last message time here */}
//                 </div>
//             </div>
//             )
//         })}
//         </div>
//     )
// }

// export default ChatsList

import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UsersLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatsList() {
    const {
        getMyChatPartners,
        chats,
        isUserLoading,
        setSelectedUser,
    } = useChatStore();

    const { onlineUsers } = useAuthStore();

    useEffect(() => {
        getMyChatPartners();
    }, [getMyChatPartners]);

    if (isUserLoading) return <UsersLoadingSkeleton />;
    if (!chats || chats.length === 0) return <NoChatsFound />;

    return (
        <div className="flex flex-col divide-y">
        {chats.map((chat) => {
            const isOnline = onlineUsers?.includes(chat?._id);

            return (
            <div
                key={chat._id}
                onClick={() => setSelectedUser(chat)}
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-base-200 transition"
            >
                {/* AVATAR */}
                <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                <div className="w-12 rounded-full">
                    <img
                    src={chat?.profilePic || "/avatar.png"}
                    alt={chat?.fullName || "User"}
                    />
                </div>
                </div>

                {/* USER INFO */}
                <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">
                    {chat?.fullName || "Unknown User"}
                </h4>

                <p className="text-sm text-base-content/60 truncate">
                    {isOnline ? "Online" : "Offline"}
                </p>
                </div>

                {/* RIGHT SIDE (future use) */}
                <div className="text-xs text-base-content/50">
                {/* Future: last message time / unread badge */}
                </div>
            </div>
            );
        })}
        </div>
    );
}

export default ChatsList;
