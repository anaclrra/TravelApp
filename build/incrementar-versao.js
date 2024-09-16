const pkg = require("../package.json");
const app = require("../app.json");

const fs = require("fs");

const pkgVersion = pkg?.version;

const incrementType = process?.argv[2] ?? false;

const pkgVersionArray = pkgVersion.split(".");
let major = Number(pkgVersionArray[0]);
let minor = Number(pkgVersionArray[1]);
let patch = Number(pkgVersionArray[2]);

switch (incrementType) {
  case "major":
    major++;
    minor = 0;
    patch = 0;
    break;
  case "minor":
    minor++;
    patch = 0;
    break;
  default:
    patch++;
}

const newVersion = `${major}.${minor}.${patch}`;
pkg.version = newVersion;
app.expo.version = newVersion;

const pkgString = JSON.stringify(pkg, null, 2);
const appString = JSON.stringify(app, null, 2);

fs.writeFileSync("package.json", pkgString);
fs.writeFileSync("app.json", appString);

console.log(newVersion);
