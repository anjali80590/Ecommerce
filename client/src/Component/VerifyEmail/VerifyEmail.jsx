import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Navigation from '../Navigation/Navigation';
import './VerfiyEmail.css';
import { useEffect } from 'react';
import Baseurl from '../BaseUrl/BaseUrl';

function VerifyEmail() {
  const [code, setCode] = useState(Array(8).fill(''));
  const navigate = useNavigate();
  const [redactedEmail, setRedactedEmail] = useState('***@***.com');

  useEffect(() => {
    const emailFromStorage = localStorage.getItem('email');
    if (emailFromStorage) {
      const redacted = emailFromStorage.replace(/^(.{3}).+(@.*)$/, '$1***$2');
      setRedactedEmail(redacted);
    }
  }, []);

  const handleChange = (index) => (event) => {
    const newCode = [...code];
    newCode[index] = event.target.value;
    setCode(newCode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const verificationCode = code.join('');
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`${Baseurl}/api/users/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({ verificationCode }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Verification Done')
        navigate('/login');
      } else {
        
        toast.error('Verification failed.', {
          
        });
        console.error('Verification failed:', data.message);
      }
    } catch (error) {
      console.error('There was an error verifying the email:', error);
      toast.error('There was an error verifying the email. Please try again later.', {
     
      });
    }
  };

  return (
    <div className='verify-container'>
      <Navigation />
      <div className="verify-email-container">
        <form onSubmit={handleSubmit} className="verify-email-form">
          <div className='verify'>Verify your email</div>
          <p>Enter the 8 digit code you have received on <br/><strong className='strong'>{redactedEmail}</strong> </p>
          <div className='code'>
            Code
            <div className="code-input-container">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  name={`code-${index}`}
                  value={digit}
                  onChange={handleChange(index)}
                  maxLength="1"
                  required
                  pattern="\d*"
                  className="code-input"
                />
              ))}
            </div>
          </div>
          <button type="submit" className="verify-btn">
            VERIFY
          </button>
        </form>
      </div>
      <ToastContainer /> 
    </div>
  );
}

export default VerifyEmail;
