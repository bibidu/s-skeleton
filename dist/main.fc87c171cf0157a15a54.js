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
/******/ 	return __webpack_require__(__webpack_require__.s = "./test.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  isInViewShow,\n} = __webpack_require__(/*! ./utils */ \"./utils/index.js\")\nconst {\n  makeDiv\n} = __webpack_require__(/*! ./elements */ \"./elements/index.js\")\n\n\nconst COLOR = '#ededed' // 色块颜色\n\nconst genBlock = function(els) {\n  els = Array.isArray(els) ? els : [els]\n  els.forEach(el => {\n    if (!el.style) {\n      el.style = {}\n    }\n    if (el.style) {\n      el.style.color = COLOR\n      el.style.background = COLOR\n    }\n  })\n}\n\nconst replaceToDivElement = function(sourceNodes, cloneNodes, needRenderColorElements) {\n  const interitAttrNames = ['width', 'height', 'margin', 'borderRadius']\n  const style = getComputedStyle(sourceNodes)\n  const div = document.createElement('div')\n  interitAttrNames.forEach(name => div.style[name] = style[name])\n  needRenderColorElements.push(div)\n  cloneNodes.parentNode.insertBefore(div, cloneNodes)\n  cloneNodes.remove()\n}\n \n \nconst collectNoChildrenElement = function(selector = 'body', cloneNodes, needRenderColorElements) {\n  let sourceNodes = typeof selector === 'string' ? document.querySelector(selector) : selector\n  switch(sourceNodes.tagName) {\n    case 'SCRIPT': return\n    case 'A':\n    case 'LABEL':\n    case 'BUTTON': {\n      return needRenderColorElements.push(cloneNodes)\n    }\n    case 'IMG': {\n      return replaceToDivElement(sourceNodes, cloneNodes, needRenderColorElements)\n    }\n  }\n\n  if (!sourceNodes.hasChildNodes()) {\n    if (sourceNodes.tagName === 'DIV' || sourceNodes.tagName === 'SPAN') {\n      makeDiv(sourceNodes, cloneNodes)\n    }\n    \n    if (sourceNodes.nodeType === 3 // 文本节点\n      && sourceNodes.data.trim() !== '' // 内容非空\n    ) {\n      return needRenderColorElements.push(cloneNodes.parentNode)\n    }\n    needRenderColorElements.push(cloneNodes)\n  }\n \n  (sourceNodes.childNodes || []).forEach((child, idx) => {\n    collectNoChildrenElement(child, cloneNodes.childNodes[idx], needRenderColorElements)\n  })\n}\n\nmodule.exports.collectNoChildrenElement = collectNoChildrenElement\nmodule.exports.genBlock = genBlock\n\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./elements/div.js":
/*!*************************!*\
  !*** ./elements/div.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function makeDiv(sourceNodes, cloneNodes) {\n  console.log(123)\n  const baseSpacing = 6\n  const style = getComputedStyle(sourceNodes)\n  let height = style.height\n  let lineHeight = style.lineHeight\n  if (height.includes('px')) {\n    height = Number(height.split('px')[0])\n    if (typeof lineHeight !== 'number' && lineHeight.includes('px')) {\n      lineHeight = Number(lineHeight.split('px')[0])\n    } else if (lineHeight === 'auto') {\n      lineHeight = height\n    } else if (lineHeight.includes('%')) {\n      lineHeight = height * Number(lineHeight.slice(0, -1))\n    }\n    cloneNodes.innerHTML = ''\n    const number = Math.floor(Math.sqrt(height / (lineHeight + baseSpacing)))\n    let i = number\n    console.log(i)\n    while (i-- > 0) {\n      const el = document.createElement('div')\n      el.style.color = '#ccc !important'\n      el.style.background = '#ededed'\n      el.style.marginBottom = baseSpacing + 'px'\n      el.style.width = '100%'\n      el.style.height = number === 1 ? lineHeight + baseSpacing + 'px' : Math.floor(height / number) + 'px'\n      cloneNodes.appendChild(el)\n    }\n    if (getComputedStyle(sourceNodes).width === '0px') {\n      cloneNodes.style.width = '100%'\n    }\n  } else {\n    console.log('height not has px unit!')\n  }\n}\n\n//# sourceURL=webpack:///./elements/div.js?");

/***/ }),

/***/ "./elements/index.js":
/*!***************************!*\
  !*** ./elements/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports.makeDiv = __webpack_require__(/*! ./div */ \"./elements/div.js\")\n\n//# sourceURL=webpack:///./elements/index.js?");

/***/ }),

/***/ "./test.js":
/*!*****************!*\
  !*** ./test.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  collectNoChildrenElement,\n  genBlock\n} = __webpack_require__(/*! ./app */ \"./app.js\")\nconst {\n  isInViewShow\n} = __webpack_require__(/*! ./utils */ \"./utils/index.js\")\n\n\n// test\nconst noChildrenElements = []\nsetTimeout(() => {\n  const sourceNodes = document.querySelector('body')\n  // 克隆一个相同节点\n  const cloneNodes = sourceNodes.cloneNode(true)\n\n  collectNoChildrenElement(sourceNodes, cloneNodes, noChildrenElements)\n\n  genBlock(noChildrenElements)\n  // 提取骨架屏需要的节点部分\n  const skeletonDOM = extractSkeletonDOM(sourceNodes, cloneNodes)\n\n  console.log('skeletonDOM')\n  console.log(skeletonDOM.childNodes)\n  // 创建骨架屏组件\n  const skeletonComponent = createSkeletonComponent(skeletonDOM)\n  \n  setTimeout(() => {\n    console.log('create')\n    skeletonComponent.show()\n    setTimeout(() => {\n      skeletonComponent.hide()\n    }, 1000);\n  }, 1000);\n}, 2000)\n\n\n\nfunction createSkeletonComponent(dom) {\n  dom.style.position = 'fixed'\n  dom.style.zIndex = 100000\n  dom.style.top = 0\n  dom.style.left = 0\n  dom.style.right = 0\n  dom.style.bottom = 0\n  dom.style.background = '#fff'\n  function show() {\n    document.body.appendChild(dom)\n  }\n  function hide() {\n    dom.remove()\n  }\n  return { show, hide }\n}\nfunction extractSkeletonDOM(sourceNodes, cloneNodes) {\n  if (sourceNodes.tagName === 'SCRIPT') {\n    return cloneNodes.remove()\n  }\n  if (sourceNodes.hasChildNodes()) {\n    if (sourceNodes !== document.querySelector('body') && !isInViewShow(sourceNodes)) {\n      return cloneNodes.remove()\n    }\n\n    sourceNodes.childNodes.forEach((child, idx) => extractSkeletonDOM(child, cloneNodes.childNodes[idx]))\n  } else {\n    return\n  }\n  return cloneNodes\n}\n\n\n\n//# sourceURL=webpack:///./test.js?");

/***/ }),

/***/ "./utils/index.js":
/*!************************!*\
  !*** ./utils/index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports.isInViewShow = __webpack_require__(/*! ./isInViewShow */ \"./utils/isInViewShow.js\")\n\n//# sourceURL=webpack:///./utils/index.js?");

/***/ }),

/***/ "./utils/isInViewShow.js":
/*!*******************************!*\
  !*** ./utils/isInViewShow.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function isInViewShow(el) {\n  const rect = el.getBoundingClientRect()\n  if (rect.top < document.documentElement.clientHeight) {\n    return true\n  }\n  return false\n}\n\n//# sourceURL=webpack:///./utils/isInViewShow.js?");

/***/ })

/******/ });