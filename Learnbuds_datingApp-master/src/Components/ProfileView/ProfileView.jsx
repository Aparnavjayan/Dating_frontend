import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../../config';
import styles from './ProfileView.module.css';

const ProfileView = () => {
    const { userId } = useParams(); // Extract userId from the URL
    const [profile, setProfile] = useState(null);
    const [isRequestAccepted, setIsRequestAccepted] = useState(false); // New state to check if request is accepted
    const navigate = useNavigate();

    console.log('selected userId:', userId);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${baseurl}/api/profiles/${userId}`);
                setProfile(response.data);
                
                // Check if the request has been accepted
                const requestStatusResponse = await axios.get(`${baseurl}/api/checkRequestStatus/${userId}`, { withCredentials: true });
                setIsRequestAccepted(requestStatusResponse.data.isAccepted);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, [userId]);

    console.log('profiles', profile);

    if (!profile) {
        return <div>Loading...</div>;
    }

    const handleShortlist = async () => {
        try {
            await axios.post(`${baseurl}/api/shortlist/${userId}`, {}, { withCredentials: true });
            alert('Profile shortlisted');
        } catch (error) {
            console.log('Error shortlisting profile:', error);
        }
    };

    const handleRequest = async () => {
        try {
            await axios.post(`${baseurl}/api/sendRequest/${userId}`, {}, { withCredentials: true });
            alert('Request sent');
        } catch (error) {
            console.log('Error sending request:', error);
        }
    };

    const handleMessage = () => {
        if (isRequestAccepted) {
            navigate(`/chat/${userId}`);
        } else {
            alert('Only Friends can send messages..!');
        }
    };

    const handleArrowClick = () => {
        navigate('/userhome');
    };

    return (
        <div
            className={styles.profileViewContainer}
            style={{
                background: `url(${profile.profilePicUrl}) no-repeat center center`,
                backgroundSize: 'cover'
            }}
        >
            <div className={`${styles.topContainer} ${styles.torchEffect}`}>
                <div className={styles.topLeftArrow} onClick={handleArrowClick}>
                    <i className="fas fa-less-than"></i>
                </div>

                <div className={styles.topRightLocation}>
                    <i className="fa-solid fa-location-arrow"></i>
                    <p>2.5 km</p>
                </div>

                <div className={styles.userDetails}>
                    <p className={styles.username}>{profile.userId.name}, <span>{profile.age}</span></p>
                    <p className={styles.userPlace}>HAMBURG, GERMANY</p>
                </div>

                <div className={styles.matchingContainer}>
                    <div className={styles.matchingPercentage}>
                        <div className={styles.circle}>
                            <div className={styles.innerCircle}>
                                <p className={styles.percentageNumber}>80</p>
                                <p className={styles.percentageIcon}>%</p>
                            </div>
                        </div>
                    </div>
                    <p className={styles.matchText}>Match</p>
                </div>
            </div>

            <div className={styles.bottomContainer}>
                <div className={styles.about}>
                    <p className={styles.aboutHeading}>About</p>
                    <p className={styles.aboutContent}>A good listener. I love having a good talk to know each other's side 😍.</p>
                </div>

                <div className={styles.interests}>
                    <p className={styles.interestHeading}>Interest</p>
                    <div className={styles.interestTags}>
                        <span className={styles.interestTag}>🌿 Nature</span>
                        <span className={styles.interestTag}>🏝️ Travel</span>
                        <span className={styles.interestTag}>✍️ Writing</span>
                    </div>
                </div>

                <div className={styles.footerContainer}>
                    <button className={`${styles.footerButton} ${styles.dislikeButton}`}>X</button>
                    <button className={`${styles.footerButton} ${styles.starButton}`} onClick={handleShortlist}>★</button>
                    <button className={`${styles.footerButton} ${styles.likeButton}`} onClick={handleRequest}>
                        <i className="fas fa-heart"></i>
                    </button>
                    <button className={`${styles.footerButton} ${styles.chatButton}`} onClick={handleMessage}>💬</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
