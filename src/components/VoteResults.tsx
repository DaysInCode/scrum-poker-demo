// src/components/VoteResults.tsx
import React from 'react';

/**
 * Displays the outcomes of a vote round (consensus, revealed votes).
 * This is the core feedback loop of the session.
 */
const VoteResults = ({ votes, activeTicket, onAcceptEstimate }) => {
    // Simple calculation placeholder - real logic handles consensus math
    const calculateConsensus = (voteValues) => {
        if (!voteValues || voteValues.length === 0) return null;
        // Logic would count frequency to determine majority/consensus value
        return Math.max(...Object.values(voteValues)); // Placeholder: returns largest vote as consensus
    };

    const consensus = calculateConsensus(votes);

    return (
        <div className="p-4 bg-yellow-50 border border-yellow-300 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-yellow-800">🗳️ Vote Results</h2>

            {/* 1. Consensus Display */}
            {consensus ? (
                <div className="p-3 bg-green-100 border border-green-300 rounded mb-4 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-green-800">Consensus Reached!</p>
                        <p className="text-2xl font-bold text-green-900">{consensus}</p>
                    </div>
                    {/* Moderator action button */}
                    <button 
                        onClick={() => onAcceptEstimate(String(consensus))}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150"
                    >
                        ✅ Accept & Complete Ticket
                    </button>
                </div>
            ) : (
                <p className="text-gray-600 mb-4">Waiting for votes...</p>
            )}

            {/* 2. Detailed Vote Breakdown */}
            <div>
                <h3 className="font-semibold text-lg mb-2 border-b pb-1">Individual Votes</h3>
                {votes && Object.entries(votes).map(([user, vote]) => (
                    <div key={user} className={`p-2 rounded ${vote === 'N/A' ? 'bg-gray-50' : 'bg-white shadow-sm'}`}>
                        User **{user}** voted: <span className="font-bold text-indigo-600">{vote}</span>
                    </div>
                ))}
            </div>

            <button 
                onClick={() => {/* Logic for Next Round */}}
                disabled={!consensus}
                className={`mt-4 w-full py-2 rounded ${consensus ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'} text-white font-bold`}
            >
                {consensus ? "Start Next Round" : "Cannot Proceed Yet"}
            </button>
        </div>
    );
};

export default VoteResults;