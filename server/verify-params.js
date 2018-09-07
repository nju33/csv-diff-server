module.exports = targets => (req, res, next) => {
  const targetExists = target => targets.indexOf(target) > -1;

  const errors = [];
  if (targetExists('pat') && !req.query.pat) {
    errors.push({
      messages: 'パラメーターに`pat`(Personal access token)を指定してください'
    });
  }

  if (targetExists('filename') && !req.query.filename) {
    errors.push({
      messages:
        'パラメーターに`filename`(対象ファイルへのパス)を指定してください'
    });
  }

  if (targetExists('ref') && !req.query.ref) {
    errors.push({
      messages:
        'パラメーターに`ref`(COMMIT/BRANCH/TAG)を指定してください'
    });
  }

  if (targetExists('diff') && req.query.diff) {
    if (!/^\w+\.\.\.\w+$/.test(req.query.diff)) {
      errors.push({
        messages:
          '`diff`は`{COMMIT_HASH}...{COMMIT_HASH}`の形で指定してください'
      });
    }
  } else if (targetExists('diff')) {
    errors.push({
      messages: 'パラメーターに`diff`(commit hash)を指定してください'
    });
  }

  if (errors.length > 0) {
    res.status(400).json({errors});
  } else {
    next();
  }
};
