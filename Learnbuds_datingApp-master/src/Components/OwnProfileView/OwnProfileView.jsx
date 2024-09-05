// import React from 'react';
// import '../ProfileView/ProfileView.module.css';

// //  use this if not upgraded
// import UpgradeView from '../UpgradeView/UpgradeView';


// const OwnProfileView = () => {
//     return (
//         <div className='profileView-container'>
//             <div className="top-container torch-effect">
//                 <div className="topLeftArrow">
//                     <i className="fas fa-less-than"></i>
//                 </div>

//                 <div className="topRightLocation">
//                     <i className="fa-solid fa-location-arrow"></i>
//                     {/* <p>2.5 km</p> */}
//                     <p>Edit</p>

//                 </div>

//                 <div className="userDetails">
//                     <p className="username">Alfredo Calzoni, <span>20</span></p>
//                     <p className="userPlace">HAMBURG, GERMANY</p>
//                 </div>

//                 <div className="matching-container">
//                     <div className="matching-percentage">
//                         <div className="circle">
//                             <div className="inner-circle">
//                                 <p className="percentage-number">80</p>
//                                 <p className="percentageIcon">%</p>
//                             </div>
//                         </div>
//                     </div>
//                     <p className="match-text">Profile Complete</p>


//                 </div>
//             </div>

//             <div className="bottom-container">
//                 <div className="about">
//                     <p className='about-heading'>About</p>
//                     <p className='about-content'>A good listener. I love having a good talk to know each other’s side 😍.</p>
//                 </div>

//                 <div className="interests">
//                     <p className='interest-heading'>Interest</p>
//                     <div className="interest-tags">
//                         <span className="interest-tag">🌿 Nature</span>
//                         <span className="interest-tag">🏝️ Travel</span>
//                         <span className="interest-tag">✍️ Writing</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default OwnProfileView;

import React from 'react';
import styles from '../ProfileView/ProfileView.module.css';
import backgroundImage from '../../assets/ladyImage1.jpg';


const OwnProfileView = () => {
    return (
        <div
            className={styles.profileViewContainer}
            style={{
                background: `url(${backgroundImage}) no-repeat center center`,
                backgroundSize: 'cover'
            }}
        >
            <div className={`${styles.topContainer} ${styles.torchEffect}`}>
                <div className={styles.topLeftArrow}>
                    <i className="fas fa-less-than"></i>
                </div>

                <div className={styles.topRightLocation}>
                    <i className="fa-solid fa-location-arrow"></i>
                    <p>Edit</p>
                </div>

                <div className={styles.userDetails}>
                    <p className={styles.username}>Alfredo Calzoni, <span>20</span></p>
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
                    <p className={styles.matchText}>Profile Complete</p>
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
            </div>
        </div>
    );
};

export default OwnProfileView;
