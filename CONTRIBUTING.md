# Contributing to nx-orb

We welcome [issues](https://github.com/nrwl/nx-orb/issues) to and [pull requests](https://github.com/nrwl/nx-orb/pulls) against this repository! Read this document to see how to do it.

## How to Contribute
* Create and push a branch with your new features.
* When ready to publish a new production version, create a Pull Request from _feature branch_ to `master`.
* The title of the pull request should follow [commit message guideline](#commit-message-guideline)
* Squash and merge. Ensure the semver tag is preserved and entered as a part of the commit message.
* On merge, after manual approval, the orb will automatically be published to the Orb Registry.

#### Commit Message Guidelines

The commit message should follow the following format:

```
type: subject
BLANK LINE
body
```

##### Type

The type must be one of the following:

- feat - New or improved behavior being introduced (e.g. adding new command)
- fix - Fixes the current unexpected behavior to match expected behavior (e.g. fixing the wrong commit search logic)
- cleanup - Code Style changes that have little to no effect on the user (e.g. Refactoring some function)
- docs - Changes to the documentation (e.g. Adding more details into the examples)
- chore - Changes that have absolutely no effect on users (e.g. Renaming files)

Optionally, type can have a scope (e.g. `feat(set-shas)`)

##### Subject and Body

The subject must contain a description of the change, and the body of the message contains any additional details to provide more context about the change.

Including the issue number that the PR relates to also helps with tracking.

##### Example

```
feat(set-shas): add optinal workflow-id

Add workflow-id to filter successful workflows

Closes #157
```

### Publishing


#### Test the PR
As a contributor, inspect the PR. When you are satisfied, run the following command to pull in the changes to allow the CI job to run.

```
gh pr checkout <issue-number>
git push origin HEAD
```
#### Publish
1. Draft a new [Release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release)
2. Temporarily set a tag for the release. ex: `v1.2.3`
3. Click the `+auto-generate` notes button
4. Review the commits added to the release. Use conventional-commits to determine if the tag selected is appropriate for the changes included, and adjust the tag version number if needed.
5. Publish the release. The new tag will trigger a CI deployment job.
