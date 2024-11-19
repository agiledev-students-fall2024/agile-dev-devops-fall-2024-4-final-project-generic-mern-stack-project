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


Here’s the fully updated README without backticks for the code snippets:

README - Back-End
Running Front-End and Back-End Concurrently
Launch Frontend
cd front-end
npm run dev

Launch Backend
cd back-end
node server.js

### Environment Variables
.env file in Back-End
The back-end requires a .env file with the following keys:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret

FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

#### Features and Functionality
Authentication
Secure user registration and login using JSON Web Tokens (JWT).
Passwords are hashed with bcrypt and stored securely in MongoDB.

##### Endpoints
* POST /auth/login route
* POST /auth/user route - for creating new user
* PATCH /auth/user route - for updating password


#### Whiteboard Functionality
* tldraw plugin for the whiteboard.
* Live sync functionality for multiple users to collaborate in real-time.
* Planned feature: Name over cursor for better participant identification.

##### Endpoints:
* GET /whiteboard: Retrieve a whiteboard ID.
* POST /whiteboard: Create a new whiteboard session.
* DELETE /whiteboard: Delete an existing whiteboard session.


#### Meeting Functionality
* Create or join meeting rooms with customizable settings.
* Each meeting is assigned a unique 9-digit ID.

##### Endpoints:
* GET /meeting/:id: Retrieve details of a specific meeting.
* POST /meeting: Create a new meeting.

#### Code Editor Functionality
* Uses Monaco Code Editor for React.
* Real-time code collaboration powered by Firebase.
* Supported language: JavaScript.
* Changes are synced between users in the same meeting.

##### Endpoints:
* GET /code/:meetingId: Fetch code history for a meeting.
* POST /code/:meetingId: Update code for a meeting.
* GET /code/
* /stream: Stream real-time code updates.

#### Chat Functionality
* Chat feature uses WebSockets for real-time communication in rooms.
* Each meeting supports a dedicated chat room for participants.

#### Firebase Integration
* The Firebase service is used to handle real-time data synchronization. Below are the main functions integrated into the back-end:

* getMeeting(meetingId): Retrieve details of a specific meeting.
* getAllMessages(meetingId): Fetch all messages for a specific meeting room.
* listenForNewMessages(meetingId, callback): Listen for new chat messages in real time.
* sendDataToMeetingRoom(meetingId, service, data): Send specific data (e.g., code updates, chat messages) to a meeting room.

### API Endpoint Reference
Authentication API
Endpoint: /auth/user
Method: POST
Description: Register a new user
Request Body:

json
{ "username": "test", "password": "123456" }
Endpoint: /auth/login
Method: POST
Description: Login with existing credentials
Request Body:

json
{ "username": "test", "password": "123456" }
Endpoint: /auth/user
Method: PATCH
Description: Update user password
Request Body:

json
{ "username": "test", "password": "newpassword123" }
Code Editor API
Endpoint: /code/:meetingId
Method: GET
Description: Get code history for a meeting
Query Params:

meetingId
Endpoint: /code/:meetingId
Method: POST
Description: Send a code update
Request Body:

json
{ "code": "console.log()", "language": "javascript" }
Endpoint: /code/:meetingId/stream
Method: GET
Description: Stream real-time code updates
Query Params:

meetingId
Meeting API
Endpoint: /meeting/:id
Method: GET
Description: Fetch meeting room by ID
Path Parameter:

meetingId
Endpoint: /meeting
Method: POST
Description: Create a new meeting room
Request Body: N/A

Whiteboard API
Endpoint: /whiteboard
Method: GET
Description: Access existing whiteboard ID
Request Body: N/A

Endpoint: /whiteboard
Method: POST
Description: Create a new whiteboard
Request Body: N/A

Endpoint: /whiteboard
Method: DELETE
Description: Delete a whiteboard
Request Body: N/A
