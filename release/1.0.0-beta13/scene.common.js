/*
Copyright (c) 2018 Daybrush
@name: scenejs
license: MIT
author: Daybrush
repository: https://github.com/daybrush/scenejs.git
@version 1.0.0-beta13
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@daybrush/utils');
var fjx = require('fjx');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var PREFIX = "__SCENEJS_";
var TIMING_FUNCTION = "animation-timing-function";
var ROLES = {
  transform: {},
  filter: {},
  attribute: {}
};
var ALIAS = {
  easing: [TIMING_FUNCTION]
};
var FIXED = {
  "animation-timing-function": true,
  "contents": true
};
var MAXIMUM = 1000000;
var THRESHOLD = 0.000001;
var DURATION = "duration";
var FILL_MODE = "fillMode";
var DIRECTION = "direction";
var ITERATION_COUNT = "iterationCount";
var DELAY = "delay";
var EASING = "easing";
var PLAY_SPEED = "playSpeed";
var EASING_NAME = "easingName";
var ITERATION_TIME = "iterationTime";
var PAUSED = "paused";
var ENDED = "ended";
var TIMEUPDATE = "timeupdate";
var ANIMATE = "animate";
var PLAY = "play";
var RUNNING = "running";
var ITERATION = "iteration";
var START_ANIMATION = "startAnimation";
var PAUSE_ANIMATION = "pauseAnimation";
var ALTERNATE = "alternate";
var REVERSE = "reverse";
var ALTERNATE_REVERSE = "alternate-reverse";
var NORMAL = "normal";
var INFINITE = "infinite";
var PLAY_STATE = "playState";
/**
* option name list
* @name Scene.OPTIONS
* @memberof Scene
* @static
* @type {$ts:OptionType}
* @example
* Scene.OPTIONS // ["duration", "fillMode", "direction", "iterationCount", "delay", "easing", "playSpeed"]
*/

var OPTIONS = [DURATION, FILL_MODE, DIRECTION, ITERATION_COUNT, DELAY, EASING, PLAY_SPEED];
/**
* Event name list
* @name Scene.EVENTS
* @memberof Scene
* @static
* @type {$ts:EventType}
* @example
* Scene.EVENTS // ["paused", "ended", "timeupdate", "animate", "play", "iteration"];
*/

var EVENTS = [PAUSED, ENDED, TIMEUPDATE, ANIMATE, PLAY, ITERATION];

/**
* attach and trigger event handlers.
*/

var EventTrigger =
/*#__PURE__*/
function () {
  /**
    * @example
  const et = new Scene.EventTrigger();
  const scene = new Scene();
   scene.on("call", e => {
    console.log(e.param);
  });
  et.on("call", e => {
    console.log(e.param);
  });
  scene.trigger("call", {param: 1});
  et.trigger("call", {param: 1});
     */
  function EventTrigger() {
    this.events = {};
  }

  var __proto = EventTrigger.prototype;

  __proto._on = function (name, callback, once) {
    var _this = this;

    var events = this.events;

    if (utils.isObject(name)) {
      fjx.eachObjectF(function (f, i) {
        _this._on(i, f, once);
      }, name);
      return;
    }

    if (!(name in events)) {
      events[name] = [];
    }

    if (!callback) {
      return;
    }

    if (utils.isArray(callback)) {
      fjx.eachArrayF(function (func) {
        return _this._on(name, func, once);
      }, callback);
      return;
    }

    var event = events[name];
    event.push(once ? function callback2() {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      callback.apply(void 0, args);
      this.off(name, callback2);
    } : callback);
  };
  /**
    * Attach an event handler function for one or more events to target
    * @param - event's name
    * @param - function to execute when the event is triggered.
    * @return {EventTrigger} An Instance itself.
    * @example
  target.on("animate", function() {
    console.log("animate");
  });
   target.trigger("animate");
     */


  __proto.on = function (name, callback) {
    this._on(name, callback);

    return this;
  };
  /**
    * Dettach an event handler function for one or more events to target
    * @param - event's name
    * @param -  function to execute when the event is triggered.
    * @return {EventTrigger} An Instance itself.
    * @example
  const callback = function() {
    console.log("animate");
  };
  target.on("animate", callback);
   target.off("animate", callback);
  target.off("animate");
       */


  __proto.off = function (name, callback) {
    if (!name) {
      this.events = {};
    } else if (!callback) {
      this.events[name] = [];
    } else {
      var callbacks = this.events[name];

      if (!callbacks) {
        return this;
      }

      var index = callbacks.indexOf(callback);

      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }

    return this;
  };
  /**
    * execute event handler
    * @param - event's name
    * @param - event handler's additional parameter
    * @return {EventTrigger} An Instance itself.
    * @example
  target.on("animate", function(a1, a2) {
    console.log("animate", a1, a2);
  });
   target.trigger("animate", [1, 2]); // log => "animate", 1, 2
       */


  __proto.trigger = function (name) {
    var _this = this;

    var data = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      data[_i - 1] = arguments[_i];
    }

    var events = this.events;

    if (!(name in events)) {
      return this;
    }

    var event = events[name];

    if (data.length) {
      var target = data[0];
      target.type = name;
      target.currentTarget = this;
      !target.target && (target.target = this);
    }

    fjx.eachArrayF(function (callback) {
      callback.apply(_this, data);
    }, event);
    return this;
  };

  __proto.once = function (name, callback) {
    this._on(name, callback, true);

    return this;
  };

  return EventTrigger;
}();

function cubic(y1, y2, t) {
  var t2 = 1 - t; // Bezier Curve Formula

  return t * t * t + 3 * t * t * t2 * y2 + 3 * t * t2 * t2 * y1;
}

function solveFromX(x1, x2, x) {
  // x  0 ~ 1
  // t 0 ~ 1
  var t = x;
  var solveX = x;
  var dx = 1;

  while (Math.abs(dx) > 1 / 1000) {
    // 예상 t초에 의한 _x값
    solveX = cubic(x1, x2, t);
    dx = solveX - x; // 차이가 미세하면 그 값을 t로 지정

    if (Math.abs(dx) < 1 / 1000) {
      return t;
    }

    t -= dx / 2;
  }

  return t;
}
/**
 * @namespace easing
 */

/**
* Cubic Bezier curve.
* @memberof easing
* @func bezier
* @param {number} [x1] - point1's x
* @param {number} [y1] - point1's y
* @param {number} [x2] - point2's x
* @param {number} [y2] - point2's y
* @return {function} the curve function
* @example
import {bezier} from "scenejs";
Scene.bezier(0, 0, 1, 1) // LINEAR
Scene.bezier(0.25, 0.1, 0.25, 1) // EASE
*/


function bezier(x1, y1, x2, y2) {
  /*
        x = f(t)
        calculate inverse function by x
        t = f-1(x)
    */
  var func = function (x) {
    var t = solveFromX(x1, x2, Math.max(Math.min(1, x), 0));
    return cubic(y1, y2, t);
  };

  func.easingName = "cubic-bezier(" + x1 + "," + y1 + "," + x2 + "," + y2 + ")";
  return func;
}
/**
* Specifies a stepping function
* @see {@link https://www.w3schools.com/cssref/css3_pr_animation-timing-function.asp|CSS3 Timing Function}
* @memberof easing
* @func steps
* @param {number} count - point1's x
* @param {"start" | "end"} postion - point1's y
* @return {function} the curve function
* @example
import {steps} from "scenejs";
Scene.steps(1, "start") // Scene.STEP_START
Scene.steps(1, "end") // Scene.STEP_END
*/

function steps(count, position) {
  var func = function (time) {
    var level = 1 / count;

    if (time >= 1) {
      return 1;
    }

    return (position === "start" ? level : 0) + Math.floor(time / level) * level;
  };

  func.easingName = "steps(" + count + ", " + position + ")";
  return func;
}
/**
* Equivalent to steps(1, start)
* @memberof easing
* @name STEP_START
* @static
* @type {function}
* @example
import {STEP_START} from "scenejs";
Scene.STEP_START // steps(1, start)
*/

var STEP_START =
/*#__PURE__#*/
steps(1, "start");
/**
* Equivalent to steps(1, end)
* @memberof easing
* @name STEP_END
* @static
* @type {function}
* @example
import {STEP_END} from "scenejs";
Scene.STEP_END // steps(1, end)
*/

var STEP_END =
/*#__PURE__#*/
steps(1, "end");
/**
* Linear Speed (0, 0, 1, 1)
* @memberof easing
* @name LINEAR
* @static
* @type {function}
* @example
import {LINEAR} from "scenejs";
Scene.LINEAR
*/

var LINEAR =
/*#__PURE__#*/
bezier(0, 0, 1, 1);
/**
* Ease Speed (0.25, 0.1, 0.25, 1)
* @memberof easing
* @name EASE
* @static
* @type {function}
* @example
import {EASE} from "scenejs";
Scene.EASE
*/

var EASE =
/*#__PURE__#*/
bezier(0.25, 0.1, 0.25, 1);
/**
* Ease In Speed (0.42, 0, 1, 1)
* @memberof easing
* @name EASE_IN
* @static
* @type {function}
* @example
import {EASE_IN} from "scenejs";
Scene.EASE_IN
*/

var EASE_IN =
/*#__PURE__#*/
bezier(0.42, 0, 1, 1);
/**
* Ease Out Speed (0, 0, 0.58, 1)
* @memberof easing
* @name EASE_OUT
* @static
* @type {function}
* @example
import {EASE_OUT} from "scenejs";
Scene.EASE_OUT
*/

var EASE_OUT =
/*#__PURE__#*/
bezier(0, 0, 0.58, 1);
/**
* Ease In Out Speed (0.42, 0, 0.58, 1)
* @memberof easing
* @name EASE_IN_OUT
* @static
* @type {function}
* @example
import {EASE_IN_OUT} from "scenejs";
Scene.EASE_IN_OUT
*/

var EASE_IN_OUT =
/*#__PURE__#*/
bezier(0.42, 0, 0.58, 1);

/**
* Make string, array to PropertyObject for the dot product
*/

var PropertyObject =
/*#__PURE__*/
function () {
  /**
    * @param - This value is in the array format.
    * @param - options
    * @example
  var obj = new PropertyObject([100,100,100,0.5], {
    "separator" : ",",
    "prefix" : "rgba(",
    "suffix" : ")"
  });
     */
  function PropertyObject(value, options) {
    this.options = {
      prefix: "",
      suffix: "",
      model: "",
      type: "",
      separator: ","
    };
    options && this.setOptions(options);
    this.init(value);
  }

  var __proto = PropertyObject.prototype;

  __proto.setOptions = function (newOptions) {
    var options = this.options;

    for (var name in newOptions) {
      options[name] = newOptions[name];
    }

    options && (this.options = __assign({}, this.options, options));
    return this;
  };

  __proto.getOption = function (name) {
    return this.options[name];
  };
  /**
    * the number of values.
    * @example
  const obj1 = new PropertyObject("1,2,3", ",");
   console.log(obj1.length);
  // 3
     */


  __proto.size = function () {
    return this.value.length;
  };
  /**
    * retrieve one of values at the index
    * @param {Number} index - index
    * @return {Object} one of values at the index
    * @example
  const obj1 = new PropertyObject("1,2,3", ",");
   console.log(obj1.get(0));
  // 1
     */


  __proto.get = function (index) {
    return this.value[index];
  };
  /**
    * Set the value at that index
    * @param {Number} index - index
    * @param {Object} value - text, a number, object to set
    * @return {PropertyObject} An instance itself
    * @example
  const obj1 = new PropertyObject("1,2,3", ",");
  obj1.set(0, 2);
  console.log(obj1.toValue());
  // 2,2,3
     */


  __proto.set = function (index, value) {
    this.value[index] = value;
    return this;
  };
  /**
    * create a copy of an instance itself.
    * @return {PropertyObject} clone
    * @example
  const obj1 = new PropertyObject("1,2,3", ",");
  const obj2 = obj1.clone();
     */


  __proto.clone = function () {
    var arr = this.value.map(function (v) {
      return v instanceof PropertyObject ? v.clone() : v;
    });
    return new PropertyObject(arr, this.options);
  };
  /**
    * Make Property Object to String
    * @return {String} Make Property Object to String
    * @example
  //rgba(100, 100, 100, 0.5)
  const obj4 = new PropertyObject([100,100,100,0.5], {
    "separator" : ",",
    "prefix" : "rgba(",
    "suffix" : ")",
  });
  console.log(obj4.toValue());
  // "rgba(100,100,100,0.5)"
    */


  __proto.toValue = function () {
    return this.options.prefix + this.join() + this.options.suffix;
  };
  /**
    * Make Property Object's array to String
    * @return {String} Join the elements of an array into a string
    * @example
    //rgba(100, 100, 100, 0.5)
    var obj4 = new PropertyObject([100,100,100,0.5], {
        "separator" : ",",
        "prefix" : "rgba(",
        "suffix" : ")"
    });
    obj4.join();  // =>   "100,100,100,0.5"
     */


  __proto.join = function () {
    return this.value.map(function (v) {
      return v instanceof PropertyObject ? v.toValue() : v;
    }).join(this.options.separator);
  };
  /**
    * executes a provided function once per array element.
    * @param {Function} callback - Function to execute for each element, taking three arguments
    * @param {All} [callback.currentValue] The current element being processed in the array.
    * @param {Number} [callback.index] The index of the current element being processed in the array.
    * @param {Array} [callback.array] the array.
    * @return {PropertyObject} An instance itself
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach|MDN Array.forEach()} reference to MDN document.
    * @example
  //rgba(100, 100, 100, 0.5)
  var obj4 = new PropertyObject([100,100,100,0.5], {
    "separator" : ",",
    "prefix" : "rgba(",
    "suffix" : ")"
  });
   obj4.forEach(t => {
    console.log(t);
  });  // =>   "100,100,100,0.5"
    */


  __proto.forEach = function (func) {
    this.value.forEach(func);
    return this;
  };

  __proto.init = function (value) {
    var type = typeof value;

    if (type === utils.STRING) {
      this.value = value.split(this.options.separator);
    } else if (type === utils.OBJECT) {
      this.value = value;
    } else {
      this.value = [value];
    }

    return this;
  };

  return PropertyObject;
}();

function isPropertyObject(value) {
  return value instanceof PropertyObject;
}
function setAlias(name, alias) {
  ALIAS[name] = alias;
}
function setRole(names, isProperty, isFixedProperty) {
  var length = names.length;
  var roles = ROLES;
  var fixed = FIXED;

  for (var i = 0; i < length - 1; ++i) {
    !roles[names[i]] && (roles[names[i]] = {});
    roles = roles[names[i]];

    if (isFixedProperty) {
      !fixed[names[i]] && (fixed[names[i]] = {});
      fixed = fixed[names[i]];
    }
  }

  isFixedProperty && (fixed[names[length - 1]] = true);
  roles[names[length - 1]] = isProperty ? true : {};
}
function getType(value) {
  var type = typeof value;

  if (type === utils.OBJECT) {
    if (utils.isArray(value)) {
      return utils.ARRAY;
    } else if (isPropertyObject(value)) {
      return utils.PROPERTY;
    }
  } else if (type === utils.STRING || type === utils.NUMBER) {
    return "value";
  }

  return type;
}
function toFixed(num) {
  return Math.round(num * MAXIMUM) / MAXIMUM;
}
function isInProperties(roles, args, isCheckTrue) {
  var length = args.length;
  var role = roles;

  if (length === 0) {
    return false;
  }

  for (var i = 0; i < length; ++i) {
    if (role === true) {
      return false;
    }

    role = role[args[i]];

    if (!role || !isCheckTrue && role === true) {
      return false;
    }
  }

  return true;
}
function isRole(args, isCheckTrue) {
  return isInProperties(ROLES, args, isCheckTrue);
}
function isFixed(args) {
  return isInProperties(FIXED, args, true);
}
function isPausedCSS(item) {
  return item.state.playCSS && item.getPlayState() === PAUSED;
}
function exportCSS(id, css) {
  var styleId = PREFIX + "STYLE_" + toId(id);
  var styleElement = document.querySelector("#" + styleId);

  if (styleElement) {
    styleElement.innerText = css;
  } else {
    document.body.insertAdjacentHTML("beforeend", "<style id=\"" + styleId + "\">" + css + "</style>");
  }
}
function makeId(selector) {
  for (;;) {
    var id = "" + Math.floor(Math.random() * 10000000);

    if (!utils.IS_WINDOW || !selector) {
      return id;
    }

    var checkElement = document.querySelector("[data-scene-id=\"" + id + "\"]");

    if (!checkElement) {
      return id;
    }
  }
}
function getRealId(item) {
  return item.state.id || item.setId().getId();
}
function toId(text) {
  return ("" + text).match(/[0-9a-zA-Z]+/g).join("");
}
function playCSS(item, isExportCSS, properties) {
  if (properties === void 0) {
    properties = {};
  }

  if (!utils.ANIMATION || item.getPlayState() === RUNNING) {
    return;
  }

  if (isPausedCSS(item)) {
    item.addPlayClass(true, properties);
  } else {
    if (item.isEnded()) {
      item.setTime(0);
    }

    isExportCSS && item.exportCSS();
    var el = item.addPlayClass(false, properties);

    if (!el) {
      return;
    }

    !item.state.peusdo && addAnimationEvent(item, el);
    item.setState({
      playCSS: true
    });
  }

  item.setPlayState(RUNNING);
  item.trigger(PLAY);
}
function addAnimationEvent(item, el) {
  var duration = item.getDuration();
  var isZeroDuration = !duration || !isFinite(duration);

  var animationend = function () {
    if (!isZeroDuration) {
      item.setState({
        playCSS: false
      });
      item.finish();
    }
  };

  item.on(ENDED, function () {
    el.removeEventListener("animationend", animationend);
    el.removeEventListener("animationiteration", animationiteration);
  });

  var animationiteration = function (_a) {
    var elapsedTime = _a.elapsedTime;
    var currentTime = elapsedTime;
    var iterationCount = isZeroDuration ? 0 : currentTime / duration;
    item.state.currentTime = currentTime;
    item.setCurrentIterationCount(iterationCount);
  };

  el.addEventListener("animationend", animationend);
  el.addEventListener("animationiteration", animationiteration);
}

function GetterSetter(getter, setter, parent) {
  return function (constructor) {
    var prototype = constructor.prototype;
    getter.forEach(function (name) {
      prototype[utils.camelize("get " + name)] = function () {
        return this[parent][name];
      };
    });
    setter.forEach(function (name) {
      prototype[utils.camelize("set " + name)] = function (value) {
        this[parent][name] = value;
        return this;
      };
    });
  };
}

function isDirectionReverse(currentIterationCount, iteraiontCount, direction) {
  if (direction === REVERSE) {
    return true;
  } else if (iteraiontCount !== "infinite" && currentIterationCount === iteraiontCount && iteraiontCount % 1 === 0) {
    return direction === (currentIterationCount % 2 >= 1 ? ALTERNATE_REVERSE : ALTERNATE);
  }

  return direction === (currentIterationCount % 2 >= 1 ? ALTERNATE : ALTERNATE_REVERSE);
}
/**
* @typedef {Object} StateInterface The Animator options. Properties used in css animation.
* @property {number} [duration] The duration property defines how long an animation should take to complete one cycle.
* @property {"none"|"forwards"|"backwards"|"both"} [fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
* @property {"infinite"|number} [iterationCount] The iterationCount property specifies the number of times an animation should be played.
* @property {array|function} [easing] The easing(timing-function) specifies the speed curve of an animation.
* @property {number} [delay] The delay property specifies a delay for the start of an animation.
* @property {"normal"|"reverse"|"alternate"|"alternate-reverse"} [direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
*/

var setters = [ITERATION_COUNT, DELAY, FILL_MODE, DIRECTION, PLAY_SPEED, DURATION, PLAY_SPEED, ITERATION_TIME, PLAY_STATE];
var getters = setters.concat([EASING, EASING_NAME]);
/**
* play video, animation, the others
* @extends EventTrigger
* @see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
*/

var Animator =
/*#__PURE__*/
function (_super) {
  __extends(Animator, _super);
  /**
   * @param - animator's options
   * @example
  const animator = new Animator({
    delay: 2,
    diretion: "alternate",
    duration: 2,
    fillMode: "forwards",
    iterationCount: 3,
    easing: Scene.easing.EASE,
  });
   */


  function Animator(options) {
    var _this = _super.call(this) || this;

    _this.options = {};
    _this.state = {
      id: "",
      easing: 0,
      easingName: "linear",
      iterationCount: 1,
      delay: 0,
      fillMode: "forwards",
      direction: NORMAL,
      playSpeed: 1,
      currentTime: 0,
      iterationTime: -1,
      currentIterationCount: 0,
      tickTime: 0,
      prevTime: 0,
      playState: PAUSED,
      duration: 0
    };

    _this.setOptions(options);

    return _this;
  }
  /**
    * set animator's easing.
    * @param curverArray - The speed curve of an animation.
    * @return {Animator} An instance itself.
    * @example
  animator.({
    delay: 2,
    diretion: "alternate",
    duration: 2,
    fillMode: "forwards",
    iterationCount: 3,
    easing: Scene.easing.EASE,
  });
    */


  var __proto = Animator.prototype;

  __proto.setEasing = function (curveArray) {
    var easing = Array.isArray(curveArray) ? bezier(curveArray[0], curveArray[1], curveArray[2], curveArray[3]) : curveArray;
    var easingName = easing[EASING_NAME] || "linear";
    this.setState({
      easing: easing,
      easingName: easingName
    });
    return this;
  };
  /**
    * set animator's options.
    * @see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
    * @param - animator's options
    * @return {Animator} An instance itself.
    * @example
  animator.({
    delay: 2,
    diretion: "alternate",
    duration: 2,
    fillMode: "forwards",
    iterationCount: 3,
    easing: Scene.eaasing.EASE,
  });
    */


  __proto.setOptions = function (options) {
    if (options === void 0) {
      options = {};
    }

    for (var name in options) {
      var value = options[name];

      if (name === EASING) {
        this.setEasing(value);
        continue;
      } else if (name === DURATION) {
        value && this.setDuration(value);
        continue;
      }

      (name in this.state ? this.state : this.options)[name] = value;
    }

    return this;
  };
  /**
    * Get the animator's total duration including delay
    * @return {number} Total duration
    * @example
  animator.getTotalDuration();
    */


  __proto.getTotalDuration = function () {
    if (this.state[ITERATION_COUNT] === INFINITE) {
      return Infinity;
    }

    return this.state[DELAY] + this.getActiveDuration();
  };
  /**
    * Get the animator's total duration excluding delay
    * @return {number} Total duration excluding delay
    * @example
  animator.getTotalDuration();
    */


  __proto.getActiveDuration = function () {
    if (this.state[ITERATION_COUNT] === INFINITE) {
      return Infinity;
    }

    return this.getDuration() * this.state[ITERATION_COUNT];
  };
  /**
    * Check if the animator has reached the end.
    * @return {boolean} ended
    * @example
  animator.isEnded(); // true or false
    */


  __proto.isEnded = function () {
    if (this.state.tickTime === 0 && this.state[PLAY_STATE] === PAUSED) {
      return true;
    } else if (this.getTime() < this.getActiveDuration()) {
      return false;
    }

    return true;
  };
  /**
    *Check if the animator is paused:
    * @return {boolean} paused
    * @example
  animator.isPaused(); // true or false
    */


  __proto.isPaused = function () {
    return this.state[PLAY_STATE] === PAUSED;
  };

  __proto.setNext = function (animator) {
    this.on(ENDED, function () {
      animator.play();
    });
    return this;
  };
  /**
    * play animator
    * @return {Animator} An instance itself.
    */


  __proto.play = function () {
    var _this = this;

    this.state[PLAY_STATE] = RUNNING;

    if (this.isEnded()) {
      this.setTickTime(0);
    }

    this.state.tickTime = this.getTime();
    utils.requestAnimationFrame(function (time) {
      _this.state.prevTime = time;

      _this.tick(time);
    });
    /**
         * This event is fired when play animator.
         * @event Animator#play
         */

    this.trigger(PLAY);
    return this;
  };
  /**
    * pause animator
    * @return {Animator} An instance itself.
    */


  __proto.pause = function () {
    this.state[PLAY_STATE] = PAUSED;
    /**
         * This event is fired when animator is paused.
         * @event Animator#paused
         */

    this.trigger(PAUSED);
    return this;
  };
  /**
     * end animator
     * @return {Animator} An instance itself.
    */


  __proto.finish = function () {
    this.state.tickTime = 0;
    this.setTime(0);
    this.end();
    return this;
  };
  /**
     * end animator
     * @return {Animator} An instance itself.
    */


  __proto.end = function () {
    this.pause();
    /**
         * This event is fired when animator is ended.
         * @event Animator#ended
         */

    this.trigger(ENDED);
    return this;
  };
  /**
    * set currentTime
    * @param {Number|String} time - currentTime
    * @return {Animator} An instance itself.
    * @example
   animator.setTime("from"); // 0
  animator.setTime("to"); // 100%
  animator.setTime("50%");
  animator.setTime(10);
  animator.getTime() // 10
    */


  __proto.setTime = function (time, isTick) {
    var activeDuration = this.getActiveDuration();
    var currentTime = isTick ? time : this.getUnitTime(time);
    this.state.tickTime = this.state.delay + currentTime;

    if (currentTime < 0) {
      currentTime = 0;
    } else if (currentTime > activeDuration) {
      currentTime = activeDuration;
    }

    this.state.currentTime = currentTime;
    this.calculateIterationTime();

    if (this.isDelay()) {
      return this;
    }
    /**
         * This event is fired when the animator updates the time.
         * @event Animator#timeupdate
         * @param {Object} param The object of data to be sent to an event.
         * @param {Number} param.currentTime The total time that the animator is running.
         * @param {Number} param.time The iteration time during duration that the animator is running.
         * @param {Number} param.iterationCount The iteration count that the animator is running.
         */


    this.trigger(TIMEUPDATE, {
      currentTime: currentTime,
      time: this.getIterationTime(),
      iterationCount: this.getIterationCount()
    });
    return this;
  };

  __proto.getState = function (name) {
    return this.state[name];
  };

  __proto.setState = function (object) {
    for (var name in object) {
      this.state[name] = object[name];
    }

    return this;
  };
  /**
    * Get the animator's current time
    * @return {number} current time
    * @example
  animator.getTime();
    */


  __proto.getTime = function () {
    return this.state.currentTime;
  };

  __proto.getUnitTime = function (time) {
    if (utils.isString(time)) {
      var duration = this.getDuration() || 100;

      if (time === "from") {
        return 0;
      } else if (time === "to") {
        return duration;
      }

      var _a = utils.splitUnit(time),
          unit = _a.unit,
          value = _a.value;

      if (unit === "%") {
        !this.getDuration() && (this.state.duration = duration);
        return parseFloat(time) / 100 * duration;
      } else if (unit === ">") {
        return value + THRESHOLD;
      } else {
        return value;
      }
    } else {
      return toFixed(time);
    }
  };
  /**
     * Check if the current state of animator is delayed.
     * @return {boolean} check delay state
     */


  __proto.isDelay = function () {
    var _a = this.state,
        delay = _a.delay,
        tickTime = _a.tickTime;
    return delay > 0 && tickTime < delay;
  };

  __proto.setCurrentIterationCount = function (iterationCount) {
    var state = this.state;
    var passIterationCount = Math.floor(iterationCount);

    if (state.currentIterationCount < passIterationCount) {
      /**
            * The event is fired when an iteration of an animation ends.
            * @event Animator#iteration
            * @param {Object} param The object of data to be sent to an event.
            * @param {Number} param.currentTime The total time that the animator is running.
            * @param {Number} param.iterationCount The iteration count that the animator is running.
            */
      this.trigger("iteration", {
        currentTime: state.currentTime,
        iterationCount: passIterationCount
      });
    }

    state.currentIterationCount = iterationCount;
    return this;
  };

  __proto.calculateIterationTime = function () {
    var _a = this.state,
        iterationCount = _a.iterationCount,
        fillMode = _a.fillMode,
        direction = _a.direction;
    var duration = this.getDuration();
    var time = this.getTime();
    var currentIterationCount = duration === 0 ? 0 : time / duration;
    var currentIterationTime = duration ? time % duration : 0;

    if (!duration) {
      this.setIterationTime(0);
      return this;
    }

    this.setCurrentIterationCount(currentIterationCount); // direction : normal, reverse, alternate, alternate-reverse
    // fillMode : forwards, backwards, both, none

    var isReverse = isDirectionReverse(currentIterationCount, iterationCount, direction);
    var isFiniteDuration = isFinite(duration);

    if (isFiniteDuration && isReverse) {
      currentIterationTime = duration - currentIterationTime;
    }

    if (isFiniteDuration && iterationCount !== INFINITE) {
      var isForwards = fillMode === "both" || fillMode === "forwards"; // fill forwards

      if (currentIterationCount >= iterationCount) {
        currentIterationTime = duration * (isForwards ? iterationCount % 1 || 1 : 0);
        isReverse && (currentIterationTime = duration - currentIterationTime);
      }
    }

    this.setIterationTime(currentIterationTime);
    return this;
  };

  __proto.tick = function (now) {
    var _this = this;

    var state = this.state;
    var playSpeed = state.playSpeed,
        prevTime = state.prevTime;
    var currentTime = this.state.tickTime + Math.min(1000, now - prevTime) / 1000 * playSpeed;
    state.prevTime = now;
    this.setTickTime(currentTime);

    if (this.isEnded()) {
      this.end();
      return;
    }

    if (state[PLAY_STATE] === PAUSED) {
      return;
    }

    utils.requestAnimationFrame(function (time) {
      _this.tick(time);
    });
  };

  __proto.setTickTime = function (time) {
    this.setTime(time - this.state.delay, true);
  };

  Animator = __decorate([GetterSetter(getters, setters, "state")], Animator);
  return Animator;
}(EventTrigger);

/**
* @namespace
* @name Property
*/
function splitStyle(str) {
  var properties = str.split(";");
  var obj = {};
  var length = properties.length;

  for (var i = 0; i < length; ++i) {
    var matches = /([^:]*):([\S\s]*)/g.exec(properties[i]);

    if (!matches || matches.length < 3 || !matches[1]) {
      --length;
      continue;
    }

    obj[matches[1].trim()] = toPropertyObject(matches[2].trim());
  }

  return {
    styles: obj,
    length: length
  };
}
/**
* convert array to PropertyObject[type=color].
* default model "rgba"
* @memberof Property
* @function arrayToColorObject
* @param {Array|PropertyObject} value ex) [0, 0, 0, 1]
* @return {PropertyObject} PropertyObject[type=color]
* @example
arrayToColorObject([0, 0, 0])
// => PropertyObject(type="color", model="rgba", value=[0, 0, 0, 1], separator=",")
*/

function arrayToColorObject(arr) {
  var model = utils.RGBA;

  if (arr.length === 3) {
    arr[3] = 1;
  }

  return new PropertyObject(arr, {
    model: model,
    separator: ",",
    type: "color",
    prefix: model + "(",
    suffix: ")"
  });
}
/**
* convert text with parentheses to object.
* @memberof Property
* @function stringToBracketObject
* @param {String} value ex) "rgba(0,0,0,1)"
* @return {PropertyObject} PropertyObject
* @example
stringToBracketObject("abcde(0, 0, 0,1)")
// => PropertyObject(model="abcde", value=[0, 0, 0,1], separator=",")
*/

function stringToBracketObject(text) {
  // [prefix, value, other]
  var _a = utils.splitBracket(text),
      model = _a.prefix,
      value = _a.value,
      afterModel = _a.suffix;

  if (typeof value === "undefined") {
    return text;
  }

  if (utils.COLOR_MODELS.indexOf(model) !== -1) {
    return arrayToColorObject(utils.stringToRGBA(text));
  } // divide comma(,)


  var obj = toPropertyObject(value);
  var arr = [value];
  var separator = ",";
  var prefix = model + "(";
  var suffix = ")" + afterModel;

  if (obj instanceof PropertyObject) {
    separator = obj.getOption("separator");
    arr = obj.value;
    prefix += obj.getOption("prefix");
    suffix = obj.getOption("suffix") + suffix;
  }

  return new PropertyObject(arr, {
    separator: separator,
    model: model,
    prefix: prefix,
    suffix: suffix
  });
}
function arrayToPropertyObject(arr, separator) {
  return new PropertyObject(arr, {
    type: "array",
    separator: separator
  });
}
/**
* convert text with parentheses to PropertyObject[type=color].
* If the values are not RGBA model, change them RGBA mdoel.
* @memberof Property
* @function stringToColorObject
* @param {String|PropertyObject} value ex) "rgba(0,0,0,1)"
* @return {PropertyObject} PropertyObject[type=color]
* @example
stringToColorObject("rgba(0, 0, 0,1)")
// => PropertyObject(type="color", model="rgba", value=[0, 0, 0,1], separator=",")
*/

function stringToColorObject(value) {
  var result = utils.stringToRGBA(value);
  return result ? arrayToColorObject(result) : value;
}
function toPropertyObject(value) {
  if (!utils.isString(value)) {
    if (Array.isArray(value)) {
      return arrayToPropertyObject(value, ",");
    }

    return value;
  }

  var values = utils.splitComma(value);

  if (values.length > 1) {
    return arrayToPropertyObject(values.map(function (v) {
      return toPropertyObject(v);
    }), ",");
  }

  values = utils.splitSpace(value);

  if (values.length > 1) {
    return arrayToPropertyObject(values.map(function (v) {
      return toPropertyObject(v);
    }), " ");
  }

  values = /^(['"])([^'"]*)(['"])$/g.exec(value);

  if (values && values[1] === values[3]) {
    // Quotes
    return new PropertyObject([toPropertyObject(values[2])], {
      prefix: values[1],
      suffix: values[1]
    });
  } else if (value.indexOf("(") !== -1) {
    // color
    return stringToBracketObject(value);
  } else if (value.charAt(0) === "#") {
    return stringToColorObject(value);
  }

  return value;
}
function toObject(object, result) {
  if (result === void 0) {
    result = {};
  }

  var model = object.getOption("model");

  if (model) {
    object.setOptions({
      model: "",
      suffix: "",
      prefix: ""
    });
    var value = object.size() > 1 ? object : object.get(0);
    result[model] = value;
  } else {
    object.forEach(function (obj) {
      return toObject(obj, result);
    });
  }

  return result;
}

function toInnerProperties(obj) {
  if (!obj) {
    return "";
  }

  var arrObj = [];

  for (var name in obj) {
    arrObj.push(name.replace(/\d/g, "") + "(" + obj[name] + ")");
  }

  return arrObj.join(" ");
}
/* eslint-disable */


function clone(target, toValue) {
  if (toValue === void 0) {
    toValue = false;
  }

  return merge({}, target, toValue);
}

function merge(to, from, toValue) {
  if (toValue === void 0) {
    toValue = false;
  }

  for (var name in from) {
    var value = from[name];
    var type = getType(value);

    if (type === utils.PROPERTY) {
      to[name] = toValue ? value.toValue() : value.clone();
    } else if (type === utils.FUNCTION) {
      to[name] = toValue ? getValue([name], value()) : value;
    } else if (type === utils.ARRAY) {
      to[name] = value.slice();
    } else if (type === utils.OBJECT) {
      if (utils.isObject(to[name]) && !isPropertyObject(to[name])) {
        merge(to[name], value, toValue);
      } else {
        to[name] = clone(value, toValue);
      }
    } else {
      to[name] = from[name];
    }
  }

  return to;
}
/* eslint-enable */


function getPropertyName(args) {
  return args[0] in ALIAS ? ALIAS[args[0]] : args;
}

function getValue(names, value) {
  var type = getType(value);

  if (type === utils.PROPERTY) {
    return value.toValue();
  } else if (type === utils.FUNCTION) {
    if (names[0] !== TIMING_FUNCTION) {
      return getValue(names, value());
    }
  } else if (type === utils.OBJECT) {
    return clone(value, true);
  }

  return value;
}
/**
* Animation's Frame
*/


var Frame =
/*#__PURE__*/
function () {
  /**
   * @param - properties
   * @example
  const frame = new Scene.Frame({
    display: "none"
    transform: {
        translate: "50px",
        scale: "5, 5",
    }
  });
   */
  function Frame(properties) {
    if (properties === void 0) {
      properties = {};
    }

    this.properties = {};
    this.set(properties);
  }
  /**
    * get property value
    * @param {...Number|String|PropertyObject} args - property name or value
    * @example
    frame.get("display") // => "none", "block", ....
    frame.get("transform", "translate") // => "10px,10px"
    */


  var __proto = Frame.prototype;

  __proto.get = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var value = this.raw.apply(this, args);
    return getValue(getPropertyName(args), value);
  };

  __proto.raw = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var properties = this.properties;
    var params = getPropertyName(args);
    var length = params.length;

    for (var i = 0; i < length; ++i) {
      if (!utils.isObject(properties)) {
        return undefined;
      }

      properties = properties[params[i]];
    }

    return properties;
  };
  /**
    * remove property value
    * @param {...String} args - property name
    * @return {Frame} An instance itself
    * @example
    frame.remove("display")
    */


  __proto.remove = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var properties = this.properties;
    var params = getPropertyName(args);
    var length = params.length;

    if (!length) {
      return this;
    }

    for (var i = 0; i < length - 1; ++i) {
      if (!utils.isObject(properties)) {
        return this;
      }

      properties = properties[params[i]];
    }

    delete properties[params[length - 1]];
    return this;
  };
  /**
    * set property
    * @param {...Number|String|PropertyObject} args - property names or values
    * @return {Frame} An instance itself
    * @example
  // one parameter
  frame.set({
    display: "none",
    transform: {
        translate: "10px, 10px",
        scale: "1",
    },
    filter: {
        brightness: "50%",
        grayscale: "100%"
    }
  });
   // two parameters
  frame.set("transform", {
    translate: "10px, 10px",
    scale: "1",
  });
   // three parameters
  frame.set("transform", "translate", "50px");
  */


  __proto.set = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var length = args.length;
    var params = args.slice(0, -1);
    var value = args[length - 1];

    if (params[0] in ALIAS) {
      this._set(ALIAS[params[0]], value);
    } else if (length === 2 && utils.isArray(params[0])) {
      this._set(params[0], value);
    } else if (utils.isObject(value)) {
      if (utils.isArray(value)) {
        this._set(params, value);
      } else if (isPropertyObject(value)) {
        if (isRole(params)) {
          this.set.apply(this, params.concat([toObject(value)]));
        } else {
          this._set(params, value);
        }
      } else if (value instanceof Frame) {
        this.merge(value);
      } else {
        for (var name in value) {
          this.set.apply(this, params.concat([name, value[name]]));
        }
      }
    } else if (utils.isString(value)) {
      if (isRole(params)) {
        var obj = toPropertyObject(value);

        if (utils.isObject(obj)) {
          this.set.apply(this, params.concat([obj]));
        }

        return this;
      } else {
        var _a = splitStyle(value),
            styles = _a.styles,
            stylesLength = _a.length;

        for (var name in styles) {
          this.set.apply(this, params.concat([name, styles[name]]));
        }

        if (stylesLength) {
          return this;
        }
      }

      this._set(params, value);
    } else {
      this._set(params, value);
    }

    return this;
  };
  /**
    * check that has property.
    * @param {...String} args - property name
    * @example
    frame.has("property", "display") // => true or false
    */


  __proto.has = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var properties = this.properties;
    var params = getPropertyName(args);
    var length = params.length;

    if (!length) {
      return false;
    }

    for (var i = 0; i < length; ++i) {
      if (!utils.isObject(properties) || !(params[i] in properties)) {
        return false;
      }

      properties = properties[params[i]];
    }

    return true;
  };
  /**
    * clone frame.
    * @return {Frame} An instance of clone
    * @example
    frame.clone();
    */


  __proto.clone = function () {
    var frame = new Frame();
    return frame.merge(this);
  };
  /**
    * merge one frame to other frame.
    * @param - target frame.
    * @return {Frame} An instance itself
    * @example
    frame.merge(frame2);
    */


  __proto.merge = function (frame) {
    var properties = this.properties;
    var frameProperties = frame.properties;

    if (!frameProperties) {
      return this;
    }

    merge(properties, frameProperties);
    return this;
  };

  __proto.toObject = function () {
    return clone(this.properties, true);
  };
  /**
    * Specifies an css object that coverted the frame.
    * @return {object} cssObject
    */


  __proto.toCSSObject = function () {
    var properties = this.toObject();
    var cssObject = {};

    for (var name in properties) {
      if (isRole([name], true)) {
        continue;
      }

      var value = properties[name];

      if (name === TIMING_FUNCTION) {
        cssObject[TIMING_FUNCTION.replace("animation", utils.ANIMATION)] = (utils.isString(value) ? value : value.easingName) || "initial";
        continue;
      }

      cssObject[name] = value;
    }

    var transform = toInnerProperties(properties.transform);
    var filter = toInnerProperties(properties.filter);
    utils.TRANSFORM && transform && (cssObject[utils.TRANSFORM] = transform);
    utils.FILTER && filter && (cssObject[utils.FILTER] = filter);
    return cssObject;
  };
  /**
    * Specifies an css text that coverted the frame.
    * @return {string} cssText
    */


  __proto.toCSS = function () {
    var cssObject = this.toCSSObject();
    var cssArray = [];

    for (var name in cssObject) {
      cssArray.push(name + ":" + cssObject[name] + ";");
    }

    return cssArray.join("");
  };

  __proto._set = function (args, value) {
    var properties = this.properties;
    var length = args.length;

    for (var i = 0; i < length - 1; ++i) {
      var name = args[i];
      !(name in properties) && (properties[name] = {});
      properties = properties[name];
    }

    if (!length) {
      return;
    }

    properties[args[length - 1]] = utils.isString(value) ? toPropertyObject(value) : value;
  };

  return Frame;
}();

function getNames(names, stack) {
  var arr = [];

  for (var name in names) {
    stack.push(name);

    if (utils.isObject(names[name])) {
      arr = arr.concat(getNames(names[name], stack));
    } else {
      arr.push(stack.slice());
    }

    stack.pop();
  }

  return arr;
}

function updateFrame(names, properties) {
  for (var name in properties) {
    var value = properties[name];

    if (!utils.isObject(value) || utils.isArray(value) || value instanceof PropertyObject) {
      names[name] = true;
      continue;
    }

    if (!utils.isObject(names[name])) {
      names[name] = {};
    }

    updateFrame(names[name], properties[name]);
  }
}
/**
* a list of objects in chronological order.
*/


var Keyframes =
/*#__PURE__*/
function () {
  /**
     */
  function Keyframes() {
    this.times = [];
    this.items = {};
    this.names = {};
  }
  /**
    * A list of names
    * @return {} names
    * @example
  keyframes.getNames(); // [["a"], ["transform", "translate"], ["transform", "scale"]]
    */


  var __proto = Keyframes.prototype;

  __proto.getNames = function () {
    var names = this.names;
    return getNames(names, []);
  };
  /**
    * Check if keyframes has propery's name
    * @param - property's time
    * @return {boolean} true: if has property, false: not
    * @example
  keyframes.hasName("transform", "translate"); // true or not
    */


  __proto.hasName = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    return isInProperties(this.names, args, true);
  };
  /**
     * update property names used in frames.
     * @return {Keyframes} An instance itself
     */


  __proto.update = function () {
    var items = this.items;

    for (var time in items) {
      this.updateFrame(items[time]);
    }

    return this;
  };
  /**
     * executes a provided function once for each scene item.
     * @param - Function to execute for each element, taking three arguments
     * @return {Keyframes} An instance itself
     */


  __proto.forEach = function (callback) {
    var times = this.times;
    var items = this.items;
    times.forEach(function (time) {
      callback(items[time], time, items);
    });
    return this;
  };
  /**
    * update property names used in frame.
    * @param {Frame} [frame] - frame of that time.
    * @return {Keyframes} An instance itself
    * @example
  keyframes.updateFrame(frame);
    */


  __proto.updateFrame = function (frame) {
    if (!frame) {
      return this;
    }

    var properties = frame.properties;
    var names = this.names;
    updateFrame(names, properties);
    return this;
  };
  /**
     * Get how long an animation should take to complete one cycle.
     * @return {number} duration
     */


  __proto.getDuration = function () {
    var times = this.times;
    return times.length === 0 ? 0 : times[times.length - 1];
  };
  /**
     * Set how long an animation should take to complete one cycle.
     * @param {number} duration - duration
     * @return {Keyframes} An instance itself.
     */


  __proto.setDuration = function (duration, originalDuration) {
    if (originalDuration === void 0) {
      originalDuration = this.getDuration();
    }

    var ratio = duration / originalDuration;

    var _a = this,
        times = _a.times,
        items = _a.items;

    var obj = {};
    this.times = times.map(function (time) {
      var time2 = toFixed(time * ratio);
      obj[time2] = items[time];
      return time2;
    });
    this.items = obj;
  };
  /**
     * Set how much time you want to push ahead.
     * @param {number} time - time
     * @return {Keyframes} An instance itself.
     */


  __proto.unshift = function (time) {
    var _a = this,
        times = _a.times,
        items = _a.items;

    var obj = {};
    this.times = times.map(function (t) {
      var time2 = toFixed(time + t);
      obj[time2] = items[t];
      return time2;
    });
    this.items = obj;
    return this;
  };
  /**
    * get size of list
    * @return {Number} length of list
    */


  __proto.size = function () {
    return this.times.length;
  };
  /**
    * add object in list
    * @param {number} time - frame's time
    * @param {any} object - target
    * @return {Keyframes} An instance itself
    */


  __proto.add = function (time, object) {
    this.items[time] = object;
    this.addTime(time);
    return this;
  };
  /**
    * Check if keyframes has object at that time.
    * @param {number} time - object's time
    * @return {boolean} true: if has time, false: not
    */


  __proto.has = function (time) {
    return time in this.items;
  };
  /**
    * get object at that time.
    * @param {number} time - object's time
    * @return {object} object at that time
    */


  __proto.get = function (time) {
    return this.items[time];
  };
  /**
    * remove object at that time.
    * @param {number} time - object's time
    * @return {Keyframes} An instance itself
    */


  __proto.remove = function (time) {
    var items = this.items;
    delete items[time];
    this.removeTime(time);
    return this;
  };

  __proto.addTime = function (time) {
    var times = this.times;
    var length = times.length;
    var pushIndex = length;

    for (var i = 0; i < length; ++i) {
      // if time is smaller than times[i], add time to index
      if (time === times[i]) {
        return this;
      } else if (time < times[i]) {
        pushIndex = i;
        break;
      }
    }

    this.times.splice(pushIndex, 0, time);
    return this;
  };

  __proto.removeTime = function (time) {
    var index = this.times.indexOf(time);

    if (index > -1) {
      this.times.splice(index, 1);
    }

    return this;
  };

  return Keyframes;
}();

/**
* @namespace
* @name Dot
*/
/**
* The dot product of Arrays
* @memberof Dot
* @function dotArray
* @param {Array} a1 value1
* @param {Array} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {Array|Object} Array.
* @example
dotArray([0, 0, 0, 1],[50, 50, 50, 1],0.5, 0.5);
// => [25, 25, 25, 1]
*/

function dotArray(a1, a2, b1, b2) {
  if (b2 === 0) {
    return a2;
  }

  if (!utils.isArray(a2)) {
    return a1;
  }

  var length = a2.length;
  return a1.map(function (v1, i) {
    if (i >= length) {
      return v1;
    } else {
      return dot(v1, a2[i], b1, b2);
    }
  });
}
/**
* The dot product of PropertyObject(type=color)
* If the values are not RGBA model, change them RGBA mdoel.
* @memberof Dot
* @function dotColor
* @param {PropertyObject} a1 value1
* @param {PropertyObject} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {PropertyObject} PropertyObject(type=color).
* @example
var colorObject = ......; //PropertyObject(type=color, model="rgba", value=[254, 254, 254, 1]);
dotColor("#000",  colorObject, 0.5, 0.5);
// "#000" => PropertyObject(type=color, model="rgba", value=[0, 0, 0, 1]);
// return => PropertyObject(type=color, model="rgba", value=[127, 127, 127, 1]);
*/

function dotColor(color1, color2, b1, b2) {
  if (b2 === 0) {
    return color2;
  } // convert array to PropertyObject(type=color)


  var value1 = color1.value;
  var value2 = color2.value; // If the model name is not same, the inner product is impossible.

  var model1 = color1.getOption("model");
  var model2 = color2.getOption("model");

  if (model1 !== model2) {
    // It is recognized as a string.
    return dot(color1.toValue(), color2.toValue(), b1, b2);
  }

  if (value1.length === 3) {
    value1[3] = 1;
  }

  if (value2.length === 3) {
    value2[3] = 1;
  }

  var v = dotArray(value1, value2, b1, b2);
  var colorModel = model1;

  for (var i = 0; i < 3; ++i) {
    v[i] = parseInt(v[i], 10);
  }

  var object = new PropertyObject(v, {
    type: "color",
    model: colorModel,
    prefix: colorModel + "(",
    suffix: ")"
  });
  return object;
}
/**
* The dot product of Objects
* @memberof Dot
* @function dotObject
* @param {PropertyObject} a1 value1
* @param {PropertyObject} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {PropertyObject} Array with Separator.
* @example
dotObject(PropertyObject(["1px", "solid", rgba(0, 0, 0, 1)]),
PropertyObject(["9px", "solid", rgba(50, 50, 50, 1)]),
0.5, 0.5);
// => PropertyObject(["5px", "solid", rgba(25, 25, 25, 1)])
*/

function dotObject(a1, a2, b1, b2) {
  var a1Type = a1.getOption("type");

  if (a1Type === "color") {
    return dotColor(a1, a2, b1, b2);
  }

  var value1 = a1.value;
  var value2 = a2.value;
  var arr = dotArray(value1, value2, b1, b2);
  return new PropertyObject(arr, {
    type: a1Type,
    separator: a1.getOption("separator") || a2.getOption("separator"),
    prefix: a1.getOption("prefix") || a2.getOption("prefix"),
    suffix: a1.getOption("suffix") || a2.getOption("suffix"),
    model: a1.getOption("model") || a2.getOption("model")
  });
}
/**
* The dot product of a1 and a2 for the b1 and b2.
* @memberof Dot
* @function dot
* @param {String|Number|PropertyObject} a1 value1
* @param {String|Number|PropertyObject} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {String} Not Array, Not Separator, Only Number & Unit
* @return {PropertyObject} Array with Separator.
* @example
dot(1, 3, 0.3, 0.7);
// => 1.6
*/

function dot(a1, a2, b1, b2) {
  if (b2 === 0) {
    return a2;
  } else if (b1 === 0 || b1 + b2 === 0) {
    // prevent division by zero.
    return a1;
  } // dot Object


  var type1 = getType(a1);
  var type2 = getType(a2);
  var isFunction1 = type1 === utils.FUNCTION;
  var isFunction2 = type2 === utils.FUNCTION;

  if (isFunction1 || isFunction2) {
    return function () {
      return dot(isFunction1 ? toPropertyObject(a1()) : a1, isFunction2 ? toPropertyObject(a2()) : a2, b1, b2);
    };
  } else if (type1 === type2) {
    if (type1 === utils.PROPERTY) {
      return dotObject(a1, a2, b1, b2);
    } else if (type1 === "array") {
      return dotArray(a1, a2, b1, b2);
    } else if (type1 !== "value") {
      return a1;
    }
  } else {
    return a1;
  } // split number and unit of the value.


  var r1 = b1 / (b1 + b2);
  var r2 = 1 - r1;
  var v1 = utils.splitUnit("" + a1);
  var v2 = utils.splitUnit("" + a2);
  var v; // 숫자가 아닐경우 첫번째 값을 반환 b2가 0일경우 두번째 값을 반환

  if (isNaN(v1.value) || isNaN(v2.value)) {
    return a1;
  } else {
    v = v1.value * r2 + v2.value * r1;
  }

  var prefix = v1.prefix || v2.prefix;
  var unit = v1.unit || v2.unit;

  if (!prefix && !unit) {
    return v;
  }

  return prefix + v + unit;
}
function dotValue(time, prevTime, nextTime, prevValue, nextValue, easing) {
  if (time === prevTime) {
    return prevValue;
  } else if (time === nextTime) {
    return nextValue;
  } else if (!easing) {
    return dot(prevValue, nextValue, time - prevTime, nextTime - time);
  }

  var ratio = easing((time - prevTime) / (nextTime - prevTime));
  var value = dot(prevValue, nextValue, ratio, 1 - ratio);
  return value;
}

function makeAnimationProperties(properties) {
  var cssArray = [];

  for (var name in properties) {
    cssArray.push(utils.ANIMATION + "-" + utils.decamelize(name) + " : " + properties[name] + ";");
  }

  return cssArray.join("");
}
/**
* manage Frame Keyframes and play keyframes.
* @extends Animator
* @example
const item = new SceneItem({
    0: {
        display: "none",
    },
    1: {
        display: "block",
        opacity: 0,
    },
    2: {
        opacity: 1,
    }
});
*/


var SceneItem =
/*#__PURE__*/
function (_super) {
  __extends(SceneItem, _super);
  /**
    * @param - properties
    * @param - options
    * @example
    const item = new SceneItem({
        0: {
            display: "none",
        },
        1: {
            display: "block",
            opacity: 0,
        },
        2: {
            opacity: 1,
        }
    });
     */


  function SceneItem(properties, options) {
    var _this = _super.call(this) || this;

    _this.keyframes = new Keyframes();
    _this.elements = [];

    _this.load(properties, options);

    return _this;
  }

  var __proto = SceneItem.prototype;

  __proto.getDuration = function () {
    return Math.max(this.state[DURATION], this.keyframes.getDuration());
  };

  __proto.setDuration = function (duration) {
    if (duration === 0) {
      return this;
    }

    var originalDuration = this.getDuration();

    if (originalDuration > 0) {
      this.keyframes.setDuration(duration, originalDuration);
    }

    _super.prototype.setDuration.call(this, toFixed(duration));

    return this;
  };
  /**
    * set the unique indicator of the item.
    * @param {String} [id] - the indicator of the item.
    * @return {SceneItem} An instance itself
    * @example
  const item = new SceneItem();
   item.setId("item");
  console.log(item.getId()); // item
    */


  __proto.setId = function (id) {
    var elements = this.elements;
    var length = elements.length;
    this.setState({
      id: id || makeId(!!length)
    });
    var sceneId = toId(this.getId());
    this.state.selector || (this.state.selector = "[data-scene-id=\"" + sceneId + "\"]");

    if (!length) {
      return this;
    }

    for (var i = 0; i < length; ++i) {
      elements[i].setAttribute("data-scene-id", sceneId);
    }

    return this;
  };
  /**
    * Specifies the unique indicator of the item.
    * @return {String} the indicator of the item.
    * @example
  const item = scene.newItem("item");
  console.log(item.getId()); // item
    */


  __proto.getId = function () {
    return this.state.id;
  };
  /**
    * Set properties to the sceneItem at that time
    * @param {Number} time - time
    * @param {...String|Object} [properties] - property names or values
    * @return {SceneItem} An instance itself
    * @example
  item.set(0, "a", "b") // item.getFrame(0).set("a", "b")
  console.log(item.get(0, "a")); // "b"
    */


  __proto.set = function (time) {
    var _this = this;

    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    if (utils.isObject(time)) {
      this.load(time);
      return this;
    } else if (args[0]) {
      if (args[0] instanceof SceneItem) {
        var item = args[0];
        var delay = item.getDelay();
        var realTime_1 = this.getUnitTime(time) + delay;

        var _a = item.getAllTimes(!!delay || !this.hasFrame(time)),
            keys = _a.keys,
            values_1 = _a.values,
            frames_1 = _a.frames;

        var easing = this.getEasingName() !== item.getEasingName() ? item.getEasing() : 0;
        keys.forEach(function (t) {
          _this.set(realTime_1 + t, frames_1[values_1[t]]);
        });

        if (easing) {
          this.set(realTime_1 + keys[0], EASING, easing);
          this.set(realTime_1 + keys[keys.length - 1], EASING, "initial");
        }

        return this;
      } else if (args.length === 1 && utils.isArray(args[0])) {
        args[0].forEach(function (item) {
          _this.set(time, item);
        });
        return this;
      }
    }

    var frame = this.newFrame(time);
    frame.set.apply(frame, args);
    this.updateFrame(frame);
    return this;
  };
  /**
    * Get properties of the sceneItem at that time
    * @param {Number} time - time
    * @param {...String|Object} args property's name or properties
    * @return {Number|String|PropertyObejct} property value
    * @example
  item.get(0, "a"); // item.getFrame(0).get("a");
  item.get(0, "transform", "translate"); // item.getFrame(0).get("transform", "translate");
    */


  __proto.get = function (time) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    var frame = this.getFrame(time);
    return frame && frame.get.apply(frame, args);
  };
  /**
    * remove properties to the sceneItem at that time
    * @param {Number} time - time
    * @param {...String|Object} [properties] - property names or values
    * @return {SceneItem} An instance itself
    * @example
  item.remove(0, "a");
    */


  __proto.remove = function (time) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    var frame = this.getFrame(time);
    frame && frame.remove.apply(frame, args);
    this.update();
    return this;
  };
  /**
    * Append the item or object at the last time.
    * @param - the scene item or item object
    * @return An instance itself
    * @example
  item.append(new SceneItem({
    0: {
        opacity: 0,
    },
    1: {
        opacity: 1,
    }
  }));
  item.append({
    0: {
        opacity: 0,
    },
    1: {
        opacity: 1,
    }
  });
  item.set(item.getDuration(), {
    0: {
        opacity: 0,
    },
    1: {
        opacity: 1,
    }
  });
    */


  __proto.append = function (item) {
    this.set(this.getDuration(), item);
    return this;
  };
  /**
    * Push the front frames for the time and prepend the scene item or item object.
    * @param - the scene item or item object
    * @return An instance itself
    */


  __proto.prepend = function (item) {
    if (item instanceof SceneItem) {
      var delay = item.getDelay();
      var duration = item.getIterationCount() === INFINITE ? item.getDuration() : item.getActiveDuration();
      var unshiftTime = duration + delay;
      var firstFrame = this.keyframes.get(0);

      if (firstFrame) {
        this.keyframes.remove(0);
      }

      this.keyframes.unshift(unshiftTime);
      this.set(0, item);
      this.set(unshiftTime + THRESHOLD, firstFrame);
    } else {
      this.prepend(new SceneItem(item));
    }

    return this;
  };
  /**
    * Specifies an element to synchronize items' keyframes.
    * @param {string} selectors - Selectors to find elements in items.
    * @return {SceneItem} An instance itself
    * @example
  item.setSelector("#id.class");
    */


  __proto.setSelector = function (selector) {
    var state = this.state;
    state.selector = selector === true ? state.id : selector || "[data-scene-id=\"" + state.id + "\"]";
    var matches = /([\s\S]+)(:+[a-zA-Z]+)$/g.exec(state.selector);

    if (matches) {
      state.selector = matches[1];
      state.peusdo = matches[2];
    }

    utils.IS_WINDOW && this.setElement(document.querySelectorAll(state.selector));
    return this;
  };
  /**
    * Specifies an element to synchronize item's keyframes.
    * @param {Element|Array|string} elements - elements to synchronize item's keyframes.
    * @return {SceneItem} An instance itself
    * @example
  item.setElement(document.querySelector("#id.class"));
  item.setElement(document.querySelectorAll(".class"));
    */


  __proto.setElement = function (elements) {
    if (!elements) {
      return this;
    }

    this.elements = elements instanceof Element ? [elements] : elements;
    this.setId(this.getId());
    return this;
  };
  /**
    * add css styles of items's element to the frame at that time.
    * @param {Array} properties - elements to synchronize item's keyframes.
    * @return {SceneItem} An instance itself
    * @example
  item.setElement(document.querySelector("#id.class"));
  item.setCSS(0, ["opacity"]);
  item.setCSS(0, ["opacity", "width", "height"]);
    */


  __proto.setCSS = function (time, properties) {
    this.set(time, utils.fromCSS(this.elements, properties));
    return this;
  };

  __proto.animate = function (time, parentEasing) {
    _super.prototype.setTime.call(this, time, true);

    return this._animate(parentEasing);
  };

  __proto.setTime = function (time, isNumber, parentEasing) {
    _super.prototype.setTime.call(this, time, isNumber);

    this._animate(parentEasing);

    return this;
  };
  /**
    * update property names used in frames.
    * @return {SceneItem} An instance itself
    * @example
  item.update();
    */


  __proto.update = function () {
    this.keyframes.update();
    return this;
  };
  /**
    * update property names used in frame.
    * @param {Frame} [frame] - frame of that time.
    * @return {SceneItem} An instance itself
    * @example
  item.updateFrame(time, this.get(time));
    */


  __proto.updateFrame = function (frame) {
    this.keyframes.updateFrame(frame);
    return this;
  };
  /**
    * Create and add a frame to the sceneItem at that time
    * @param {Number} time - frame's time
    * @return {Frame} Created frame.
    * @example
  item.newFrame(time);
    */


  __proto.newFrame = function (time) {
    var frame = this.getFrame(time);

    if (frame) {
      return frame;
    }

    frame = new Frame();
    this.setFrame(time, frame);
    return frame;
  };
  /**
    * Add a frame to the sceneItem at that time
    * @param {Number} time - frame's time
    * @return {SceneItem} An instance itself
    * @example
  item.setFrame(time, frame);
    */


  __proto.setFrame = function (time, frame) {
    this.keyframes.add(this.getUnitTime(time), frame);
    this.keyframes.update();
    return this;
  };
  /**
    * get sceneItem's frame at that time
    * @param {Number} time - frame's time
    * @return {Frame} sceneItem's frame at that time
    * @example
  const frame = item.getFrame(time);
    */


  __proto.getFrame = function (time) {
    return this.keyframes.get(this.getUnitTime(time));
  };
  /**
    * check if the item has a frame at that time
    * @param {Number} time - frame's time
    * @return {Boolean} true: the item has a frame // false: not
    * @example
  if (item.hasFrame(10)) {
    // has
  } else {
    // not
  }
    */


  __proto.hasFrame = function (time) {
    return this.keyframes.has(this.getUnitTime(time));
  };
  /**
    * remove sceneItem's frame at that time
    * @param {Number} time - frame's time
    * @return {SceneItem} An instance itself
    * @example
  item.removeFrame(time);
    */


  __proto.removeFrame = function (time) {
    var keyframes = this.keyframes;
    keyframes.remove(time);
    keyframes.update();
    return this;
  };
  /**
    * Copy frame of the previous time at the next time.
    * @param {number|string|object} fromTime - the previous time
    * @param {number} toTime - the next time
    * @return {SceneItem} An instance itself
    * @example
  // getFrame(0) equal getFrame(1)
  item.copyFrame(0, 1);
    */


  __proto.copyFrame = function (fromTime, toTime) {
    if (utils.isObject(fromTime)) {
      for (var time in fromTime) {
        this.copyFrame(time, fromTime[time]);
      }

      return this;
    }

    var frame = this.getFrame(fromTime);

    if (!frame) {
      return this;
    }

    var copyFrame = frame.clone();
    this.setFrame(toTime, copyFrame);
    return this;
  };
  /**
    * merge frame of the previous time at the next time.
    * @param {number|string|object} fromTime - the previous time
    * @param {number|string} toTime - the next time
    * @return {SceneItem} An instance itself
    * @example
  // getFrame(1) contains getFrame(0)
  item.merge(0, 1);
    */


  __proto.mergeFrame = function (fromTime, toTime) {
    if (utils.isObject(fromTime)) {
      for (var time in fromTime) {
        this.mergeFrame(time, fromTime[time]);
      }

      return this;
    }

    var frame = this.getFrame(fromTime);

    if (!frame) {
      return this;
    }

    var toFrame = this.newFrame(toTime);
    toFrame.merge(frame);
    return this;
  };
  /**
    * Get frame of the current time
    * @param {Number} time - the current time
    * @param {function} easing - the speed curve of an animation
    * @return {Frame} frame of the current time
    * @example
  let item = new SceneItem({
    0: {
        display: "none",
    },
    1: {
        display: "block",
        opacity: 0,
    },
    2: {
        opacity: 1,
    }
  });
  // opacity: 0.7; display:"block";
  const frame = item.getNowFrame(1.7);
    */


  __proto.getNowFrame = function (time, easing) {
    var _this = this;

    var frame = new Frame();
    var names = this.keyframes.getNames();

    var _a = this._getNearTimeIndex(time),
        left = _a.left,
        right = _a.right;

    var realEasing = this._getEasing(time, left, right, this.getEasing() || easing);

    names.forEach(function (properties) {
      var value = _this._getNowValue(time, properties, left, right, realEasing);

      if (utils.isUndefined(value)) {
        return;
      }

      frame.set(properties, value);
    });
    return frame;
  };

  __proto.load = function (properties, options) {
    if (properties === void 0) {
      properties = {};
    }

    if (options === void 0) {
      options = properties.options;
    }

    if (utils.isArray(properties)) {
      var length = properties.length;

      for (var i = 0; i < length; ++i) {
        var time = length === 1 ? 0 : this.getUnitTime(i / (length - 1) * 100 + "%");
        this.set(time, properties[i]);
      }
    } else if (properties.keyframes) {
      this.set(properties.keyframes);
    } else {
      for (var time in properties) {
        if (time === "options" || time === "keyframes") {
          continue;
        }

        var value = properties[time];
        var realTime = this.getUnitTime(time);

        if (typeof value === "number") {
          this.mergeFrame(value, realTime);
          continue;
        }

        this.set(realTime, value);
      }
    }

    options && this.setOptions(options);
    return this;
  };
  /**
     * clone SceneItem.
     * @param {StateInterface} [options] animator options
     * @return {SceneItem} An instance of clone
     * @example
     * item.clone();
     */


  __proto.clone = function (options) {
    if (options === void 0) {
      options = {};
    }

    var item = new SceneItem();
    item.setOptions(this.state);
    item.setOptions(options);
    this.keyframes.forEach(function (frame, time) {
      return item.setFrame(time, frame.clone());
    });
    return item;
  };

  __proto.setOptions = function (options) {
    if (options === void 0) {
      options = {};
    }

    _super.prototype.setOptions.call(this, options);

    var id = options.id,
        selector = options.selector,
        duration = options.duration,
        elements = options.elements;
    duration && this.setDuration(duration);
    id && this.setId(id);

    if (elements) {
      this.setElement(elements);
    } else if (selector) {
      this.setSelector(selector === true ? this.state.id : selector);
    }

    return this;
  };

  __proto.getAllTimes = function (isStartZero, options) {
    if (isStartZero === void 0) {
      isStartZero = true;
    }

    if (options === void 0) {
      options = {};
    }

    var times = this.keyframes.times.slice();
    var length = times.length;
    var keys = [];
    var values = {};

    if (!length) {
      return {
        keys: [],
        values: {},
        frames: {}
      };
    }

    var frames = {};
    var duration = this.getDuration();
    var direction = options[DIRECTION] || this.state[DIRECTION];
    var isShuffle = direction === ALTERNATE || direction === ALTERNATE_REVERSE;
    !this.getFrame(0) && times.unshift(0);
    !this.getFrame(duration) && times.push(duration);
    length = times.length;
    var iterationCount = options[ITERATION_COUNT] || this.state[ITERATION_COUNT];
    iterationCount = iterationCount !== INFINITE ? iterationCount : 1;
    var totalDuration = iterationCount * duration;

    for (var i = 0; i < iterationCount; ++i) {
      var isReverse = isDirectionReverse(i, iterationCount, direction);
      var start = i * duration;

      for (var j = 0; j < length; ++j) {
        if (isShuffle && i !== 0 && j === 0) {
          // pass duplicate
          continue;
        } // isStartZero is keytimes[0] is 0 (i === 0 & j === 0)


        var threshold = j === 0 && (i === 0 ? !isStartZero : !isShuffle) ? THRESHOLD : 0;
        var keyvalue = toFixed(isReverse ? times[length - 1 - j] : times[j]);
        var time = toFixed(isReverse ? duration - keyvalue : keyvalue);
        var keytime = toFixed(start + time + threshold);

        if (totalDuration < keytime) {
          break;
        }

        keys.push(keytime);
        values[keytime] = keyvalue;

        if (!frames[keyvalue]) {
          var frame = this.getFrame(keyvalue);

          if (!frame || j === 0 || j === length - 1) {
            frames[keyvalue] = this.getNowFrame(keyvalue);
          } else {
            frames[keyvalue] = frame.clone();
            var isTransform = frame.has("transform");
            var isFilter = frame.has("filter");

            if (isTransform || isFilter) {
              var nowFrame = this.getNowFrame(keyvalue);
              isTransform && frames[keyvalue].remove("transform").set("transform", nowFrame.raw("transform"));
              isFilter && frames[keyvalue].remove("filter").set("filter", nowFrame.raw("filter"));
            }
          }
        }
      }
    }

    if (keys[keys.length - 1] < totalDuration) {
      // last time === totalDuration
      var isReverse = isDirectionReverse(iterationCount, iterationCount, direction);
      var keyvalue = toFixed(duration * (isReverse ? 1 - iterationCount % 1 : iterationCount % 1));
      keys.push(totalDuration);
      values[totalDuration] = keyvalue;
      !frames[keyvalue] && (frames[keyvalue] = this.getNowFrame(keyvalue));
    }

    return {
      keys: keys,
      values: values,
      frames: frames
    };
  };
  /**
    * Specifies an css text that coverted the keyframes of the item.
    * @param {Array} [duration=this.getDuration()] - elements to synchronize item's keyframes.
    * @param {Array} [options={}] - parent options to unify options of items.
    * @example
  item.setCSS(0, ["opacity"]);
  item.setCSS(0, ["opacity", "width", "height"]);
    */


  __proto.toCSS = function (parentDuration, options) {
    if (parentDuration === void 0) {
      parentDuration = this.getDuration();
    }

    if (options === void 0) {
      options = {};
    }

    var state = this.state;
    var selector = state.selector || this.options.selector;

    if (!selector) {
      return "";
    }

    var peusdo = state.peusdo || "";
    var id = getRealId(this); // infinity or zero

    var isInfinite = state[ITERATION_COUNT] === "infinite";
    var isParent = !utils.isUndefined(options[ITERATION_COUNT]);
    var isZeroDuration = parentDuration === 0;
    var duration = isZeroDuration ? this.getDuration() : parentDuration;
    var playSpeed = options[PLAY_SPEED] || 1;
    var delay = ((options[DELAY] || 0) + (isZeroDuration ? state[DELAY] : 0)) / playSpeed;
    var easingName = state[EASING] && state[EASING_NAME] || isParent && options[EASING] && options[EASING_NAME] || state[EASING_NAME];
    var iterationCount = isInfinite ? "infinite" : !isZeroDuration && options[ITERATION_COUNT] || state[ITERATION_COUNT];
    var fillMode = options[FILL_MODE] !== "forwards" && options[FILL_MODE] || state[FILL_MODE];
    var direction = isInfinite ? state[DIRECTION] : options[DIRECTION] || state[DIRECTION];
    var cssText = makeAnimationProperties({
      fillMode: fillMode,
      direction: direction,
      iterationCount: iterationCount,
      delay: delay + "s",
      name: PREFIX + "KEYFRAMES_" + toId(id),
      duration: duration / playSpeed + "s",
      timingFunction: easingName
    });

    var css = selector + "." + START_ANIMATION + peusdo + " {\n\t\t\t" + cssText + "\n\t\t}" + selector + "." + PAUSE_ANIMATION + peusdo + " {\n      " + utils.ANIMATION + "-play-state: paused;\n    }\n\t\t" + this._toKeyframes(duration, !isZeroDuration && isParent);

    return css;
  };

  __proto.exportCSS = function (duration, options) {
    if (!this.elements.length) {
      return "";
    }

    var css = this.toCSS(duration, options);
    var isParent = options && !utils.isUndefined(options[ITERATION_COUNT]);
    !isParent && exportCSS(getRealId(this), css);
    return css;
  };

  __proto.pause = function () {
    _super.prototype.pause.call(this);

    this.isPausedCSS() && this.pauseCSS();
    return this;
  };

  __proto.isPausedCSS = function () {
    return this.state.playCSS && this.isPaused();
  };

  __proto.pauseCSS = function () {
    var elements = this.elements;
    var length = elements.length;

    if (!length) {
      return this;
    }

    for (var i = 0; i < length; ++i) {
      utils.addClass(elements[i], PAUSE_ANIMATION);
    }
  };

  __proto.endCSS = function () {
    var elements = this.elements;
    var length = elements.length;

    if (!length) {
      return this;
    }

    for (var i = 0; i < length; ++i) {
      var element = elements[i];
      utils.removeClass(element, PAUSE_ANIMATION);
      utils.removeClass(element, START_ANIMATION);
    }

    this.setState({
      playCSS: false
    });
  };

  __proto.end = function () {
    !this.isEnded() && this.state.playCSS && this.endCSS();

    _super.prototype.end.call(this);

    return this;
  };
  /**
    * Play using the css animation and keyframes.
    * @param {boolean} [exportCSS=true] Check if you want to export css.
    * @param {Object} [properties={}] The shorthand properties for six of the animation properties.
    * @param {Object} [properties.duration] The duration property defines how long an animation should take to complete one cycle.
    * @param {Object} [properties.fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
    * @param {Object} [properties.iterationCount] The iterationCount property specifies the number of times an animation should be played.
    * @param {String} [properties.easing] The easing(timing-function) specifies the speed curve of an animation.
    * @param {Object} [properties.delay] The delay property specifies a delay for the start of an animation.
    * @param {Object} [properties.direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
    * @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
    * @example
  item.playCSS();
  item.playCSS(false, {
    direction: "reverse",
    fillMode: "forwards",
  });
    */


  __proto.playCSS = function (isExportCSS, properties) {
    if (isExportCSS === void 0) {
      isExportCSS = true;
    }

    if (properties === void 0) {
      properties = {};
    }

    playCSS(this, isExportCSS, properties);
    return this;
  };

  __proto.addPlayClass = function (isPaused, properties) {
    if (properties === void 0) {
      properties = {};
    }

    var elements = this.elements;
    var length = elements.length;
    var cssText = makeAnimationProperties(properties);

    if (!length) {
      return;
    }

    if (isPaused) {
      for (var i = 0; i < length; ++i) {
        utils.removeClass(elements[i], PAUSE_ANIMATION);
      }
    } else {
      for (var i = 0; i < length; ++i) {
        var element = elements[i];
        element.style.cssText += cssText;

        if (utils.hasClass(element, START_ANIMATION)) {
          utils.removeClass(element, START_ANIMATION);

          (function (el) {
            utils.requestAnimationFrame(function () {
              utils.requestAnimationFrame(function () {
                utils.addClass(el, START_ANIMATION);
              });
            });
          })(element);
        } else {
          utils.addClass(element, START_ANIMATION);
        }
      }
    }

    return elements[0];
  };

  __proto._getEasing = function (time, left, right, easing) {
    if (this.keyframes.hasName(TIMING_FUNCTION)) {
      var nowEasing = this._getNowValue(time, [TIMING_FUNCTION], left, right, 0, true);

      return utils.isFunction(nowEasing) ? nowEasing : easing;
    }

    return easing;
  };

  __proto._toKeyframes = function (duration, isParent) {
    if (duration === void 0) {
      duration = this.getDuration();
    }

    var id = getRealId(this);
    var state = this.state;
    var playSpeed = state[PLAY_SPEED];
    var iterationCount = state[ITERATION_COUNT];
    var fillMode = state[FILL_MODE];
    var delay = isParent ? state[DELAY] : 0;
    var direction = isParent ? state[DIRECTION] : NORMAL;
    var isReverse = direction === REVERSE || direction === ALTERNATE_REVERSE;

    var _a = this.getAllTimes(true, {
      duration: duration,
      delay: delay,
      direction: direction,
      iterationCount: isParent && iterationCount !== INFINITE ? iterationCount : 1,
      isCSS: true
    }),
        keys = _a.keys,
        values = _a.values,
        frames = _a.frames;

    var length = keys.length;
    var css = {};
    var keyframes = [];

    if (!keys.length) {
      return "";
    }

    for (var time in frames) {
      css[time] = frames[time].toCSS();
    }

    var lastTime = keys[length - 1];
    var lastCSS = css[values[lastTime]];

    if (delay) {
      var delayCSS = isReverse && (fillMode === "both" || fillMode === "backwards") ? lastCSS : css[0];
      keyframes.push("0%{}");
      isReverse && keyframes.push(delay / playSpeed / duration * 100 - THRESHOLD + "%{" + delayCSS + "}");
    }

    keys.forEach(function (time) {
      var keyTime = (delay + time) / playSpeed / duration * 100;
      keyframes.push(keyTime + "%{" + (keyTime === 0 ? "" : css[values[time]]) + "}");
    }); // if (afterDelay) {
    //   keyframes.push(`${lastTime / playSpeed / duration * 100 + THRESHOLD}%{${lastCSS}}`);
    //   keyframes.push(`100%{${lastCSS}`);
    // } else {

    if ((delay + lastTime) / playSpeed < duration) {
      // not 100%
      keyframes.push("100%{" + lastCSS + "}");
    } // }


    return "@" + utils.KEYFRAMES + " " + PREFIX + "KEYFRAMES_" + toId(id) + "{\n\t\t\t" + keyframes.join("\n") + "\n\t\t}";
  };

  __proto._getNowValue = function (time, properties, left, right, easing, usePrevValue) {
    if (easing === void 0) {
      easing = this.getEasing();
    }

    if (usePrevValue === void 0) {
      usePrevValue = isFixed(properties);
    }

    var keyframes = this.keyframes;
    var times = keyframes.times;
    var length = times.length;
    var prevTime;
    var nextTime;
    var prevFrame;
    var nextFrame;

    for (var i = left; i >= 0; --i) {
      var frame = keyframes.get(times[i]);

      if (frame.has.apply(frame, properties)) {
        prevTime = times[i];
        prevFrame = frame;
        break;
      }
    }

    var prevValue = prevFrame && prevFrame.raw.apply(prevFrame, properties);

    if (usePrevValue) {
      return prevValue;
    }

    for (var i = right; i < length; ++i) {
      var frame = keyframes.get(times[i]);

      if (frame.has.apply(frame, properties)) {
        nextTime = times[i];
        nextFrame = frame;
        break;
      }
    }

    var nextValue = nextFrame && nextFrame.raw.apply(nextFrame, properties);

    if (!prevFrame || utils.isUndefined(prevValue)) {
      return nextValue;
    }

    if (!nextFrame || utils.isUndefined(nextValue) || prevValue === nextValue) {
      return prevValue;
    }

    if (prevTime < 0) {
      prevTime = 0;
    }

    return dotValue(time, prevTime, nextTime, prevValue, nextValue, easing);
  };

  __proto._getNearTimeIndex = function (time) {
    var keyframes = this.keyframes;
    var times = keyframes.times;
    var length = times.length;

    for (var i = 0; i < length; ++i) {
      if (times[i] === time) {
        return {
          left: i,
          right: i
        };
      } else if (times[i] > time) {
        return {
          left: i === 0 ? 0 : i - 1,
          right: i
        };
      }
    }

    return {
      left: length - 1,
      right: length - 1
    };
  };

  __proto._animate = function (parentEasing) {
    var iterationTime = this.getIterationTime();
    var easing = this.getEasing() || parentEasing;
    var frame = this.getNowFrame(iterationTime, easing);
    var currentTime = this.getTime();
    /**
         * This event is fired when timeupdate and animate.
         * @event SceneItem#animate
         * @param {Number} param.currentTime The total time that the animator is running.
         * @param {Number} param.time The iteration time during duration that the animator is running.
         * @param {Frame} param.frame frame of that time.
         */

    this.trigger("animate", {
      frame: frame,
      currentTime: currentTime,
      time: iterationTime
    });
    var elements = this.elements;
    var length = elements.length;

    if (!length || this.state.peusdo) {
      return frame;
    }

    var attributes = frame.get("attribute");

    if (attributes) {
      for (var name in attributes) {
        for (var i = 0; i < length; ++i) {
          elements[i].setAttribute(name, attributes[name]);
        }
      }
    }

    var cssText = frame.toCSS();

    if (this.state.cssText !== cssText) {
      this.state.cssText = cssText;

      for (var i = 0; i < length; ++i) {
        elements[i].style.cssText += cssText;
      }

      return frame;
    }
  };

  return SceneItem;
}(Animator);

/**
* manage sceneItems and play Scene.
*/

var Scene =
/*#__PURE__*/
function (_super) {
  __extends(Scene, _super);
  /**
  * @sort 1
  * @param - properties
  * @param - options
  * @example
  const scene = new Scene({
    item1: {
      0: {
        display: "none",
      },
      1: {
        display: "block",
        opacity: 0,
      },
      2: {
        opacity: 1,
      },
    },
    item2: {
      2: {
        opacity: 1,
      },
    }
  });
    */


  function Scene(properties, options) {
    var _this = _super.call(this) || this;

    _this.items = {};

    _this.load(properties, options);

    return _this;
  }

  var __proto = Scene.prototype;

  __proto.setId = function (id) {
    if (id === void 0) {
      id = "scene" + Math.floor(Math.random() * 100000);
    }

    this.state.id = id;
    return this;
  };

  __proto.getId = function () {
    return this.state.id;
  };

  __proto.getDuration = function () {
    var items = this.items;
    var time = 0;

    for (var id in items) {
      var item = items[id];
      time = Math.max(time, item.getTotalDuration() / item.getPlaySpeed());
    }

    return time;
  };

  __proto.setDuration = function (duration) {
    var items = this.items;
    var sceneDuration = this.getDuration();

    if (duration === 0 || !isFinite(sceneDuration)) {
      return this;
    }

    if (sceneDuration === 0) {
      for (var id in items) {
        var item = items[id];
        item.setDuration(duration);
      }
    } else {
      var ratio = duration / sceneDuration;

      for (var id in items) {
        var item = items[id];
        item.setDelay(item.getDelay() * ratio);
        item.setDuration(item.getDuration() * ratio);
      }
    }

    return this;
  };
  /**
  * get item in scene by name
  * @param - The item's name
  * @param - If item is added as function, it can be imported via index.
  * @return {Scene | SceneItem} item
  * @example
  const item = scene.getItem("item1")
  */


  __proto.getItem = function (name, index) {
    if (index != null) {
      return this.items[name].getItem(index);
    }

    return this.items[name];
  };
  /**
  * create item in scene
  * @param {String} name - name of item to create
  * @param {StateInterface} options - The option object of SceneItem
  * @return {Sceme.SceneItem} Newly created item
  * @example
  const item = scene.newItem("item1")
  */


  __proto.newItem = function (name, options) {
    if (options === void 0) {
      options = {};
    }

    if (name in this.items) {
      return;
    }

    var item = new SceneItem();
    this.setItem(name, item);
    item.setOptions(options);
    return item;
  };
  /**
  * add a sceneItem to the scene
  * @param - name of item to create
  * @param - sceneItem
  * @example
  const item = scene.newItem("item1")
  */


  __proto.setItem = function (name, item) {
    item.setId(name);
    this.items[name] = item;
    return this;
  };

  __proto.animate = function (time, parentEasing) {
    _super.prototype.setTime.call(this, time, true);

    return this._animate(parentEasing);
  };

  __proto.setTime = function (time, isNumber, parentEasing) {
    _super.prototype.setTime.call(this, time, isNumber);

    this._animate(parentEasing);

    return this;
  };
  /**
   * executes a provided function once for each scene item.
   * @param - Function to execute for each element, taking three arguments
   * @return {Scene} An instance itself
   */


  __proto.forEach = function (func) {
    var items = this.items;
    fjx.eachObjectF(func, items);
    return this;
  };

  __proto.toCSS = function (duration, parentState) {
    if (duration === void 0) {
      duration = this.getDuration();
    }

    var items = this.items;
    var totalDuration = parentState ? this.getDuration() : duration;

    if (!totalDuration || !isFinite(totalDuration)) {
      totalDuration = 0;
    }

    var styles = [];

    var state = __assign({}, this.state);

    if (parentState) {
      var stateIterations = state[ITERATION_COUNT];
      var parentIterations = parentState[ITERATION_COUNT];

      if (parentIterations === "infinite") {
        state[ITERATION_COUNT] = "infinite";
      } else if (stateIterations !== "infinite") {
        state[ITERATION_COUNT] = stateIterations * parentIterations;
      }

      if (!state[EASING]) {
        state[EASING] = parentState[EASING];
        state[EASING_NAME] = parentState[EASING_NAME];
      }
    }

    for (var id in items) {
      styles.push(items[id].toCSS(totalDuration, state));
    }

    return styles.join("");
  };
  /**
   * Export the CSS of the items to the style.
   * @return {Scene} An instance itself
   */


  __proto.exportCSS = function (duration, parentState) {
    var css = this.toCSS(duration, parentState);
    !parentState && exportCSS(getRealId(this), css);
    return css;
  };

  __proto.append = function (item) {
    item.setDelay(item.getDelay() + this.getDuration());
    this.setItem(getRealId(item), item);
  };

  __proto.isPausedCSS = function () {
    return this.state.playCSS && this.isPaused();
  };

  __proto.pauseCSS = function () {
    var items = this.items;

    for (var id in items) {
      items[id].pauseCSS();
    }
  };

  __proto.pause = function () {
    _super.prototype.pause.call(this);

    this.isPausedCSS() && this.pauseCSS();
    return this;
  };

  __proto.endCSS = function () {
    var items = this.items;

    for (var id in items) {
      items[id].endCSS();
    }

    this.setState({
      playCSS: false
    });
  };

  __proto.end = function () {
    !this.isEnded() && this.state.playCSS && this.endCSS();

    _super.prototype.end.call(this);

    return this;
  };

  __proto.addPlayClass = function (isPaused, properties) {
    if (properties === void 0) {
      properties = {};
    }

    var items = this.items;
    var animtionElement;

    for (var id in items) {
      var el = items[id].addPlayClass(isPaused, properties);
      !animtionElement && (animtionElement = el);
    }

    return animtionElement;
  };
  /**
  * Play using the css animation and keyframes.
  * @param {boolean} [exportCSS=true] Check if you want to export css.
  * @param {Object} [properties={}] The shorthand properties for six of the animation properties.
  * @param {Object} [properties.duration] The duration property defines how long an animation should take to complete one cycle.
  * @param {Object} [properties.fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
  * @param {Object} [properties.iterationCount] The iterationCount property specifies the number of times an animation should be played.
  * @param {String} [properties.easing] The easing(timing-function) specifies the speed curve of an animation.
  * @param {Object} [properties.delay] The delay property specifies a delay for the start of an animation.
  * @param {Object} [properties.direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
  * @return {Scene} An instance itself
  * @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
  * @example
  scene.playCSS();
  scene.playCSS(false, {
  direction: "reverse",
  fillMode: "forwards",
  });
  */


  __proto.playCSS = function (isExportCSS, properties) {
    if (isExportCSS === void 0) {
      isExportCSS = true;
    }

    if (properties === void 0) {
      properties = {};
    }

    playCSS(this, isExportCSS, properties);
    return this;
  };

  __proto.set = function (properties) {
    if (properties === void 0) {
      properties = {};
    }

    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    this.load(properties);
  };

  __proto.load = function (properties, options) {
    if (properties === void 0) {
      properties = {};
    }

    if (options === void 0) {
      options = properties.options;
    }

    if (!properties) {
      return this;
    }

    var isSelector = options && options.selector || this.options.selector;

    for (var name in properties) {
      if (name === "options") {
        continue;
      }

      var object = properties[name];
      var item = void 0;

      if (object instanceof Scene || object instanceof SceneItem) {
        this.setItem(name, object);
        item = object;
      } else if (utils.isFunction(object) && isSelector) {
        var elements = utils.IS_WINDOW ? document.querySelectorAll(name) : [];
        var length = elements.length;
        var scene = new Scene();

        for (var i = 0; i < length; ++i) {
          var id = makeId();
          scene.newItem("" + i, {
            id: id,
            selector: "[data-scene-id=\"" + id + "\"]",
            elements: elements[i]
          }).load(object(i));
        }

        this.setItem(name, scene);
        continue;
      } else {
        item = this.newItem(name);
        item.load(object);
      }

      isSelector && item.setSelector(name);
    }

    this.setOptions(options);
  };

  __proto.setSelector = function (_) {
    var isSelector = this.options.selector;
    this.forEach(function (item, name) {
      item.setSelector(isSelector ? name : false);
    });
  };

  __proto._animate = function (parentEasing) {
    var iterationTime = this.getIterationTime();
    var items = this.items;
    var easing = this.getEasing() || parentEasing;
    var frames = {};

    for (var id in items) {
      var item = items[id];
      frames[id] = item.animate(Math.max(iterationTime * item.getPlaySpeed() - item.getDelay(), 0), easing);
    }
    /**
     * This event is fired when timeupdate and animate.
     * @param {Number} param.currentTime The total time that the animator is running.
     * @param {Number} param.time The iteration time during duration that the animator is running.
     * @param {Frame} param.frames frame of that time.
     */


    this.trigger(ANIMATE, {
      currentTime: this.getTime(),
      time: iterationTime,
      frames: frames
    });
    return frames;
  };
  /**
  * version info
  * @type {string}
  * @example
  * Scene.VERSION // 1.0.0-beta13
  */


  Scene.VERSION = "1.0.0-beta13";
  return Scene;
}(Animator);

/**
 * @namespace presets
 */

/**
 * Use the property to create an effect.
 * @memberof presets
 * @param - property to set effect
 * @param - values of 100%
 * @example
// import {set, blink} from "scenejs";
// set("opacity", [0, 1, 0], {duration: 2});
Scene.set("opacity", [0, 1, 0], {duration: 2});

// Same
Scene.blink({duration: 2});

// Same
new SceneItem({
    "0%": {
        opacity: 0,
    },
    "50%": {
        opacity: 1,
    }
    "100%": {
        opacity: 0,
    }
}, {
    duration: 2,
});
 */

function set(property, values, options) {
  var item = new SceneItem({}, options);
  var length = values.length;

  for (var i = 0; i < length; ++i) {
    item.set(i / (length - 1) * 100 + "%", property, values[i]);
  }

  return item;
}
/**
 * Make a zoom in effect.
 * @memberof presets
 * @param {AnimatorOptions} options
 * @param {number} [options.from = 0] start zoom
 * @param {number}[options.to = 1] end zoom
 * @param {number} options.duration animation's duration
 * @example
// import {set, zoomIn} from "scenejs";
// zoomIn({duration: 2});
Scene.zoomIn({duration: 2});
// Same
new SceneItem({
    "0%": {
        "transform": "scale(0)",
    },
    "100%": {
        "transform": "scale(1)",
    }
}, {
    duration: 2,
});
 */

function zoomIn(_a) {
  var _b = _a.from,
      from = _b === void 0 ? 0 : _b,
      _c = _a.to,
      to = _c === void 0 ? 1 : _c;
  return set(["transform", "scale"], [from, to], arguments[0]);
}
/**
 * Make a zoom out effect.
 * @memberof presets
 * @param {AnimatorOptions} options
 * @param {number} [options.from = 1] start zoom
 * @param {number}[options.to = 0] end zoom
 * @param {number} options.duration animation's duration
 * @example
// import {zoomOut} from "scenejs";
// zoomOut({duration: 2});
Scene.zoomOut({duration: 2});
// Same
new SceneItem({
    "0%": {
        "transform": "scale(1)",
    },
    "100%": {
        "transform": "scale(0)",
    }
}, {
    duration: 2,
});
 */

function zoomOut(_a) {
  var _b = _a.from,
      from = _b === void 0 ? 1 : _b,
      _c = _a.to,
      to = _c === void 0 ? 0 : _c;
  return set(["transform", "scale"], [from, to], arguments[0]);
}
/**
 * Make a wipe in effect.
 * @memberof presets
 * @param {AnimatorOptions} options
 * @param {string|string[]} [options.property = "left"] position property
 * @param {number|string} [options.from = "-100%"] start position
 * @param {number|string}[options.to = "0%"] end position
 * @param {number} options.duration animation's duration
 * @example
// import {wipeIn} from "scenejs";
// wipeIn({property: "left", duration: 2});
Scene.wipeIn({property: "left", duration: 2});
// Same
new SceneItem({
    "0%": {
        "left": "-100%",
    },
    "100%": {
        "left": "0%",
    }
}, {
    duration: 2,
});
 */

function wipeIn(_a) {
  var _b = _a.from,
      from = _b === void 0 ? "-100%" : _b,
      _c = _a.to,
      to = _c === void 0 ? "0%" : _c,
      _d = _a.property,
      property = _d === void 0 ? "left" : _d;
  return set(property, [from, to], arguments[0]);
}
/**
 * Make a wipe out effect.
 * @memberof presets
 * @param {AnimatorOptions} options
 * @param {string|string[]} [options.property = "left"] position property
 * @param {number|string} [options.from = "0%"] start position
 * @param {number|string}[options.to = "100%"] end position
 * @param {number} options.duration animation's duration
 * @example
// import {wipeOut} from "scenejs";
// wipeOut({property: "left", duration: 2});
Scene.wipeOut({property: "left", duration: 2});
// Same
new SceneItem({
    "0%": {
        "left": "0%",
    },
    "100%": {
        "left": "100%",
    }
}, {
    duration: 2,
});
 */

function wipeOut(_a) {
  var _b = _a.from,
      from = _b === void 0 ? "0%" : _b,
      _c = _a.to,
      to = _c === void 0 ? "100%" : _c,
      _d = _a.property,
      property = _d === void 0 ? "left" : _d;
  return set(property, [from, to], arguments[0]);
}
/**
 * Use the property to create an effect.
 * @memberof presets
 * @param {Scene.SceneItem} item1 - Item that end effect
 * @param {Scene.SceneItem} item2 - Item that start effect
 * @param {AnimatorOptions} options
 * @param {object} options.from The starting properties of item1 and end properties of item2
 * @param {object} options.to The starting properties of item2 and end properties of item1
 * @param {number} options.duration animation's duration
 * @param {number} [options.time] start time of item1 <br/> <strong>default: item1.getDuration() - duration</strong>
 * @example
// import {transition} from "scenejs";
transition(item1, item2, {
    from: {
        opacity: 1,
    },
    to: {
        opacity: 0,
    },
    duration: 0.1,
});

// Same
item1.set({
    [item1.getDuration() - 0.1]: {
        opacity: 1,
    },
    [item1.getDuration()]: {
        opacity: 0,
    }
});
item2.set({
    0: {
        opacity: 0,
    },
    0.1: {
        opacity: 1,
    }
});
 */

function transition(item1, item2, _a) {
  var from = _a.from,
      to = _a.to,
      _b = _a.duration,
      duration = _b === void 0 ? item1.getDuration() : _b,
      _c = _a.time,
      time = _c === void 0 ? Math.max(item1.getDuration() - duration, 0) : _c;

  var _d, _e;

  item1.set((_d = {}, _d[time] = from, _d[time + duration] = to, _d));
  item2.set((_e = {
    0: to
  }, _e[duration] = from, _e));
}
/**
 * Make a fade in effect.
 * @memberof presets
 * @param {StateInterface} options
 * @param {number} [options.from = 0] start opacity
 * @param {number}[options.to = 1] end opacity
 * @param {number} options.duration animation's duration
 * @example
// import {fadeIn} from "scenejs";
// fadeIn({duration: 2});
Scene.fadeIn({duration: 2});
// Same
new SceneItem({
    "0%": {
        opacity: 0,
    },
    "100%": {
        opacity: 1,
    }
}, {
    duration: 2,
});
 */

function fadeIn(_a) {
  var _b = _a.from,
      from = _b === void 0 ? 0 : _b,
      _c = _a.to,
      to = _c === void 0 ? 1 : _c;
  return set("opacity", [from, to], arguments[0]);
}
/**
 * Make a fade out effect.
 * @memberof presets
 * @param {StateInterface} options
 * @param {number} [options.from = 1] start opacity
 * @param {number}[options.to = 0] end opacity
 * @param {number} options.duration animation's duration
 * @example
// import {fadeOut} from "scenejs";
// fadeOut({duration: 2});
Scene.fadeOut({duration: 2});
// Same
new SceneItem({
    "0%": {
        opacity: 1,
    },
    "100%": {
        opacity: 0,
    }
}, {
    duration: 2,
});
 */

function fadeOut(_a) {
  var _b = _a.from,
      from = _b === void 0 ? 1 : _b,
      _c = _a.to,
      to = _c === void 0 ? 0 : _c;
  return set("opacity", [from, to], arguments[0]);
}
/**
 * Make a blinking effect.
 * @memberof presets
 * @param {StateInterface} options
 * @param {number} [options.from = 0] start opacity
 * @param {number}[options.to = 1] end opacity
 * @param {number} options.duration animation's duration
 * @example
// import {blink} from "scenejs";
// blink({duration: 2});
Scene.blink({duration: 2});
// Same
new SceneItem({
    "0%": {
        opacity: 0,
    },
    "50%": {
        opacity: 1,
    },
    "100%": {
        opacity: 0,
    }
}, {
    duration: 2,
});
 */

function blink(_a) {
  var _b = _a.from,
      from = _b === void 0 ? 0 : _b,
      _c = _a.to,
      to = _c === void 0 ? 1 : _c;
  return set("opacity", [from, to, from], arguments[0]);
}

exports.SceneItem = SceneItem;
exports.Frame = Frame;
exports.Animator = Animator;
exports.Keyframes = Keyframes;
exports.PropertyObject = PropertyObject;
exports.default = Scene;
exports.bezier = bezier;
exports.EASE_IN_OUT = EASE_IN_OUT;
exports.EASE_IN = EASE_IN;
exports.EASE_OUT = EASE_OUT;
exports.EASE = EASE;
exports.LINEAR = LINEAR;
exports.steps = steps;
exports.STEP_START = STEP_START;
exports.STEP_END = STEP_END;
exports.set = set;
exports.transition = transition;
exports.wipeIn = wipeIn;
exports.wipeOut = wipeOut;
exports.fadeIn = fadeIn;
exports.fadeOut = fadeOut;
exports.blink = blink;
exports.zoomIn = zoomIn;
exports.zoomOut = zoomOut;
exports.OPTIONS = OPTIONS;
exports.EVENTS = EVENTS;
exports.setRole = setRole;
exports.setAlias = setAlias;
//# sourceMappingURL=scene.common.js.map
