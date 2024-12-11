import React, {createContext, useState, useEffect} from 'react'; 

const PinContext = createContext(); // Context used to synchronize pins in Home and Modify Pins


const PinProvider = ({children}) => {
    const [pins, setPins] = useState([]);

    useEffect(() => {
        const fetchPins = async () => { // Fetch pins from backend when context starts
          try {
            const response = await fetch('http://localhost:5001/api/pins');
            const data = await response.json();
            setPins(data);
          } catch (error) { //[Make Page]
            console.error('Error fetching pins:', error); // Inform
          }
        };
        fetchPins();
      }, []);



      // addPin, updatePin, and deletePin are called for both Map.js and ModifyPins.js (homogonizes the function)


      const addPin = async (newPin) => { // Add pin 
        try {
          const response = await fetch("http://localhost:5001/api/pins", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPin),
          });
      
          if (!response.ok) {
            throw new Error("Failed to add pin");
          }
      
          const data = await response.json();
      
          // Add the new pin to the existing pins
          setPins((prevPins) => [...prevPins, data]); 
        } catch (error) {
          console.error("Error adding pin:", error);
        }
      };
      


      const updatePin = async (id, updatedMessage) => { // Update pin to backend
        try {
          const response = await fetch(`http://localhost:5001/api/pins/${id}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ message: updatedMessage }),
          });
          const updatedPin = await response.json();
          setPins((prevPins) =>
            prevPins.map((pin) => (pin._id === id ? updatedPin:pin))
          );
        } 
        catch (error) {
          console.error('Error updating pin:', error);
        }
      };

      const deletePin = async (id) => {
        try {
          await fetch(`http://localhost:5001/api/pins/${id}`, {
            method: 'DELETE',
          });

          // setPins((prevPins) => prevPins.filter((pin) => pin.id !== id));

          setPins((prevPins) => {
            const updatedPins = prevPins.filter((pin) => pin._id !== id);
            console.log("Updated pins after deletion:", updatedPins);
            return updatedPins;
          });


        } 
        catch (error) {
          console.error('Error deleting pin:', error);
        }
      };
    

      return (
        <PinContext.Provider value={{ pins, addPin, updatePin, deletePin }}>
          {children}
        </PinContext.Provider>
      );


    
}


export { PinContext, PinProvider };
