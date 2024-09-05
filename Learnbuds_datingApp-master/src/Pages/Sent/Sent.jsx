import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./Sent.module.css";
import { FaTimes } from "react-icons/fa";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { baseurl } from '../../config';

const Sent = () => {
    const [contacts, setContacts] = useState([]);
    
    useEffect(() => {
        const fetchSentRequests = async () => {
            try {
                const response = await axios.get(`${baseurl}/api/sent-requests`, {
                    withCredentials: true, // Ensure cookies are sent
                });
                console.log(response)
                setContacts(response.data.sentRequests);
            } catch (error) {
                console.error('Error fetching sent requests:', error);
            }
        };

        fetchSentRequests();
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
                    <div className={styles.contactListContent}>
                        {Object.keys(groupedContacts).map((letter) => (
                            <div key={letter} className={styles.contactGroup}>
                                <div className={styles.contactGroupLetter}>{letter}</div>
                                {groupedContacts[letter].map((contact, index) => (
                                    <div key={index} className={styles.contactItem}>
                                        <img src={contact.profilePicUrl} alt={contact.name} className={styles.contactImg} />
                                        <div className={styles.contactInfo}>
                                            <p className={styles.contactName}>{contact.name}</p>
                                        </div>
                                        <div className={styles.contactActions}>
                                            <FaTimes className={styles.closeIcon} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Sent;
