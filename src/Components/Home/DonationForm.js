import { useState } from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createDonation } from '../API/users';

export default function DonationForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [contact, setContact] = useState('');
  const [eventFromDate, setEventFromDate] = useState('');
  const [eventToDate, setEventToDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const donationData = {
      title,
      description,
      amount,
      contact,
      eventFromDate,
      eventToDate,
      image,
    };

    try {
      const response = await createDonation(donationData);
      console.log('Donation created successfully:', response.data);
      setSuccessMessage('Donation created successfully!');
      setErrorMessage(''); // Clear any previous error messages
      // Clear form fields
      setTitle('');
      setDescription('');
      setAmount('');
      setContact('');
      setEventFromDate('');
      setEventToDate('');
      setImage('');
    } catch (error) {
      console.error('Error creating donation:', error);
      setErrorMessage('Failed to create donation. Please try again.');
      setSuccessMessage(''); // Clear any previous success messages
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: 'auto',
    padding: '1em',
    border: '1px solid #ccc',
    borderRadius: '8px',
  };

  const inputStyle = {
    marginBottom: '1em',
    padding: '0.5em',
    fontSize: '1em',
    border: '1px solid #ccc',
    borderRadius: '8px',
  
  };

  const buttonStyle = {
    marginTop: '1em',
    padding: '0.5em',
    fontSize: '1em',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  };

  return (
    <div>
      <h1>Donation Form</h1>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          style={inputStyle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description</label>
        <textarea
          name="description"
          placeholder="Description"
          required
          style={inputStyle}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Required Amount</label>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          required
          style={inputStyle}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label>Event From Date</label>
        <input
          type="date"
          name="eventFromDate"
          required
          style={inputStyle}
          value={eventFromDate}
          onChange={(e) => setEventFromDate(e.target.value)}
        />
        <label>Event To Date</label>
        <input
          type="date"
          name="eventToDate"
          required
          style={inputStyle}
          value={eventToDate}
          onChange={(e) => setEventToDate(e.target.value)}
        />
        <label>Contact</label>
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          required
          style={inputStyle}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          required
          style={inputStyle}
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div style={{ padding: '20px' }}>
        <Button variant="contained"><Link to="/">Home</Link></Button>
      </div>
    </div>
  );
}
