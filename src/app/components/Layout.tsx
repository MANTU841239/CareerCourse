import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import { AppProvider } from '../contexts/AppContext';

export default function Layout() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
