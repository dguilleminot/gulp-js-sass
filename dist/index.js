'use strict';

var _main = require('./main.js');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tt = new _main2.default().init();

// PATH OF FILE.SCSS
// IDFILESCSS =
// {
//   path: 'common/common',
//   content: [
//     // class declaration => use to find declaration
//     {
//       parent: parent.ID,
//       selector: '.main-header',
//       content: {
//         key: value,
//         key: value,
//         key: value,
//         key: value,
//       }
//     ]
//     // END class declaration
//   }
//
//   // class import => use to find import and access at vars
//   import: {
//     IDimport
//   },
//   var: {},
//   // mixin: {},
//   // functions: {},
// }