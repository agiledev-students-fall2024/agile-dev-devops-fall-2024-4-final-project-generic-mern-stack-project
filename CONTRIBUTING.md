# Guide to Contributing to TripTease

## Team Norms and Values

### Team Values
* **Collaboration**: We work together openly, respect each other's ideas, and maintain a positive environment.
* **Communication**: Keep communication transparent, prompt, and respectful. All members are expected to respond to messages within 1 day.
* **Accountability**: Team members should complete their tasks on time. If not, they must communicate the reasons ahead of time so that the work can be reallocated.
* **SCRUM Methodology**: We follow Agile principles and run frequent sprints and daily standups to keep track of progress and address any blockers.
* **Support**: Team members should ask for help when needed. If any challenges arise, reach out in team channels or during standups.
* **Decision-Making**: Team-wide issues are resolved by a democratic vote.
* **Respect**: All members’ opinions are respected, and any disagreements are resolved by discussion and consensus.

### Daily Standups
* **Schedule**: Monday, Wednesday, Sunday from 12:00-12:15 PM (synchronous, in-person).
* **Expectations** All members should be present. Team members are expected to briefly share:
   * What they did since the last standup.
   * Any blockers they encountered.
   * What they plan to do next.

## Coding Standards

* **Editor**: We’ll use Visual Studio Code for our designated code editor.
* **Write Minimum Viable Code**: Focus on getting the core functionality working first and iterate on improvements.
* **Peer Reviews**: All code must be peer-reviewed before it is merged into the `main` branch.
* **Push Working Code Only**: Always ensure the code you push works and passes tests. If the build breaks, prioritize fixing it.
* **Clear Commit Messages**: Use descriptive commit messages to explain what changes were made.
* **Self-Documenting Code**: Write code that is easy to understand. Use meaningful variable, function, and class names.
* **Clean Code**: Remove dead or commented-out code. Keep the codebase clean and readable.
* **Functional Programming**: When possible, apply functional programming principles, especially in JavaScript.

## Sprint Structure

* **Sprint Length**: Our sprints will last approximately 2 weeks to ensure steady progress and timely deliverables.
* **Backlog Management**: During each sprint, team members will collaborate to improve the product backlog, prioritize tasks, and create new tasks as needed.
* **Integrated Meetings**:
   * During the **Wednesday standup** in Week 1, we will conduct **Backlog Grooming** to refine the product backlog and ensure upcoming work is well-defined.
   * During the **Wednesday standup** in Week 2, we will conduct **Backlog Refinement** to review completed work, address remaining tasks, and adjust priorities for the next sprint.


## Git Workflow

We use a **feature branch workflow** to manage our development process:
1. **Branching**: Each new feature or bug fix should be done on its own branch.
2. **Syncing**: Regularly sync your branch with `main` before pushing any code to avoid conflicts.
3. **Pull Requests**:
   * Once your feature is complete, open a pull request to merge it into `main`.
   * Assign a reviewer to your pull request.
4. **Code Reviews**: All pull requests must be reviewed by at least one team member before merging.

### Branch Naming
* Branch names should be descriptive. For example: `feature-add-trip-creation` or `bugfix-fix-join-trip`.

### Commits
* Commit frequently, with clear, descriptive commit messages.
* Avoid large, monolithic commits. Break down your changes into manageable chunks.

## Contribution Guidelines

### What to Contribute
* **New Features**: Ensure any new feature aligns with the project goals. Always create a new branch for the feature.
* **Bug Fixes**: If you find a bug, report it or fix it. Link the bug report to the pull request.
* **Refactoring**: Improve code readability or performance, but avoid introducing new issues.

### How to Contribute
1. **Clone the Repository**:
   * Clone repo to your local machine.
   * `git clone https://github.com/agiledev-students-fall2024/4-final-project-trip-tease.git`
2. **Create a Branch**:
   * Create a new branch to work on a feature or bug fix: `git checkout -b <branch-name>`
3. **Commit and Push**:
   * Commit changes regularly with clear messages: `git commit -m "Clear and descriptive message"`
   * Push to the remote branch: `git push origin <branch-name>`
4. **Open a Pull Request**:
   * Once your work is done, open a pull request for review.
   * Ensure the pull request is clear and concise about what changes were made.

## Setting Up the Local Development Environment

Follow these instructions to get the project running locally
1. **Clone the Repository**:
   * `git clone https://github.com/agiledev-students-fall2024/4-final-project-trip-tease.git`
2. **Navigate to the Project Directory**:
   * `cd 4-final-project-trip-tease`
3. **Install Dependencies**:
   * Run: `npm install` to install all necessary dependencies.
4. **Run the Development Server**:
   * Start the server locally: `npm start`

## Building & Testing

* We will provide detailed instructions for building and testing the project as it progresses.
<!-- * Code must pass tests before being merged into the `main` branch. We will integrate continuous integration (CI) tools for automated testing.
* Every new feature should include relevant tests to ensure coverage. -->

