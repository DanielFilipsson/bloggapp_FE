import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../Styles/start.module.css";

function StartPage() {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail, password: loginPassword })
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId); 
                navigate('/home');
            } else {
                alert('Login failed: ' + data.message);
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed: ' + error.message);
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        if (registerPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: registerEmail,
                password: registerPassword,
                firstName: firstName,
                lastName: lastName
            })
        });
        const data = await response.json();
        if (data.message === "User has registered") {
            alert('Registration successful. Please log in.');
        } else {
            alert('Registration failed: ' + data.message);
        }
    };

    return (
        <div className={styles.startPage}>
            <h1>Welcome to Our Blog!</h1>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="Enter your email" required />
                    <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="Enter your password" required />
                    <button type="submit">Login</button>
                </form>
            </div>
            <div>
                <h2>Register</h2>
                <form onSubmit={handleRegisterSubmit}>
                    <input type="email" value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} placeholder="Enter your email" required />
                    <input type="password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} placeholder="Enter your password" required />
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm your password" required />
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Enter your first name" required />
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Enter your last name" required />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default StartPage;

