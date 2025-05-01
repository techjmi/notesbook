'use client';

import Image from 'next/image';
import Logout from '@/components/Logout';
import { useUser } from '../context/userContext';

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return <div className="text-center py-20 ">Loading or unauthorized...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl text-center">
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 mb-4">
          <Image
            src={user.image || '/default-avatar.png'}
            alt={user.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className=" mb-6">{user.email}</p>
        <Logout />
      </div>
    </div>
  );
}
