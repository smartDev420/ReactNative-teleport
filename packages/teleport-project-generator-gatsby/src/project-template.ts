// tslint:disable
export default {
  name: 'teleport-project-gatsby',
  files: [
    {
      name: 'package',
      content: `
{
  "name": "teleport-project-tempalte-gatsby",
  "private": true,
  "description": "A simple starter to get up and developing quickly with Gatsby",
  "version": "0.1.0",
  "author": "teleportHQ",
  "dependencies": {
    "gatsby": "^2.15.36",
    "gatsby-image": "^2.2.27",
    "gatsby-plugin-offline": "^3.0.14",
    "gatsby-plugin-react-helmet": "^3.1.11",
    "gatsby-plugin-sharp": "^2.2.29",
    "gatsby-source-filesystem": "^2.1.31",
    "gatsby-transformer-sharp": "^2.2.21",
    "prop-types": "^15.7.2",
    "react": "^16.10.2",
    "react-dom": "^16.10.2",
    "react-helmet": "^5.2.1"
  },
  "devDependencies": {
    "prettier": "^1.19.1"
  },
  "keywords": [
    "gatsby"
  ],
  "license": "MIT",
  "scripts": {
    "build": "gatsby build",
    "develop": "gatsby develop",
    "format": "prettier --write \\"**/*.{js,jsx,json,md}\\"",
    "start": "npm run develop",
    "serve": "gatsby serve",
    "test": "echo \\"Write tests! -> https://gatsby.dev/unit-testing \\""
  }
}`,
      fileType: 'json',
    },
    {
      name: 'gatsby-node',
      content: ``,
      fileType: 'js',
    },
    {
      name: 'gatsby-config',
      fileType: 'js',
      content: `module.exports = {
  siteMetadata: {
    title: 'Teleport Gatsby Default Starter',
    description: 'Kick off your next, great Gatsby project.',
    author: 'teleportHQ',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: ${String('`${__dirname}/static/playground_assets`')}
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    ],
}`,
    },
    {
      name: '.prettierrc',
      fileType: '',
      content: `
{
  "endOfLine": "lf",
  "semi": false,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5"
}`,
    },
    {
      name: 'prettierignore',
      fileType: '',
      content: `
.cache
package.json
package-lock.json
public`,
    },
    {
      name: 'gitignore',
      fileType: '',
      content: `
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (http://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Typescript v1 declaration files
typings/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# dotenv environment variables file
.env

# gatsby files
.cache/
public

# Mac files
.DS_Store

# Yarn
yarn-error.log
.pnp/
.pnp.js
# Yarn Integrity file
.yarn-integrity`,
    },
  ],
  subFolders: [
    {
      name: 'src',
      files: [],
      subFolders: [
        {
          name: 'images',
          files: [],
          subFolders: [],
        },
      ],
    },
  ],
}
