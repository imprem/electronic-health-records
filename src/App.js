import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Loginpage/Login';
import Register from './Loginpage/Register';
import AdminDashboard from './Admin/AdminDashboard';
import AdminUsers from './Admin/AdminUsers';
import AdminBilling from './Admin/AdminBilling';
import Navbar from './Navbar';
import Sidebar from './Admin/Sidebar';
import Scheduling from './Admin/Scheduling';
import Reports from './Admin/Reports';
import Logout from './Logout';
import DoctorDashboard from './Doctor/DoctorDashboard';

const AdminLayout = ({ children }) => (
  <>
    <Navbar />
    <Sidebar />
    <div style={{ marginLeft: '250px', padding: '1rem' }}>
      {children}
    </div>
  </>
);

const DoctorLayout = ({ children }) => (
  <>
    <Navbar />
    <Sidebar />
    <div style={{ marginLeft: '250px', padding: '1rem' }}>
      {children}
    </div>
  </>
);

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          } />
          <Route path="/admin/user" element={
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          } />
          <Route path="/admin/scheduling" element={
            <AdminLayout>
              <Scheduling />
            </AdminLayout>
          } />
          <Route path="/admin/billing" element={
            <AdminLayout>
              <AdminBilling />
            </AdminLayout>
          } />
          <Route path="/admin/report" element={
            <AdminLayout>
              <Reports />
            </AdminLayout>
          } />
          <Route path="/doctor" element={
            <DoctorLayout>
              <DoctorDashboard />
            </DoctorLayout>
          } />
          <Route path="/user" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;