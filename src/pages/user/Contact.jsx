import React, { useState } from 'react';
import './Contact.css';
import { FaPlus, FaMinus } from "react-icons/fa";
import PostUserMessage from '../../services/user/PostUserMessage';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

function Contact() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleMessage = async () => {

        if (firstName == "") {
            toast.error('First Name is required');
            return;
        } else if (firstName.length < 3) {
            toast.error('First Name must be at least 3 characters');
            return;
        }

        if (lastName == "") {
            toast.error('Last Name is required');
            return;
        } else if (lastName.length < 3) {
            toast.error('Last Name must be at least 3 characters');
            return;
        }

        if (email == "") {

            toast.error('Email is required');
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error('Email is invalid');
            return;
        }

        if (message == "") {
            toast.error('Message is required');
            return;
        } else if (message.length < 10) {
            toast.error('Message must be at least 10 characters');
            return;
        }


        const res = await PostUserMessage(firstName, lastName, email, message);
        console.log(res);
        if (res.statusCode === 200) {
            setFirstName('');
            setLastName('');
            setEmail('');
            setMessage('');
            toast.success('Message sent successfully');
        }
        else {
            toast.error('Error sending message');
        }
    }

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
            <Toaster
                position='top-center'
                toastOptions={{
                    duration: 3000,
                }}
            />
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
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <button
                                onClick={handleMessage}
                            >
                                Submit
                            </button>
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
                        <div className='FAQ-Question'  onClick={() => toggleAnswer(1)}>
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
                                <p>Answer: You can book a room by visiting desirable hotel and selecting the room you want to book with suitale payment method.</p>
                            </div>
                        }
                    </div>
                    <br />

                    {/* second FAQ */}
                    <div>
                        <div className='FAQ-Question' onClick={() => toggleAnswer(2)}>
                            <div>
                                <h2>Question : What payment methods do you accept for bookings?</h2>
                            </div>

                            <div onClick={() => toggleAnswer(2)}>
                                {showAnswer2 ? <FaMinus /> : <FaPlus />}
                            </div>
                        </div>
                        <br />
                        {showAnswer2 &&
                            <div className='FAQ-Answer'>
                                <p>Answer: Annapurna Booking System faciliates two payment methods <span className='faq'>Cash On Arrival </span> and <span className='faq'>Khalti Online Payment</span>.</p>
                            </div>
                        }
                    </div>
                    <br />

                    {/* Third FAQ */}
                    <div>
                        <div className='FAQ-Question' onClick={() => toggleAnswer(3)}>
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
                                <p>Answer: You can contact customer support by calling us at <span className='faq'>+977 9869147904</span> or by emailing us at <span className='faq'>AnnapurnaBooking@gmail.com</span></p>
                            </div>
                        }
                    </div>

                    <br />

                    {/* fourth FAQ */}
                    <div>
                        <div className='FAQ-Question' onClick={() => toggleAnswer(4)}>
                            <div>
                                <h2>Question : Are pets allowed in the hotels?</h2>
                            </div>

                            <div onClick={() => toggleAnswer(4)}>
                                {showAnswer4 ? <FaMinus /> : <FaPlus />}
                            </div>
                        </div>
                        <br />
                        {showAnswer4 &&
                            <div className='FAQ-Answer'>
                                <p>Answer: Each hotels has its own policy regarding pets. Some hotels allow pets while some do not. Please do contact hotel owner.</p>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Contact;