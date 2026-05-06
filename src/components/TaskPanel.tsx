// src/components/TaskPanel.tsx
import React from 'react';

/**
 * Component responsible for displaying the currently active ticket story and its description.
 * This component is critical as it sets the context for the entire estimation session.
 */
const TaskPanel = ({ activeTicket, taskDescription }) => {
    if (!activeTicket) {
        return (
            <div className="p-4 bg-gray-50 border rounded">
                <h2 className="text-xl font-semibold mb-3">🎯 Active Story</h2>
                <p className="text-gray-600">Click a ticket from the sidebar backlog to activate it and begin estimating.</p>
            </div>
        );
    }

    // Assume activeTicket contains key, title, url
    return (
        <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded shadow">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
                <span role="img" aria-label="target">🎯</span> Active Ticket: {activeTicket.key}
            </h2>
            <div className="mb-4 text-blue-700 cursor-pointer hover:underline">{activeTicket.title}</div>
            <a href={activeTicket.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 inline-block mb-3">[View in Jira ↗]</a>

            {/* This section will display the detailed description and acceptance criteria */}
            <div>
                <h3 className="font-semibold text-lg mt-4">Description</h3>
                <p className="text-gray-700">{taskDescription}</p>
            </div>
        </div>
    );
};

export default TaskPanel;