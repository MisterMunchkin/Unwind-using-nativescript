"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application = require("tns-core-modules/application");
var stack_layout_1 = require("tns-core-modules/ui/layouts/stack-layout");
var label_1 = require("tns-core-modules/ui/label");
var scroll_view_1 = require("tns-core-modules/ui/scroll-view");
var grid_layout_1 = require("tns-core-modules/ui/layouts/grid-layout");
var repeater_1 = require("tns-core-modules/ui/repeater");
var nativescript_fontawesome_1 = require("nativescript-fontawesome");
var Common = (function (_super) {
    __extends(Common, _super);
    function Common() {
        var _this = _super.call(this) || this;
        _this.reviews = [];
        _this.scroll = true;
        _this.showHeader = true;
        _this.initscroll = true;
        _this.title = "Reviews";
        _this.sendText = "review";
        _this.likeQ = [];
        var self = _this;
        setTimeout(function () {
            _this.init();
        }, 100);
        var resources = application.getResources();
        resources["getratearray"] = function (rate) {
            var arrayofitems = [];
            for (var i = 0; i < 5; i++) {
                if (i < rate)
                    arrayofitems.push(true);
                else
                    arrayofitems.push(false);
            }
            return arrayofitems;
        };
        resources["reviewsDateTo"] = function (time) {
            switch (typeof time) {
                case "number":
                    break;
                case "string":
                    time = +new Date(time);
                    break;
                case "object":
                    if (time.constructor === Date)
                        time = time.getTime();
                    break;
                default:
                    time = +new Date();
            }
            var time_formats = [
                [60, "seconds", 1],
                [120, "1 minute ago", "1 minute from now"],
                [3600, "minutes", 60],
                [7200, "1 hour ago", "1 hour from now"],
                [86400, "hours", 3600],
                [172800, "Yesterday", "Tomorrow"],
                [604800, "days", 86400],
                [1209600, "Last week", "Next week"],
                [2419200, "weeks", 604800],
                [4838400, "Last month", "Next month"],
                [29030400, "months", 2419200],
                [58060800, "Last year", "Next year"],
                [2903040000, "years", 29030400],
                [5806080000, "Last century", "Next century"],
                [58060800000, "centuries", 2903040000]
            ];
            var seconds = (+new Date() - time) / 1000, token = "ago", list_choice = 1;
            if (seconds === 0) {
                return "Just now";
            }
            if (seconds < 0) {
                seconds = Math.abs(seconds);
                token = "from now";
                list_choice = 2;
            }
            var i = 0, format;
            while ((format = time_formats[i++]))
                if (seconds < format[0]) {
                    if (typeof format[2] === "string")
                        return format[list_choice];
                    else
                        return (Math.floor(seconds / format[2]) + " " + format[1] + " " + token);
                }
            return time;
        };
        application.setResources(resources);
        return _this;
    }
    Common.prototype.reviewCount = function () {
        var count = this.reviews.length;
        return this.title + " (" + count + ")";
    };
    Common.prototype.userNameAction = function (args) {
        var self = args.object.parent.parent.parent.parent.bindingContext;
        var obj = args.object;
        self.userAction(obj.get("dataid"));
    };
    Common.prototype.userImageAction = function (args) {
        var self = args.object.parent.parent.bindingContext;
        var obj = args.object;
        self.userAction(obj.get("dataid"));
    };
    Common.prototype.userAction = function (id) {
        var self = this;
        var index;
        index = self.reviews.filter(function (item) {
            return item.id == id;
        });
        index = self.reviews.indexOf(index[0]);
        self.notify({
            eventName: Common.userEvent,
            object: self,
            review: self.reviews[index]
        });
    };
    Common.prototype.LongPress = function (args) {
        var obj = args.object;
        var self = args.object.parent.bindingContext;
        var id = obj.get("dataid");
        var items = self.reviews.filter(function (item) {
            return item.id == id;
        });
        self.notify({
            eventName: Common.longEvent,
            object: self,
            item: items[0]
        });
    };
    Common.prototype.init = function () {
        var self = this;
        nativescript_fontawesome_1.Fontawesome.init();
        if (this.scroll === "false")
            this.scroll = false;
        else
            this.scroll = true;
        if (this.showHeader === "false")
            this.showHeader = false;
        else
            this.showHeader = true;
        var hrlight = this.parseOptions(new stack_layout_1.StackLayout(), {
            className: "hr-light"
        });
        this.headtitle = this.parseOptions(new label_1.Label(), {
            class: "review-title",
            text: this.reviewCount()
        });
        if (this.showHeader) {
            this.addChild(this.headtitle);
            this.addChild(hrlight);
        }
        var imageholder = "";
        if (this.imagetag)
            imageholder = this.imagetag;
        else
            imageholder =
                '<Image verticalAlignment="top" row="0" col="0" src="{{ image }}" class="review-userimage img-circle" height="45" width="45" stretch="fill" />';
        var plugin = "";
        if (this.plugin)
            plugin = this.plugin;
        if (this.scroll === true)
            this.scrollview = this.parseOptions(new scroll_view_1.ScrollView(), {
                row: 0
            });
        else
            this.scrollview = this.parseOptions(new stack_layout_1.StackLayout(), {
                row: 0
            });
        this.rep = new repeater_1.Repeater();
        if (this.reviews[this.reviews.length - 1])
            this.reviews[this.reviews.length - 1].scrolltome = "scrolltome";
        this.rep.items = this.reviews;
        this.rep.bindingContext = self;
        this.rep.id = "mainrep";
        var reviewsDateTo;
        if (this.dateHandler)
            reviewsDateTo = this.dateHandler;
        else
            reviewsDateTo = "reviewsDateTo";
        this.rep.itemTemplate = "\n        <GridLayout  dataid=\"{{ id,id }}\"  longPress=\"{{$parents['Repeater'].LongPress,$parents['Repeater'].LongPress}}\" " + plugin + " class=\"review\" rows=\"auto\" columns=\"auto,*\">\n        <StackLayout dataid=\"{{ id,id }}\" tap=\"{{$parents['Repeater'].userImageAction,$parents['Repeater'].userImageAction}}\"   verticalAlignment=\"top\" row=\"0\" col=\"0\" >\n        " + imageholder + "\n        </StackLayout>\n        <StackLayout class=\"review-details\" row=\"0\" col=\"1\">\n        <StackLayout orientation=\"horizontal\">\n          <Label row=\"0\" col=\"1\" dataid=\"{{ id,id }}\" tap=\"{{$parents['Repeater'].userNameAction,$parents['Repeater'].userNameAction }}\" text=\"{{ username }}\" class=\"review-username\" textWrap=\"true\" />\n          <Repeater items=\"{{ getratearray(rate) }}\">\n          <Repeater.itemsLayout>\n              <StackLayout class=\"review-stars-rate\" orientation=\"horizontal\" />\n          </Repeater.itemsLayout>\n          <Repeater.itemTemplate>\n          <Label  col=\"1\" class=\"fa review-star\" text=\"{{ $value ==true ? 'fa-star' :'fa-star-o' | fontawesome}}\"></Label> \n          </Repeater.itemTemplate>\n            </Repeater>\n          </StackLayout>\n          <Label row=\"1\" col=\"1\" text=\"{{ review }}\" class=\"review-text\" textWrap=\"true\" />\n          <Label row=\"0\" col=\"1\" text=\"{{ " + reviewsDateTo + "(datetime) }}\" class=\"review-datetime\" textWrap=\"true\" />\n          <StackLayout row=\"3\"  id=\"{{ scrolltome ? scrolltome : ''  }}\" />\n         </StackLayout>\n        </GridLayout>\n        ";
        if (this.scroll === true)
            this.scrollview.content = this.rep;
        else
            this.scrollview.addChild(this.rep);
        this.addChild(this.scrollview);
    };
    Common.prototype.refresh = function () {
        this.headtitle.text = this.reviewCount();
        this.rep.items = this.reviews;
        this.rep.refresh();
    };
    Common.prototype.parseOptions = function (view, options) {
        Object.keys(options).forEach(function (key, index) {
            if (key === "rows")
                options[key].forEach(function (value, index) {
                    view.addRow(new grid_layout_1.ItemSpec(1, value));
                });
            else if (key === "columns")
                options[key].forEach(function (value, index) {
                    view.addColumn(new grid_layout_1.ItemSpec(1, value));
                });
            else {
                view[key] = options[key];
            }
        });
        return view;
    };
    return Common;
}(stack_layout_1.StackLayout));
Common.userEvent = "user";
Common.longEvent = "long";
exports.Common = Common;
//# sourceMappingURL=reviews.common.js.map