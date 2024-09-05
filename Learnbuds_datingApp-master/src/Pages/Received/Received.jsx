import React, { useEffect, useState } from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import axios from "axios";
import styles from "./Received.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { baseurl } from "../../config";

const Received = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [acceptedRequests, setAcceptedRequests] = useState([]);

    useEffect(() => {
        const fetchReceivedRequests = async () => {
            try {
                const response = await axios.get(`${baseurl}/api/received-requests`, {
                    withCredentials: true,
                });

                // Assuming `response.data` is an array of contacts with an `accepted` property
                setContacts(response.data);
                console.log('data:',response.data)

                // Initialize accepted requests based on the fetched data
                const accepted = response.data
                    .filter(contact => contact.accepted)
                    .map(contact => contact.userId); // Use the correct identifier here
                setAcceptedRequests(accepted);
            } catch (error) {
                console.error("Error fetching received requests:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReceivedRequests();
    }, []);



    const handleAccept = async (requestId) => {
        try {
            await axios.post(
                `${baseurl}/api/accept-request`,
                { requestId },
                {
                    withCredentials: true,
                }
            );

            // Update acceptedRequests state to reflect the accepted request
            if (!acceptedRequests.includes(requestId)) {
                setAcceptedRequests([...acceptedRequests, requestId]);
            }

        } catch (error) {
            console.error("Error accepting request:", error);
        }
    };

    const handleReject = async (requestId) => {
      try {
          await axios.post(
              `${baseurl}/api/reject-request`,
              { requestId },
              {
                  withCredentials: true,
              }
          );
  
          // Remove the rejected request from contacts
          setContacts(contacts.filter(contact => contact.userId !== requestId));
  
          // If the request was accepted, remove it from the accepted list as well
          if (acceptedRequests.includes(requestId)) {
              setAcceptedRequests(acceptedRequests.filter(id => id !== requestId));
          }
      } catch (error) {
          console.error("Error rejecting request:", error);
      }
  };
  

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
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className={styles.contactList}>
                        {Object.keys(groupedContacts).map((letter) => (
                            <div key={letter} className={styles.contactGroup}>
                                <div className={styles.contactGroupLetter}>{letter}</div>
                                {groupedContacts[letter].map((contact, index) => (
                                    <div key={index} className={styles.contactItem}>
                                        <img src={contact.profilePicUrl} alt={contact.name} className={styles.contactImg} />
                                        <div className={styles.contactInfo}>
                                            <p className={styles.contactName}>{contact.name}</p>
                                            <p className={styles.contactDate}>{contact.date}</p>
                                        </div>
                                        <div className={styles.contactActions}>
                                            <FaHeart
                                                className={styles.heartIcon}
                                                onClick={() => handleAccept(contact.userId)} // Use correct ID here
                                                style={{ color: acceptedRequests.includes(contact.userId) ? 'red' : '#8a8484' }}
                                            />&nbsp;&nbsp;
                                            <FaTimes
                                                className={styles.closeIcon}
                                                onClick={() => handleReject(contact.userId)} // Use correct ID here
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Received;
