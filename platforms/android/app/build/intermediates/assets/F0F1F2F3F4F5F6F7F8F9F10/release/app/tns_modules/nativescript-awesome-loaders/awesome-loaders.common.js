"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var view = require('ui/core/view');
var dependency_observable_1 = require("ui/core/dependency-observable");
var proxy_1 = require("ui/core/proxy");
var AwesomeLoaders = (function (_super) {
    __extends(AwesomeLoaders, _super);
    function AwesomeLoaders() {
        _super.call(this);
    }
    Object.defineProperty(AwesomeLoaders.prototype, "indicator", {
        get: function () {
            return this._getValue(AwesomeLoaders.indicatorProperty);
        },
        set: function (value) {
            this._setValue(AwesomeLoaders.indicatorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AwesomeLoaders.prototype, "indicatorColor", {
        get: function () {
            return this._getValue(AwesomeLoaders.indicatorColorProperty);
        },
        set: function (value) {
            this._setValue(AwesomeLoaders.indicatorColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    AwesomeLoaders.indicatorProperty = new dependency_observable_1.Property("indicator", "AwesomeLoaders", new proxy_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None));
    AwesomeLoaders.indicatorColorProperty = new dependency_observable_1.Property("indicatorColor", "AwesomeLoaders", new proxy_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None));
    return AwesomeLoaders;
}(view.View));
exports.AwesomeLoaders = AwesomeLoaders;
//# sourceMappingURL=awesome-loaders.common.js.map