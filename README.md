[![CircleCI](https://circleci.com/gh/nju33/csv-diff-server.svg?style=svg&circle-token=af43554fbd3a78b6d25b61fecdebb657a03adceb)](https://circleci.com/gh/nju33/csv-diff-server)

## required params

- `pat`GitHub's personal access token
- `filename`file path from repository root
- `diff`commit hashes(`new...old`)
- `[head]`row to treat as head(`1`, `1,4` etc)

## required env

- `GITHUB_OWNER`
- `GITHUB_REPO`