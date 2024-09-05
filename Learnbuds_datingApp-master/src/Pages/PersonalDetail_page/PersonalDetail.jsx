import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import PersonalStyles from "./PersonalDetails.module.css";
import LandingPage from "../LandingPage/LandingPage";
import { baseurl } from '../../config';
import imageCompression from 'browser-image-compression';
import { useGeolocated } from 'react-geolocated';

const PersonalDetail = () => {
  const [formData, setFormData] = useState({
    age: '',
    dob: '',
    hobbies: '',
    interests: '',
    smokingHabits: '',
    drinkingHabits: '',
    qualifications: '',
    location: '' ,
    gender: '',
    designation: ''
  });

  const navigate = useNavigate();
  
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const [profilePic, setProfilePic] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [shortReel, setShortReel] = useState(null);

  // Function to fetch place name from latitude and longitude
  const getPlaceName = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      if (data && data.display_name) {
        setFormData(prevFormData => ({ ...prevFormData, location: data.display_name }));
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  // Use effect to get place name when coords change
  useEffect(() => {
    if (coords) {
      getPlaceName(coords.latitude, coords.longitude);
    }
  }, [coords]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[0];
  
      try {
        if (fileType === 'image') {
          const options = {
            maxSizeMB: 10,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
          const compressedFile = await imageCompression(file, options);
          setter(compressedFile);
        } else if (fileType === 'video') {
          setter(file);
        }
      } catch (error) {
        console.error('Error compressing the file:', error);
      }
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      data.append(key, value);
    }
    if (profilePic) data.append('profilePic', profilePic);
    if (image1) data.append('additionalImages', image1);
    if (image2) data.append('additionalImages', image2);
    if (image3) data.append('additionalImages', image3);
    if (shortReel) data.append('shortReel', shortReel);

    try {
      const response = await axios.post(`${baseurl}/api/personaldetail`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, 
      });
      console.log('Personal details saved:', response.data);
      if (response.data.message === 'Details saved successfully!') {
        navigate('/employement');
      } else {
        alert('Failed saving data: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error saving personal details:', error);
    }
  };

  return (
    <>
      <LandingPage />
      <div className={PersonalStyles.modalOverlay}>
        <div className={PersonalStyles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={PersonalStyles.personalDetailsForm}>
            <h2>Personal Details</h2>
            <input type="text" name="age" placeholder="Age" onChange={handleInputChange} />
            <input type="text" name="dob" placeholder="DOB" onChange={handleInputChange} />
            <input type="text" name="gender" placeholder="Gender" onChange={handleInputChange} />
            <input type="text" name="location" placeholder="Location" value={formData.location} readOnly />
            <input type="text" name="hobbies" placeholder="Hobbies" onChange={handleInputChange} />
            <input type="text" name="interests" placeholder="Interests" onChange={handleInputChange} />
            <input type="text" name="smokingHabits" placeholder="Smoking Habits" onChange={handleInputChange} />
            <input type="text" name="drinkingHabits" placeholder="Drinking Habits" onChange={handleInputChange} />
            <input type="text" name="qualifications" placeholder="Qualifications" onChange={handleInputChange} />
            <input type="text" name="designation" placeholder="Designation" onChange={handleInputChange} />

            <div className={PersonalStyles.profilePicContainer}>
              <label htmlFor="profile-pic" className={PersonalStyles.circle}>
                <input type="file" id="profile-pic" accept="image/*" onChange={(e) => handleFileChange(e, setProfilePic)} />
                <span className={PersonalStyles.icon}>🖼️</span>
              </label>
            </div>

            <div className={PersonalStyles.additionalImagesContainer}>
              <label htmlFor="image1" className={PersonalStyles.circle}>
                <input type="file" id="image1" accept="image/*" onChange={(e) => handleFileChange(e, setImage1)} />
                <span className={PersonalStyles.icon}>🖼️</span>
              </label>
              <label htmlFor="image2" className={PersonalStyles.circle}>
                <input type="file" id="image2" accept="image/*" onChange={(e) => handleFileChange(e, setImage2)} />
                <span className={PersonalStyles.icon}>🖼️</span>
              </label>
              <label htmlFor="image3" className={PersonalStyles.circle}>
                <input type="file" id="image3" accept="image/*" onChange={(e) => handleFileChange(e, setImage3)} />
                <span className={PersonalStyles.icon}>🖼️</span>
              </label>
            </div>

            <div className={PersonalStyles.shortReelContainer}>
              <label htmlFor="short-reel" className={PersonalStyles.square}>
                <input type="file" id="short-reel" accept="video/*" onChange={(e) => handleFileChange(e, setShortReel)} />
                <span className={PersonalStyles.icon}>🎥</span>
              </label>
            </div>

            <button type="button" onClick={handleSubmit}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalDetail;
