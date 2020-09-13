/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /home/jeff/Documents/Development/capstone/static/js/src/index.js: Unexpected token, expected \\\",\\\" (22:71)\\n\\n\\u001b[0m \\u001b[90m 20 | \\u001b[39m    console\\u001b[33m.\\u001b[39mlog(\\u001b[32m\\\"user data\\\"\\u001b[39m)\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 21 | \\u001b[39m    console\\u001b[33m.\\u001b[39mlog(user)\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 22 | \\u001b[39m    console\\u001b[33m.\\u001b[39mlog(window\\u001b[33m.\\u001b[39mlocation\\u001b[33m.\\u001b[39mhash\\u001b[33m.\\u001b[39msubstr(\\u001b[35m1\\u001b[39m)\\u001b[33m.\\u001b[39msplit(\\u001b[32m'&'\\u001b[39m)[\\u001b[35m0\\u001b[39m]\\u001b[33m.\\u001b[39msplit(\\u001b[32m'='\\u001b[39m)\\u001b[33m;\\u001b[39m)\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m                                                                       \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 23 | \\u001b[39m  }\\u001b[0m\\n\\u001b[0m \\u001b[90m 24 | \\u001b[39m})\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 25 | \\u001b[39m\\u001b[0m\\n    at Parser._raise (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:766:17)\\n    at Parser.raiseWithData (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:759:17)\\n    at Parser.raise (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:753:17)\\n    at Parser.unexpected (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:8966:16)\\n    at Parser.expect (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:8952:28)\\n    at Parser.parseCallExpressionArguments (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:10033:14)\\n    at Parser.parseCoverCallAndAsyncArrowHead (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:9960:29)\\n    at Parser.parseSubscript (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:9896:19)\\n    at Parser.parseSubscripts (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:9867:19)\\n    at Parser.parseExprSubscripts (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:9850:17)\\n    at Parser.parseUpdate (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:9824:21)\\n    at Parser.parseMaybeUnary (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:9813:17)\\n    at Parser.parseExprOps (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:9683:23)\\n    at Parser.parseMaybeConditional (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:9657:23)\\n    at Parser.parseMaybeAssign (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:9620:21)\\n    at Parser.parseExpressionBase (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:9564:23)\\n    at /home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:9558:39\\n    at Parser.allowInAnd (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:11303:12)\\n    at Parser.parseExpression (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:9558:17)\\n    at Parser.parseStatementContent (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:11562:23)\\n    at Parser.parseStatement (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:11431:17)\\n    at Parser.parseBlockOrModuleBlockBody (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:12013:25)\\n    at Parser.parseBlockBody (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:11999:10)\\n    at Parser.parseBlock (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:11983:10)\\n    at Parser.parseStatementContent (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:11507:21)\\n    at Parser.parseStatement (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:11431:17)\\n    at Parser.parseIfStatement (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:11785:28)\\n    at Parser.parseStatementContent (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:11476:21)\\n    at Parser.parseStatement (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:11431:17)\\n    at Parser.parseBlockOrModuleBlockBody (/home/jeff/Documents/Development/capstone/static/js/node_modules/@babel/parser/lib/index.js:12013:25)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });