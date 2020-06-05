const execSync = require("child_process").execSync;

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: "inherit",
    env: Object.assign({}, process.env, extraEnv),
  });

console.log("\nBuilding ES modules through Rollup ...");

exec("rollup -c -f es -w src -m inline -o build/index.es.js", {
  BABEL_ENV: "es-rollup",
  NODE_ENV: "development",
});
