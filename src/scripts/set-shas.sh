#!/bin/bash
echo "$PARAM_SCRIPT" >>"index.js"
if [ -z "$CIRCLE_BRANCH" ]; then
  echo "\$CIRCLE_BRANCH not set, falling back to $PARAM_MAIN_BRANCH"
  TARGET_BRANCH=$PARAM_MAIN_BRANCH
else
  TARGET_BRANCH=$CIRCLE_BRANCH
fi
RESPONSE=$(node index.js $CIRCLE_BUILD_URL $TARGET_BRANCH $PARAM_MAIN_BRANCH $PARAM_ERROR_ON_NO_SUCCESSFUL_WORKFLOW $PARAM_ALLOW_ON_HOLD $PARAM_SKIP_BRANCH_FILTER $PARAM_WORKFLOW_NAME $PARMA_ALLOW_NOT_RUN)
echo "$RESPONSE"
BASE_SHA=$(echo "$RESPONSE" | grep 'Commit:' | sed 's/.*Commit: //')
HEAD_SHA=$(git rev-parse HEAD)
echo "Base SHA"
echo $BASE_SHA
echo ""
echo "Head SHA"
echo $HEAD_SHA
echo ""
echo "export NX_BASE=\"$BASE_SHA\";" >>$BASH_ENV
echo "export NX_HEAD=\"$HEAD_SHA\";" >>$BASH_ENV
echo ""
echo "NX_BASE and NX_HEAD environment variables have been set for the current Job"
