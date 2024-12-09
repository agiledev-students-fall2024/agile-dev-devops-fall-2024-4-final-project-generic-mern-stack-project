# Git Actions

This repository contains the GitHub Actions for this project. The actions are used to automate the testing and deployment of the project.


## CI/CD Pipeline
There are two jobs in the CI/CD pipeline: `ci-pull-request` and `cd-prod-deployment`.

### Auto Integration Testing
The `ci-pull-request` job is triggered when a pull request is opened or updated. This job runs the integration tests for the backend on the pull request branch.

### Auto Deployment
The `cd-prod-deployment` job is triggered when a new deployment branch is created. This job deploys both front-end and back-end to the production server (Digital Ocean).

To make a new deployment:
1. Create a new branch with the name `prod/<x.x.x>` where `x.x.x` is an optional version number.
2. Create a new release on GitHub with the same tag name as the branch name.
3. Push the branch to GitHub.

