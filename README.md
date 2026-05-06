# Scrum Poker Demo

## 🚀 Project Overview (V1.0)

The Scrum Poker Demo is an in-memory, real-time collaborative web application designed to simulate professional sprint planning sessions. It allows teams to efficiently estimate user stories and backlog items using the Fibonacci sequence, dramatically reducing estimation overhead time from minutes to seconds.

**Goal:** To create a highly focused tool that drives team consensus and actionable estimates with minimal context switching.

## 🎯 Key Features Implemented
*   **Real-time Sync:** Uses simulated WebSocket/WebSockets for instant updates across all connected users.
*   **Task Management:** Supports batch import of Jira tickets, displaying ticket details (key, title, link).
*   **Estimation Flow:** Seamless workflow from 'Pending' $\to$ 'Active' $\to$ Voting $\to$ Consensus $\to$ Accepted/Complete.
*   **Progress Tracking:** A comprehensive Progress Report modal shows the estimation status for all backlog items at a glance.
*   **Efficiency Booster:** Moderator controls (Next Ticket, Reveal, Reset) are consolidated into a single panel, minimizing clicks and maximizing flow state.

## ⚙️ Technical Architecture & Technology Stack
*   **Framework:** Next.js (Client/Server Components)
*   **State Management:** In-memory JavaScript State / Local Storage Simulation (`localStore`)
*   **Networking:** Simulated WebSocket for real-time communication.
*   **Styling:** Tailwind CSS (Assumed).

## 💾 Data Persistence & Scaling Notes (CRITICAL)
This application is **designed to be transient**. All room state, votes, and active tickets are held in server memory and will be lost upon server restart or when the last user leaves. This enforces a lightweight, highly focused session model.

**For Production:** To scale this beyond a single instance, a dedicated Pub/Sub system (like Redis) must replace the local memory store for room state persistence.

## 🛠️ Getting Started
1.  Clone the repository: `git clone <repo-url>`
2.  Navigate to the directory: `cd scrum-poker-demo`
3.  Install dependencies: `npm install`
4.  Run the development server: `npm run dev`

**Note:** This project structure is heavily optimized for speed and flow over persistence, making it ideal for transient planning sessions.