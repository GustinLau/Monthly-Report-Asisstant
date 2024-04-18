const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)

function deleteFiles(dirPath, excludes) {
  fs.readdirSync(dirPath, { withFileTypes: true }).forEach(entry => {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      deleteFiles(entryPath, []);
      fs.rmdirSync(entryPath);
    } else {
      if (!excludes.some(ex=>entryPath.endsWith(ex))) {
        fs.unlinkSync(entryPath);
      }
    }
  });
}

const releaseDir = path.resolve(__dirname, 'release')

deleteFiles(releaseDir, args)
