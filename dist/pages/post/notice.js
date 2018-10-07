'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.components = {}, _this.mixins = [], _this.data = {}, _this.computed = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function onLoad() {}
    }, {
        key: 'onShow',
        value: function onShow() {}
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/post/notice'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGljZS5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZXZlbnRzIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTLEUsUUFDVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPLEUsUUFFUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVLEUsUUFFVkMsTSxHQUFTLEU7Ozs7O2lDQUVBLENBQUU7OztpQ0FFRixDQUFFOzs7O0VBaEJzQkMsZUFBS0MsSTs7a0JBQW5CVCxLIiwiZmlsZSI6Im5vdGljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge31cclxuICAgIGNvbXBvbmVudHMgPSB7fVxyXG5cclxuICAgIG1peGlucyA9IFtdXHJcblxyXG4gICAgZGF0YSA9IHt9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7fVxyXG5cclxuICAgIG1ldGhvZHMgPSB7fVxyXG5cclxuICAgIGV2ZW50cyA9IHt9XHJcblxyXG4gICAgb25Mb2FkKCkge31cclxuXHJcbiAgICBvblNob3coKSB7fVxyXG4gIH1cclxuIl19