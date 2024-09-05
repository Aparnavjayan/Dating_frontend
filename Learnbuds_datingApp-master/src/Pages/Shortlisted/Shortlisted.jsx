import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaTimes } from "react-icons/fa";
import styles from "./Shortlisted.module.css"; // Import CSS module
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { baseurl } from '../../config';


const Shortlisted = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchShortlisted = async () => {
            try {
                const response = await axios.get(`${baseurl}/api/shortlisted`, {
                    withCredentials: true, 
                });
                console.log(response)
                setContacts(response.data.shortList);
            } catch (error) {
                console.error('Error fetching sent requests:', error);
            }
        };

        fetchShortlisted();
    }, []);
    const groupContacts = (contacts) => {
        const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
        return sortedContacts.reduce((acc, contact) => {
            const firstLetter = contact.name.charAt(0).toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(contact);
            return acc;
        }, {});
    };

    const groupedContacts = groupContacts(contacts);

    return (
        <>
        <Header />
        <div className={styles.app}>
            <div className={styles.contactList}>
                {Object.keys(groupedContacts).map((letter) => (
                    <div key={letter} className={styles.contactGroup}>
                        <div className={styles.contactGroupLetter}>{letter}</div>
                        {groupedContacts[letter].map((contact, index) => (
                            <div key={index} className={styles.contactItem}>
                                <img src={contact.imgSrc} alt={contact.name} className={styles.contactImg} />
                                <div className={styles.contactInfo}>
                                    <p className={styles.contactName}>{contact.name}</p>
                                    <p className={styles.contactDate}>{contact.date}</p>
                                </div>
                                <div className={styles.contactActions}>
                                    <FaHeart className={styles.heartIcon} />&nbsp;&nbsp;
                                    <FaTimes className={styles.closeIcon} />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
        <Footer />
   </> );
};

export default Shortlisted;
