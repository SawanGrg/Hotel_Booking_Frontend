import React, { useState } from 'react';
import './Contact.css';
import { FaPlus, FaMinus } from "react-icons/fa";

function Contact() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [issueDescription, setIssueDescription] = useState('');

    // State variables for managing answer visibility for each FAQ
    const [showAnswer1, setShowAnswer1] = useState(false);
    const [showAnswer2, setShowAnswer2] = useState(false);
    const [showAnswer3, setShowAnswer3] = useState(false);
    const [showAnswer4, setShowAnswer4] = useState(false);

    // Function to toggle the answer visibility for each FAQ
    const toggleAnswer = (faqNumber) => {
        switch (faqNumber) {
            case 1:
                setShowAnswer1(!showAnswer1); // Use showAnswer1 instead of showAnswer
                break;
            case 2:
                setShowAnswer2(!showAnswer2); // Use showAnswer2 instead of showAnswer
                break;
            case 3:
                setShowAnswer3(!showAnswer3); // Use showAnswer3 instead of showAnswer
                break;
            case 4:
                setShowAnswer4(!showAnswer4); // Use showAnswer4 instead of showAnswer
                break;
            default:
                break;
        }
    }

    return (
        <div className='contact-parent-div'>

            {/* parent div of issue report */}
            <div className='contact-div-holder'>

                {/* div for image */}
                <div>
                    <img src='/assets/contact-us.avif' alt='contact us' className="contact-image" />
                </div>

                {/* div for input fields like issue title and issue description */}
                <div className='right-contact-div'>
                    <div className='get-in-touch'>
                        <h1>Get in touch with Annapurna</h1>
                    </div>
                    <div className='real-fields'>
                        <div>
                            <label htmlFor='firstName'>First Name</label>
                            <input
                                id='firstName'
                                type='text'
                                placeholder='eg : Sawan'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <label htmlFor='lastName'>Last Name</label>
                            <input
                                id='lastName'
                                type='text'
                                placeholder='eg : Gurung'

                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <label htmlFor='email'>Email Address</label>
                            <input
                                id='email'
                                type='email'
                                placeholder='eg : Sxxxx@gmail.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <label htmlFor='issueDescription'>Message</label>
                            <textarea
                                id='issueDescription'
                                placeholder='Please describe your message here...'
                                value={issueDescription}
                                onChange={(e) => setIssueDescription(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <button>Submit</button>
                        </div>
                    </div>
                </div>

            </div>
            {/* div for FAQ */}
            <div className='second-contact-us'>
                {/* div for heading */}
                <div className='FAQ-header'>
                    <h1>Frequently Asked Questions</h1>
                </div>

                {/* div for Question and Answer */}
                <div className='FAQ'>

                    {/* first FAQ */}
                    <div>
                        <div className='FAQ-Question'>
                            <div>
                                <h2>Question : How to book a room?</h2>
                            </div>

                            <div onClick={() => toggleAnswer(1)}>
                                {showAnswer1 ? <FaMinus /> : <FaPlus />}
                            </div>
                        </div>
                        <br />
                        {showAnswer1 &&
                            <div className='FAQ-Answer'>
                                <p>Answer: You can book a room by visiting our website and selecting the room you want to book. You can also call us at 123-456-7890 to book a room.</p>
                            </div>
                        }
                    </div>
                    <br />

                    {/* second FAQ */}
                    <div>
                        <div className='FAQ-Question'>
                            <div>
                                <h2>Question : How to cancel a booking?</h2>
                            </div>

                            <div onClick={() => toggleAnswer(2)}>
                                {showAnswer2 ? <FaMinus /> : <FaPlus />}
                            </div>
                        </div>
                        <br />
                        {showAnswer2 &&
                            <div className='FAQ-Answer'>
                                <p>Answer: You can cancel a booking by visiting our website and going to the booking section. You can also call us at 123-456-7890 to cancel a booking.</p>
                            </div>
                        }
                    </div>
                    <br />

                    {/* Third FAQ */}
                    <div>
                        <div className='FAQ-Question'>
                            <div>
                                <h2>Question : How to contact customer support?</h2>
                            </div>

                            <div onClick={() => toggleAnswer(3)}>
                                {showAnswer3 ? <FaMinus /> : <FaPlus />}
                            </div>
                        </div>
                        <br />
                        {showAnswer3 &&
                            <div className='FAQ-Answer'>
                                <p>Answer: You can contact customer support by calling us at 123-456-7890 or by emailing us at</p>
                            </div>
                        }
                    </div>

                    <br />

                    {/* fourth FAQ */}
                    <div>
                        <div className='FAQ-Question'>
                            <div>
                                <h2>Question : How to contact customer support?</h2>
                            </div>

                            <div onClick={() => toggleAnswer(4)}>
                                {showAnswer4 ? <FaMinus /> : <FaPlus />}
                            </div>
                        </div>
                        <br />
                        {showAnswer4 &&
                            <div className='FAQ-Answer'>
                                <p>Answer: You can contact customer support by calling us at 123-456-7890 or by emailing us at</p>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Contact;