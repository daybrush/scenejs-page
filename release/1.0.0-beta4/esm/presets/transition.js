/**
 * Use the property to create an effect.
 * @memberof Scene.presets
 * @func transition
 * @param {Scene.SceneItem} item1 - Item that end effect
 * @param {Scene.SceneItem} item2 - Item that start effect
 * @param {AnimatorOptions} options
 * @param {object} options.from The starting properties of item1 and end properties of item2
 * @param {object} options.to The starting properties of item2 and end properties of item1
 * @param {number} options.duration animation's duration
 * @param {number} [options.time] start time of item1 <br/> <strong>default: item1.getDuration() - duration</strong>
 * @example
// import {presets} from "scenejs";
Scene.presets.transition(item1, item2, {
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
export default function transition(item1, item2, _a) {
    var from = _a.from, to = _a.to, _b = _a.duration, duration = _b === void 0 ? item1.getDuration() : _b, _c = _a.time, time = _c === void 0 ? Math.max(item1.getDuration() - duration, 0) : _c;
    var _d, _e;
    item1.set((_d = {},
        _d[time] = from,
        _d[time + duration] = to,
        _d));
    item2.set((_e = {
            0: to
        },
        _e[duration] = from,
        _e));
}
//# sourceMappingURL=transition.js.map