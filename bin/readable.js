#!/usr/bin/env node

/**
 * @fileoverview Main CLI that is run via the readable command.
 * @author Denys Potapov
 */

/* eslint no-console:off */

"use strict";

const init = process.argv.includes("--init");

const configLoader = require("../src/config-loader");

if (init) {
    configLoader.init();
    console.info(`Created default config in ${configLoader.fileName}`);
} else {

};
