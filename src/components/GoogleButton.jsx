import { FcGoogle } from "react-icons/fc";

const GoogleButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex cursor-pointer items-center justify-center  gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
    >
      <FcGoogle size={20} />
      <span className="text-sm font-medium">Continue with Google</span>
    </button>
  );
};

export default GoogleButton;
