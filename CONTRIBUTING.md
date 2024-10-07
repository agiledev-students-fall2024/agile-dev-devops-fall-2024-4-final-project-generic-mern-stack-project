# Guide to Contributing

## Team Norms

### Our Values

* **Collaboration**: We will work together to achieve the best results, valuing each other's input and expertise.
* **Transparency**: All team communication and decisions are open and shared.
* **Continuous Improvement**: We work in sprints, iterating quickly and improving based on feedback, following Scrum framework guidelines.
* **Active Participation**: Members will communicate actively in team channels. Standup attendance is obligatory, except in emergencies.
* **Conflict Resolution**: We resolve conflicts as a group, making decisions by consensus.
* **Supportive Culture**: Members who need help are encouraged to ask openly and proactively.
* **Accountability**: Team members are expected to fulfill their commitments and meet deadlines. We hold each other accountable.
* **Addressing Challenges**: If a member struggles to meet their obligations, we’ll have an open discussion to understand the situation and find a constructive solution together.
* **Consistent Engagement**: Regular participation in standups and task progress is essential. If a member is inactive for two consecutive standups, we will notify the stakeholders to keep them informed.

### Sprint Cadence

* We will operate in 2 week sprints to ensure a good balance.

### Daily Standups

* **Frequency**: Held on weekdays in the evening, at least 3 times a week, lasting about 15 minutes.
* **Attendance**: Synchronous participation is required. The Scrum Master will share summaries in team channels.

### Coding Standards

* **Editor**: We’ll use Visual Studio Code for our designated code editor.
* **Peer Reviews**: All tasks and spikes must be peer-reviewed and pass tests before merging.
* **Code Quality**: Push only working code. If you break the pipeline/build, fix it immediately.
* **Self-Documenting Code**: Use descriptive names for variables and functions, avoiding unnecessary abbreviations.
* **Clean Code**: Delete any dead/commented-out code you come across.
* **Frequent Commits**: Make small, focused commits with descriptive messages.
* **Good Commits**: Avoid large, monolithic commits, as they make it harder to track changes and review the code.
* **Sync Regularly**: Always sync with the main branch before pushing changes.

### Git workflow

* We will follow the feature branch workflow.
  * A branch will be created for each new feature.
  * Once a feature is declared complete by the developer, they will open a pull request to the main branch, and add a reviwer.
  * Features will only be merged to the main branch through pull requests, never directly.
  * Always sync with both the main and current branch before pushing your commits.

## Rules for Contribution

### What to Contribute

* **Features**: When adding new features, create a feature branch and ensure that your feature aligns with the project’s goals. Clearly document any new functionality added.
* **Bug Fixes**: If you notice a bug, feel free to address it. Please create a bug report if one doesn’t already exist and link it in your pull request.
* **Code Improvements**: Refactor existing code for performance or readability, but ensure your changes don’t introduce new issues.
* **Tests**: Write tests for new features or improve existing ones to cover critical functionality and ensure stability.

### How to Contribute

1. **Fork and Clone:** If you’re an external contributor, fork the repository and clone it locally.

2. **Create a Branch**: Following our Git workflow standards, create a new branch for your changes:

    * `git checkout -b <branch-name>`

3. **Commit and Push**: Commit your changes regularly with descriptive messages and push your branch to the remote repository:

    * `git commit -m "Descriptive message of what you did"`
    * `git push origin <branch-name>`

4. **Create a Pull Request**: Once your changes are complete, create a pull request to merge your branch into main. Ensure your Pull Request is clear and concise.

5. **Code Reviews**:
    * Every contribution will be reviewed by at least one other team member.
    * Follow our coding standards, write clean and self-documenting code, and provide meaningful commit messages.

## Setting up local environment

1. **Clone the main repository to your local machine**:

   * `git clone https://github.com/agiledev-students-fall2024/4-final-project-while-we-were-dreaming.git`

2. **Navigate to the project directory**:

   * `cd 4-final-project-while-we-were-dreaming`

3. **Install project dependencies**:

   * `npm install`

## Building & Testing

Once the project reaches the appropriate stage, this section will be updated with detailed instructions for building and testing the application.
