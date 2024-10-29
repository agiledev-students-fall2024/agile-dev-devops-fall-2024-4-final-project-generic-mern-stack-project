# Guide to Contributing

## Team Norms

### Team values
- How the team will work together: The team will follow the Scrum framework as outlined in the Agile Software Development Course at NYU. Team members will communicate with each other about development needs via Discord.
- When team members need help: Team members who need help will request assistance in Discord or in the daily standup meetings.
- Team conflict resolution:
  - Disagreements on direction: The team will discuss its options and hold a vote if an agreement cannot be reached.
  - Member failing to deliver on obligations: The team will attempt to reach an agreement with the member, and will ultimately speak to the professor and graders if the conflict cannot be resolved.
  - Response times: Team members are expected to respond to messages directed at them within 2 business days.

### Sprint Cadence
Each sprint will take 2 weeks.

### Daily Standups
Daily standups will occur 3 days a week: once before lecture on Tuesday, once before lecture on Thursday, and once after lecture on Thursday. They will last for 10 minutes. Members are expected to be present synchronously. Members will not cover for other members who do not participate. A member who makes no progress on a task for two standups or more in a row will be reported to management.

### Coding Standards
- Members will use VSCode
- Team members will open a pull request to make changes to the code. The updated code must pass tests and at least one other team member must review it before merging it into the main branch.
- Team members will only push working code.
- Team members will make granular and small commits - one for each feature or bug fix - with descriptive messages.
- Code should be well-documented and self-documenting.
- Codebase should not include dead or commented-out code.

## Git Workflow
Each team member should clone the public GitHub repository for Bite Buddy. They will branch from their local copy and make changes to that branch, then push changes to their remote branch and open a pull request to merge into the main branch. Another team member will review the changes and merge them if they are satisfactory.

## Contributing Rules
Contributors should open a pull request for changes to be merged from their remote branch to the main branch of the GitHub repository. These changes should contain only working code, and must be well documented and readable.

## Local Development Eenvironment
### Setting Up the Front-End Environment
Requires Node.js

Change to the `front-end/bite-buddy` directory.
```
cd 4-final-project-bite-buddy/front-end/bite-buddy
```

Install packages
```
npm install
```

## Building and Testing
### Building
#### Building the Front End
Change to the `front-end/bite-buddy` directory.
```
cd 4-final-project-bite-buddy/front-end/bite-buddy
```

Build with NPM.
```
npm run build
```

### Testing
#### Testing the Front End
To run the dev version for testing:
```
npm run dev
```