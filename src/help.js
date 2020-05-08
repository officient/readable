const Reset = '\x1b[0m';
const FgWhite = '\x1b[37m';
const main = FgWhite;

const help = `
EXIT STATUS

        0 ${main}No errors${Reset}

        1 ${main}Found errors${Reset}

        2 ${main}Unexpected behaviour${Reset}
`;

module.exports = help;
