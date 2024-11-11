## Firebase Usage

### how do I get it running locally
You need a `.env` file in the `frontend` folder with the following content:

```bash
VITE_API_URL=http://localhost:8080
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

You can also make a copy of the `.env.example` file and rename it to `.env`.

### Where do I find the actual creds?
For security reasons, actual creds are not stored in github. If you are project contributors, you can find them at [firebase project setting](https://console.firebase.google.com/u/3/project/marconnect/settings/general/)
Alternatively, if the link doesn't work, you can go to your firebase project, select "marconnect," then click on that setting icon at top left and select "Project settings." Scroll down on general and find "marconnect-client," you will find the web app config there. Just make sure to NOT COPY THE JS OBJECT DIRECTLY, but instead copy the values of the object and paste them in the `.env` file.


## What the data looks like
In firebase, the data is organized as follows:
* `meetings` collection
    * documents are organized by the 9 digit meeting ID
    * for each document:
        * `meeting_id` (string): the 9 digit meeting ID
        * `messages` COLLECTION: contains all the **data streaming** (not to be confused with chat messages) messages:
            * This is the important part for data streaming
            * `service` (string): the service that the message is from, this is to distiuish between different services (chat, whiteboard, code, screenshare, video)
            * `data` (string): the data that is being sent
                * Please only include all data in this field
            * `timestamp` (timestamp): the time the message was sent
    


## Functions available
Currently, the following functions are available in the `firebase.js` file:

### `getMeeting`

Fetches the details of a specific meeting from the database.

**Parameters:**
- `meetingId` (string): The ID of the meeting to fetch.

**Returns:**
- An object containing the meeting details if the meeting exists.
- `null` if the meeting does not exist.

### `getAllMessages`

Fetches all messages for a specific meeting from the database.

**Parameters:**
- `meetingId` (string): The ID of the meeting to fetch messages for.

**Returns:**
- An array of message objects.

**Throws:**
- Logs an error to the console if there is an issue fetching the messages.

### `sendMessageToMeetingRoom`

Sends a message to a specific meeting room.

**Parameters:**
- `meetingId` (string): The ID of the meeting to send the message to.
- `service` (string): The service that the message is from.
- `data` (string): The data to send.




