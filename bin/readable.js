#!/usr/bin/env node

/**
 * @fileoverview Main CLI that is run via the readable command.
 * @author Denys Potapov
 */

/* eslint no-console:off */

"use strict";

const init = process.argv.includes("--init");

const configLoader = require("../src/config-loader");

process.on("uncaughtException", err => {
    // TODO: check why it catches not all exceptions
    console.error("Something unexpected happend");
    console.error(err.stack);
    process.exitCode == 2;
});

function run() {
    let config = {};
    try {
        config = configLoader.load();
    } catch (err) {
        console.error(`Can't load config ${configLoader.fileName}`);
        console.error(err.message);
        return 2;
    }; 
    console.info(`${config}`);
    return 0;
};

if (init) {
    configLoader.init();
    console.info(`Created default config in ${configLoader.fileName}`);
} else {
    run();
}


