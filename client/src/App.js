import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import PublicRoute from './components/Routes/PublicRoute';
import Donor from './pages/Dashboard/Donor';
import Hospitals from './pages/Dashboard/hospitals';
import OrganizationPage from './pages/Dashboard/organizationPage';
import Consumer from './pages/Dashboard/Consumer';
import Donation from './pages/Dashboard/Donation';
import Analytics from './pages/Dashboard/Analytics';
import AdminHome from './pages/Admin/AdminHome';
import HospitalList from './pages/Admin/HospitalList';
import DonorList from './pages/Admin/Donorlist';
import OrgList from './pages/Admin/OrgList';

//Routes act like container and route is used to create single container
function App() {
  return (
    <>
      <ToastContainer/>
      <Routes>
      <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor-list"
          element={
            <ProtectedRoute>
              <DonorList />
            </ProtectedRoute>
          }
        />
         <Route
          path="/hospital-list"
          element={
            <ProtectedRoute>
              <HospitalList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/org-list"
          element={
            <ProtectedRoute>
              <OrgList />
            </ProtectedRoute>
          }
        />

          <Route
         path="/donor"
          element={
            <ProtectedRoute>
              <Donor/>
          </ProtectedRoute>
          } />

        <Route
         path="/hospital"
          element={
            <ProtectedRoute>
              <Hospitals/>
          </ProtectedRoute>
          } />

        <Route
         path="/organization"
          element={
            <ProtectedRoute>
              <OrganizationPage/>
          </ProtectedRoute>
          } />
         
         <Route
         path="/consumer"
          element={
            <ProtectedRoute>
              <Consumer/>
          </ProtectedRoute>
          } />
         
         <Route
         path="/donation"
          element={
            <ProtectedRoute>
              <Donation/>
          </ProtectedRoute>
          } />
         
         <Route
         path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics/>
          </ProtectedRoute>
          } />

        <Route
         path="/"
          element={
            <ProtectedRoute>
              <HomePage/>
          </ProtectedRoute>
          } />

        <Route path="/login" element={
          <PublicRoute>
             <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
              <Register />
         </PublicRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
