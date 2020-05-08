const reset = '\x1b[0m';
const main = '\x1b[37m';
const readable = `${reset}readable${main}`;

const help = `
${readable} - static analysis tool for PHP with a focus on code readability${reset}

GETTING STARTED
        npx readable --init

                ${main}Will generate ${reset}.readable.json${main} with default config.
                Check the ${reset}"paths"${main} param, and you ready to lint:${reset}

        npx readable

BASELINE
                ${main}If you have a bunch of errors and you don't want to fix them all
                at once, ${readable} can ignore errors in existing code, while
                ensuring that new code doesn't have errors:${reset}

        npx readable --save-base-line .baseline.json

                will generate or update ${reset}.baseline.json${main} file containing the
                current errors. Add ${reset}"baseline"${main} param to your ${reset}.readable.json${main}:${reset}

        {
          "baseline": ".baseline.json",
          ...
        }
                ${main}You can commit the changes so that ${readable} running in other
                places (e.g. CI) won't complain about those errors. If you want
                to see all errors run ${readable} with ${reset}--disable-base-line${main} flag${main}:${reset}

        npx readable --disable-base-line

EXIT STATUS
        0 ${main}No errors${reset}

        1 ${main}Found errors${reset}

        2 ${main}Unexpected behaviour${reset}

LICENCE
        ${main}GNU General Public License v3.0
        https://github.com/officient/readable/${reset}
`;

module.exports = help;
