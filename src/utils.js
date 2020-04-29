const fs = require('fs');
const { join, extname } = require('path');

function walkDir(dir, ext) {
  const filesTree = fs.readdirSync(dir).map((file) => {
    const path = join(dir, file);
    if (fs.statSync(path).isDirectory()) {
      return walkDir(join(path, ''), ext);
    }
    return path;
  });

  return filesTree.filter((file) => (
    (typeof file === 'object') || (extname(file) === ext)));
}

// list files recursivelly (filter by extension)
function dirsTree(dirs, ext) {
  return dirs.map((d) => walkDir(d, ext));
}

// stringify keeping order
function stringify(obj) {
  const ordered = {};
  Object.keys(obj).sort().forEach((key) => {
    ordered[key] = obj[key];
  });

  return JSON.stringify(ordered, null, 2);
}

module.exports = {
  dirsTree,
  stringify,
};
