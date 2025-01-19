<<<<<<< Updated upstream
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Login from './pages/login';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import NewReq from './pages/newReq';
import Magic from './pages/magic';
=======
import { useEffect, useState } from 'react'; 
import { Route, Routes, useLocation } from 'react-router-dom'; 
import Loader from './common/Loader'; 
import PageTitle from './components/PageTitle'; 
import Login from './pages/login'; 
import Home from './pages/Home'; 
import Profile from './pages/Profile'; 
import Settings from './pages/Settings'; 
import DefaultLayout from './layout/DefaultLayout'; 
import NewReq from './pages/newReq'; 
import Magic from './pages/magic'; 
>>>>>>> Stashed changes
import Landing from './pages/landing';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <PageTitle title="PeerUP | Online Peer Tutoring Platform for High Schoolers" />
              <ECommerce />
            </>
          }
        />

        <Route path="/new" element={<NewReq />} />
        <Route path="/magic" element={<Magic />} />
        <Route path="/" element={<Landing />} />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | PeerUP online" />
              <Settings />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
