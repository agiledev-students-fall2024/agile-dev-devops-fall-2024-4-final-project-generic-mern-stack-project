import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ActivityCard.css';

const ActivityCard = ({ id, title, votes, description, price, comments, imageUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(comments || []);
  const [voteCount, setVoteCount] = useState(votes);

  const toggleDetails = () => setIsExpanded((prev) => !prev);

  const addComment = () => {
    if (newComment.trim()) {
      setCommentList([...commentList, newComment]);
      setNewComment('');
    }
  };

  const handleUpvote = (e) => {
    e.stopPropagation(); // this is to stop the whole expansion/retraction of the whole card
    setVoteCount((prev) => prev + 1);
  };

  const handleDownvote = (e) => {
    e.stopPropagation(); // this is to stop the whole expansion/retraction of the whole card too, lol
    setVoteCount((prev) => prev - 1);
  };

  return (
    <div className="activity-card">
      <div className="activity-header" onClick={toggleDetails}>
        <h3>{title}</h3>
        <div className="vote-section">
          <button onClick={handleUpvote}>↑</button>
          <span>{voteCount}</span>
          <button onClick={handleDownvote}>↓</button>
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
              {commentList.map((comment, index) => (
                <p key={index}>{comment}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ActivityCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  description: PropTypes.string,
  price: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.string),
};

ActivityCard.defaultProps = {
  description: 'No description available',
  price: '$',
  comments: [],
};

export default ActivityCard;



// everything below here is Harrison Wong's old code, fred edited the stuff above

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import './ActivityCard.css'; // Make sure the CSS file is imported

// const ActivityCard = ({ id, title, votes, description, price, comments, imageUrl }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [newComment, setNewComment] = useState('');
//   const [commentList, setCommentList] = useState(comments || []);

//   const toggleDetails = () => setIsExpanded((prev) => !prev);

//   const addComment = () => {
//     if (newComment.trim()) {
//       setCommentList([...commentList, newComment]);
//       setNewComment('');
//     }
//   };

//   return (
//     <div className="activity-card">
//       <div className="activity-header" onClick={toggleDetails}>
//         <h3>{title}</h3>
//         <div className="vote-section">
//           <button>↑</button>
//           <span>{votes}</span>
//           <button>↓</button>
//         </div>
//       </div>

//       {isExpanded && (
//         <div className="activity-details">
//           <div className="details-content">
//             <div className="description-section">
//               <p>{description}</p>
//               <p>Price: {price}</p>
//             </div>

//             <div className="image-section">
//               <img src={imageUrl} alt={title} className="activity-image" />
//             </div>
//           </div>

//           <div className="comments-section">
//             <input
//               type="text"
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               placeholder="Add a comment..."
//             />
//             <button onClick={addComment}>Add Comment</button>

//             <div className="comments-list">
//               {commentList.map((comment, index) => (
//                 <p key={index}>{comment}</p>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// ActivityCard.propTypes = {
//   id: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   votes: PropTypes.number.isRequired,
//   description: PropTypes.string,
//   price: PropTypes.string,
//   comments: PropTypes.arrayOf(PropTypes.string),
// };

// ActivityCard.defaultProps = {
//   description: 'No description available',
//   price: '$',
//   comments: [],
// };

// export default ActivityCard;
