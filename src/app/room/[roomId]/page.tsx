// src/app/room/[roomId]/page.tsx
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import TaskPanel from '@/components/TaskPanel';
import VoteResults from '@/components/VoteResults';

/**
 * Main page component for the Scrum Poker Room. This is the central orchestrator.
 */
const RoomPage = ({ roomId }) => {
    // --- STATE MANAGEMENT (Simplified Placeholder) ---
    const [users, setUsers] = useState([]);
    const [activeTicketId, setActiveTicketId] = useState(null);
    const [taskDescription, setTaskDescription] = useState("Implement user authentication and session management.");
    const [votes, setVotes] = useState({}); // { userName: voteValue }
    const [isLoading, setIsLoading] = useState(true);

    // --- LIFECYCLE HOOKS ---
    useEffect(() => {
        setIsLoading(true);
        // 1. Fetch initial room state from API (Simulated)
        fetchRoomData(roomId).then((data) => {
            setUsers(data.users);
            setActiveTicketId(data.activeTicketId);
            setVotes(data.initialVotes || {});
            setIsLoading(false);
        });

        // 2. Set up WebSocket listener for real-time updates (Simulated)
        setupWebSocketListener(roomId);
    }, [roomId]);

    // --- HANDLERS ---
    const handleVoteCast = useCallback((userName, voteValue) => {
        console.log(`User ${userName} cast a vote of ${voteValue}`);
        setVotes(prev => ({ ...prev, [userName]: voteValue }));
    }, []);

    const handleAcceptEstimate = useCallback(async (estimation) => {
        // Calls the API endpoint to finalize and save the estimate value.
        await fetch(`/api/rooms/${roomId}/tickets/${activeTicketId}/estimation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estimation })
        });
        console.log(`Estimate ${estimation} saved successfully.`);
    }, [roomId, activeTicketId]);

    // --- MOCK API FUNCTIONS (Must be implemented) ---
    const fetchRoomData = async (id) => {
        return new Promise(resolve => setTimeout(() => resolve({
            users: [{ name: 'Alice', status: 'voted' }, { name: 'Bob', status: 'waiting' }],
            activeTicketId: 'JIRA-123',
            initialVotes: { Alice: 5, Bob: null }
        }), 1000));
    };

    const setupWebSocketListener = (id) => {
        console.log(`[WS] Listening for real-time updates on room ${id}...`);
        // Placeholder for actual WebSocket logic
    }


    if (isLoading) {
        return <div className="p-8 text-center">Loading session data...</div>;
    }

    return (
        <div className="container mx-auto p-6 lg:flex gap-6">
            {/* Left Side: Sidebar (Ticket Backlog) */}
            <aside className="lg:w-1/4 border pr-4">
                <h2 className="text-xl font-bold mb-4 text-blue-700">📋 Ticket Backlog</h2>
                {/* This area will contain the full list of tickets and 'Vote' buttons */}
                <div className="space-y-3">
                    <div className="p-3 border cursor-pointer bg-gray-50 hover:bg-blue-100 rounded" onClick={() => setActiveTicketId('JIRA-123')}>
                        <h3 className="font-semibold text-green-700">🎯 Active</h3>
                        <div>JIRA-123: User Login</div>
                    </div>
                    {/* More tickets go here */}
                </div>
            </aside>

            {/* Center Stage: Task Panel & Vote Results */}
            <main className="lg:w-3/4 space-y-8">
                {/* 1. Task Context Area */}
                <div>
                    <TaskPanel activeTicket={activeTicketId ? { key: 'JIRA-123', title: 'User Login', url: 'https://jira.example.com/JIRA-123' } : null} taskDescription={taskDescription} />
                </div>

                {/* 2. Vote and Results Area */}
                <div>
                    <VoteResults votes={votes} activeTicket={{ key: 'JIRA-123', title: 'User Login', url: 'https://jira.example.com/JIRA-123' }} onAcceptEstimate={handleAcceptEstimate} />
                </div>

                {/* 3. Moderator Control Panel (Placeholder) */}
                <div className="p-4 border-t mt-8">
                    <h3 className="font-bold text-lg">⚙️ Moderator Controls</h3>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded mr-3">Next Ticket (N)</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">End Session</button>
                </div>
            </main>
        </div>
    );
};

export default RoomPage;