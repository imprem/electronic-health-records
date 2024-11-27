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
import DoctorDashboard from './Doctor/Dashboard/DoctorDashboard';
import Doc_sidebar from './Doctor/Sidebar/Doc_sidebar';
import Patients from './Doctor/Patients/Patients';
import Doc_scheduling from './Doctor/Scheduling/Doc_scheduling';
import Doc_reports from './Doctor/Reports/Doc_reports';
import Patient_sidebar from './Patient/Patient_sidebar/Patient_sidebar';
import PatientDashboard from './Patient/Dashboard/PatientDashboard';
import Appointments from './Patient/Appointments/Appointments';
import Medical_bills from './Patient/Medical Bills/Medical_bills';
import Medical_records from './Patient/Medical records/Medical_records';
import Medications from './Patient/Medications/Medications';

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
    <Doc_sidebar />
    <div style={{ marginLeft: '300px', padding: '1rem' }}>
      {children}
    </div>
  </>
);

const PatientLayout = ({ children }) => (
  <>
    <Navbar />
    <Patient_sidebar />
    <div style={{marginLeft: '300px', padding: '1rem'}}>
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
          <Route path="/doctor/patients" element={
            <DoctorLayout>
              <Patients />
            </DoctorLayout>
          } />
          <Route path='/doctor/scheduling' element={
            <DoctorLayout>
              <Doc_scheduling />
            </DoctorLayout>
          } />
          <Route path='/doctor/report' element={
            <DoctorLayout>
              <Doc_reports />
            </DoctorLayout>
          } />
          
          <Route path='/patients' element={
            <PatientLayout>
              <PatientDashboard />
            </PatientLayout>
          } />
          <Route path='/patients/appointments' element={
            <PatientLayout>
              <Appointments />
            </PatientLayout>
          } />
          <Route path='/patients/medical_bills' element={
            <PatientLayout>
              <Medical_bills />
            </PatientLayout>
          } />
          <Route path='/patients/medical_records' element={
            <PatientLayout>
              <Medical_records />
            </PatientLayout>
          } />
          <Route path='/patients/medications' element={
            <PatientLayout>
              <Medications />
            </PatientLayout>
          } />
          <Route path="/user" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;