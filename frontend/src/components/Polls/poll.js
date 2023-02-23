// Frontend code for displaying the poll and handling user input
import React, { useState } from 'react';
import axios from 'axios';

const Poll = ({ pollId, question, options }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleVote = async () => {
        if (!selectedOption) {
        return;
        }

        try {
        await axios.put(`/api/polls/${pollId}`, {
            option: selectedOption,
        });
        } catch (error) {
        console.error(error);
        }
    };

    return (
        <div>
        <h2>{question}</h2>
        {options.map((option, index) => (
            <div key={index}>
            <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
            />
            {option}
            </div>
        ))}
        <button onClick={handleVote}>Vote</button>
        </div>
    );
};

export default Poll;
