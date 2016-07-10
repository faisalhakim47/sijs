"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var glue_1 = require('./glue');
var StyleGlue = (function (_super) {
    __extends(StyleGlue, _super);
    function StyleGlue(id, name, value) {
        _super.call(this);
        this.id = id;
        this.name = name;
        this.value = value;
    }
    StyleGlue.prototype.install = function () {
        if (!(this.el = glue_1.getEl(this.id))) {
            return console.warn('Input element #', this.id, 'has not been inserted yet.', this);
        }
        this.value.watch(this.styleWatcher);
        this.isInstalled = true;
    };
    StyleGlue.prototype.destroy = function () {
        if (this.isInstalled) {
            this.value.unwatch(this.styleWatcher);
            this.el = null;
            glue_1.removeElRef(this.id);
        }
        else {
            console.warn('Glue style #', this.id, 'has not been installed yet.', this);
        }
    };
    StyleGlue.prototype.styleWatcher = function (val) {
        this.el.style[this.name] = val;
    };
    return StyleGlue;
}(glue_1.Glue));
exports.StyleGlue = StyleGlue;
//# sourceMappingURL=style.js.map