import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinCreateMeetingPage = () => {
    const navigate = useNavigate();
    const [showJoinForm, setShowJoinForm] = useState(false);
    const [meetingId, setMeetingId] = useState('');
    const [pastMeetings, setPastMeetings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPastMeetings();
    }, []);

    const fetchPastMeetings = async () => {
        try {
            const response = await fetch('http://localhost:8080/meeting/past/list');
            if (response.ok) {
                const data = await response.json();
                setPastMeetings(data);
            }
        } catch (error) {
            console.error('Error fetching past meetings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateMeeting = async () => {
        try {
            const response = await fetch('http://localhost:8080/meeting', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            navigate(`/meetings/${data.meetingId}`);
        } catch (error) {
            console.error('Error creating meeting:', error);
        }
    };

    const handleJoinMeeting = async (e) => {
        e.preventDefault();
        if (meetingId.trim()) {
            try {
                const response = await fetch(`http://localhost:8080/meeting/${meetingId}`);
                if (response.ok) {
                    navigate(`/meetings/${meetingId}`);
                } else {
                    alert('Meeting not found');
                }
            } catch (error) {
                console.error('Error joining meeting:', error);
            }
        }
    };

    const handlePastMeetingClick = (meetingId) => {
        navigate(`/meetings/${meetingId}`);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header section remains the same */}
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 gap-6">
                    {/* Action buttons section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <ActionButton
                            text="New meeting"
                            color="bg-orange-500"
                            onClick={handleCreateMeeting}
                        />
                        <ActionButton
                            text="Join"
                            color="bg-blue-500"
                            onClick={() => setShowJoinForm(true)}
                        />
                    </div>

                    {/* Past Meetings Section */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Meetings</h2>
                        {loading ? (
                            <div className="text-center">Loading past meetings...</div>
                        ) : (
                            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                <ul className="divide-y divide-gray-200">
                                    {pastMeetings.map((meeting) => (
                                        <li key={meeting.meetingId}>
                                            <button
                                                onClick={() => handlePastMeetingClick(meeting.meetingId)}
                                                className="w-full hover:bg-gray-50 p-4 text-left"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-lg font-semibold">
                                                            Meeting ID: {meeting.meetingId}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Last accessed: {new Date(meeting.lastAccessed).toLocaleString()}
                                                        </p>
                                                        {meeting.codeEditor && (
                                                            <p className="text-sm text-gray-500">
                                                                Language: {meeting.codeEditor.language}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="text-blue-500">
                                                        <span>Join →</span>
                                                    </div>
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Join Meeting Modal */}
                {showJoinForm && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                        {/* Modal content remains the same */}
                    </div>
                )}
            </main>
        </div>
    );
};

export default JoinCreateMeetingPage;