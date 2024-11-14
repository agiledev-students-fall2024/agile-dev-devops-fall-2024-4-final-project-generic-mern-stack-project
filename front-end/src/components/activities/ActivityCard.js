// ActivityCard.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './ActivityCard.css';

const ActivityCard = ({ id, title, votes, description, price, comments, imageUrl, isCompleted, onUpvote, onDownvote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    setCommentList(comments || []);
  }, [comments]);

  const toggleDetails = () => setIsExpanded((prev) => !prev);

  const addComment = () => {
    if (newComment.trim()) {
      axios.post(`/activities/${id}/comments`, { commentString: newComment })
        .then(response => {
          setCommentList([...commentList, response.data]); // Add full comment object
          setNewComment(''); // Clear the input field
        })
        .catch(error => {
          console.error('Error adding comment:', error);
        });
    }
  };

  const deleteComment = (commentId) => {
    axios.delete(`/activities/${id}/comments/${commentId}`)
      .then(() => {
        setCommentList(commentList.filter(comment => comment.id !== commentId)); 
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
      });
  };

  return (
    <div className="activity-card">
      {isCompleted && <span className="activity-card__status">completed</span>}
      <div className="activity-header" onClick={toggleDetails}>
        <h3>{title}</h3>
        <div className="vote-section">
          <button onClick={(e) => { e.stopPropagation(); onUpvote(); }}>↑</button>
          <span>{votes}</span>
          <button onClick={(e) => { e.stopPropagation(); onDownvote(); }}>↓</button>
        </div>
      </div>

      {isExpanded && (
        <div className="activity-details">
          <div className="details-content">
            <div className="description-section">
              <p>{description}</p>
              <p>Price: {price}</p>
            </div>

            <div className="image-section">
              <img src={imageUrl} alt={title} className="activity-image" />
            </div>
          </div>

          <div className="comments-section">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={addComment}>Add Comment</button>

            <div className="comments-list">
              {commentList.map((comment) => (
                <p key={comment.id}>
                  {comment.commentString}
                  <button onClick={() => deleteComment(comment.id)}>Delete</button>
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ActivityCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  description: PropTypes.string,
  price: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    commentString: PropTypes.string.isRequired
  })),
  imageUrl: PropTypes.string,
  isCompleted: PropTypes.bool,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

export default ActivityCard;
