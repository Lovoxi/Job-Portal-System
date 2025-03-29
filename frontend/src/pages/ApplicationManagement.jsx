import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../axiosConfig';
import { toast } from 'react-toastify';

const ApplicationManagement = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [newApplication, setNewApplication] = useState({ jobId: jobId, coverLetter: '' });

  const fetchJobDetails = useCallback(async () => {
    try {
      const res = await axios.get(`/api/jobs/${jobId}`);
      setJob(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch job details');
    }
  }, [jobId]);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/applications/job/${jobId}`);
      setApplications(res.data.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch applications');
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchJobDetails(), fetchApplications()]);
    };

    fetchData();
  }, [fetchJobDetails, fetchApplications]);

  const handleStatusChange = (applicationId, status) => {
    setSelectedStatus(prev => ({
      ...prev,
      [applicationId]: status
    }));
  };

  const updateApplicationStatus = async (applicationId) => {
    try {
      await axios.put(`/api/applications/${applicationId}`, {
        status: selectedStatus[applicationId]
      });
      toast.success('Application status updated successfully');
      fetchApplications();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update application status');
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await axios.delete(`/api/applications/${applicationId}`);
        toast.success('Application deleted successfully');
        fetchApplications();
      } catch (error) {
        toast.error('Failed to delete application');
      }
    }
  };

  const handleNewApplicationChange = (e) => {
    setNewApplication({
      ...newApplication,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateApplication = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/applications', newApplication);
      toast.success('Application created successfully');
      setNewApplication({ jobId: jobId, coverLetter: '' });
      fetchApplications();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create application');
    }
  };

  if (loading) {
    return <div>Loading applications...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/dashboard/jobs" className="text-blue-500 hover:underline">
        &larr; Back to Jobs
      </Link>

      {job && (
        <div className="my-4 p-4 bg-white shadow rounded">
          <h1 className="text-xl font-bold">Applications for: {job.title}</h1>
          <p>{job.description}</p>
        </div>
      )}

      <form onSubmit={handleCreateApplication} className="my-4 p-4 bg-gray-100 rounded">
        <textarea
          name="coverLetter"
          value={newApplication.coverLetter}
          onChange={handleNewApplicationChange}
          className="w-full border p-2"
          placeholder="Enter cover letter"
          required
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
          Submit Application
        </button>
      </form>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3">Applicant</th>
              <th className="px-6 py-3">Cover Letter</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Applied At</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id}>
                <td className="px-6 py-4">{app.applicantId.name}</td>
                <td className="px-6 py-4">{app.coverLetter}</td>
                <td className="px-6 py-4">
                  <select
                    value={selectedStatus[app._id] || app.status}
                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="interviewed">Interviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4">{new Date(app.appliedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => updateApplicationStatus(app._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteApplication(app._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationManagement;
