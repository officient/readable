const fs = require('fs');
const { join, extname } = require('path');


// list files recursivelly (filter by extension)
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

function dirsTree(dirs, ext) {
  return dirs.map((d) => walkDir(d, ext));
}

module.exports = {
  dirsTree,
};
