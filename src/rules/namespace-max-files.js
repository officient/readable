const { dirname } = require('path');

function checkMaxFiles(maxFiles, files, report) {
  let count = 0;
  let lastFile = '';
  files.forEach((file) => {
    if (typeof file === 'object') {
      checkMaxFiles(maxFiles, file, report);
      return;
    }
    lastFile = file;
    count += 1;
  });

  if (count > maxFiles) {
    const path = dirname(lastFile);
    report(path, `namespace contains more than ${maxFiles} files [${count}].`);
  }
}

module.exports = {
  checkFiles(maxFiles, files, report) {
    checkMaxFiles(maxFiles, files, report);
  },
};
