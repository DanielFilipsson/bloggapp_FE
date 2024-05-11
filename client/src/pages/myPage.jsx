import React, { useState, useEffect } from 'react';
import styles from '../Styles/mypage.module.css';

function MyPage() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [author, setAuthor] = useState('');

    useEffect(() => {
        fetchUserPosts();
        setAuthor('USER_ID_HERE'); 
    }, []);

    const fetchUserPosts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/post/getAllPosts`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPost(prev => ({ ...prev, [name]: value }));
    };

    const handlePostSubmit = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId'); 
        const postData = { ...newPost, author: userId };
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/post/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            if (response.ok) {
                setPosts([...posts, data]);
                setNewPost({ title: '', content: '' });
            } else {
                throw new Error(data.message || 'Failed to create post');
            }
        } catch (error) {
            console.error('Failed to submit post:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.backgroundSection}>
                <h1 className={styles.header}>My Page</h1>
                <h2>Create New Post</h2>
                <form className={styles.form} onSubmit={handlePostSubmit}>
                    <input
                        type="text"
                        name="title"
                        className={styles.inputField}
                        value={newPost.title}
                        onChange={handleInputChange}
                        placeholder="Post Title"
                        required
                    />
                    <textarea
                        name="content"
                        className={styles.textareaField}
                        value={newPost.content}
                        onChange={handleInputChange}
                        placeholder="Post Content"
                        required
                    />
                    <button type="submit">Post</button>
                </form>
                <h2>My Posts</h2>
                <div>
                    {posts.map(post => (
                        <div key={post._id} className={styles.post}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyPage;



