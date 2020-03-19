const { dirname } = require('path');

function checkMaxFiles(maxFiles, files, report) {
  let count = 0;
  files.forEach((file) => {
    if (typeof file === 'object') {
      checkMaxFiles(maxFiles, file, report);
      return;
    }

    count += 1;
  });

  if (count > maxFiles) {
    const path = dirname(files[0]);
    report(path, `namespace contains more than ${maxFiles} files [${count}].`);
  }
}

module.exports = {
  checkFiles(options, files, report) {
    const maxFiles = options['max-files'];
    checkMaxFiles(maxFiles, files, report);
  },
};
