// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'development';

const path = require('path');
require('react-scripts/config/env');

const projectPathEnvName = 'AppLocalizationUtil';
const projectPathEnv = process.env[projectPathEnvName];

if (projectPathEnv) {
  const projectPath = path.relative(process.cwd(), projectPathEnv);
  console.log(projectPath);
  if (projectPath) {
    const configFile = process.env.APP_LOCALIZATION_UTIL_CONFIG;

    run_cmd('dotnet', ['run', '--project', projectPath, '--ConfigFile', configFile]);
  }
} else {
  console.error(`Please set ${projectPathEnvName} environment variable`);
}

function run_cmd(cmd, args) {
  return new Promise((resolve) => {
    const {spawn} = require('child_process');
    const child = spawn(cmd, args);

    child.stdout.on('data', function(buffer) {
      console.log(buffer.toString());
    });
    child.stdout.on('end', function() {
      resolve();
    });
  });
}
