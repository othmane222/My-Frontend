import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Reviews.css';

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    id: 0,
    cin: '',
    flightId: '',
    comment: '',
    rating: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8083/api/reviews', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setResponseMessage('Review created successfully!');
      console.log(response.data);
    } catch (error) {
      setResponseMessage('Error creating review. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="review-form">
        
      <h2>Submit Your Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          CIN:
          <input
            type="text"
            name="cin"
            value={formData.cin}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Flight ID:
          <input
            type="number"
            name="flightId"
            value={formData.flightId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Comment:
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={formData.rating}
            min="1"
            max="10"
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit Review</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default ReviewForm;
