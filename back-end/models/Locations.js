import mongoose from 'mongoose';

/* 
  Location Schema
  - Represents a location within a trip, including details like address, associated activities, and optional image.
  - Fields:
    - name: Name of the location (e.g., "Golden Gate Bridge")
    - tripId: Reference to the Trip document this location belongs to
    - address: Optional address or description of the location
    - activities: Array of references to Activity documents (activities planned at this location)
    - image: Optional image URL for the location
*/
const LocationSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the location
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true }, // Associated trip
    address: { type: String }, // Optional address or description
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }], // List of activities
    image: { type: String, default: 'https://picsum.photos/200' }, // Default image if none is provided
}, 
{ timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Location = mongoose.model('Location', LocationSchema);

export default Location;
