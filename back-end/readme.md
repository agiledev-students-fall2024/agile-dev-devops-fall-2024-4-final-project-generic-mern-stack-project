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
API Endpoint Reference
##### Authentication API
Register a New User
Endpoint: /auth/user
Method: POST
Description: Creates a new user in the system with a username and password.

Request Body:
json
{
  "username": "test",
  "password": "123456"
}

Response:
Status 201: User successfully created.
Status 400: Validation error (e.g., missing fields or invalid data).

##### Login with Existing Credentials
Endpoint: /auth/login
Method: POST
Description: Logs in a user by validating the provided username and password.
Request Body:

json
{
  "username": "test",
  "password": "123456"
}
Response:
Status 200: Login successful. Returns a JSON Web Token (JWT).
Status 401: Unauthorized access due to invalid credentials.

##### Update User Password
Endpoint: /auth/user
Method: PATCH
Description: Updates the password for an existing user.
Request Body:

json
{
  "username": "test",
  "password": "newpassword123"
}

Response:
Status 200: Password updated successfully.
Status 404: User not found.


##### Code Editor API
Get Code History for a Meeting
Endpoint: /code/:meetingId
Method: GET
Description: Retrieves the code history for a specific meeting session.
Query Params:
meetingId (string): The unique identifier of the meeting.

Response:
Status 200: Returns the code history as a JSON object.
Status 404: Meeting not found.
Send a Code Update
Endpoint: /code/:meetingId
Method: POST
Description: Updates the code for a specific meeting session.
Request Body:
json

{
  "code": "console.log('Hello, World!')",
  "language": "javascript"
}

Response:
Status 200: Code updated successfully.
Status 404: Meeting not found.

##### Stream Real-Time Code Updates
Endpoint: /code/:meetingId/stream
Method: GET
Description: Streams real-time updates for collaborative code editing.
Query Params:
meetingId (string): The unique identifier of the meeting.

Response:
Status 200: Returns a stream of code changes in real time.
Status 404: Meeting not found.
Meeting API

##### Fetch Meeting Room by ID
Endpoint: /meeting/:id
Method: GET
Description: Fetches the details of a specific meeting room using its unique ID.
Path Parameter:
id (string): The unique identifier of the meeting room.

Response:
Status 200: Returns the meeting details.
Status 404: Meeting not found.

##### Create a New Meeting Room
Endpoint: /meeting
Method: POST
Description: Creates a new meeting room with a unique identifier.
Request Body: None

Response:
Status 201: Meeting room created successfully. Returns the meeting ID.
Whiteboard API

##### Access Existing Whiteboard ID
Endpoint: /whiteboard
Method: GET
Description: Retrieves an existing whiteboard session ID.
Request Body: None

Response:
Status 200: Returns the whiteboard session ID.
Status 404: Whiteboard session not found.

##### Create a New Whiteboard
Endpoint: /whiteboard
Method: POST
Description: Creates a new whiteboard session.
Request Body: None

Response:
Status 201: Whiteboard session created successfully.

##### Delete an Existing Whiteboard
Endpoint: /whiteboard
Method: DELETE

Description: Deletes an existing whiteboard session.
Request Body: None

Response:
Status 200: Whiteboard session deleted successfully.
Status 404: Whiteboard session not found.