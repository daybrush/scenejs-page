/*
Copyright (c) 2017 Daybrush
name: scenejs
license: MIT
author: Daybrush
repository: https://github.com/daybrush/scenejs.git
version: 1.0.0-rc
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@daybrush/utils');

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
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var PREFIX = "__SCENEJS_";
var DATA_SCENE_ID = "data-scene-id";
var TIMING_FUNCTION = "animation-timing-function";
var ROLES = {
  transform: {},
  filter: {},
  attribute: {}
};
var ALIAS = {
  easing: [TIMING_FUNCTION]
};
var FIXED = (_a = {}, _a[TIMING_FUNCTION] = true, _a.contents = true, _a);
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
var PLAY_CSS = "playCSS";
var PREV_TIME = "prevTime";
var TICK_TIME = "tickTime";
var CURRENT_TIME = "currentTime";
var SELECTOR = "selector";
var TRANSFORM_NAME = "transform";
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

var _a;

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
      for (var n in name) {
        this._on(n, name[n], once);
      }

      return;
    }

    if (!(name in events)) {
      events[name] = [];
    }

    if (!callback) {
      return;
    }

    if (utils.isArray(callback)) {
      callback.forEach(function (func) {
        return _this._on(name, func, once);
      });
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

    var args = data || [];
    !args[0] && (args[0] = {});
    var event = events[name];
    var target = args[0];
    target.type = name;
    target.currentTarget = this;
    !target.target && (target.target = this);
    event.forEach(function (callback) {
      callback.apply(_this, data);
    });
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
    this.prefix = "";
    this.suffix = "";
    this.model = "";
    this.type = "";
    this.separator = ",";
    options && this.setOptions(options);
    this.value = utils.isString(value) ? value.split(this.separator) : value;
  }

  var __proto = PropertyObject.prototype;

  __proto.setOptions = function (newOptions) {
    for (var name in newOptions) {
      this[name] = newOptions[name];
    }

    return this;
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
    var _a = this,
        separator = _a.separator,
        prefix = _a.prefix,
        suffix = _a.suffix,
        model = _a.model,
        type = _a.type;

    var arr = this.value.map(function (v) {
      return v instanceof PropertyObject ? v.clone() : v;
    });
    return new PropertyObject(arr, {
      separator: separator,
      prefix: prefix,
      suffix: suffix,
      model: model,
      type: type
    });
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
    return this.prefix + this.join() + this.suffix;
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
    }).join(this.separator);
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
function getValueByNames(names, properties, length) {
  if (length === void 0) {
    length = names.length;
  }

  var value = properties;

  for (var i = 0; i < length; ++i) {
    if (!utils.isObject(value)) {
      return undefined;
    }

    value = value[names[i]];
  }

  return value;
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
function setPlayCSS(item, isActivate) {
  item.state[PLAY_CSS] = isActivate;
}
function isPausedCSS(item) {
  return item.state[PLAY_CSS] && item.isPaused();
}
function isEndedCSS(item) {
  return !item.isEnded() && item.state[PLAY_CSS];
}
function exportCSS(id, css) {
  var styleId = PREFIX + "STYLE_" + toId(id);
  var styleElement = utils.$("#" + styleId);

  if (styleElement) {
    styleElement.innerText = css;
  } else {
    utils.document.body.insertAdjacentHTML("beforeend", "<style id=\"" + styleId + "\">" + css + "</style>");
  }
}
function makeId(selector) {
  for (;;) {
    var id = "" + Math.floor(Math.random() * 10000000);

    if (!utils.IS_WINDOW || !selector) {
      return id;
    }

    var checkElement = utils.$("[data-scene-id=\"" + id + "\"]");

    if (!checkElement) {
      return id;
    }
  }
}
function getRealId(item) {
  return item.getId() || item.setId(makeId(false)).getId();
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

    addAnimationEvent(item, el);
    setPlayCSS(item, true);
  }

  item.setPlayState(RUNNING);
}
function findIndex(arr, callback, defaultIndex) {
  if (defaultIndex === void 0) {
    defaultIndex = -1;
  }

  var length = arr.length;

  for (var i = 0; i < length; ++i) {
    if (callback(arr[i])) {
      return i;
    }
  }

  return defaultIndex;
}
function find(arr, callback, defalutValue) {
  var index = findIndex(arr, callback);
  return index > -1 ? arr[index] : defalutValue;
}
function addAnimationEvent(item, el) {
  var duration = item.getDuration();
  var isZeroDuration = !duration || !isFinite(duration);
  var state = item.state;

  var animationend = function () {
    if (!isZeroDuration) {
      setPlayCSS(item, false);
      item.finish();
    }
  };

  var animationstart = function () {
    item.trigger(PLAY);
  };

  item.on(ENDED, function () {
    utils.removeEvent(el, "animationend", animationend);
    utils.removeEvent(el, "animationiteration", animationiteration);
    utils.removeEvent(el, "animationstart", animationstart);
  });

  var animationiteration = function (_a) {
    var elapsedTime = _a.elapsedTime;
    var currentTime = elapsedTime;
    var iterationCount = isZeroDuration ? 0 : currentTime / duration;
    state[CURRENT_TIME] = currentTime;
    item.setIteration(iterationCount);
  };

  utils.addEvent(el, "animationend", animationend);
  utils.addEvent(el, "animationiteration", animationiteration);
  utils.addEvent(el, "animationstart", animationstart);
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

function tick(animator, now, to) {
  if (animator.isPaused()) {
    return;
  }

  var state = animator.state;
  var playSpeed = state[PLAY_SPEED];
  var prevTime = state[PREV_TIME];
  var delay = state[DELAY];
  var tickTime = state[TICK_TIME];
  var currentTime = tickTime + Math.min(1000, now - prevTime) / 1000 * playSpeed;
  state[PREV_TIME] = now;
  animator.setTime(currentTime - delay, true);

  if (to && to * 1000 < now) {
    animator.pause();
  }

  if (state[PLAY_STATE] === PAUSED) {
    return;
  }

  utils.requestAnimationFrame(function (time) {
    tick(animator, time, to);
  });
}

function isDirectionReverse(iteration, iteraiontCount, direction) {
  if (direction === REVERSE) {
    return true;
  } else if (iteraiontCount !== INFINITE && iteration === iteraiontCount && iteraiontCount % 1 === 0) {
    return direction === (iteration % 2 >= 1 ? ALTERNATE_REVERSE : ALTERNATE);
  }

  return direction === (iteration % 2 >= 1 ? ALTERNATE : ALTERNATE_REVERSE);
}
/**
* @typedef {Object} AnimatorState The Animator options. Properties used in css animation.
* @property {number} [duration] The duration property defines how long an animation should take to complete one cycle.
* @property {"none"|"forwards"|"backwards"|"both"} [fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
* @property {"infinite"|number} [iterationCount] The iterationCount property specifies the number of times an animation should be played.
* @property {array|function} [easing] The easing(timing-function) specifies the speed curve of an animation.
* @property {number} [delay] The delay property specifies a delay for the start of an animation.
* @property {"normal"|"reverse"|"alternate"|"alternate-reverse"} [direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
*/

var setters = ["id", ITERATION_COUNT, DELAY, FILL_MODE, DIRECTION, PLAY_SPEED, DURATION, PLAY_SPEED, ITERATION_TIME, PLAY_STATE];
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
      iteration: 0,
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
    var easing = utils.isArray(curveArray) ? bezier(curveArray[0], curveArray[1], curveArray[2], curveArray[3]) : curveArray;
    var easingName = easing[EASING_NAME] || "linear";
    var state = this.state;
    state[EASING] = easing;
    state[EASING_NAME] = easingName;
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

      if (OPTIONS.indexOf(name) > -1) {
        this.state[name] = value;
      }
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
    return this.getActiveDuration(true);
  };
  /**
    * Get the animator's total duration excluding delay
    * @return {number} Total duration excluding delay
    * @example
  animator.getActiveDuration();
    */


  __proto.getActiveDuration = function (delay) {
    var state = this.state;
    var count = state[ITERATION_COUNT];

    if (count === INFINITE) {
      return Infinity;
    }

    return (delay ? state[DELAY] : 0) + this.getDuration() * count;
  };
  /**
    * Check if the animator has reached the end.
    * @return {boolean} ended
    * @example
  animator.isEnded(); // true or false
    */


  __proto.isEnded = function () {
    if (this.state[TICK_TIME] === 0 && this.state[PLAY_STATE] === PAUSED) {
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

  __proto.start = function (delay) {
    if (delay === void 0) {
      delay = this.state[DELAY];
    }

    var state = this.state;
    state[PLAY_STATE] = RUNNING;

    if (state[TICK_TIME] >= delay) {
      /**
       * This event is fired when play animator.
       * @event Animator#play
       */
      this.trigger(PLAY);
    }
  };
  /**
    * play animator
    * @return {Animator} An instance itself.
    */


  __proto.play = function (toTime) {
    var _this = this;

    var state = this.state;
    var delay = state[DELAY];
    var currentTime = this.getTime();
    state[PLAY_STATE] = RUNNING;

    if (this.isEnded() && (currentTime === 0 || currentTime >= this.getActiveDuration())) {
      this.setTime(-delay, true);
    }

    state[TICK_TIME] = this.getTime();
    utils.requestAnimationFrame(function (time) {
      state[PREV_TIME] = time;
      tick(_this, time, toTime);
    });
    this.start();
    return this;
  };
  /**
    * pause animator
    * @return {Animator} An instance itself.
    */


  __proto.pause = function () {
    var state = this.state;

    if (state[PLAY_STATE] !== PAUSED) {
      state[PLAY_STATE] = PAUSED;
      /**
       * This event is fired when animator is paused.
       * @event Animator#paused
       */

      this.trigger(PAUSED);
    }

    return this;
  };
  /**
     * end animator
     * @return {Animator} An instance itself.
    */


  __proto.finish = function () {
    this.setTime(0);
    this.state[TICK_TIME] = 0;
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
    var state = this.state;
    var prevTime = state[TICK_TIME];
    var delay = state[DELAY];
    var currentTime = isTick ? time : this.getUnitTime(time);
    state[TICK_TIME] = delay + currentTime;

    if (currentTime < 0) {
      currentTime = 0;
    } else if (currentTime > activeDuration) {
      currentTime = activeDuration;
    }

    state[CURRENT_TIME] = currentTime;
    this.calculate();

    if (isTick) {
      var tickTime = state[TICK_TIME];

      if (prevTime < delay && time >= 0 || state[PLAY_STATE] !== RUNNING && tickTime >= delay && !this.isEnded()) {
        this.start(0);
      }

      if (tickTime < prevTime || this.isEnded()) {
        this.end();
        return;
      }
    }

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
      iterationCount: state[ITERATION]
    });
    return this;
  };
  /**
    * Get the animator's current time
    * @return {number} current time
    * @example
  animator.getTime();
    */


  __proto.getTime = function () {
    return this.state[CURRENT_TIME];
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
        !this.getDuration() && (this.state[DURATION] = duration);
        return toFixed(parseFloat(time) / 100 * duration);
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
    var state = this.state;
    var delay = state[DELAY];
    var tickTime = state[TICK_TIME];
    return delay > 0 && tickTime < delay;
  };

  __proto.setIteration = function (iterationCount) {
    var state = this.state;
    var passIterationCount = Math.floor(iterationCount);
    var maxIterationCount = state[ITERATION_COUNT] === INFINITE ? Infinity : state[ITERATION_COUNT];

    if (state[ITERATION] < passIterationCount && passIterationCount < maxIterationCount) {
      /**
            * The event is fired when an iteration of an animation ends.
            * @event Animator#iteration
            * @param {Object} param The object of data to be sent to an event.
            * @param {Number} param.currentTime The total time that the animator is running.
            * @param {Number} param.iterationCount The iteration count that the animator is running.
            */
      this.trigger("iteration", {
        currentTime: state[CURRENT_TIME],
        iterationCount: passIterationCount
      });
    }

    state[ITERATION] = iterationCount;
    return this;
  };

  __proto.calculate = function () {
    var state = this.state;
    var iterationCount = state[ITERATION_COUNT];
    var fillMode = state[FILL_MODE];
    var direction = state[DIRECTION];
    var duration = this.getDuration();
    var time = this.getTime();
    var iteration = duration === 0 ? 0 : time / duration;
    var currentIterationTime = duration ? time % duration : 0;

    if (!duration) {
      this.setIterationTime(0);
      return this;
    }

    this.setIteration(iteration); // direction : normal, reverse, alternate, alternate-reverse
    // fillMode : forwards, backwards, both, none

    var isReverse = isDirectionReverse(iteration, iterationCount, direction);
    var isFiniteDuration = isFinite(duration);

    if (isFiniteDuration && isReverse) {
      currentIterationTime = duration - currentIterationTime;
    }

    if (isFiniteDuration && iterationCount !== INFINITE) {
      var isForwards = fillMode === "both" || fillMode === "forwards"; // fill forwards

      if (iteration >= iterationCount) {
        currentIterationTime = duration * (isForwards ? iterationCount % 1 || 1 : 0);
        isReverse && (currentIterationTime = duration - currentIterationTime);
      }
    }

    this.setIterationTime(currentIterationTime);
    return this;
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
    separator = obj.separator;
    arr = obj.value;
    prefix += obj.prefix;
    suffix = obj.suffix + suffix;
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
    if (utils.isArray(value)) {
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

  var model = object.model;

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
      toObject(obj, result);
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
      to[name] = toValue ? getValue([name], value) : value;
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

    return getValueByNames(getPropertyName(args), this.properties);
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

    var params = getPropertyName(args);
    var length = params.length;

    if (!length) {
      return this;
    }

    var value = getValueByNames(params, this.properties, length - 1);

    if (utils.isObject(value)) {
      delete value[params[length - 1]];
    }

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

    var self = this;
    var length = args.length;
    var params = args.slice(0, -1);
    var value = args[length - 1];

    if (params[0] in ALIAS) {
      self._set(ALIAS[params[0]], value);
    } else if (length === 2 && utils.isArray(params[0])) {
      self._set(params[0], value);
    } else if (utils.isArray(value)) {
      self._set(params, value);
    } else if (isPropertyObject(value)) {
      if (isRole(params)) {
        self.set.apply(self, params.concat([toObject(value)]));
      } else {
        self._set(params, value);
      }
    } else if (utils.isObject(value)) {
      for (var name in value) {
        self.set.apply(self, params.concat([name, value[name]]));
      }
    } else if (utils.isString(value)) {
      if (isRole(params)) {
        var obj = toPropertyObject(value);

        if (utils.isObject(obj)) {
          self.set.apply(self, params.concat([obj]));
        }

        return this;
      } else {
        var _a = splitStyle(value),
            styles = _a.styles,
            stylesLength = _a.length;

        for (var name in styles) {
          self.set.apply(self, params.concat([name, styles[name]]));
        }

        if (stylesLength) {
          return this;
        }
      }

      self._set(params, value);
    } else {
      self._set(params, value);
    }

    return self;
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

    var params = getPropertyName(args);
    var length = params.length;

    if (!length) {
      return false;
    }

    return !utils.isUndefined(getValueByNames(params, this.properties, length));
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
  /**
    * Specifies an css object that coverted the frame.
    * @return {object} cssObject
    */


  __proto.toCSSObject = function () {
    var properties = this.get();
    var cssObject = {};

    for (var name in properties) {
      if (isRole([name], true)) {
        continue;
      }

      var value = properties[name];

      if (name === TIMING_FUNCTION) {
        cssObject[TIMING_FUNCTION.replace("animation", utils.ANIMATION)] = (utils.isString(value) ? value : value[EASING_NAME]) || "initial";
        continue;
      }

      cssObject[name] = value;
    }

    var transform = toInnerProperties(properties[TRANSFORM_NAME]);
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

function dotArray(a1, a2, b1, b2) {
  var length = a2.length;
  return a1.map(function (v1, i) {
    if (i >= length) {
      return v1;
    } else {
      return dot(v1, a2[i], b1, b2);
    }
  });
}

function dotColor(color1, color2, b1, b2) {
  // convert array to PropertyObject(type=color)
  var value1 = color1.value;
  var value2 = color2.value; // If the model name is not same, the inner product is impossible.

  var model1 = color1.model;
  var model2 = color2.model;

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

function dotObject(a1, a2, b1, b2) {
  var a1Type = a1.type;

  if (a1Type === "color") {
    return dotColor(a1, a2, b1, b2);
  }

  var value1 = a1.value;
  var value2 = a2.value;
  var arr = dotArray(value1, value2, b1, b2);
  return new PropertyObject(arr, {
    type: a1Type,
    separator: a1.separator || a2.separator,
    prefix: a1.prefix || a2.prefix,
    suffix: a1.suffix || a2.suffix,
    model: a1.model || a2.model
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
    } else if (type1 === utils.ARRAY) {
      return dotArray(a1, a2, b1, b2);
    } else if (type1 !== "value") {
      return a1;
    }
  } else {
    return a1;
  }

  var v1 = utils.splitUnit("" + a1);
  var v2 = utils.splitUnit("" + a2);
  var v; // 숫자가 아닐경우 첫번째 값을 반환 b2가 0일경우 두번째 값을 반환

  if (isNaN(v1.value) || isNaN(v2.value)) {
    return a1;
  } else {
    v = dotNumber(v1.value, v2.value, b1, b2);
  }

  var prefix = v1.prefix || v2.prefix;
  var unit = v1.unit || v2.unit;

  if (!prefix && !unit) {
    return v;
  }

  return prefix + v + unit;
}
function dotNumber(a1, a2, b1, b2) {
  return (a1 * b2 + a2 * b1) / (b1 + b2);
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

function getNearTimeIndex(times, time) {
  var length = times.length;

  for (var i = 0; i < length; ++i) {
    if (times[i] === time) {
      return [i, i];
    } else if (times[i] > time) {
      return [i > 0 ? i - 1 : 0, i];
    }
  }

  return [length - 1, length - 1];
}

function makeAnimationProperties(properties) {
  var cssArray = [];

  for (var name in properties) {
    cssArray.push(utils.ANIMATION + "-" + utils.decamelize(name) + ":" + properties[name] + ";");
  }

  return cssArray.join("");
}

function isPureObject(obj) {
  return utils.isObject(obj) && obj.constructor === Object;
}

function getNames(names, stack) {
  var arr = [];

  if (isPureObject(names)) {
    for (var name in names) {
      stack.push(name);
      arr = arr.concat(getNames(names[name], stack));
      stack.pop();
    }
  } else {
    arr.push(stack.slice());
  }

  return arr;
}

function updateFrame(names, properties) {
  for (var name in properties) {
    var value = properties[name];

    if (!isPureObject(value)) {
      names[name] = true;
      continue;
    }

    if (!utils.isObject(names[name])) {
      names[name] = {};
    }

    updateFrame(names[name], properties[name]);
  }

  return names;
}

function addTime(times, time) {
  var length = times.length;

  for (var i = 0; i < length; ++i) {
    if (time < times[i]) {
      times.splice(i, 0, time);
      return;
    }
  }

  times[length] = time;
}

function addEntry(entries, time, keytime) {
  var prevEntry = entries[entries.length - 1];
  (!prevEntry || prevEntry[0] !== time || prevEntry[1] !== keytime) && entries.push([toFixed(time), toFixed(keytime)]);
}

function getEntries(times, states) {
  var entries = times.map(function (time) {
    return [time, time];
  });
  var nextEntries = [];
  states.forEach(function (state) {
    var iterationCount = state[ITERATION_COUNT];
    var delay = state[DELAY];
    var playSpeed = state[PLAY_SPEED];
    var direction = state[DIRECTION];
    var intCount = Math.ceil(iterationCount);
    var currentDuration = entries[entries.length - 1][0];
    var length = entries.length;
    var lastTime = currentDuration * iterationCount;

    for (var i = 0; i < intCount; ++i) {
      var isReverse = direction === REVERSE || direction === ALTERNATE && i % 2 || direction === ALTERNATE_REVERSE && !(i % 2);

      for (var j = 0; j < length; ++j) {
        var entry = entries[isReverse ? length - j - 1 : j];
        var time = entry[1];
        var currentTime = currentDuration * i + (isReverse ? currentDuration - entry[0] : entry[0]);
        var prevEntry = entries[isReverse ? length - j : j - 1];

        if (currentTime > lastTime) {
          if (j !== 0) {
            var prevTime = currentDuration * i + (isReverse ? currentDuration - prevEntry[0] : prevEntry[0]);
            var divideTime = dotNumber(prevEntry[1], time, lastTime - prevTime, currentTime - lastTime);
            addEntry(nextEntries, (delay + currentDuration * iterationCount) / playSpeed, divideTime);
          }

          break;
        } else if (currentTime === lastTime && nextEntries[nextEntries.length - 1][0] === lastTime + delay) {
          break;
        }

        addEntry(nextEntries, (delay + currentTime) / playSpeed, time);
      }
    } // delay time


    delay && nextEntries.unshift([0, nextEntries[0][1]]);
    entries = nextEntries;
    nextEntries = [];
  });
  return entries;
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

    _this.times = [];
    _this.items = {};
    _this.names = {};
    _this.elements = [];
    _this.needUpdate = false;

    _this.load(properties, options);

    return _this;
  }

  var __proto = SceneItem.prototype;

  __proto.getDuration = function () {
    var times = this.times;
    var length = times.length;
    return Math.max(this.state[DURATION], length === 0 ? 0 : times[length - 1]);
  };
  /**
    * get size of list
    * @return {Number} length of list
    */


  __proto.size = function () {
    return this.times.length;
  };

  __proto.setDuration = function (duration) {
    if (!duration) {
      return this;
    }

    var originalDuration = this.getDuration();

    if (originalDuration > 0) {
      var ratio_1 = duration / originalDuration;

      var _a = this,
          times = _a.times,
          items_1 = _a.items;

      var obj_1 = {};
      this.times = times.map(function (time) {
        var time2 = toFixed(time * ratio_1);
        obj_1[time2] = items_1[time];
        return time2;
      });
      this.items = obj_1;
    }

    _super.prototype.setDuration.call(this, toFixed(duration));

    return this;
  };

  __proto.setId = function (id) {
    var state = this.state;
    state.id = id || makeId(!!length);
    var elements = this.elements;

    if (elements.length && !state[SELECTOR]) {
      var sceneId_1 = toId(this.getId());
      state[SELECTOR] = "[" + DATA_SCENE_ID + "=\"" + sceneId_1 + "\"]";
      elements.forEach(function (element) {
        element.setAttribute(DATA_SCENE_ID, sceneId_1);
      });
    }

    return this;
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

    if (utils.isArray(time)) {
      var length = time.length;

      for (var i = 0; i < length; ++i) {
        var t = length === 1 ? 0 : this.getUnitTime(i / (length - 1) * 100 + "%");
        this.set(t, time[i]);
      }
    } else if (utils.isObject(time)) {
      var _loop_1 = function (t) {
        var value = time[t];
        var realTime = this_1.getUnitTime(t);

        if (isNaN(realTime)) {
          getNames(value, [t]).forEach(function (names) {
            var innerValue = getValueByNames(names.slice(1), value);
            var arr = utils.isArray(innerValue) ? innerValue : [getValueByNames(names, _this.target), innerValue];
            var length = arr.length;

            for (var i = 0; i < length; ++i) {
              _this.newFrame(i / (length - 1) * 100 + "%").set(names, arr[i]);
            }
          });
        } else {
          this_1.set(realTime, value);
        }
      };

      var this_1 = this;

      for (var t in time) {
        _loop_1(t);
      }
    } else {
      var value = args[0];

      if (value instanceof Frame) {
        this.setFrame(time, value);
      } else if (value instanceof SceneItem) {
        var delay = value.getDelay();
        var realTime = this.getUnitTime(time);
        var frames = value.toObject(!this.hasFrame(realTime + delay), realTime);

        for (var frameTime in frames) {
          this.set(frameTime, frames[frameTime]);
        }
      } else if (args.length === 1 && utils.isArray(value)) {
        value.forEach(function (item) {
          _this.set(time, item);
        });
      } else {
        var frame = this.newFrame(time);
        frame.set.apply(frame, args);
      }
    }

    this.needUpdate = true;
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
    this.needUpdate = true;
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
      var unshiftTime = item.getDuration() + item.getDelay();
      var firstFrame = this.getFrame(0); // remove first frame

      this.removeFrame(0);
      this.unshift(unshiftTime);
      this.set(0, item);
      this.set(unshiftTime + THRESHOLD, firstFrame);
    } else {
      this.prepend(new SceneItem(item));
    }

    return this;
  };
  /**
  * Push out the amount of time.
  * @param - time to push
   * @return {}
   * @example
  item.get(0); // frame 0
  item.unshift(3);
  item.get(3) // frame 0
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
  };
  /**
   * Get the frames in the item in object form.
   * @return {}
   * @example
  item.toObject();
  // {0: {display: "none"}, 1: {display: "block"}}
   */


  __proto.toObject = function (isStartZero, startTime) {
    if (isStartZero === void 0) {
      isStartZero = true;
    }

    if (startTime === void 0) {
      startTime = 0;
    }

    var obj = {};
    var delay = this.getDelay();
    this.forEach(function (frame, time) {
      obj[(!time && !isStartZero ? THRESHOLD : 0) + delay + startTime + time] = frame.clone();
    });
    return obj;
  };
  /**
   * Specifies an element to synchronize items' keyframes.
   * @param {string} selectors - Selectors to find elements in items.
   * @return {SceneItem} An instance itself
   * @example
  item.setSelector("#id.class");
   */


  __proto.setSelector = function (target) {
    this.setElement(target);
  };
  /**
    * Specifies an element to synchronize item's keyframes.
  * @param - elements to synchronize item's keyframes.
  * @param - Make sure that you have peusdo.
    * @return {SceneItem} An instance itself
    * @example
  item.setElement(document.querySelector("#id.class"));
  item.setElement(document.querySelectorAll(".class"));
    */


  __proto.setElement = function (target) {
    var state = this.state;
    var elements = [];

    if (!target) {
      return this;
    } else if (target === true || utils.isString(target)) {
      var selector = target === true ? "" + state.id : target;
      var matches = /([\s\S]+)(:+[a-zA-Z]+)$/g.exec(selector);
      elements = utils.toArray(utils.$(matches ? matches[1] : selector, true));
      state[SELECTOR] = selector;
    } else {
      elements = target instanceof Element ? [target] : utils.toArray(target);
    }

    if (!elements.length) {
      return this;
    }

    this.elements = elements;
    this.setId(this.getId());
    this.target = elements[0].style;

    this.targetFunc = function (frame) {
      var attributes = frame.get("attribute");

      if (attributes) {
        var _loop_2 = function (name) {
          elements.forEach(function (el) {
            el.setAttribute(name, attributes[name]);
          });
        };

        for (var name in attributes) {
          _loop_2(name);
        }
      }

      var cssText = frame.toCSS();

      if (state.cssText !== cssText) {
        state.cssText = cssText;
        elements.forEach(function (el) {
          el.style.cssText += cssText;
        });
        return frame;
      }
    };

    return this;
  };

  __proto.setTarget = function (target) {
    this.target = target;

    this.targetFunc = function (frame) {
      var obj = frame.get();

      for (var name in obj) {
        target[name] = obj[name];
      }
    };

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

  __proto.setTime = function (time, isTick, parentEasing) {
    _super.prototype.setTime.call(this, time, isTick);

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
    this.targetFunc && this.targetFunc(frame);
    return this;
  };
  /**
    * update property names used in frames.
    * @return {SceneItem} An instance itself
    * @example
  item.update();
    */


  __proto.update = function () {
    var names = this.names;
    this.forEach(function (frame) {
      updateFrame(names, frame.properties);
    });
    this.needUpdate = false;
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
    var realTime = this.getUnitTime(time);
    this.items[realTime] = frame;
    addTime(this.times, realTime);
    this.needUpdate = true;
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
    return this.items[this.getUnitTime(time)];
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
    return this.getUnitTime(time) in this.items;
  };
  /**
    * Check if keyframes has propery's name
    * @param - property's time
    * @return {boolean} true: if has property, false: not
    * @example
  item.hasName(["transform", "translate"]); // true or not
    */


  __proto.hasName = function (args) {
    this.needUpdate && this.update();
    return isInProperties(this.names, args, true);
  };
  /**
    * remove sceneItem's frame at that time
    * @param {Number} time - frame's time
    * @return {SceneItem} An instance itself
    * @example
  item.removeFrame(time);
    */


  __proto.removeFrame = function (time) {
    var items = this.items;
    var index = this.times.indexOf(time);
    delete items[time]; // remove time

    if (index > -1) {
      this.times.splice(index, 1);
    }

    return this;
  };
  /**
    * merge frame of the previous time at the next time.
  * @param - The time of the frame to merge
  * @param - The target frame
    * @return {SceneItem} An instance itself
    * @example
  // getFrame(1) contains getFrame(0)
  item.merge(0, 1);
    */


  __proto.mergeFrame = function (time, frame) {
    if (frame) {
      var toFrame = this.newFrame(time);
      toFrame.merge(frame);
    }

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


  __proto.getNowFrame = function (time, easing, isAccurate) {
    var _this = this;

    this.needUpdate && this.update();
    var frame = new Frame();

    var _a = getNearTimeIndex(this.times, time),
        left = _a[0],
        right = _a[1];

    var realEasing = this.getEasing() || easing;
    var nameObject = this.names;

    if (this.hasName([TIMING_FUNCTION])) {
      var nowEasing = this._getNowValue(time, [TIMING_FUNCTION], left, right, false, 0, true);

      utils.isFunction(nowEasing) && (realEasing = nowEasing);
    }

    if (isAccurate) {
      var prevFrame = this.getFrame(time);
      var prevNames = updateFrame({}, prevFrame.properties);

      for (var name in ROLES) {
        if (name in prevNames) {
          prevNames[name] = nameObject[name];
        }
      }

      nameObject = prevNames;
    }

    var names = getNames(nameObject, []);
    names.forEach(function (properties) {
      var value = _this._getNowValue(time, properties, left, right, isAccurate, realEasing, isFixed(properties));

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

    options && this.setOptions(options);

    if (utils.isArray(properties)) {
      this.set(properties);
    } else if (properties.keyframes) {
      this.set(properties.keyframes);
    } else {
      for (var time in properties) {
        if (time === "options") {
          continue;
        }

        this.set((_a = {}, _a[time] = properties[time], _a));
      }
    }

    if (options && options[DURATION]) {
      this.setDuration(options[DURATION]);
    }

    return this;

    var _a;
  };
  /**
     * clone SceneItem.
     * @return {SceneItem} An instance of clone
     * @example
     * item.clone();
     */


  __proto.clone = function () {
    var item = new SceneItem();
    item.setOptions(this.state);
    this.forEach(function (frame, time) {
      item.setFrame(time, frame.clone());
    });
    return item;
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

  __proto.setOptions = function (options) {
    if (options === void 0) {
      options = {};
    }

    _super.prototype.setOptions.call(this, options);

    var id = options.id,
        selector = options.selector,
        elements = options.elements,
        element = options.element,
        target = options.target;
    id && this.setId(id);

    if (target) {
      this.setTarget(target);
    } else if (elements || element || selector) {
      this.setElement(elements || element || selector);
    }

    return this;
  };
  /**
    * Specifies an css text that coverted the keyframes of the item.
    * @param {Array} [duration=this.getDuration()] - elements to synchronize item's keyframes.
    * @param {Array} [options={}] - parent options to unify options of items.
    * @example
  item.setCSS(0, ["opacity"]);
  item.setCSS(0, ["opacity", "width", "height"]);
    */


  __proto.toCSS = function (parentDuration, states) {
    if (parentDuration === void 0) {
      parentDuration = this.getDuration();
    }

    if (states === void 0) {
      states = [];
    }

    var itemState = this.state;
    var selector = itemState[SELECTOR];

    if (!selector) {
      return "";
    }

    var originalDuration = this.getDuration();
    itemState[DURATION] = originalDuration;
    states.push(itemState);
    var reversedStates = utils.toArray(states).reverse();
    var id = toId(getRealId(this));
    var superParent = states[0];
    var infiniteIndex = findIndex(reversedStates, function (state) {
      return state[ITERATION_COUNT] === INFINITE || !isFinite(state[DURATION]);
    }, states.length - 1);
    var finiteStates = reversedStates.slice(0, infiniteIndex);
    var duration = parentDuration || finiteStates.reduce(function (prev, cur) {
      return (cur[DELAY] + prev * cur[ITERATION_COUNT]) / cur[PLAY_SPEED];
    }, originalDuration);
    var delay = reversedStates.slice(infiniteIndex).reduce(function (prev, cur) {
      return (prev + cur[DELAY]) / cur[PLAY_SPEED];
    }, 0);
    var easingName = find(reversedStates, function (state) {
      return state[EASING] && state[EASING_NAME];
    }, itemState)[EASING_NAME];
    var iterationCount = reversedStates[infiniteIndex][ITERATION_COUNT];
    var fillMode = superParent[FILL_MODE];
    var direction = reversedStates[infiniteIndex][DIRECTION];
    var cssText = makeAnimationProperties({
      fillMode: fillMode,
      direction: direction,
      iterationCount: iterationCount,
      delay: delay + "s",
      name: PREFIX + "KEYFRAMES_" + id,
      duration: duration / superParent[PLAY_SPEED] + "s",
      timingFunction: easingName
    });
    var selectors = utils.splitComma(selector).map(function (sel) {
      var matches = /([\s\S]+)(:+[a-zA-Z]+)$/g.exec(sel);

      if (matches) {
        return [matches[0], matches[1]];
      } else {
        return [sel, ""];
      }
    });
    return selectors.map(function (_a) {
      var sel = _a[0],
          peusdo = _a[1];
      return sel + "." + START_ANIMATION + peusdo;
    }) + " {\n\t\t\t" + cssText + "\n\t\t}" + selectors.map(function (_a) {
      var sel = _a[0],
          peusdo = _a[1];
      return sel + "." + PAUSE_ANIMATION + peusdo;
    }) + " {\n      " + utils.ANIMATION + "-play-state: paused;\n    }\n    @" + utils.KEYFRAMES + " " + PREFIX + "KEYFRAMES_" + id + "{\n\t\t\t" + this._toKeyframes(duration, finiteStates) + "\n\t\t}";
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

    isPausedCSS(this) && this.pauseCSS();
    return this;
  };

  __proto.pauseCSS = function () {
    this.elements.forEach(function (element) {
      utils.addClass(element, PAUSE_ANIMATION);
    });
    return this;
  };

  __proto.endCSS = function () {
    this.elements.forEach(function (element) {
      utils.removeClass(element, PAUSE_ANIMATION);
      utils.removeClass(element, START_ANIMATION);
    });
    setPlayCSS(this, false);
    return this;
  };

  __proto.end = function () {
    isEndedCSS(this) && this.endCSS();

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
  item[PLAY_CSS]();
  item[PLAY_CSS](false, {
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
      elements.forEach(function (element) {
        utils.removeClass(element, PAUSE_ANIMATION);
      });
    } else {
      elements.forEach(function (element) {
        element.style.cssText += cssText;

        if (utils.hasClass(element, START_ANIMATION)) {
          utils.removeClass(element, START_ANIMATION);
          utils.requestAnimationFrame(function () {
            utils.requestAnimationFrame(function () {
              utils.addClass(element, START_ANIMATION);
            });
          });
        } else {
          utils.addClass(element, START_ANIMATION);
        }
      });
    }

    return elements[0];
  };

  __proto._toKeyframes = function (duration, states) {
    var _this = this;

    var frames = {};
    var times = this.times.slice();

    if (!times.length) {
      return "";
    }

    var originalDuration = this.getDuration();
    !this.getFrame(0) && times.unshift(0);
    !this.getFrame(originalDuration) && times.push(originalDuration);
    var entries = getEntries(times, states);
    var lastEntry = entries[entries.length - 1]; // end delay time

    lastEntry[0] < duration && addEntry(entries, duration, lastEntry[1]);
    var prevTime = -1;
    return entries.map(function (_a) {
      var time = _a[0],
          keytime = _a[1];

      if (!frames[keytime]) {
        frames[keytime] = (!_this.hasFrame(keytime) || keytime === 0 || keytime === originalDuration ? _this.getNowFrame(keytime) : _this.getNowFrame(keytime, 0, true)).toCSS();
      }

      var frameTime = time / duration * 100;

      if (frameTime - prevTime < THRESHOLD) {
        frameTime += THRESHOLD;
      }

      prevTime = frameTime;
      return frameTime + "%{" + (time === 0 ? "" : frames[keytime]) + "}";
    }).join("");
  };

  __proto._getNowValue = function (time, properties, left, right, isAccurate, easing, usePrevValue) {
    var times = this.times;
    var length = times.length;
    var prevTime;
    var nextTime;
    var prevFrame;
    var nextFrame;

    for (var i = left; i >= 0; --i) {
      var frame = this.getFrame(times[i]);

      if (frame.has.apply(frame, properties)) {
        prevTime = times[i];
        prevFrame = frame;
        break;
      }
    }

    var prevValue = prevFrame && prevFrame.raw.apply(prevFrame, properties);

    if (isAccurate && !isRole([properties[0]])) {
      return prevTime === time ? prevValue : undefined;
    }

    if (usePrevValue) {
      return prevValue;
    }

    for (var i = right; i < length; ++i) {
      var frame = this.getFrame(times[i]);

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

  return SceneItem;
}(Animator);

/**
 * manage sceneItems and play Scene.
 * @sort 1
 */

var Scene =
/*#__PURE__*/
function (_super) {
  __extends(Scene, _super);
  /**
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
  * @param {} name - name of item to create
  * @param {} options - The option object of SceneItem
  * @return {} Newly created item
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

  __proto.setTime = function (time, isTick, parentEasing) {
    _super.prototype.setTime.call(this, time, isTick);

    var iterationTime = this.getIterationTime();
    var items = this.items;
    var easing = this.getEasing() || parentEasing;

    for (var id in items) {
      var item = items[id];
      item.setTime(iterationTime * item.getPlaySpeed() - item.getDelay(), isTick, easing);
    }

    return this;
  };
  /**
   * executes a provided function once for each scene item.
   * @param - Function to execute for each element, taking three arguments
   * @return {Scene} An instance itself
   */


  __proto.forEach = function (func) {
    var items = this.items;

    for (var name in items) {
      func(items[name], name, items);
    }

    return this;
  };

  __proto.toCSS = function (duration, parentStates) {
    if (duration === void 0) {
      duration = this.getDuration();
    }

    if (parentStates === void 0) {
      parentStates = [];
    }

    var totalDuration = !duration || !isFinite(duration) ? 0 : duration;
    var styles = [];
    var state = this.state;
    state[DURATION] = this.getDuration();
    this.forEach(function (item) {
      styles.push(item.toCSS(totalDuration, parentStates.concat(state)));
    });
    return styles.join("");
  };
  /**
   * Export the CSS of the items to the style.
   * @return {Scene} An instance itself
   */


  __proto.exportCSS = function (duration, parentStates) {
    var css = this.toCSS(duration, parentStates);
    (!parentStates || !parentStates.length) && exportCSS(getRealId(this), css);
    return css;
  };

  __proto.append = function (item) {
    item.setDelay(item.getDelay() + this.getDuration());
    this.setItem(getRealId(item), item);
  };

  __proto.pauseCSS = function () {
    return this.forEach(function (item) {
      item.pauseCSS();
    });
  };

  __proto.pause = function () {
    _super.prototype.pause.call(this);

    isPausedCSS(this) && this.pauseCSS();
    this.forEach(function (item) {
      item.pause();
    });
    return this;
  };

  __proto.endCSS = function () {
    var items = this.items;

    for (var id in items) {
      items[id].endCSS();
    }

    setPlayCSS(this, false);
  };

  __proto.end = function () {
    isEndedCSS(this) && this.endCSS();

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
    this.load(properties);
    return this;
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

    var isSelector = options && options[SELECTOR] || this.state[SELECTOR];

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
        var elements = utils.IS_WINDOW ? utils.$(name, true) : [];
        var length = elements.length;
        var scene = new Scene();

        for (var i = 0; i < length; ++i) {
          var id = makeId();
          scene.newItem("" + i, {
            id: id,
            selector: "[" + DATA_SCENE_ID + "=\"" + id + "\"]",
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

  __proto.setOptions = function (options) {
    if (options === void 0) {
      options = {};
    }

    _super.prototype.setOptions.call(this, options);

    if (options.selector) {
      this.state[SELECTOR] = true;
    }

    return this;
  };

  __proto.setSelector = function (target) {
    var state = this.state;
    var isSelector = target || state[SELECTOR];
    state[SELECTOR] = target;
    this.forEach(function (item, name) {
      item.setSelector(isSelector ? name : false);
    });
  };

  __proto.start = function (delay) {
    _super.prototype.start.call(this, delay);

    this.forEach(function (item) {
      item.start(delay);
    });
  };
  /**
  * version info
  * @type {string}
  * @example
  * Scene.VERSION // 1.0.0-rc
  */


  Scene.VERSION = "1.0.0-rc";
  return Scene;
}(Animator);

function animate(properties, options) {
  return new Scene(properties, options).play();
}
function animateItem(properties, options) {
  return new SceneItem(properties, options).play();
}
/**
 * Use the property to create an effect.
 * @memberof presets
 * @private
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
  return set([TRANSFORM_NAME, "scale"], [from, to], arguments[0]);
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
  return set([TRANSFORM_NAME, "scale"], [from, to], arguments[0]);
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
  item1.set((_d = {}, _d[time] = to, _d[time + duration] = from, _d));
  item2.set((_e = {
    0: from
  }, _e[duration] = to, _e));

  var _d, _e;
}
/**
 * Make a fade in effect.
 * @memberof presets
 * @param {AnimatorState} options
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
 * @param {AnimatorState} options
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
 * @param {AnimatorState} options
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
exports.default = Scene;
exports.OPTIONS = OPTIONS;
exports.EVENTS = EVENTS;
exports.setRole = setRole;
exports.setAlias = setAlias;
exports.bezier = bezier;
exports.steps = steps;
exports.STEP_START = STEP_START;
exports.STEP_END = STEP_END;
exports.LINEAR = LINEAR;
exports.EASE = EASE;
exports.EASE_IN = EASE_IN;
exports.EASE_OUT = EASE_OUT;
exports.EASE_IN_OUT = EASE_IN_OUT;
exports.animate = animate;
exports.animateItem = animateItem;
exports.zoomIn = zoomIn;
exports.zoomOut = zoomOut;
exports.wipeIn = wipeIn;
exports.wipeOut = wipeOut;
exports.transition = transition;
exports.fadeIn = fadeIn;
exports.fadeOut = fadeOut;
exports.blink = blink;
//# sourceMappingURL=scene.common.js.map
