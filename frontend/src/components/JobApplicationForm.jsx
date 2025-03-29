import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from '../axiosConfig';
import { toast } from 'react-toastify';

const JobApplicationForm = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    resume: '',
    coverLetter: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const fetchJobDetails = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/jobs/${jobId}`);
      const jobData = res.data.data;

      if (jobData.status !== 'open') {
        toast.error('This job is no longer accepting applications');
        navigate('/jobs');
        return;
      }
      
      setJob(jobData);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch job details');
      navigate('/jobs');
    }
  }, [jobId, navigate]);

  const fetchApplicationStatus = useCallback(async () => {
    try {
      const res = await axios.get(`/api/applications/check/${jobId}`);
      setHasApplied(res.data.hasApplied);
    } catch (error) {
      console.error('Failed to check application status');
    }
  }, [jobId]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchJobDetails(),
        fetchApplicationStatus()
      ]);
    };

    fetchData();
  }, [fetchJobDetails, fetchApplicationStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasApplied) {
      toast.error('You have already applied to this job');
      navigate('/dashboard/applications');
      return;
    }
    
    try {
      setSubmitting(true);
      
      await axios.post('/api/applications', {
        ...formData,
        jobId
      });
      
      toast.success('Application submitted successfully');
      navigate('/dashboard/applications');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to submit application';
      
      if (error.response?.status === 400 && errorMessage.includes('already applied')) {
        toast.error('You have already applied to this job');
        navigate('/dashboard/applications');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-2">Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="mb-6">
        <Link to="/jobs" className="text-blue-500 hover:underline">
          &larr; Back to Jobs
        </Link>
      </div>
      
      {job && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
          <div className="mb-4">
            <p className="text-gray-700">{job.company}</p>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-gray-500 text-sm">{job.jobType}</p>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Application Deadline: {formatDate(job.applicationDeadline)}
          </p>
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Submit Your Application</h2>
        
        <form onSubmit={handleSubmit}>
          {hasApplied && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Already Applied!</strong>
              <span className="block sm:inline"> You have already submitted an application for this job.</span>
            </div>
          )}

          <div className="mb-4">
            <label 
              htmlFor="resume" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Resume / CV (URL)*
            </label>
            <input
              type="url"
              id="resume"
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Paste a URL to your resume (Google Drive, Dropbox, etc.)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Please upload your resume to a file sharing service and provide the link here.
            </p>
          </div>
          
          <div className="mb-6">
            <label 
              htmlFor="coverLetter" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Cover Letter (Optional)
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-64"
              placeholder="Write your cover letter here... Explain why you're a good fit for the role."
            ></textarea>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={submitting || hasApplied}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                (submitting || hasApplied) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/jobs/${jobId}`)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;