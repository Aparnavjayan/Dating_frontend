import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPaperclip, FaMicrophone, FaPaperPlane, FaPhone, FaChevronLeft } from 'react-icons/fa';
import styles from './chatPage.module.css';
import { io } from 'socket.io-client';
import { baseurl } from '../../config';

const ChatPage = () => {
  const { userId } = useParams(); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [chattingUser, setChattingUser] = useState(null);
  const chatBodyRef = useRef(null);
  const navigate = useNavigate();

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };





  useEffect(() => {
    if (userId) {
      const newSocket = io(`${baseurl}`);
      setSocket(newSocket);

      newSocket.on('receiveMessage', (receivedMessage) => {
        if (receivedMessage.sender !== userId) {
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
      });

      const fetchMessages = async () => {
        try {
          const res = await axios.get(`${baseurl}/api/messages/${userId}`, { withCredentials: true });
          setMessages(res.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
          setError('Failed to fetch messages. ' + (error.response ? error.response.data : ''));
        }
      };

      const fetchChattingUser = async () => {
        try {
          const res = await axios.get(`${baseurl}/api/fetchuser/${userId}`, { withCredentials: true });
          console.log('chattinguser:',res)
          setChattingUser(res.data);
        } catch (error) {
          console.error('Error fetching user:', error);
          setError('Failed to fetch user details. ' + (error.response ? error.response.data : ''));
        }
      };

      
      fetchMessages();
      fetchChattingUser();
      

      return () => {
        newSocket.off('receiveMessage');
        newSocket.disconnect();
      };
    }
  }, [userId]);

  console.log('user:',chattingUser)

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]); // Scroll to bottom whenever messages change

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const res = await axios.post(`${baseurl}/api/messages`, {
        receiver: userId,
        content: newMessage
      }, { withCredentials: true });

      setMessages([...messages, res.data]);
      setNewMessage('');

      if (socket) {
        socket.emit('sendMessage', res.data);
      }

      setError(null);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. ' + (error.response ? error.response.data : ''));
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  

  

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <button className={styles.backButton}  > <FaChevronLeft /> </button>
        <h2>Girija</h2>
        <button className={styles.callButton}>
          <FaPhone />
        </button>
      </div>
      <div className={styles.chatBody} ref={chatBodyRef}>
        {messages.map((message, index) => (
          <div 
            key={`${message._id}-${index}`}
            className={`${styles.message} ${message.sender === userId ? styles.received : styles.sent}`}
          >
            {message.isImage ? (
              <div className={styles.imagePlaceholder}></div>
            ) : (
              <p>{message.content}</p>
            )}
            <span className={styles.time}>{formatTimestamp(message.timestamp)}</span>
          </div>
        ))}
      </div>
      <div className={styles.chatInputContainer}>
        <div className={styles.chatInput}>
          <input 
            type="text" 
            placeholder="Message" 
            className={styles.messageInput} 
            value={newMessage}
            onChange={handleInputChange}
          />
          <button className={styles.attachButton}>
            <FaPaperclip />
          </button>
          <button className={styles.sendButton} onClick={sendMessage}>
            {newMessage ? <FaPaperPlane /> : <FaMicrophone />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
