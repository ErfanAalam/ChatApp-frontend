import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Right from "./Right";
import MenuIcon from "@mui/icons-material/Menu";
import { CrossIcon, X } from "lucide-react";

const Left = () => {
  const {
    user,
    users,
    onlineUsers,
    handleUserSelect,
    toggle,
    selecteduser,
    setToggle,
  } = useContext(UserContext);

  const OnlineUsersId = Object.keys(onlineUsers);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="flex min-h-[75vh] relative ">
    {toggle ? (
      <div className="fixed top-18 md:0 left-0 z-50 w-[85vw] md:w-[300px]  md:absolute md:left-[-15px] p-4 bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700 rounded-none shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out transform translate-x-0 scrollbar-hide">
        <div className="flex items-center justify-between mb-6 abso">
          <h2 className="text-xl font-bold text-white">Available Users</h2>
          <button
            onClick={() => setToggle(false)}
            className="text-gray-700 hover:text-gray-900"
            aria-label="Close users list"
          >
            <X/>
          </button>
        </div>
        <ul className="space-y-4">
          {users
            .filter((person) => person._id !== user._id)
            .map((person) => (
              <li
                key={person._id}
                onClick={() => handleUserSelect(person)}
                className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                  OnlineUsersId.includes(person._id)
                    ? "bg-green-100 border-green-500"
                    : "bg-white border-gray-200 hover:border-[#9DC08B]"
                } hover:shadow-md hover:scale-[1.02]`}
                role="button"
                aria-label={`Chat with ${person.username}`}
              >
                <div
                  className="w-12 h-12 bg-cover bg-top rounded-full border-2 border-[#9DC08B] shadow-sm"
                  style={{
                    backgroundImage: `url(${
                      person.profileImage || "/unknown-person-icon.webp"
                    })`,
                  }}
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-800">
                    {capitalize(person.username)}
                  </span>
                  <span
                    className={`text-sm ${
                      OnlineUsersId.includes(person?._id?.toString())
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {OnlineUsersId.includes(person?._id?.toString())
                      ? "Online"
                      : "Offline"}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    ) : (
      <button
        onClick={() => setToggle(true)}
        className="fixed top-16 md:top-24 left-0 z-50 p-2 bg-[#5e1caa] rounded-r-md shadow-md hover:bg-[#6f3fa7] transition"
        aria-label="Open users list"
      >
        <MenuIcon className="text-white" />
      </button>
    )}

    <div className="w-full p-4 md:p-6 ">
      {selecteduser ? (
        <Right />
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <img
            src="/chat-illustration.avif"
            alt="Select a user"
            className="w-48 h-48 mb-4"
          />
          <p className="text-xl text-gray-600">
            Select a user to start chatting
          </p>
        </div>
      )}
    </div>
  </div>
);
};

export default Left;
