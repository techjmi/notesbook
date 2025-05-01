
// import Notes from '@/components/Notes';
// import Upcoming from '@/components/Upcoming';

import Footer from "@/components/Footer";
import Notes from "@/components/Notes";
import PastNotes from "@/components/PastNotes";
import Profile from "@/components/Profile";
import Todays from "@/components/Todays";
import Upcoming from "@/components/Upcoming";
// import Sidebar from "@/components/Sidebar";

export  default async function TabPage({ params }) {
  if (params.tab === 'notes') return <Notes/>;
  if (params.tab === 'profile') return <Profile />;
  if (params.tab === 'upcoming') return <Upcoming />;
  if (params.tab === 'past') return <PastNotes />;
  if (params.tab === 'today') return <Todays />;
  return <div>Tab not found</div>;
}
