import { useEffect, useState } from 'react';
import './App.css';
import MainApp from './apps/main/App';
import HackathonApp from './apps/hackathon/App';
// import MarqueeBanner from './shared/components/MarqueeBanner';

function App() {
  const [subdomain, setSubdomain] = useState<string>('');

  useEffect(() => {
    // Get the current hostname and detect subdomain
    const hostname = window.location.hostname;
    
    // Extract subdomain (handles localhost and production domains)
    // For localhost: hackathon.localhost or just localhost
    // For production: hackathon.nigma.in or nigma.in
    const parts = hostname.split('.');
    
    if (parts.length >= 2) {
      // If we have at least 2 parts, check if the first part is a subdomain
      const potentialSubdomain = parts[0];
      
      // Check if it's a recognized subdomain (not www or the main domain)
      if (potentialSubdomain === 'hackathon') {
        setSubdomain('hackathon');
      } else {
        setSubdomain('main');
      }
    } else {
      // Single part hostname (like 'localhost'), default to main
      setSubdomain('main');
    }
  }, []);

  // Show loading state while detecting subdomain
  if (!subdomain) {
    return (
      <div className="bg-background-dark min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    );
  }

  // Route to appropriate app based on subdomain
  return (
    <>
      {/* Keep<MarqueeBanner /> */}
      {subdomain === 'hackathon' ? <HackathonApp /> : <MainApp />}
    </>
  );
}

export default App;
