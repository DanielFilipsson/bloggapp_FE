import React, { useState, useEffect } from 'react';
import styles from "../Styles/home.module.css";

function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/v1/post/getAllPosts`)
            .then(response => response.json())
            .then(data => {
                const postsWithComments = data.map(post => ({ ...post, comments: [] }));
                setPosts(postsWithComments);
                postsWithComments.forEach(post => fetchComments(post._id));
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const fetchComments = (postId) => {
        fetch(`${process.env.REACT_APP_API_URL}/api/v1/comments/post/${postId}`)
            .then(response => response.json())
            .then(comments => {
                setPosts(prevPosts => prevPosts.map(post =>
                    post._id === postId ? { ...post, comments: Array.isArray(comments) ? comments : [] } : post
                ));
            })
            .catch(error => {
                console.error(`Error fetching comments for post ${postId}:`, error);
                setPosts(prevPosts => prevPosts.map(post =>
                    post._id === postId ? { ...post, comments: [] } : post
                ));
            });
    };

    function handleCommentSubmit(event, postId) {
        event.preventDefault();
        const commentText = event.target.elements.comment.value;
        fetch(`${process.env.REACT_APP_API_URL}/api/v1/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId, content: commentText })
        })
        .then(response => response.json())
        .then(comment => {
            setPosts(prevPosts => prevPosts.map(post =>
                post._id === postId ? { ...post, comments: [...post.comments, comment] } : post
            ));
            event.target.reset();
        })
        .catch(error => console.error(`Failed to submit comment:`, error));
    }

    return (
        <div className={styles.homepage}>
        {posts.map(post => (
            <div key={post._id} className={styles.post}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <small>Posted by: {post.author}</small>
                {post.comments.map(comment => (
                    <div key={comment._id} className={styles.comment}>
                        <p>{comment.content}</p>
                    </div>
                ))}
                <form onSubmit={(e) => handleCommentSubmit(e, post._id)}>
                    <input type="text" name="comment" placeholder="Write a comment..." required style={{ color: 'white', backgroundColor: '#333' }} />
                    <button type="submit">Comment</button>
                </form>
            </div>
        ))}
    </div>
    );
}

export default HomePage;


