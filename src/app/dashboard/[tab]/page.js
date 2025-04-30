
// import Notes from '@/components/Notes';
// import Upcoming from '@/components/Upcoming';

import Footer from "@/components/Footer";
import Notes from "@/components/Notes";
import Profile from "@/components/Profile";
// import Sidebar from "@/components/Sidebar";

export  default async function TabPage({ params }) {
  if (params.tab === 'notes') return <Notes/>;
  if (params.tab === 'profile') return <Profile />;
  return <div>Tab not found</div>;
}
