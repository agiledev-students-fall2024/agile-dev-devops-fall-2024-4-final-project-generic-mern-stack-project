import mongoose from 'mongoose';

/* 
  Activity Schema
  - Represents an activity planned at a location, including voting, comments, and a type category.
  - Fields:
    - name: Name of the activity (e.g., "Hiking at Yosemite")
    - description: Optional description of the activity
    - locationId: Reference to the Location document this activity belongs to
    - tripId: Reference to the Trip document this activity belongs to
    - createdBy: Reference to the User who added the activity
    - type: Category of the activity (e.g., "food", "activities", "stay")
    - votes: Net vote count (upvotes as positive, downvotes as negative)
    - price: Cost of the activity (range from 0 to 4, representing $$$$)
    - image: Optional image URL for the activity
    - comments: Array of embedded comment objects (userId, commentString)
    - isCompleted: Boolean indicating if the activity has been completed
*/
const ActivitySchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the activity
    description: { type: String }, // Optional description
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true }, // Associated location
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true }, // Associated trip
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who added the activity
    type: {
        type: String,
        enum: ['food', 'activities', 'stay'], // Restricts the type to these specific categories
        required: true,
    }, // Category of the activity
    votes: { type: Number, default: 0 }, // Net votes (+ve for upvotes, -ve for downvotes)
    price: { type: Number, min: 0, max: 4 }, // Price range (0 = Free, 4 = $$$$)
    image: { type: String, default: 'https://picsum.photos/200' }, // Default image
    comments: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who made the comment
            commentString: { type: String, required: true }, // Content of the comment
            createdAt: { type: Date, default: Date.now }, // Timestamp for the comment
        },
    ],
    isCompleted: { type: Boolean, default: false }, // Status of the activity
}, 
{ timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Activity = mongoose.model('Activity', ActivitySchema);

export default Activity;
