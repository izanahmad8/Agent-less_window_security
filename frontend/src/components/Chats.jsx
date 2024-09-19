import React from "react";

export default function Chats() {
  const openChatWindow = () => {
    window.open("https://chit-chat-anonymous.netlify.app/");
  };
  return (
    <div className="flex justify-center items-center mb-36 mt-36">
      <button
        className="text-center bg-[#ec4e00] hover:bg-transparent text-white font-semibold hover:text-white py-2 px-4 border border-white rounded my-8"
        onClick={openChatWindow}
      >
        Chat with our Executive
      </button>
    </div>
  );
}
