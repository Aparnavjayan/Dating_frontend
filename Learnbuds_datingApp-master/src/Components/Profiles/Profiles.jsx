import React from 'react';
import { Row, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import styles from './profiles.module.css';

const Profiles = ({ profiles }) => {
  const navigate = useNavigate();

  const handleProfileClick = (userId) => {
    navigate(`/profileview/${userId}`);
  };

  return (
    <section className={styles.profiles}>
      <Row>
        {profiles.map((profile, index) => (
          <div key={index} className={`${styles.col} ${styles['col-xs-6']} ${styles['col-md-4']} ${styles['col-lg-2']} ${styles.marginBottom4}`}>
            <div className={styles.profileCard} onClick={() => handleProfileClick(profile.userId._id)}>
              <Image src={profile.profilePicUrl} rounded />
              <div className={styles.status}>Online</div>
              <div className={styles.profileInfo}>
                <p className={styles.name}>{profile.userId.name} <span className={styles.ageRole}>{profile.sex} {profile.age} YRS</span></p>
                <p className={styles.role}>{profile.designation}, {profile.location}</p>
              </div>
              <div className={styles.actionButtons}>
                <button className={styles.iconButton}><FontAwesomeIcon icon={faHeart} /></button>
                <button className={styles.iconButton}><FontAwesomeIcon icon={faComment} /></button>
                <button className={styles.iconButton}><FontAwesomeIcon icon={faEllipsisH} /></button>
              </div>
            </div>
          </div>
        ))}
      </Row>
    </section>
  );
};

export default Profiles;
