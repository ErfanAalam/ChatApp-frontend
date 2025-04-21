import { useEffect, useRef, useContext } from "react";
import SendIcon from "@mui/icons-material/Send";
import { UserContext } from "../../context/UserContext";
import UserProfile from "./UserProfile";

const Right = () => {
  const {
    user,
    socket,
    selecteduser,
    messages,
    setMessages,
    newMessage,
    setNewMessage,
    onlineUsers,
  } = useContext(UserContext);

  const OnlineUsersId = Object.keys(onlineUsers);

  let recipient = selecteduser;
  let loggedInUser = user;

  const messageRef = useRef(null);

  useEffect(() => {
    const messagesContainer = document.querySelector(".messages");
    if (!messagesContainer) return;

    // Check if the user is at the bottom before auto-scrolling
    const isAtBottom =
      messagesContainer.scrollHeight - messagesContainer.scrollTop <=
      messagesContainer.clientHeight + 50;

    if (isAtBottom) {
      messageRef.current?.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      if (
        data.senderId === recipient._id ||
        data.recipientId === loggedInUser._id
      ) {
        setMessages((prev) => [
          ...prev,
          { message: data.message, isIncoming: true },
        ]);
      }
    };
    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message");
    };
  }, [recipient._id, socket, setMessages, newMessage, messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!recipient._id) return;

      try {
        const response = await fetch(
          `https://chatapp-backend-g1ef.onrender.com/messages/${loggedInUser._id}/${recipient._id}`
        );
        const data = await response.json();
        const formattedMessages = data.messages.map((msg) => ({
          ...msg,
          isIncoming: msg.senderId !== user._id, // True if the message is not sent by the logged-in user
        }));

        setMessages(
          formattedMessages.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          )
        );
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (selecteduser) {
      fetchMessages();
    }

    return () => {
      socket.off("receive-message");
    };
  }, [recipient._id, socket, setMessages, newMessage, messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const messageData = {
      senderId: loggedInUser._id,
      recipientId: recipient._id,
      message: newMessage,
      createdAt: new Date().toISOString(),
    };

    socket.emit("private-message", messageData);

    try {
      const response = await fetch("https://chatapp-backend-g1ef.onrender.com/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Update the messages state
      setMessages((prev) => [...prev, { ...messageData, isIncoming: false }]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // function to clear the messages

  const clearMessages = async (recipientId) => {
    try {
      const response = await fetch(
        `https://chatapp-backend-g1ef.onrender.com/messages/${loggedInUser._id}/${recipientId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error clearing messages:", errorData);
        throw new Error("Failed to clear messages");
      }

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.recipientId !== recipientId)
      );
      console.log("Messages cleared successfully");
    } catch (error) {
      console.error("Error clearing messages:", error);
    }
  };
  return (
    <div className="flex flex-col h-[calc(100vh-240px)] bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700 rounded-xl shadow-lg p-4 md:p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <UserProfile user={recipient} />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {recipient.username.split(" ")[0]}
          </h2>
          <span
            className={`text-sm ${
              OnlineUsersId.includes(recipient?._id?.toString())
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            {OnlineUsersId.includes(recipient?._id?.toString())
              ? "Online"
              : "Offline"}
          </span>
        </div>
      </div>
      <button
        className="px-4 py-1.5 bg-red-500 text-white text-sm rounded-full font-medium shadow hover:bg-red-600 transition"
        onClick={() => clearMessages(recipient._id)}
      >
        Clear Chat
      </button>
    </div>

    <div className="messages flex-1 overflow-y-auto bg-white/60 p-4 rounded-xl mb-4 space-y-3">
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex ${msg.isIncoming ? "justify-start" : "justify-end"}`}>
          <div
            className={`px-4 py-2 rounded-2xl shadow-md max-w-[75%] ${
              msg.isIncoming
                ? "bg-green-500 text-white rounded-bl-none"
                : "bg-blue-500 text-white rounded-br-none"
            }`}
          >
            <p className="text-sm break-words">{msg.message}</p>
            <span className="text-xs block mt-1 opacity-75">
              {msg.timestamp
                ? new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </span>
          </div>
        </div>
      ))}
      <div ref={messageRef} />
    </div>

    <form
      onSubmit={(e) => (newMessage.length > 0 ? sendMessage(e) : e.preventDefault())}
      className="flex items-center gap-3 bg-white p-3 rounded-xl shadow"
    >
      <input
        type="text"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        autoFocus
        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <button
        type="submit"
        disabled={!newMessage.length}
        className="p-3 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition active:scale-95 disabled:opacity-50"
      >
        <SendIcon className="w-5 h-5" />
      </button>
    </form>
  </div>
);
};
export default Right;
