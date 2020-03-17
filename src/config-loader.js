/**
 * @author Denys Potapov
 */

"use strict";

const fs = require('fs'),
    merge = require('lodash.merge'),
    path = require('path');

const fileName = path.join('.', '.readable.json');

function init() {
    const source = path.join(__dirname, 'default' + fileName);

    fs.copyFileSync(source, fileName);
}

function load() {
    const data = fs.readFileSync(fileName, 'utf8'),
        defaultConfig = require('./default' + fileName);
    
    return merge(defaultConfig, JSON.parse(data));
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports  = {
    init,
    fileName,
    load
};