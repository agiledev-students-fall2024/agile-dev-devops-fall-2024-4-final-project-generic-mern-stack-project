import  Location from '../models/Location.js'; // Location model
import  Activity from '../models/Activity.js'; // Activity model

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

export default {
    getLocation,
    getLocationActivities
  };