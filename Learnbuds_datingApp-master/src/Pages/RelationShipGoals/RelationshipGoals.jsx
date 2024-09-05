import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './RelationshipGoals.module.css';
import LandingPage from '../LandingPage/LandingPage';
import { baseurl } from '../../config';

const RelationshipGoals = () => {
  const [selectedGoal, setSelectedGoal] = useState('shortTerm');
  const navigate = useNavigate();

  const handleNext = async () => {
    try {
      const response = await axios.post(
        `${baseurl}/api/relationship-goals`,
        { relationshipGoal: selectedGoal },
        { withCredentials: true }
      );
      console.log('Response:', response.data);
      if (response.data.message === 'Relationship goal saved successfully!') {
        navigate('/choose-app');
      } else {
        alert(' failed saving data: ' + response.data.message);
      }
      // Proceed to the next step or page
    } catch (error) {
      console.error('Error submitting relationship goal:', error);
    }
  };

  return (
    <>
      <LandingPage />
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2>Relationship Goals</h2>
          <div className={styles.radioContainer}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="relationshipGoal"
                value="shortTerm"
                checked={selectedGoal === 'shortTerm'}
                onChange={() => setSelectedGoal('shortTerm')}
              />
              Short Term Relationship
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="relationshipGoal"
                value="longTerm"
                checked={selectedGoal === 'longTerm'}
                onChange={() => setSelectedGoal('longTerm')}
              />
              Long Term Relationship
            </label>
          </div>
          <button className={styles.nextButton} onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default RelationshipGoals;
