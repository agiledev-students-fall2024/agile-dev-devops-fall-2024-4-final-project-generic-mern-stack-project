# Guide to Contributing

## Team Norms

**Collaboration and Communication**
   - The team will work together using Github and Discord.
   - Regular meetings will be scheduled to discuss progress, roadblocks, and next steps.
   - Members needing help should reach out via the Discord Channel and ping relevant team members.

**Conflict Resolution**
   - The team will use a structured approach to resolve conflicts, including discussing the issue openly, considering all viewpoints, and seeking a compromise.
   - If a resolution cannot be reached, the issue will be escalated to voting process within the team.

**Sprint Planning and Standups**
   - Each sprint will take 2 weeks.
   - There will be 3 standups every week, each taking 30 to 60 minutes.
   - Team members need to present synchronously during standups.


## Git Workflow

**Branching Strategy**
   - Use feature branches for all new development.
   - Branch names should follow the format:
     - `spike/<issue-number>/<description>` (e.g., `spike/6/install-mongo-db-locally`)
     - `task/<issue-number>/<description>` (e.g., `task/9/add-documentation`)
     - `misc/<description>`

**Creating a Branch**
   - Always branch off from the `main` branch.
   - Use descriptive names for branches as per the naming conventions above.

**Committing Changes**
   - Write clear and concise commit messages.
   - Commit messages should reference the issue number (e.g., `#13 Added login functionality`).

**Pull Requests**
   - Create a pull request (PR) when your feature branch is ready to be merged.
   - Ensure your PR includes a description of the changes and references the relevant issue number.
   - Assign at least one reviewer to your PR.
   - Do not merge your own PR. Wait for approval from at least one other team member.

**Merging Changes**
   - Once your PR is approved, you may merge it into the `main` branch.
   - Ensure all tests pass before merging.
   - Delete the feature branch after merging to keep the repository clean.

