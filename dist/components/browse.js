'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _util = require('./../utils/util.js');

var _api = require('./../config/api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this2, _ret;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _classCallCheck(this, Index);

        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
            usingComponents: {
                'wxc-rate': '../../packages/@minui/wxc-rate/dist/index',
                'wxc-label': '../../packages/@minui/wxc-label/dist/index'
            }
        }, _this2.components = {}, _this2.mixins = [], _this2.data = {
            up: 22,
            view: 33
        }, _this2.computed = {}, _this2.methods = {}, _this2.events = {
            'bindtap': function bindtap() {}
        }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function onLoad() {
            var _this = this;
            console.log('_this', _this);
        }
    }, {
        key: 'onShow',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function onShow() {
                return _ref2.apply(this, arguments);
            }

            return onShow;
        }()
    }]);

    return Index;
}(_wepy2.default.page);

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyb3dzZS5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsInVzaW5nQ29tcG9uZW50cyIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwidXAiLCJ2aWV3IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZXZlbnRzIiwiX3RoaXMiLCJjb25zb2xlIiwibG9nIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OzsyTEFDbkJDLE0sR0FBUztBQUNQQyw2QkFBaUI7QUFDZiw0QkFBWSwyQ0FERztBQUVmLDZCQUFhO0FBRkU7QUFEVixTLFNBTVRDLFUsR0FBYSxFLFNBRWJDLE0sR0FBUyxFLFNBRVRDLEksR0FBTztBQUNMQyxnQkFBSSxFQURDO0FBRUxDLGtCQUFNO0FBRkQsUyxTQUtQQyxRLEdBQVcsRSxTQUVYQyxPLEdBQVUsRSxTQUVWQyxNLEdBQVM7QUFDUCx1QkFBVyxtQkFBYSxDQUV2QjtBQUhNLFM7Ozs7O2lDQU1BO0FBQ1AsZ0JBQUlDLFFBQVEsSUFBWjtBQUNBQyxvQkFBUUMsR0FBUixDQUFZLE9BQVosRUFBcUJGLEtBQXJCO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE3QmdDRyxlQUFLQyxJOztrQkFBbkJmLEsiLCJmaWxlIjoiYnJvd3NlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgeyByZXF1ZXN0LCBzdG9yYWdlMmRhdGEgfSBmcm9tICcuLi91dGlscy91dGlsJ1xyXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vY29uZmlnL2FwaSdcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICAgICd3eGMtcmF0ZSc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXJhdGUvZGlzdC9pbmRleCcsXHJcbiAgICAgICAgJ3d4Yy1sYWJlbCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWxhYmVsL2Rpc3QvaW5kZXgnLFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRzID0ge31cclxuXHJcbiAgICBtaXhpbnMgPSBbXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIHVwOiAyMixcclxuICAgICAgdmlldzogMzNcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHt9XHJcblxyXG4gICAgbWV0aG9kcyA9IHt9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAnYmluZHRhcCc6ICguLi5hcmdzKSA9PiB7XHJcblxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICBsZXQgX3RoaXMgPSB0aGlzXHJcbiAgICAgIGNvbnNvbGUubG9nKCdfdGhpcycsIF90aGlzKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uU2hvdygpIHtcclxuXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=