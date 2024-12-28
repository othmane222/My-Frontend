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
    const [successMessage, setSuccessMessage] = useState(''); // Success message state
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
            setSuccessMessage('Claim created successfully!'); // Set success message
            navigate(`/claims`); // Redirect to the created claim's page
        } catch (error) {
            console.error('Error creating claim:', error);
            setSuccessMessage('Error creating claim. Please try again.'); // Set error message
        }
    };

    return (
        <div className="claim-form">
            <h2>Create Claim</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Claim ID:</label>
                    <input
                        type="text"
                        name="claimId"
                        value={claim.claimId}
                        onChange={handleInputChange}
                        required
                        style={{ padding: '5px', borderRadius: '5px' }}
                    />
                </div>
                <div>
                    <label>CIN:</label>
                    <input
                        type="text"
                        name="cin"
                        value={claim.cin}
                        onChange={handleInputChange}
                        required
                        style={{ padding: '5px', borderRadius: '5px' }}
                    />
                </div>
                <div>
                    <label>Flight ID:</label>
                    <input
                        type="number"
                        name="flightId"
                        value={claim.flightId}
                        onChange={handleInputChange}
                        required
                        style={{ padding: '5px', borderRadius: '5px' }}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={claim.description}
                        onChange={handleInputChange}
                        required
                        style={{ padding: '5px', borderRadius: '5px' }}
                    ></textarea>
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={claim.date}
                        onChange={handleInputChange}
                        required
                        style={{ padding: '5px', borderRadius: '5px' }}
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <input
                        type="text"
                        name="status"
                        value={claim.status}
                        onChange={handleInputChange}
                        required
                        style={{ padding: '5px', borderRadius: '5px' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#F1EFE5',
                        color: '#445E75',
                        fontWeight: '500',
                        padding: '5px 20px',
                        borderRadius: '5px',
                    }}
                >
                    Submit
                </button>
            </form>

            {successMessage && (
                <div
                    style={{
                        marginTop: '20px',
                        padding: '10px',
                        backgroundColor: '#DFF0D8', // Success green background
                        color: '#3C763D', // Success green text
                        borderRadius: '5px',
                        fontWeight: '500',
                    }}
                >
                    {successMessage}
                </div>
            )}
        </div>
    );
}

export default ClaimForm;
