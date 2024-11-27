import  Location from '../models/Location.js'; // Location model
import  Activity from '../models/Activity.js'; // Activity model
import Trip from '../models/Trip.js';

export const getLocation = async (req, res) => {
    try{
        const locationId = req.params.locationId;
        const location = await Location.findById(locationId);
        res.json(location);

    }catch(error){
        res.status(500).json({ error: 'Failed to retrieve activities for the location' });
    };
}

export const getLocationActivities = async (req, res) => {
    console.log('this is being used!')
    try{
        const locationId = req.params.locationId;
        const location = await Location.findById(locationId).populate('activities');
        res.json(location.activities);

    }catch(error){
        res.status(500).json({ error: 'Failed to retrieve activities for the location' });
    };
}

export const addLocation = async (req, res) => {
    console.log('location trying to get added!');
    try{

        //TODO (but not necessary): add a trip validation to make error handling more graceful

        const { name, address, tripId } = req.body;

        const newLoc = new Location({ 
            //all other fields will use their default values as defined in the schema
            //namely, the activities array will be set to [] because it is set as an array type in the schema
            name,
            address,
            tripId
        });

        const savedNewLoc = await newLoc.save(); //saves the location into the database
        console.log(savedNewLoc); //prints it, just for debugging

        const updatedTrip = await Trip.findByIdAndUpdate(
            tripId, //pass in the tripId
            { $push: { locations: savedNewLoc._id } }, //adds the id to the trip's locations array
            { new: true } //returns the new trip
        );

        res.status(201).json({
            message: 'saved location and added to trip :)',
            updatedTrip: updatedTrip,
            newLoc: savedNewLoc
        });

    }catch(error){
        console.error('error creating location :( ->', error);
        res.status(500).json({ error: 'failed to create a new location & add to trip...' });
    };
};

export default {
    getLocation,
    getLocationActivities,
    addLocation
  };