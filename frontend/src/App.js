import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import ApplicationManagement from './pages/ApplicationManagement';
import EmployerJobDashboard from './pages/EmployerJobDashboard';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import JobApplicationForm from './components/JobApplicationForm';
import EmployerProfileForm from './components/EmployerProfileForm';
import ApplicationList from './pages/ApplicationList';
import JobDetail from './pages/JobDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/" element={<JobList />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/apply/:jobId" element={<JobApplicationForm />} />
        <Route path="/dashboard/jobs" element={<JobList employerView={true} />} />
        <Route path="/dashboard/jobs/new" element={<JobForm />} />
        <Route path="/dashboard/jobs/edit/:id" element={<JobForm />} />
        <Route path="/dashboard/applications/:jobId" element={<ApplicationManagement />} />
        <Route path="/dashboard/profile" element={<EmployerProfileForm />} />
        <Route path="/dashboard/applications" element={<ApplicationList />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
      </Routes>
    </Router>
  );
}

export default App;