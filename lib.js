const fs = require("fs");

const glob = require("glob");
const htmllint = require("htmllint");

const htmllintOpts = {
  "attr-name-style": false,
  "attr-quote-style": false,
  "attr-req-value": false,
  "attr-validate": false,
  "class-style": "none",
  "id-class-style": false,
  "line-end-style": false,
  "line-no-trailing-whitespace": false,
  "link-req-noopener": false,
  "spec-char-escape": false,
  "tag-bans": []
};

/**
 * Lint the specified file/glob of .lang files and check for HTML errors.
 * @param {Array} pathOrGlobs An array of file paths/globs to the file(s) to run through the HTML linter.
 * @returns {Array} An array of results containing the linted filename and an array of errors.
 */
async function lintFiles(pathOrGlobs) {
  const results = [];
  for (const files of pathOrGlobs) {
    for (const file of glob.sync(files)) {
      const errors = await lintLang(file);
      if (errors.length) {
        results.push({
          file,
          errors: errors.map((err, idx) => {
            // Inject the array index into the object.
            err.index = idx + 1;
            return err;
          })
        });
      }
    }
  }
  return results;
}

/**
 * Loads a .lang file and returns an array of strings/lines.
 * @param {string} file A file path to a specific .lang file.
 * @returns {Array} An array of strings/lines (not including comments or empty lines).
 */
function loadFile(file) {
  const lines = fs.readFileSync(file, "utf-8").split("\n");
  return lines.filter(line => {
    // Ignore comments and empty lines...
    return !(
      line.startsWith("#") ||
      line.startsWith(";") ||
      line.trim().length === 0
    );
  });
}

/**
 * Lints the specified .lang file using htmllint. Note that each LINE of the .lang file is treated as a separate string which will be linted.
 * @param {string} file A file path to a .lang file to lint.
 * @param {object} opts An object containing the htmllint options to pass to the `htmllint(text, opts)` function.
 * @returns {Array} An array of htmllint errors/warnings for the specified HTML.
 */
async function lintLang(file, opts = htmllintOpts) {
  let results = [];
  for (const line of loadFile(file)) {
    let res = await htmllint(line, opts);
    if (res.length) {
      res = res.map(item => {
        // Begone confusing line numbers!
        delete item.line;
        // Inject filename and HTML (maybe) input string into item object.
        item.file = file;
        item.html = line;
        return item;
      });
      results = results.concat(res);
    }
  }
  return results;
}

module.exports = {
  htmllintOpts,
  lintFiles
};
