<p style="text-align: center;"><img src=".github/assets/nx.png" 
width="100%" alt="Nx - Smart, Extensible Build Framework"></p>

<h1 align="center">NX Orb</h2>

[![CircleCI Build Status](https://circleci.com/gh/nrwl/nx-orb.svg?style=shield "CircleCI Build Status")](https://circleci.com/gh/nrwl/nx-orb) [![CircleCI Orb Version](https://badges.circleci.com/orbs/nrwl/nx.svg)](https://circleci.com/orbs/registry/orb/nrwl/nx) [![GitHub License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://raw.githubusercontent.com/nrwl/nx-orb/master/LICENSE) [![CircleCI Community](https://img.shields.io/badge/community-CircleCI%20Discuss-343434.svg)](https://discuss.circleci.com/c/ecosystem/orbs)


> ✨ A CircleCI Orb which includes helpful commands for running Nx commands in the CI

## Usage

```yaml
version: 2.1

orbs:
  nx: nrwl/nx@1.2.0

jobs:
  checks:
    docker:
      - image: cimg/node:14.17-browsers
    steps:
      - checkout
      - run:
          name: Install dependencies
          command: yarn install --frozen-lockfile
      - nx/set-shas
      - run:
          name: Run Builds
          command: yarn nx affected --target=build --base=$NX_BASE --parallel
      - run:
          name: Run Unit Tests
          command: yarn nx affected --target=test --base=$NX_BASE --parallel
```

## Background

When we run `affected` command on [Nx](https://nx.dev/), we can specify 2 git history positions - base and head, and it calculates [which projects in your repository changed
between those 2 commits](https://nx.dev/latest/angular/tutorial/11-test-affected-projects#step-11-test-affected-projects
). We can then run a set of tasks (like building or linting) only on those **affected** projects.

This makes it easy to set-up a CI system that scales well with the continous growth of your repository, as you add more and more projects.

### Problem

Figuring out what these two git commits are might not be as simple as it seems.

On a CI system that runs on submitted PRs, we determine what commits to include in the **affected** calculation by comparing our `HEAD-commit-of-PR-branch` to the commit in main branch (`master` or `main` usually) from which the PR branch originated. This will ensure the entirety of our PR is always being tested.

But what if we want to set up a continuous deployment system
that, as changes get pushed to `master`, it builds and deploys
only the affected projects?

What are the `FROM` and `TO` commits in that case?

Conceptually, what we want is to use the absolute latest commit on the `master` branch as the HEAD, and the previous _successful_ commit on `master` as the BASE. Note, we want the previous _successful_ one because it is still possible for commits on the `master` branch to fail for a variety of reasons.

The commits therefore can't just be `HEAD` and `HEAD~1`. If a few deployments fail one after another, that means that we're accumulating a list of affected projects that are not getting deployed. Anytime we retry the deployment, we want to include **every commit since the last time we deployed successfully**. That way we ensure we don't accidentally skip deploying a project that has changed.

This action enables you to find:
* Commit SHA from which PR originated (in the case of `pull_request`)
* Commit SHA of the last successful CI run

## Private repositories

To use this orb with a private repository on your main branch, you need to grant the orb access to your CircleCI API. You can do this by creating an environment variable called `CIRCLE_API_TOKEN` in the context or the project.

> Note: It should be a user token, not project token.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2021-present Narwhal Technologies Inc.
