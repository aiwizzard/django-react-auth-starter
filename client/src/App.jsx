import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
        <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
