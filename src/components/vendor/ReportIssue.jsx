import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './ReportIssue.css';
import { postReportIssueData } from '../../services/vendor/PostReportIssueAPI';

const ReportIssue = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await postReportIssueData(title, description);
            // Handle the response as needed, e.g., show a success message
            console.log('Response:', response);
            setTitle('');
            setDescription('');
            toast.success('Issue reported successfully');
        } catch (error) {
            // Handle errors, e.g., show an error message
            console.error('Error:', error.message);
            setTitle('');
            setDescription('');
            toast.error('Issue not reported');
        }
    };

    return (
        <div >
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                }}
            />

            <div className="report-header">
                <h1>Report Issue</h1>
            </div>

            <div className="report-form-sections">
                <div className="points">
                    <ul>
                        <li>
                            <p className="point">This page is for vendors to report bugs, glitches, or unexpected behavior in the application.</p>
                        </li>
                        <li>
                            <p className="point">Allows vendors to provide feedback regarding issues they encounter on the platform.</p>
                        </li>
                        <li>
                            <p className="point">Contributes to improving overall user experience by resolving reported issues promptly.</p>
                        </li>
                    </ul>
                </div>

                <div>
                    <label className="report-label">Issue Subject:</label>
                    <input
                        type="text"
                        placeholder="Enter issue subject"
                        className="report-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label className="report-title">Describe the issue:</label>
                    <textarea
                        className="report-description"
                        placeholder="Enter details about the issue"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <button onClick={handleSubmit}>
                        <div className="report-submit">
                            Submit Issue
                        </div>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ReportIssue;
