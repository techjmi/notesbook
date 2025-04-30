'use client';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/userContext';
const Logout = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const handleLogout = async () => {
    try {
      const res = await axios.post('/api/auth/logout');
      toast.success(res.data.message);
      setUser(null)
      router.push('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Logout failed');
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-300 cursor-pointer"
    >
      Logout
    </button>
  );
};
export default Logout;
