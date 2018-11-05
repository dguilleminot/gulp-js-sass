import promise from 'bluebird';
import _ from 'lodash';

// file treatment
import fs from 'fs';
import path from 'path';

// private
import File from './file.js';

class Scssjs {
  constructor() {
    this.origin = './test/client/app';
    this.subFoldersPath = [];
    this.scssPath = [];
  }

  init(options) {
    // set some vars
    // TODO: spread operator with option

    // then trigger the extract
    this.subFoldersPath.push(this.origin);
    this.initExtractFolderContent();
  }

  initExtractFolderContent() {
    const target = this.subFoldersPath[0];
    this.extractFolderContent(target).then(() => {
      const nextOne = this.subFoldersPath[1];
      this.subFoldersPath.shift();
      if (nextOne) {
        // recursive function
        this.initExtractFolderContent();
      } else {
        // or leave to an another extract
        this.initExtractScssFileContent();
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  extractFolderContent(folderPath) {
    return new Promise((resolve, reject) => {
      fs.readdir(folderPath, (err, items) => {

        for (let i = 0; i < items.length; i++) {

          let target = items[i];
          let subPath = path.resolve(folderPath, target);
          let isDir = fs.lstatSync(subPath).isDirectory();

          // SCSS
          if (target.match('.scss')) {
            this.scssPath.push(subPath);
          }

          // DIR
          if (isDir) {
            this.subFoldersPath.push(subPath);
          }
        }

        return Promise.all(items).then(() => {
          resolve()
        });
      });
    });
  }

  initExtractScssFileContent() {
    for (let i = 0; i < this.scssPath.length; i++) {

      let target = this.scssPath[i];

      const content = new File().init(target);
      console.log('finish for main class for the moment');
    }
  }
}

export { Scssjs as default};
