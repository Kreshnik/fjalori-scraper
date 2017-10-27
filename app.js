const fs = require('fs-extra');
const Promise = require('promise');
const Xray = require('x-ray');
const Scrapper = Xray();

const links = require("./links");
let promises = [];

links.forEach(url => promises.push(extractWordsFromUrl(url)));

Promise.all(promises)
    .then(results => fs.writeJSON("./fjalori.json", results))
    .catch(errors => console.warn(errors));

function extractWordsFromUrl(url) {
    return new Promise(function (resolve) {
        Scrapper(url, {
            title: '#firstHeading',
            words: Scrapper('.column-count ul li', [{
                word: 'a',
                wordReference: 'a@href'
            }])
        })(function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
}