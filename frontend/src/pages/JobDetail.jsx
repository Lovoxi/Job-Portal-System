import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../axiosConfig';
import { toast } from 'react-toastify';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        console.log("Fetching job with ID:", id);
        setLoading(true);
        const response = await axios.get(`/api/jobs/${id}`);
        console.log("API Response:", response.data);
        
        if (response.data && response.data.success) {
          setJob(response.data.data);
        } else {
          setError('Job data not found in response');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details. Please try again later.');
        toast.error('Failed to load job details');
        setLoading(false);
      }
    };
  
    if (id) {
      fetchJobDetail();
    }
  }, [id]);

  if (loading) return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <p className="text-lg">Loading job details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto p-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
        <Link to="/jobs" className="text-blue-500 hover:underline mt-2 inline-block">
          Back to Jobs
        </Link>
      </div>
    </div>
  );

  if (!job) return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <p className="text-lg">Job not found</p>
        <Link to="/jobs" className="text-blue-500 hover:underline mt-2 inline-block">
          Back to Jobs
        </Link>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <span className={`px-3 py-1 rounded text-white ${job.status === 'Open' ? 'bg-green-500' : 'bg-red-500'}`}>
            {job.status}
          </span>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700"><strong>Company:</strong> {job.company}</p>
          <p className="text-gray-700"><strong>Location:</strong> {job.location}</p>
          {job.salary && (
            <p className="text-gray-700"><strong>Salary:</strong> ${job.salary}</p>
          )}
        </div>
        
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
        </div>
        
        <div className="mt-6 flex gap-4">
          <Link to="/jobs" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            Back to Jobs
          </Link>
          {job.status === 'Open' && (
            <Link to={`/apply/${job._id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;