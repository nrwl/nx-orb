#!/usr/bin/env node
const { execSync } = require('child_process');
const https = require('https');

const projectSlug = process.argv[2];
const branchName = process.argv[3];
const mainBranchName = process.argv[4];
const errorOnNoSuccessfulWorkflow = process.argv[5];

let BASE_SHA;
(async () => {
  // If it's PR we want to compare to branch base
  if (branchName !== mainBranchName) {
    BASE_SHA = execSync(`git merge-base origin/${mainBranchName} HEAD`, { encoding: 'utf-8' });
  } else {
    try {
      BASE_SHA = await findSuccessfulCommit(projectSlug, mainBranchName);
    } catch (e) {
      process.stderr.write(e.message);
      process.exit(1);
    }

    if (!BASE_SHA) {
      if (errorOnNoSuccessfulWorkflow === 'true') {
        process.stdout.write(`
    Unable to find a successful workflow run on 'origin/${mainBranchName}'
    NOTE: You have set 'error-on-no-successful-workflow' on the step so this is a hard error.

    Is it possible that you have no runs currently on 'origin/${mainBranchName}'?
    - If yes, then you should run the workflow without this flag first.
    - If no, then you might have changed your git history and those commits no longer exist.`);
        process.exit(1);
      } else {
        process.stdout.write(`
WARNING: Unable to find a successful workflow run on 'origin/${mainBranchName}'.
We are therefore defaulting to use HEAD~1 on 'origin/${mainBranchName}'.

NOTE: You can instead make this a hard error by settting 'error-on-no-successful-workflow' on the step in your workflow.\n\n`);
        BASE_SHA = execSync(`git rev-parse HEAD~1`, { encoding: 'utf-8' });
      }
    } else {
      process.stdout.write(`
Found the last successful workflow run on 'origin/${mainBranchName}'.\n\n`);
    }
  }

  process.stdout.write(`Commit: ${BASE_SHA}`);
})();

/**
 * Finds the last successful commit and or token for the next page
 * @param {string} project - project path is form of {vsc}/{owner}/{repo}
 * @param {string} branch - main branch name
 * @returns { next_page_token?: string, sha?: string }
 */
async function findSuccessfulCommit(project, branch) {
  const url = `https://circleci.com/api/v2/project/${project}/pipeline?branch=${branch}`;

  let nextPage;
  let foundSHA;

  do {
    const fullUrl = nextPage ? `${url}&page-token=${nextPage}` : url;
    const { next_page_token, sha } = await getJson(fullUrl)
      .then(async ({ next_page_token, items }) => {
        const pipeline = await findSuccessfulPipeline(items);
        return {
          next_page_token,
          sha: pipeline ? pipeline.vcs.revision : void 0
        };
      });

    foundSHA = sha;
    nextPage = next_page_token;
  } while (!foundSHA && nextPage);

  return foundSHA;
}

/**
 * Get first successful pipeline if any exists
 * @param {Object[]} pipelines
 * @returns
 */
async function findSuccessfulPipeline(pipelines) {
  for (const pipeline of pipelines) {
    if (!pipeline.errors.length
      && commitExists(pipeline.vcs.revision)
      && await isWorkflowSuccessful(pipeline.id)) {
      return pipeline;
    }
  }
  return undefined;
}

/**
 * Check if given commit is valid
 * @param {string} commitSha
 * @returns
 */
function commitExists(commitSha) {
  try {
    execSync(`git cat-file -e ${commitSha} 2> /dev/null`);
    return true;
  } catch {
    return false;
  }
}

/**
 *
 * @param {string} pipelineId
 * @returns {boolean}
 */
async function isWorkflowSuccessful(pipelineId) {
  return getJson(`https://circleci.com/api/v2/pipeline/${pipelineId}/workflow`)
    .then(({ items }) => items.every(item => item.status === 'success'));
}

/**
 * Helper function to wrap Https.get as an async call
 * @param {string} url
 * @returns {Promise<JSON>}
 */
async function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = [];

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        const response = Buffer.concat(data).toString();
        resolve(JSON.parse(response));
      });
    }).on('error', error => reject(error));
  });
}
