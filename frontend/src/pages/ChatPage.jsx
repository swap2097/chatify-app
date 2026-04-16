import React from 'react'
import { useChatStore } from '../store/useChatStore'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer'
import ProfileHeader from '../components/ProfileHeader'
import ActiveTabSwitch from '../components/ActiveTabSwitch'
import ChatsList from '../components/ChatsList'
import ContactList from '../components/ContactList'
import ChatContainer from '../components/ChatContainer'
import NoConversationPlaceholder from '../components/NoConversationPlaceholder'

function ChatPage() {
    const { activeTab, selectedUser } = useChatStore()

    return (
    <div className="w-full min-h-screen bg-gray-100 p-3 md:p-6">
        <div className="max-w-7xl mx-auto h-[90vh]">
            
            <BorderAnimatedContainer>
            <div className="flex h-full rounded-2xl overflow-hidden bg-white shadow-lg">
                
                {/* LEFT SIDEBAR */}
                <div className="w-full md:w-1/3 lg:w-1/4 border-r flex flex-col">
                
                {/* HEADER */}
                <div className="p-4 border-b">
                    <ProfileHeader />
                </div>

                {/* TAB SWITCH */}
                <div className="px-4 py-2 border-b">
                    <ActiveTabSwitch />
                </div>

                {/* LIST */}
                <div className="flex-1 overflow-y-auto">
                    {activeTab === "chats" ? (
                    <ChatsList />
                    ) : (
                    <ContactList />
                    )}
                </div>
                </div>

                {/* RIGHT CHAT AREA */}
                <div className="hidden md:flex flex-1 flex-col">
                {selectedUser ? (
                    <ChatContainer />
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                    <NoConversationPlaceholder />
                    </div>
                )}
                </div>

            </div>
            </BorderAnimatedContainer>

        </div>
        </div>
    )
}

export default ChatPage
