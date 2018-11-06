import _ from 'lodash';
import fs from 'fs';

// clean css
import precss from 'precss';
import scssfmt from 'scssfmt';
import stripCssComments from 'strip-css-comments';

class Scssjs {
  constructor() {
    this.file = undefined;
  }

  init(target) {
    const result = this.clean(target);
    const content = result.content + '\n';
    const preContent = result.preContent + '\n';
    const finalContent = preContent + '\n' + content;

    return precss.process(finalContent).then((data) => {
      return data.css;
    }).catch((err) => {
      console.log(err);
      return err;
    });
  }

  clean(target) {
    // formating and cleaning target
    // then transform in array
    this.file = scssfmt( stripCssComments(target) ).split('\n');

    // remove css comments written with //
    // and @import of file (without url())
    _.remove(this.file, (item) => {
      const startString = item.trim().substring(0, 2);
      return item === '' ||
        (item !== '' && startString === '//') ||
        (item.match('@import') && !item.match('url'));
    });

    return this.sort();
  }

  sort() {
    // precontent = $variable to prepend
    // content = declaration to append
    const result = {
      preContent: [],
      content: [],
    }

    // get type of each line and push it in the right array
    for (let i = 0; i < this.file.length; i++) {
      const type = this.getType(this.file[i]);
      if (type === 'variable') {
        result.preContent.push(this.file[i]);
      } else {
        result.content.push(this.file[i]);
      }
    }

    // join them in one
    result.preContent = result.preContent.join('\n');
    result.content = result.content.join('\n');
    return result;
  }

  getType(line) {
    const targetTrimed = line.trim();
    const wordsArr = targetTrimed.split(' ');
    const firstWord = wordsArr[0];
    const firstType = firstWord.length !== 1 ? firstWord.substring(0, 1) : firstWord;
    const lastWord = wordsArr[wordsArr.length - 1];
    const lastType = lastWord.length !== 1 ? lastWord.substring(lastWord.length - 1, lastWord.length) : lastWord;

    let type = undefined;

    if (lastType === '{' || lastType === ',') {
      return type = 'selector';
    }

    if (firstType === '$') {
      return type = 'variable';
    }

    if (firstWord === '@import') {
      return type = 'import';
    }

    if (firstWord === '}') {
      return type = 'closingBrace';
    }

    // declared after all because this.type = undefined
    if (!type) {
      return type = 'property';
    }
  }
}

export { Scssjs  as default };
