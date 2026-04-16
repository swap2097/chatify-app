// import React, { useRef, useState } from 'react'
// import { LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react"
// import { useAuthStore } from '../store/useAuthStore'
// import { useChatStore } from '../store/useChatStore'

// const mouseClickSound = new Audio("/sounds/mouse-click.mp3")

// function ProfileHeader() {
//     const { logout, authUser, updateProfile } = useAuthStore()
//     const { isSoundEnabled, toggleSound } = useChatStore()
//     const [selectedImg, setSelectedImg] = useState(null)

//     const fileInputRef = useRef(null)

//     const handleImageUpload = (e) => {
//         const file = e.target.files[0]
//         if (!file) return

//         // 🚫 Limit size (e.g. 2MB)
//         if (file.size > 2 * 1024 * 1024) {
//             alert("Image must be less than 2MB")
//             return
//         }

//         const reader = new FileReader()
//         reader.readAsDataURL(file)

//         reader.onloadend = async () => {
//             const base64Image = reader.result
//             setSelectedImg(base64Image)
//             await updateProfile({ profilePic: base64Image })
//         }
//     }

//     return (
//         <div className="flex items-center justify-between gap-3">
        
//         {/* LEFT - USER INFO */}
//         <div className="flex items-center gap-3">
            
//             {/* AVATAR */}
//             <div className="relative">
//             <button
//                 onClick={() => fileInputRef.current.click()}
//                 className="avatar"
//             >
//                 <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 cursor-pointer overflow-hidden">
//                 <img
//                     src={selectedImg || authUser.profilePic || "/avatar.png"}
//                     alt="User"
//                     className="object-cover"
//                 />
//                 </div>

//                 {/* HOVER OVERLAY */}
//                 <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 rounded-full flex items-center justify-center text-xs text-white transition">
//                 Change
//                 </div>
//             </button>

//             <input
//                 type="file"
//                 accept="image/*"
//                 ref={fileInputRef}
//                 onChange={handleImageUpload}
//                 className="hidden"
//             />
//             </div>

//             {/* NAME + STATUS */}
//             <div>
//             <h3 className="font-semibold text-sm md:text-base">
//                 {authUser.fullName}
//             </h3>
//             <p className="text-xs text-green-500">● Online</p>
//             </div>
//         </div>

//         {/* RIGHT - ACTION BUTTONS */}
//         <div className="flex items-center gap-2">
            
//             {/* SOUND BUTTON */}
//             <button
//             onClick={() => {
//                 mouseClickSound.currentTime = 0
//                 mouseClickSound.play().catch(() => {})
//                 toggleSound()
//             }}
//             className="btn btn-sm btn-ghost"
//             >
//             {isSoundEnabled ? (
//                 <Volume2Icon className="w-5 h-5" />
//             ) : (
//                 <VolumeOffIcon className="w-5 h-5" />
//             )}
//             </button>

//             {/* LOGOUT */}
//             <button
//             onClick={logout}
//             className="btn btn-sm btn-ghost text-error"
//             >
//             <LogOutIcon className="w-5 h-5" />
//             </button>
//         </div>
//         </div>
//     )
// }

// export default ProfileHeader



// import React from 'react'

// function ProfileHeader() {
//     return (
//         <div>
//             Profile
//         </div>
//     )
// }

// export default ProfileHeader

import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

function ProfileHeader() {
    const { logout, authUser, updateProfile } = useAuthStore();
    const { isSoundEnabled, toggleSound } = useChatStore();

    const [selectedImg, setSelectedImg] = useState(null);
    const fileInputRef = useRef(null);
    const audioRef = useRef(new Audio("/sounds/mouse-click.mp3"));

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Optional: prevent large uploads (you can tweak limit)
        if (file.size > 2 * 1024 * 1024) {
        console.log("File too large (max 2MB)");
        return;
        }

        const reader = new FileReader();

        reader.onloadend = async () => {
        try {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        } catch (err) {
            console.log("Image upload failed:", err);
        }
        };

        reader.readAsDataURL(file);
    };

    const handleSoundToggle = () => {
        try {
        const audio = audioRef.current;
        audio.currentTime = 0;
        audio.play().catch(() => {});
        } catch (err) {
        console.log("Audio error:", err);
        }

        toggleSound();
    };

    return (
        <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
            
            {/* LEFT SECTION */}
            <div className="flex items-center gap-3">
            
            {/* AVATAR */}
            <div className="avatar online">
                <button
                className="size-14 rounded-full overflow-hidden relative group"
                onClick={() => fileInputRef.current?.click()}
                >
                <img
                    src={selectedImg || authUser?.profilePic || "/avatar.png"}
                    alt="User"
                    className="size-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white text-xs">Change</span>
                </div>
                </button>

                <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                />
            </div>

            {/* USER INFO */}
            <div>
                <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
                {authUser?.fullName || "User"}
                </h3>
                <p className="text-slate-400 text-xs">Online</p>
            </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex gap-4 items-center">
            
            {/* LOGOUT */}
            <button
                className="text-slate-400 hover:text-slate-200 transition-colors"
                onClick={logout}
            >
                <LogOutIcon className="size-5" />
            </button>

            {/* SOUND TOGGLE */}
            <button
                className="text-slate-400 hover:text-slate-200 transition-colors"
                onClick={handleSoundToggle}
            >
                {isSoundEnabled ? (
                <Volume2Icon className="size-5" />
                ) : (
                <VolumeOffIcon className="size-5" />
                )}
            </button>

            </div>
        </div>
        </div>
    );
}

export default ProfileHeader;
