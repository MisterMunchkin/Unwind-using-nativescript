"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common = require('./awesome-loaders.common');
var color_1 = require('color');
var BallBeatIndicator = com.wang.avi.indicator.BallBeatIndicator;
var BallClipRotateIndicator = com.wang.avi.indicator.BallClipRotateIndicator;
var BallClipRotateMultipleIndicator = com.wang.avi.indicator.BallClipRotateMultipleIndicator;
var BallClipRotatePulseIndicator = com.wang.avi.indicator.BallClipRotatePulseIndicator;
var BallGridBeatIndicator = com.wang.avi.indicator.BallGridBeatIndicator;
var BallGridPulseIndicator = com.wang.avi.indicator.BallGridPulseIndicator;
var BallPulseIndicator = com.wang.avi.indicator.BallPulseIndicator;
var BallPulseRiseIndicator = com.wang.avi.indicator.BallPulseRiseIndicator;
var BallPulseSyncIndicator = com.wang.avi.indicator.BallPulseSyncIndicator;
var BallRotateIndicator = com.wang.avi.indicator.BallRotateIndicator;
var BallScaleIndicator = com.wang.avi.indicator.BallScaleIndicator;
var BallScaleMultipleIndicator = com.wang.avi.indicator.BallScaleMultipleIndicator;
var BallScaleRippleIndicator = com.wang.avi.indicator.BallScaleRippleIndicator;
var BallScaleRippleMultipleIndicator = com.wang.avi.indicator.BallScaleRippleMultipleIndicator;
var BallSpinFadeLoaderIndicator = com.wang.avi.indicator.BallSpinFadeLoaderIndicator;
var BallTrianglePathIndicator = com.wang.avi.indicator.BallTrianglePathIndicator;
var BallZigZagDeflectIndicator = com.wang.avi.indicator.BallZigZagDeflectIndicator;
var BallZigZagIndicator = com.wang.avi.indicator.BallZigZagIndicator;
var BaseIndicatorController = com.wang.avi.indicator.BaseIndicatorController;
var CubeTransitionIndicator = com.wang.avi.indicator.CubeTransitionIndicator;
var LineScaleIndicator = com.wang.avi.indicator.LineScaleIndicator;
var LineScalePartyIndicator = com.wang.avi.indicator.LineScalePartyIndicator;
var LineScalePulseOutIndicator = com.wang.avi.indicator.LineScalePulseOutIndicator;
var LineScalePulseOutRapidIndicator = com.wang.avi.indicator.LineScalePulseOutRapidIndicator;
var LineSpinFadeLoaderIndicator = com.wang.avi.indicator.LineSpinFadeLoaderIndicator;
var PacmanIndicator = com.wang.avi.indicator.PacmanIndicator;
var SemiCircleSpinIndicator = com.wang.avi.indicator.SemiCircleSpinIndicator;
var SquareSpinIndicator = com.wang.avi.indicator.SquareSpinIndicator;
var TriangleSkewSpinIndicator = com.wang.avi.indicator.TriangleSkewSpinIndicator;
var BallPulse = 0;
var BallGridPulse = 1;
var BallClipRotate = 2;
var BallClipRotatePulse = 3;
var SquareSpin = 4;
var BallClipRotateMultiple = 5;
var BallPulseRise = 6;
var BallRotate = 7;
var CubeTransition = 8;
var BallZigZag = 9;
var BallZigZagDeflect = 10;
var BallTrianglePath = 11;
var BallScale = 12;
var LineScale = 13;
var LineScaleParty = 14;
var BallScaleMultiple = 15;
var BallPulseSync = 16;
var BallBeat = 17;
var LineScalePulseOut = 18;
var LineScalePulseOutRapid = 19;
var BallScaleRipple = 20;
var BallScaleRippleMultiple = 21;
var BallSpinFadeLoader = 22;
var LineSpinFadeLoader = 23;
var TriangleSkewSpin = 24;
var Pacman = 25;
var BallGridBeat = 26;
var SemiCircleSpin = 27;
function onIndicatorPropertyChanged(data) {
    var indicator = data.object;
    if (!indicator.android) {
        return;
    }
    indicator._setIndicator(data.newValue ? data.newValue : null);
}
function onIndicatorColorPropertyChanged(data) {
    var color = data.object;
    if (!color.android) {
        return;
    }
    color._setIndicatorColor(data.newValue ? data.newValue : null);
}
common.AwesomeLoaders.indicatorProperty.metadata.onSetNativeValue = onIndicatorPropertyChanged;
common.AwesomeLoaders.indicatorColorProperty.metadata.onSetNativeValue = onIndicatorColorPropertyChanged;
var AwesomeLoaders = (function (_super) {
    __extends(AwesomeLoaders, _super);
    function AwesomeLoaders() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(AwesomeLoaders.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    AwesomeLoaders.prototype._createUI = function () {
        if (!this.indicator)
            return;
        this._android = new com.wang.avi.AVLoadingIndicatorView(this._context);
    };
    AwesomeLoaders.prototype._setIndicator = function (indicator) {
        if (!indicator)
            return;
        switch (indicator) {
            case 'BallPulse':
                this._android.setIndicator(new BallPulseIndicator());
                break;
            case 'BallGridPulse':
                this._android.setIndicator(new BallGridPulseIndicator());
                break;
            case 'BallClipRotate':
                this._android.setIndicator(new BallClipRotateIndicator());
                break;
            case 'BallClipRotatePulse':
                this._android.setIndicator(new BallClipRotatePulseIndicator());
                break;
            case 'SquareSpin':
                this._android.setIndicator(new SquareSpinIndicator());
                break;
            case 'BallClipRotateMultiple':
                this._android.setIndicator(new BallClipRotateMultipleIndicator());
                break;
            case 'BallPulseRise':
                this._android.setIndicator(new BallPulseRiseIndicator());
                break;
            case 'BallRotate':
                this._android.setIndicator(new BallRotateIndicator());
                break;
            case 'CubeTransition':
                this._android.setIndicator(new CubeTransitionIndicator());
                break;
            case 'BallZigZag':
                this._android.setIndicator(new BallZigZagIndicator());
                break;
            case 'BallZigZagDeflect':
                this._android.setIndicator(new BallZigZagDeflectIndicator());
                break;
            case 'BallTrianglePath':
                this._android.setIndicator(new BallTrianglePathIndicator());
                break;
            case 'BallScale':
                this._android.setIndicator(new BallScaleIndicator());
                break;
            case 'LineScale':
                this._android.setIndicator(new LineScaleIndicator());
                break;
            case 'LineScaleParty':
                this._android.setIndicator(new LineScalePartyIndicator());
                break;
            case 'BallScaleMultiple':
                this._android.setIndicator(new BallScaleMultipleIndicator());
                break;
            case 'BallPulseSync':
                this._android.setIndicator(new BallPulseSyncIndicator());
                break;
            case 'BallBeat':
                this._android.setIndicator(new BallBeatIndicator());
                break;
            case 'LineScalePulseOut':
                this._android.setIndicator(new LineScalePulseOutIndicator());
                break;
            case 'LineScalePulseOutRapid':
                this._android.setIndicator(new LineScalePulseOutRapidIndicator());
                break;
            case 'BallScaleRipple':
                this._android.setIndicator(new BallScaleRippleIndicator());
                break;
            case 'BallScaleRippleMultiple':
                this._android.setIndicator(new BallScaleRippleMultipleIndicator());
                break;
            case 'BallSpinFadeLoader':
                this._android.setIndicator(new BallSpinFadeLoaderIndicator());
                break;
            case 'LineSpinFadeLoader':
                this._android.setIndicator(new LineSpinFadeLoaderIndicator());
                break;
            case 'TriangleSkewSpin':
                this._android.setIndicator(new TriangleSkewSpinIndicator());
                break;
            case 'Pacman':
                this._android.setIndicator(new PacmanIndicator());
                break;
            case 'BallGridBeat':
                this._android.setIndicator(new BallGridBeatIndicator());
                break;
            case 'SemiCircleSpin':
                this._android.setIndicator(new SemiCircleSpinIndicator());
                break;
        }
    };
    AwesomeLoaders.prototype._setIndicatorColor = function (color) {
        if (color) {
            var data = new color_1.Color(color);
            this._android.setColor(data.android);
        }
    };
    return AwesomeLoaders;
}(common.AwesomeLoaders));
exports.AwesomeLoaders = AwesomeLoaders;
//# sourceMappingURL=awesome-loaders.js.map