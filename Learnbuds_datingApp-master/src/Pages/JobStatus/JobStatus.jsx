import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobStyles from './jobstatusModal.module.css';
import LandingPage from '../LandingPage/LandingPage';
import { baseurl } from '../../config';
import axios from 'axios'; // Import axios for API requests

const JobStatusComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [step, setStep] = useState(0);
  const [expertiseLevel, setExpertiseLevel] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    designation: '',
    location: '',
    jobTitle: '',
  });

  const navigate = useNavigate();

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNext = () => {
    if (selectedOption) {
      setStep(1);
    }
  };

  const handleExpertiseChange = (event) => {
    setExpertiseLevel(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${baseurl}/api/jobstatus`, {
        ...formData,
        expertiseLevel,
      }, { withCredentials: true });

      console.log('Response:', response.data);
      if (response.data.message === 'Job status saved successfully!') {
        navigate('/relationship-goals');
      } else {
        alert(' failed saving data: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error submitting job status:', error);
    }
  };

  return (
    <>
      <LandingPage />
      <div>
        {step === 0 && (
          <div className={JobStyles.modalOverlay}>
            <div className={JobStyles.modal}>
              <h2>Job Status</h2>
              <form>
                <label>
                  <input
                    type="radio"
                    name="jobStatus"
                    value="employer"
                    checked={selectedOption === 'employer'}
                    onChange={handleRadioChange}
                  />
                  Employer/Employee
                </label>
                <label>
                  <input
                    type="radio"
                    name="jobStatus"
                    value="jobSeeker"
                    checked={selectedOption === 'jobSeeker'}
                    onChange={handleRadioChange}
                  />
                  Job Seeker
                </label>
                <button type="button" className={JobStyles.btnNext} onClick={handleNext}>
                  Next
                </button>
              </form>
            </div>
          </div>
        )}

        {step === 1 && selectedOption === 'employer' && (
          <div className={JobStyles.modalOverlay}>
            <div className={JobStyles.modal}>
              <h2>Job Details</h2>
              <form>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="designation"
                  placeholder="Designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
                <button type="button" className={JobStyles.btnNext} onClick={handleSubmit}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}

        {step === 1 && selectedOption === 'jobSeeker' && (
          <div className={JobStyles.modalOverlay}>
            <div className={JobStyles.modal}>
              <h2>Job Details</h2>
              <form>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="Job Title"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                />
                <h3 className={JobStyles.expertiseHeading}>Expertise Level</h3>
                <label>
                  <input
                    type="radio"
                    name="expertiseLevel"
                    value="beginner"
                    checked={expertiseLevel === 'beginner'}
                    onChange={handleExpertiseChange}
                  />
                  Beginner
                </label>
                <label>
                  <input
                    type="radio"
                    name="expertiseLevel"
                    value="intermediate"
                    checked={expertiseLevel === 'intermediate'}
                    onChange={handleExpertiseChange}
                  />
                  Intermediate
                </label>
                <label>
                  <input
                    type="radio"
                    name="expertiseLevel"
                    value="expert"
                    checked={expertiseLevel === 'expert'}
                    onChange={handleExpertiseChange}
                  />
                  Expert
                </label>
                <button type="button" className={JobStyles.btnNext} onClick={handleSubmit}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default JobStatusComponent;
