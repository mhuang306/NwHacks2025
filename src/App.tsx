import { useEffect, useState } from 'react'; 
import { Route, Routes, useLocation } from 'react-router-dom'; 
import Loader from './common/Loader'; 
import PageTitle from './components/PageTitle'; 
import Login from './pages/login'; 
import Home from './pages/Dashboard/ECommerce'; 
import Profile from './pages/Profile'; 
import Settings from './pages/Settings'; 
import DefaultLayout from './layout/DefaultLayout'; 
import NewReq from './pages/newReq'; 
import Magic from './pages/magic'; 
import Landing from './pages/landing';

function App() {
  const [loading, setLoading] = useState<boolean>(true); const { pathname } = useLocation();

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  useEffect(() => { setTimeout(() => setLoading(false), 1000); }, []);

  return loading ? <Loader /> : (
    <DefaultLayout>
      <Routes>
        <Route path="/home" element={<><PageTitle title="PeerUP | Online Peer Tutoring Platform for High Schoolers" /><Home /></>} />
        <Route path="/new" element={<NewReq />} />
        <Route path="/magic" element={<Magic />} />
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
