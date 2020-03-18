const { dirname } = require('path');

function checkMaxFiles(maxFiles, files, report) {
  let count = 0;
  files.forEach((file) => {
    if (typeof file === 'object') {
      checkMaxFiles(maxFiles, file, report);
      return;
    }
    count += 1;
    if (count === (maxFiles + 1)) {
      const path = dirname(file);
      report(path, `namespace contains more than ${maxFiles} files.`);
    }
  });
}

module.exports = {
  checkFiles(options, files, report) {
    const maxFiles = options['max-files'];
    checkMaxFiles(maxFiles, files, report);
  },
};
