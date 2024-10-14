# Guide to Contributing

## Team Norms

### Core Values:

- **Collaboration:** We work together, exchange ideas, and support one another.
- **Quality:** We pursue excellence in every part of the project.
- **Inclusivity:** We welcome and value contributions from all backgrounds and skill levels.
- **Transparency:** We communicate openly about our progress and challenges.

### Processes

- Meet regularly to discuss progress and address any concerns.
- Perform peer reviews to uphold code quality and encourage learning.
- Stick to agreed deadlines and milestones to ensure timely progress.

## Git Workflow

Developers are expected to follow the [Feature Branch Version Control Workflow](https://knowledge.kitchen/content/courses/agile-development-and-devops/notes/feature-branch-workflow/).

**1. Clone the Repository**

```bash
git clone https://github.com/agiledev-students-fall2024/4-final-project-cyclists.git
```

**2. Create a New Branch** 

Use a specific naming convention for new branches:

Example for a Task with identification number 9 belonging to a User Story with identification number 13:

```bash
git checkout -b user-story/13/task/9/implement-user-login
```

Example for Spike with identification number 6:

```bash
git checkout -b spike/6/install-mongo-db-locally
```

**3. Pull the Latest Changes** 

Before starting work, ensure your branch is up-to-date with the main or develop branch:

```bash
git pull origin master
```

**4. Commit Changes Locally**

Add all changed files to the branch in the local repository.

```bash
git add .
git commit -m "Add user authentication feature"
```

**5. Merge with the Latest Code**

Download the latest code from the main branch of the shared central repository, merge it into the local feature branch, and resolve any conflicts

With the feature branch checked out:

```bash
git fetch origin
git merge origin/master
``` 

[**Alternatively**](https://stackoverflow.com/questions/21756614/difference-between-git-merge-origin-master-and-git-pull):

```bash
git pull origin master
```

**6. Push Your Branch**

Push your changes to the remote repository:

```bash
git push origin <branch-name>
```

**7. Create a Pull Request**

After pushing the feature branch to the remote repository, the developer must create a Pull Request (PR) on GitHub to request that teammates review and merge the changes into the main branch.

When creating the PR, ensure you include:

* Title: A brief summary of the changes made.
* Description (optional): Explain what was changed and any relevant context.

Assign the PR to relevant teammates to facilitate peer code review before merging into the main branch.

## Setting Up Your Local Development Environment

**Prerequisites**: Install [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en), and [npm](https://www.npmjs.com/).

**1. Clone the Repository**:

```bash
git clone https://github.com/<your-fork>/agiledev-students-fall2024/4-final-project-cyclists.git
```

**2. Install Dependencies**:

For the front-end:

```bash
cd front-end
npm install
```

For the back-end:

```bash
cd back-end
npm install
```
