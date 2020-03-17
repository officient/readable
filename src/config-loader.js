/**
 * @author Denys Potapov
 */

"use strict";

const fs = require('fs'),
    path = require('path');

const fileName = '.readable.json';

function init() {
    const source = path.join(__dirname, 'default' + fileName),
        destination = path.join('.', fileName);

    fs.copyFileSync(source, destination);
}

function load() {

}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports  = {
    init,
    fileName,
    load
};