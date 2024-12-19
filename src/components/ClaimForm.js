import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ClaimForm() {
    const [claim, setClaim] = useState({
        claimId: '',
        cin: '',
        flightId: '',
        description: '',
        date: '',
        status: ''
    });
    const navigate = useNavigate(); // Replace useHistory with useNavigate

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClaim({
            ...claim,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9096/api/claims', claim);
            console.log('Claim created:', response.data);
            navigate(`/claims/${response.data.claimId}`); // Redirect to the created claim's page
        } catch (error) {
            console.error('Error creating claim:', error);
        }
    };

    return (
        <div className="claim-form">
            <h2>Create Claim</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Claim ID:</label>
                    <input type="text" name="claimId" value={claim.claimId} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>CIN:</label>
                    <input type="text" name="cin" value={claim.cin} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Flight ID:</label>
                    <input type="number" name="flightId" value={claim.flightId} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={claim.description} onChange={handleInputChange} required></textarea>
                </div>
                <div>
                    <label>Date:</label>
                    <input type="date" name="date" value={claim.date} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Status:</label>
                    <input type="text" name="status" value={claim.status} onChange={handleInputChange} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ClaimForm;
