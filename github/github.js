// require('dotenv').config();

// const variable = process.env.VARIABLE;
// console.log('VARIABLE:', ariable);

// const fs = require('fs');
// const path = require('path');

// const envFilePath = path.join(__dirname, '.env');
// if (fs.existsSync(envFilePath)) {
//   const envFileContent = fs.readFileSync(envFilePath, 'utf-8');
//   console.log('.env file content:\n', envFileContent);
// } else {
//   console.log('.env file does not exist');
// }

// require('dotenv').config();
// console.log('Current directory:', __dirname);
// console.log('All environment variables:', process.env);

// const variable = process.env.VARIABLE;
// console.log('VARIABLE:', variable);


const axios = require('axios');

const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_TOKEN = 'yo';

const username = 'innovativecreations';

// const getUserDetails = (username, callback) => {
//   axios.get(`${GITHUB_API_BASE_URL}/users/${username}`, {
//     headers: {
//       'Authorization': `token ${GITHUB_TOKEN}`
//     }
//   }).then(response => {
//     callback(response.data);
//   });
// };


// getUserDetails(username, (userDetails) => {
//   console.log('User Details:', userDetails);
// });




// const getUserRepos = (username, callback) => {
//     axios.get(`${GITHUB_API_BASE_URL}/users/${username}/repos`, {
//         headers: {
//             'Authorization': `token ${GITHUB_TOKEN}`
//         }
//     }).then(response => {
//         callback(response.data.map(repo => repo.name));
//     });
// };


// getUserRepos(username, (repoNames) => {
//     console.log('Repository Names:', repoNames);
// });




// const owner = 'innovativecreations';
// const repo = 'chemistryQueModel';
// const path = 'periodic/README.md';

// const getReadmeContent = (owner, repo, path, callback) => {
//   axios.get(`${GITHUB_API_BASE_URL}/repos/${owner}/${repo}/contents/${path}`, {
//     headers: {
//       'Authorization': `token ${GITHUB_TOKEN}`,
//       'Accept': 'application/vnd.github.v3.raw'
//     }
//   }).then(response => {
//     callback(response.data);
//   }).catch(error => {
//     console.error('Error fetching README:', error.message);
//   });
// };

// getReadmeContent(owner, repo, path, (content) => {
//   console.log(content);
// });


const link = 'https://github.com/innovativecreations/Airplane/blob/main/README.md';
const getReadmeContent = (owner, repo, path) => {
  return axios.get(`${GITHUB_API_BASE_URL}/repos/${owner}/${repo}/contents/${path}`, {
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3.raw'
    }
  });
};

const extractRepoDetails = (url) => {
  const parts = url.split('/');
  const owner = parts[3];
  const repo = parts[4];
  const path = parts.slice(6).join('/');
  return { owner, repo, path };
};

const { owner, repo, path } = extractRepoDetails(link);
console.log(owner, repo, path);
getReadmeContent(owner, repo, path)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error.message);
  });
