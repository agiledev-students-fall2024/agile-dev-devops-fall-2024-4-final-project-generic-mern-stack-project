# While We Were Dreaming

## Product Vision Statement
While We Were Dreaming is a location-based platform designed to connect NYU students through the shared memories they create on campus. By pinning personal experiences to a dynamic map, students can reflect on key moments of their college journey and explore the memories of others enhanced by anonymity. This platform fosters a sense of community and nostalgia, bridging the emotional gap often felt in an open-city campus like NYU. The map becomes a collective memory, capturing the dreams and experiences of past, present, and future students.

## Team Members
* [Kahmeeah Obey](https://github.com/kahmeeah)
* [Golam Raiyan](https://github.com/raiyan-codes)
* [Derrick Song](https://github.com/Songdddd)
* [Mohamed Alremeithi](https://github.com/Mohamed-Alremeithi)
* [Vishnu Kommuri](https://github.com/vishnukommuri326)
* [Seo Kwak](https://github.com/seokwak)

## History of the Project
While We Were Dreaming began as a response to the disconnect many students experience on an open-city campus like NYU. As students move through the bustling streets of New York, they often miss opportunities to connect with their peers and reflect on the memories that shape their college experience. The name, While We Were Dreaming, is inspired by the iconic "Dream Until It's Your Reality" graffiti that can be found scattered everywhere among campus and other places in the city that is often one of the first sights that greets students upon their arrival in New York. It resonates with the spirit of NYU, where the city and campus serve as the backdrop for countless dreams—thus, one can say this platform serves as a map of all our memories and the things we did here "while we were dreaming".

Over time, the idea evolved into a simple, anonymous platform that prioritizes reflection and nostalgia, without the distractions of likes or comments. Designed by a team of passionate students, While We Were Dreaming is an interactive tool that captures the essence of college life at NYU, allowing users to explore both individual and shared histories.

## How to Contribute
We welcome contributions from the community! To get started, please review our [CONTRIBUTING.md](./CONTRIBUTING.md) document, which outlines the guidelines for contributing.

## Building & Testing
### Building the Project
To set up the project locally, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/agiledev-students-fall2024/4-final-project-while-we-were-dreaming.git
   ```
2. Navigate to the project directory:
   ```bash
   cd 4-final-project-while-we-were-dreaming
   ```
3. Navigate to the backend and frontend directories and install dependencies:
   ```bash
   cd back-end
   npm install
   cd ../front-end
   npm install
   ```

### Running the Application Locally
To run the project locally:
1. Start the backend server:
   ```bash
   cd back-end
   npm run dev
   ```
   The server should be running on `http://localhost:5001`.

2. Start the frontend application:
   ```bash
   cd ../front-end
   npm start
   ```
   The frontend should be accessible on `http://localhost:3000`.

### Testing Instructions
To run the tests and check code coverage:
1. Make sure you are in the `back-end` directory.
   ```bash
   cd back-end
   ```
2. Run the test script:
   ```bash
   npm test
   ```
   This will execute the test cases using Mocha and Chai.

3. Check code coverage with C8:
   ```bash
   npm run test:coverage
   ```
   Ensure that at least 10% code coverage is met as required.

### Frontend-Backend Integration
Ensure that the frontend is configured to make API calls to the local backend server (`http://localhost:5001`) for development. This integration step is crucial for end-to-end testing and should be reflected in the frontend's environment variables or API configurations.

