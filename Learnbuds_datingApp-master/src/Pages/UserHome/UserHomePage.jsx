import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../Components/HeaderUserHome/HeaderUserHome';
import Stories from '../../Components/Stories/Stories';
import Filters from '../../Components/Filters/Filters';
import Profiles from '../../Components/Profiles/Profiles';
import Footer from '../../Components/Footer/Footer';
import InterestModal from '../../Components/InterestModal/InterestModal';
import LeftSideMenu from '../../Components/LeftSideMenu/LeftSideMenu';
import styles from './userHomePage.module.css';
import Notifications from '../Notifaction/Notifications';
import axios from 'axios';
import { baseurl } from '../../config';

function UserHomePage() {
  const [modalShow, setModalShow] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [notificationView, setNotificationView] = useState(false);
  const [leftSideNavBar, setLeftSideNavBar] = useState(false);

  useEffect(() => {
    const userInterest = localStorage.getItem('userInterest');
    if (!userInterest) {
      setModalShow(true);
    } else {
      setModalShow(false);
    }
  }, []);

  const handleModalClose = (interest) => {
    if (interest) {
      localStorage.setItem('userInterest', interest);
      console.log('User is interested in:', interest);
    }
    setModalShow(false);
  };

  const handleLeftsideMenu = () => {
    leftSideNavBar && setLeftSideNavBar(false);
  };

  const handleFilterChange = (filterType) => {
    fetchProfiles(filterType, selectedGender);
  };

  const fetchProfiles = async (filterType, gender) => {
    try {
      const response = await axios.get(`${baseurl}/api/profiles`, {
        params: { filterType, gender },
        withCredentials: true,
      });
      console.log('profiles',response.data)
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };
  

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    fetchProfiles('nearby', gender);  
  };

  useEffect(() => {
    fetchProfiles('nearby', selectedGender);  
  }, [selectedGender]);

  return (
    <Container fluid className={`${styles.appContainer} ${modalShow ? styles.blurBackground : ''}`} onClick={handleLeftsideMenu}>
      <Header setLeftSideNavBar={setLeftSideNavBar} setNotificationView={setNotificationView} />
      {leftSideNavBar && <LeftSideMenu />}
      {notificationView && <Notifications setNotificationView={setNotificationView} />}
      <Stories />
      <Filters onFilterChange={handleFilterChange} />
      <Profiles profiles={profiles} />
      <Footer />
      <InterestModal show={modalShow} handleClose={handleModalClose} />
    </Container>
  );
}

export default UserHomePage;
