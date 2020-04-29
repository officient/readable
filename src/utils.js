const fs = require('fs');
const { join, extname } = require('path');

function normalisePath(path) {
  return path.replace(/\\/g, '/');
}

function walkDir(dir, ext, exclude) {
  const filesTree = fs.readdirSync(dir).map((file) => {
    const path = join(dir, file);
    if (exclude.includes(normalisePath(path))) {
      // we will filter it out on line 22
      return 'Exclude';
    }
    if (fs.statSync(path).isDirectory()) {
      return walkDir(join(path, ''), ext, exclude);
    }
    return path;
  });

  return filesTree.filter((file) => (
    (typeof file === 'object') || (extname(file) === ext)));
}

// list files recursivelly (filter by extension)
function dirsTree(dirs, ext) {
  const exclude = [];
  const include = dirs.filter((d) => {
    if (d.startsWith('!')) {
      const path = d.slice(1).replace(/\/$/, '');
      exclude.push(join(path));
      return false;
    }
    return true;
  });
  return include.map((d) => walkDir(d, ext, exclude));
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
  normalisePath,
};
