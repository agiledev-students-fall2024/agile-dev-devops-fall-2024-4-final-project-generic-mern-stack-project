# README back-end

### Running front-end and back-end concurrently

#### Launch Frontend
```
cd front-end
npm run dev
```


#### Launch Backend
```
cd back-end
node server.js
```

### env file in back-end
Should contain the following:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```


#### Testing login
Username: username
Password: password


#### Login functionality
Login page connected to firebase


##### Login endpoints
* POST /auth/login route
* POST /auth/user route - for creating new user
* PATCH /auth/user route - for updating password


#### Whiteboard functionality
tldraw whiteboard plugin
Live sync, multiple users can use it simultaneously
Additional features including name over cursor to be implemented


##### Meeting endpoints 
* GET route for joining a meeting which gets the meeting ID specified by the user to a specific meeting to join it.
* POST route for creating a new meeting that randomly generates a 10 digit meeting ID for the new meeting.


##### Code Editor Fimctopma;oty"
Uses monaco code editor for react. 
Supports only javascript and compiles locally.
Code is synced between users via firebase.


# Chat functionality
sockets for rooms



#### API endpoints
* 
* 
* 


