const got = require('got');

module.exports = async ({pat, filename, ref}) => {
  const {body} = await got(
    `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${encodeURIComponent(filename)}?ref=${ref}`,
    {
      json: true,
      headers: {
        accept: 'application/vnd.github.v3+json',
        authorization: `token ${pat}`
      }
    }
  );

  return Buffer.from(body.content, 'base64').toString();
};

