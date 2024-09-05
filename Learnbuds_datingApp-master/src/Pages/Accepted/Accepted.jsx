import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Accept.module.css";
import { FaPhone, FaVideo } from "react-icons/fa";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { baseurl } from "../../config";

const Accepted = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchAcceptedRequests = async () => {
            try {
                const response = await axios.get(`${baseurl}/api/accepted-requests`, { withCredentials: true });
                setContacts(response.data);
            } catch (error) {
                console.error("Error fetching accepted requests:", error);
            }
        };
        fetchAcceptedRequests();
    }, []);

    return (
        <>
            <Header />
            <div className={styles.app}>
                <div className={styles.contactList}>
                    <div className={styles.contactListContent}>
                        {contacts.map((contact, index) => (
                            <div key={index} className={styles.contactItem}>
                                <img src={contact.profilePicUrl} alt={contact.name} className={styles.contactImg} />
                                <div className={styles.contactInfo}>
                                    <p className={styles.contactName}>{contact.name}</p>
                                    <p className={styles.contactDate}> {new Date(contact.acceptedAt).toLocaleString()}</p>
                                </div>
                                <div className={styles.contactActions}>
                                    <FaPhone className={styles.callIcon} />
                                    <FaVideo className={styles.videoIcon} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Accepted;
