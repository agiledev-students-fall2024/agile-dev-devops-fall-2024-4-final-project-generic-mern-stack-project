# Guide to Contributing to TripTease

## Team Norms and Values

### Our Values
* **Collaboration**: We prioritize working together to ensure everyone’s input and expertise are valued in the project.
* **Transparency**: Open communication about decisions, progress, and challenges is essential.
* **Commitment**: Every team member will fulfill their responsibilities and participate actively.
* **Accountability**: If someone faces difficulties or delays, the team will work together to find solutions.
* **Respect**: All members’ opinions are respected, and any disagreements are resolved by discussion and consensus.

### Team Norms
* **Active Participation**: Every member is expected to contribute regularly. If you miss two consecutive standups without prior notice, we will notify the group.
* **Daily Standups**:
  * **Schedule**: Monday, Wednesday, Sunday from 12:00-12:15 PM (in-person, synchronous).
  * **Purpose**: Share progress, discuss blockers, and review goals.
* **Support**: If you’re struggling with a task, ask for help from the team during standups or in the group chat.

## Git Workflow

### Our Git Workflow
We follow a **feature branch workflow**:
1. **Create a Feature Branch**: Each new feature or bug fix should have its own branch.
2. **Sync Regularly**: Always sync with the `main` branch before starting work and before pushing your code.
3. **Pull Requests**:
   * Open a pull request to merge your feature branch into the `main` branch when your feature is ready.
   * Assign a team member to review your pull request.
4. **Peer Reviews**: Every pull request will be reviewed by at least one other team member before merging.

### Branch Naming:
* Name your branches descriptively. For example: `feature-add-voting-system` or `bugfix-fix-voting-bug`.

### Commits
* Make small, frequent commits with descriptive messages (e.g., `git commit -m "Add voting functionality for activities"`).
* Avoid large monolithic commits; break down your work into smaller pieces.
* Ensure commits do not break the build.

## Rules for Contribution

### What to Contribute
* **Features**: New features should align with the project goals. Before adding, confirm it doesn’t duplicate existing features.
* **Bug Fixes**: If you encounter a bug, feel free to fix it. Ensure you link to the bug report in your pull request.
* **Tests**: Write tests for new features and ensure the code coverage remains high.

### How to Contribute
1. **Fork the Repository**: If you’re an external contributor, fork the project repository and clone it to your local machine.
2. **Create a Branch**: Create a new branch for your feature or fix:
   * `git checkout -b <branch-name>`
3. **Commit Regularly**: Make sure you commit your progress frequently with descriptive messages.
   * `git commit -m "Descriptive message"`
4. **Push Your Branch**: Push your changes to the remote repository.
   * `git push origin <branch-name>`
5. **Open a Pull Request**: When your feature is ready, open a pull request against the `main` branch and assign it to a reviewer.
6. **Code Review**: Your pull request will be reviewed by at least one other member before merging into `main`.

## Setting Up the Local Development Environment

Follow these instructions to set up the project locally:

1. **Clone the Repository**
   * `git clone https://github.com/agiledev-students-fall2024/4-final-project-trip-tease.git`
2. **Navigate to the Project Directory**
   * `cd 4-final-project-trip-tease`
3. **Install Dependencies**
   * Run the command: `npm install`
   * Ensure all necessary dependencies are installed.
4. **Run the Development Server**
   * Start the project locally with: `npm start`

## Building & Testing

* Will update this section later with more detailed instructions for building and testing our application.

