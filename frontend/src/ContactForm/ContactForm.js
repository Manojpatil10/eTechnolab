import React, { useState } from 'react';
import axios from 'axios';
import styles from './ContactForm.module.css';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [message, setMessage] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [messageError, setMessageError] = useState('');

  function handleFrm(e) {
    e.preventDefault();
    let valid = true;

    if (name.trim().length < 3) {
      setNameError('Name must be at least 3 characters long');
      valid = false;
    } else {
      setNameError('');
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (message.trim().length < 10) {
      setMessageError('Message must be at least 10 characters long');
      valid = false;
    } else {
      setMessageError('');
    }

    if (valid) {
      axios.post('http://localhost:8080/api', {name,email,phone,dob,message,})
      .then((response) => {
        // console.log(response)
        alert(response.data.msg);
        clearForm();
      })
      .catch((error) => {
        // console.error(error);
        alert(error.response.data.msg);
      });
    }

  }

  function clearForm() {
    setName('');
    setEmail('');
    setPhone('');
    setDob('');
    setMessage('');
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setMessageError('');
  }

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleFrm} method='post'>
        <h3>Contact Us</h3>

        <div className="mb-3">
          <label htmlFor="name" className={styles.formLabel}>Tell us your name *</label>
          <input type="text" id="name" name="name" placeholder="Enter name" className={styles.formControl} onChange={(e) => setName(e.target.value)} value={name} />
          {nameError && <p className={styles.error}>{nameError}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className={styles.formLabel}>Enter your email ID *</label>
          <input type="email" id="email" name="email" placeholder="Eg. example@gmail.com" className={styles.formControl} onChange={(e) => setEmail(e.target.value)} value={email} />
          {emailError && <p className={styles.error}>{emailError}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="mobile" className={styles.formLabel}>Enter your mobile number *</label>
          <input type="tel" id="mobile" name="mobile" placeholder="Eg. 9876543210" className={styles.formControl} onChange={(e) => setPhone(e.target.value)} value={phone} />
          {phoneError && <p className={styles.error}>{phoneError}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="dob" className={styles.formLabel}>Select your DOB *</label>
          <input type="date" id="dob" name="dob" className={styles.formControl} onChange={(e) => setDob(e.target.value)} value={dob} required />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className={styles.formLabel}>Message *</label>
          <textarea id="message" name="message" rows="4" placeholder="Write us a message" className={styles.formControl} onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
          {messageError && <p className={styles.error}>{messageError}</p>}
        </div>

        <div className={styles.btnGroup}>
          <button type="submit" className={styles.btnSubmit}>Send Message</button>
          <button type="button" className={styles.btnClear} onClick={clearForm}>Clear</button>
        </div>
      </form>
    </div>
  );
}

export default Form;

