import promise from 'bluebird';
import _ from 'lodash';

// file treatment
import fs from 'fs';
import LineByLineReader from 'line-by-line';

// clean css
import scssfmt from 'scssfmt';
import stripCssComments from 'strip-css-comments';

class File {
  constructor() {
    this.file = undefined;
    this.hierarchy = 0;
    this.content = {}
    this.path = undefined;
    this.content = [];
  }

  init(target) {
    // extract & clean alls comments
    this.file = scssfmt(stripCssComments( fs.readFileSync(target, 'utf-8') )).split('\n');

    _.remove(this.file, (item) => {
      const startString = item.trim().substring(0, 2);

      return item === '' || (item !== '' && startString === '//');
    });

    this.sortByhierarchy();
  }

  sortByhierarchy() {
    console.log(this.file);
    // calculer les espaces
    for (let i = 0; i < this.file.length; i++) {
      const target = this.file[i];
      const targetTrimed = target.trim();
      const wordsArr = targetTrimed.split(' ');
      const firstWord = wordsArr[0];
      const firstType = firstWord.length !== 1 ? firstWord.substring(0, 1) : firstWord;
      const lastWord = wordsArr[wordsArr.length - 1];
      const lastType = lastWord.length !== 1 ? lastWord.substring(lastWord.length - 1, lastWord.length) : lastWord;
      let type = undefined;
      let hierarchy = Number(target.search(/\S/)) / 2;

      // is selector
      if (lastType === '{' || lastType === ',') {
        type = 'selector';
        console.log(i,'this is ', type, hierarchy);
      }

      // is variable
      if (firstType === '$') {
        type = 'variable';
      }

      // is import
      if (firstWord === '@import') {
        type = 'import';
      }

      // is trailing }
      if (firstWord === '}') {
        type = 'closingBrace';
      }

      // is property -> must be declared after all because this.type = undefined
      if (!type) {
        type = 'property';
        // hierarchy start to 0
        hierarchy = hierarchy === 1 ? hierarchy : hierarchy / 2;
      }

      this[type](targetTrimed, hierarchy);
    }

    return Promise.all(this.file).then(() => {
      console.log("finish alll");
      console.log(this.file);
    }).catch((err) => {
      console.log(err);
    });
  }

  selector(target, hierarchy) {
    console.log("selector");
    // if hierarchy !== 0
    // get the parent selector to retrieved
    // √ TOUGHT ABOUT: .selector, √
    let selector = '';
    if (hierarchy) {
      const parentIndex = hierarchy - 1;
      const parentSelectorL = this.content[parentIndex].selector.length;
      selector = `${this.content[parentIndex].selector.substring(0, parentSelectorL - 2)} ${target}`;
    } else {
      selector = target;
    }

    return this.content[hierarchy] = {
      selector,
      hierarchy,
      content: {},
    };
  }

  variable() {
    console.log("variable");
    // get variable
  }

  import() {
    console.log("import");
    // match url
    // if no delete
  }

  closingBrace() {
    console.log("closingBrace");
    // target.isEnded = true;
  }

  property() {
    console.log('property');
    // find is has variable
    // true -> remplace by value
    // functions
    // mixin
  }
}

export { File as default};
