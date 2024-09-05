import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Rejected.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { baseurl } from "../../config";

const Rejected = () => {
    const [rejectedProfiles, setRejectedProfiles] = useState([]);

    useEffect(() => {
        const fetchRejectedProfiles = async () => {
            try {
                const response = await axios.get(`${baseurl}/api/rejected-profiles`, { withCredentials: true });
                setRejectedProfiles(response.data);
            } catch (error) {
                console.error('Error fetching rejected profiles:', error);
            }
        };

        fetchRejectedProfiles();
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

    const groupedContacts = groupContacts(rejectedProfiles);

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
                                    <img src={contact.profilePicUrl} alt={contact.name} className={styles.contactImg} />
                                    <div className={styles.contactInfo}>
                                        <p className={styles.contactName}>{contact.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Rejected;
