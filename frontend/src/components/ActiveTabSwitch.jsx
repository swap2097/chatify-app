// import React from 'react'
// import { useChatStore } from '../store/useChatStore'

// function ActiveTabSwitch() {
//     const { activeTab, setActiveTab } = useChatStore()

//     return (
//         <div className="tabs tabs-boxed bg-base-200 p-1 w-full">
        
//         <button
//             onClick={() => setActiveTab("chats")}
//             className={`tab flex-1 transition-all duration-200 ${
//             activeTab === "chats"
//                 ? "tab-active bg-primary text-primary-content"
//                 : "text-base-content/60 hover:text-base-content"
//             }`}
//         >
//             Chats
//         </button>

//         <button
//             onClick={() => setActiveTab("contacts")}
//             className={`tab flex-1 transition-all duration-200 ${
//             activeTab === "contacts"
//                 ? "tab-active bg-primary text-primary-content"
//                 : "text-base-content/60 hover:text-base-content"
//             }`}
//         >
//             Contacts
//         </button>

//         </div>
//     )
// }

// export default ActiveTabSwitch

import React from "react";
import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
    const { activeTab, setActiveTab } = useChatStore();

    const tabs = [
        { id: "chats", label: "Chats" },
        { id: "contacts", label: "Contacts" },
    ];

    return (
        <div className="tabs tabs-boxed bg-base-200 p-1 w-full">
        {tabs.map((tab) => (
            <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab flex-1 transition-all duration-200 ${
                activeTab === tab.id
                ? "tab-active bg-primary text-primary-content"
                : "text-base-content/60 hover:text-base-content"
            }`}
            >
            {tab.label}
            </button>
        ))}
        </div>
    );
}

export default ActiveTabSwitch;
