'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _util = require('./../../utils/util.js');

var _user = require('./../../services/user.js');

var _api = require('./../../config/api.js');

var _api2 = _interopRequireDefault(_api);

var _config = require('./../../config/config.js');

var _qqmapWxJssdk = require('./../../utils/qqmap-wx-jssdk.js');

var _qqmapWxJssdk2 = _interopRequireDefault(_qqmapWxJssdk);

var _getmobile = require('./../../components/getmobile.js');

var _getmobile2 = _interopRequireDefault(_getmobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var title = _api2.default.title;

var Edit = function (_wepy$page) {
  _inherits(Edit, _wepy$page);

  function Edit() {
    var _ref;

    var _temp, _this2, _ret;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, Edit);

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Edit.__proto__ || Object.getPrototypeOf(Edit)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      usingComponents: {
        'wxc-button': '../../../packages/@minui/wxc-button/dist/index',
        'wxc-input': '../../../packages/@minui/wxc-input/dist/index',
        'wxc-list': '../../../packages/@minui/wxc-list/dist/index',
        'wxc-cc': '../../../packages/@minui/wxc-cc/dist/index'
      }
    }, _this2.$repeat = {}, _this2.$props = { "v-getmobile": { "callback": "setMobile" } }, _this2.$events = {}, _this2.components = {
      'v-getmobile': _getmobile2.default
    }, _this2.mixins = [], _this2.data = {
      bannar: [{
        image_url: 'https://nideshop-admin-dva-1256171234.cos.ap-beijing.myqcloud.com/river/static/%E9%A1%B9%E7%9B%AE%E5%9B%9B/edit.jpg',
        link: ''
      }],
      partner: ['全国'],
      levelList: [{
        id: 1,
        name: '原价18 现价10元（全国）',
        original_price: 18,
        price: 10,
        desc: '全国'
        // desc: `你的粉丝购买商品或者加入${title}等，您可获得提成，躺着就能赚钱`
      }],
      topList: ['置顶一天（收费1.00元）', '置顶一周（收费5.00元）', '置顶一月（收费15.00元）'],
      adcode: '',
      address: '',
      location: {},
      position: "",
      changedFields: {
        is_decoration: false,
        is_rating: false,
        is_top: false,
        is_agreed: false,
        level: 0,
        top_level: 1,
        primary_img_url: "",
        mobile: "",
        post_images: []
      },
      userInfo: {},
      others: {}
    }, _this2.computed = {}, _this2.methods = {}, _this2.events = {
      'bindtap': function bindtap() {}

      /* 经纬度对象转字符串
       * @method location2position
       * @param {Object}
       * @return {String} 经度_纬度
      */
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Edit, [{
    key: 'location2position',
    value: function location2position(location) {
      return [location.longitude, location.latitude].join('_');
    }
    /* 获取当前位置经纬度和描述
     * @method getLocal
     * @param {}
     * @return {String, Object} 所在位置的行政区划代码，所在位置的省市区名称
    */

  }, {
    key: 'getLocal',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var qqmapsdk, lres, location, addressRes, _addressRes$result, adcode, address, currentRegion;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                qqmapsdk = new _qqmapWxJssdk2.default({
                  key: _config.qqmap.key
                });

                qqmapsdk.reverseGeocoderP = function (obj) {
                  return new Promise(function (resolve, reject) {
                    qqmapsdk.reverseGeocoder(_extends({
                      success: function success(res) {
                        resolve(res);
                      }
                    }, obj));
                  });
                };

                _context.next = 4;
                return wx.getLocationP({
                  type: 'wgs84'
                });

              case 4:
                lres = _context.sent;
                location = {
                  latitude: lres.latitude,
                  longitude: lres.longitude
                };

                console.log('当前经纬度: ', location);

                _context.next = 9;
                return qqmapsdk.reverseGeocoderP({
                  location: {
                    latitude: lres.latitude,
                    longitude: lres.longitude
                  }
                });

              case 9:
                addressRes = _context.sent;

                console.log('当前位置描述', addressRes);

                _addressRes$result = addressRes.result, adcode = _addressRes$result.ad_info.adcode, address = _addressRes$result.address, currentRegion = _addressRes$result.address_component;


                console.log('行政区划代码', adcode);

                return _context.abrupt('return', { adcode: adcode, address: address, currentRegion: currentRegion, location: location });

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getLocal() {
        return _ref2.apply(this, arguments);
      }

      return getLocal;
    }()

    /* 点击定位按钮 */

  }, {
    key: 'bindLocate',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _ref4, adcode, address, location;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getLocal();

              case 2:
                _ref4 = _context2.sent;
                adcode = _ref4.adcode;
                address = _ref4.address;
                location = _ref4.location;


                this.adcode = adcode;
                this.address = address;
                this.location = location;
                this.position = this.location2position(location);
                this.changedFields.position = this.position;
                this.changedFields.position_description = this.address;

                this.$apply();

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function bindLocate() {
        return _ref3.apply(this, arguments);
      }

      return bindLocate;
    }()
  }, {
    key: 'chooseLocation',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var res, address, longitude, latitude, location;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return wx.chooseLocationP({
                  latitude: 38.9375,
                  longitude: 117.3571,
                  scale: 28
                });

              case 2:
                res = _context3.sent;

                console.log('res', res);
                address = res.address, longitude = res.longitude, latitude = res.latitude;
                location = { longitude: longitude, latitude: latitude };


                this.location = location;
                this.address = address;
                this.position = this.location2position(location);
                this.changedFields.position = this.position;
                this.changedFields.position_description = this.address;

                this.$apply();

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function chooseLocation() {
        return _ref5.apply(this, arguments);
      }

      return chooseLocation;
    }()
  }, {
    key: 'setMobile',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(number) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.changedFields.mobile = number;
                (0, _util.storage2data)(this);
                console.log(_util.storage2data);
                this.$apply();

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setMobile(_x) {
        return _ref6.apply(this, arguments);
      }

      return setMobile;
    }()

    /* 添加图片
     * @method addImage
     * @param {}
     * @return {} 
    */

  }, {
    key: 'addImage',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e) {
        var type, chooseRes, tempFilePaths, uploadRes, data, parseData;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                type = e.currentTarget.dataset.type;
                _context5.next = 3;
                return wx.chooseImageP({ count: 9 });

              case 3:
                chooseRes = _context5.sent;
                tempFilePaths = chooseRes.tempFilePaths;
                _context5.next = 7;
                return wx.uploadFileP({
                  url: _api2.default.PostImgAdd,
                  filePath: tempFilePaths[0],
                  name: 'post_img',
                  header: {
                    'X-Nideshop-Token': wx.getStorageSync('token')
                  }
                });

              case 7:
                uploadRes = _context5.sent;
                data = uploadRes.data;

                console.log('data, type', data, type);
                parseData = JSON.parse(data);

                if (type === 'imgs') {
                  this.changedFields.post_images.push(parseData.data);
                } else if (type === 'primary') {
                  this.changedFields.primary_img_url = parseData.data;
                }

                this.$apply();

              case 13:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function addImage(_x2) {
        return _ref7.apply(this, arguments);
      }

      return addImage;
    }()
  }, {
    key: 'changeCheckbox',
    value: function changeCheckbox(e) {
      console.log('e', e);
      var type = e.currentTarget.dataset.type;

      var currentFieldValue = this['changedFields'][type];
      this['changedFields'][type] = !currentFieldValue;
    }
  }, {
    key: 'changeLevel',
    value: function changeLevel(e) {
      console.log('level', e);
      this.changedFields.level = e.detail.value;
    }
  }, {
    key: 'changeTop',
    value: function changeTop(e) {
      console.log('top_level', e);
      this.changedFields.top_level = e.detail.value;
    }
  }, {
    key: 'close',
    value: function close(e) {
      console.log('e', e);
      var index = e.currentTarget.dataset.index;

      this.changedFields.post_images.splice(index, 1);
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this = this;
      console.log('this.$wxapp', this.$wxapp);
    }
  }, {
    key: 'onShow',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                console.log('show');
                _context6.next = 3;
                return (0, _user.loginByWeixin)();

              case 3:
                (0, _util.storage2data)(this);

                this.changedFields.mobile = this.userInfo.mobile;

              case 5:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function onShow() {
        return _ref8.apply(this, arguments);
      }

      return onShow;
    }()
  }, {
    key: 'addData',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _this, changedFields, userInfo, others, is_decoration, is_rating, is_top, top_level, remainder_before, status, alert, content, remainder_after, post_price, postResult, lastId, addImageArr, addResult, _content, res, _userInfo;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _this = this;
                changedFields = _this.changedFields, userInfo = _this.userInfo, others = _this.others;
                is_decoration = changedFields.is_decoration, is_rating = changedFields.is_rating, is_top = changedFields.is_top, top_level = changedFields.top_level;
                remainder_before = userInfo.remainder;
                status = others.status;

                alert = function alert(content) {
                  return wx.showModal({
                    title: '提示',
                    content: content,
                    showCancel: false
                  });
                };

                content = '';

                if (!(!changedFields.contacts || changedFields.contacts === '')) {
                  _context7.next = 10;
                  break;
                }

                alert('请输入联系人姓名');
                return _context7.abrupt('return');

              case 10:
                if (!(!changedFields.mobile || changedFields.mobile === '')) {
                  _context7.next = 13;
                  break;
                }

                alert('请输入或直接获取手机号码');
                return _context7.abrupt('return');

              case 13:
                if (!(status === 0)) {
                  _context7.next = 16;
                  break;
                }

                wx.showModal({
                  title: '提示',
                  content: '感谢您的关注，我们会尽快与您取得联系',
                  showCancel: false
                });
                return _context7.abrupt('return');

              case 16:
                remainder_after = remainder_before;
                // 计算价格

                post_price = 1000;

                if (is_decoration) {
                  post_price += 30000;
                }
                if (is_rating) {
                  post_price += 2000;
                }

                if (!is_top) {
                  _context7.next = 30;
                  break;
                }

                _context7.t0 = top_level;
                _context7.next = _context7.t0 === 0 ? 24 : _context7.t0 === 1 ? 26 : _context7.t0 === 2 ? 28 : 30;
                break;

              case 24:
                post_price += 100;
                return _context7.abrupt('break', 30);

              case 26:
                post_price += 500;
                return _context7.abrupt('break', 30);

              case 28:
                post_price += 1500;
                return _context7.abrupt('break', 30);

              case 30:
                // 免费发布次数抵扣
                if (remainder_before > 0) {
                  post_price -= 1000;
                  remainder_after = remainder_before - 1;
                }
                // 状态价格
                if (status === 0) {
                  post_price = 0;
                }

                post_price = parseFloat((post_price / 100).toFixed(2));
                // post_price = 0.01
                // 添加作者字段
                changedFields.user_id = this.userInfo.id;
                // 添加手机字段
                // changedFields.mobile = this.userInfo.mobile
                // 添加总价字段
                changedFields.post_price = post_price;
                if (post_price === 0) {
                  changedFields.status = 1;
                }
                console.log('changedFields', changedFields);
                _context7.next = 39;
                return (0, _util.request)(_api2.default.PostAdd, changedFields, 'POST');

              case 39:
                postResult = _context7.sent;
                lastId = postResult.data;

                console.log('lastId', lastId);

                addImageArr = [];

                changedFields.post_images.forEach(function (post_image) {
                  addImageArr.push({ post_id: lastId, img_url: post_image });
                });
                _context7.next = 46;
                return (0, _util.request)(_api2.default.PostImgAddRecord, addImageArr, 'POST');

              case 46:
                addResult = _context7.sent;

                console.log('addResult', addResult);

                if (!(post_price && post_price !== 0)) {
                  _context7.next = 52;
                  break;
                }

                this.pay(lastId, remainder_after);
                _context7.next = 64;
                break;

              case 52:
                _content = '';

                if (!(remainder_before !== remainder_after)) {
                  _context7.next = 62;
                  break;
                }

                _context7.next = 56;
                return (0, _util.request)(_api2.default.UserRuduceRemainder, { post_id: lastId, remainder_after: remainder_after }, "POST");

              case 56:
                res = _context7.sent;
                _userInfo = wx.getStorageSync('userInfo');

                _userInfo.remainder = remainder_after;
                wx.setStorageSync('userInfo', _userInfo);
                (0, _util.storage2data)(this);

                if (res.errno === 0) {
                  _content = '发布成功，正在审核中';
                } else {
                  _content = '发布成功';
                }

              case 62:
                _content = '发布成功，正在审核中...';
                wx.showModal({
                  title: '提示',
                  content: _content,
                  showCancel: false,
                  success: function success(res) {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '/pages/post/post'
                      });
                    }
                  }
                });

              case 64:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function addData() {
        return _ref9.apply(this, arguments);
      }

      return addData;
    }()
  }, {
    key: 'changeField',
    value: function changeField(e) {
      console.log('e', e);
      var type = e.currentTarget.dataset.type;
      var value = e.detail.value;

      this['changedFields'][type] = value;
    }
  }, {
    key: 'pay',
    value: function pay(lastId, remainder_after) {
      var _this = this;
      (0, _util.request)(_api2.default.ApplyPay, { post_id: lastId, remainder_after: remainder_after }, "POST").then(function (res) {
        console.log("申请分销商 res: ", res);
        if (res.errno === 1) {
          wx.showToast({ title: "申请中.." });
        } else {
          console.log("payPrepayId res: ", res);
          if (res.errno === 0) {
            var payParam = res.data;
            wx.requestPayment({
              'timeStamp': payParam.timeStamp,
              'nonceStr': payParam.nonceStr,
              'package': payParam.package,
              'signType': payParam.signType,
              'paySign': payParam.paySign,
              'success': function success(res) {
                console.log("success to requestPayment and res is: ", res);
                wx.showModal({
                  title: '提示',
                  content: '支付成功，正在审核中',
                  showCancel: false,
                  success: function success(res) {
                    var userInfo = wx.getStorageSync('userInfo');
                    userInfo.is_distributor = 1;
                    wx.setStorageSync('userInfo', userInfo);
                    if (res.confirm) {
                      wx.switchTab({
                        url: '/pages/ucenter/index/index'
                      });
                    }
                  }
                });
              },
              'fail': function fail(res) {
                console.log("fail to requestPayment and res is: ", res);
              }
            });
          } else {
            wx.showModal({
              title: '提示',
              content: '支付错误',
              showCancel: false
            });
          }
        }
      });
    }
  }, {
    key: 'changeMobile',
    value: function changeMobile(e) {
      this['changedFields']['mobile'] = e.detail.value;
    }
  }, {
    key: 'showAgreement',
    value: function showAgreement(e) {
      wx.showModal({
        title: '《合伙人须知》',
        content: '\u7528\u6237\u5728\u4F7F\u7528' + title + '\u63D0\u4F9B\u7684\u5404\u9879\u670D\u52A1\u7684\u540C\u4E8B\uFF0C\u627F\u8BFA\u63A5\u53D7\u5E76\u9075\u5B88\u5404\u9879\u89C4\u5B9A\u3001\u89C4\u5219\uFF0C' + title + '\u6709\u6743\u6839\u636E\u9700\u8981\u4E0D\u65F6\u7684\u4FEE\u6539\u672C\u534F\u8BAE\u548C\u89C4\u5219\uFF0C\u65B0\u89C4\u5219\u5728' + title + '\u53D1\u5E03\uFF0C\u5982\u6709\u7528\u6237\u8FDD\u53CD\u65B0\u89C4\u5219\uFF0C\u6D89\u53CA\u8FDD\u6CD5\u72AF\u7F6A\uFF0C\u6D89\u53CA\u4F20\u9500\u7B49\u6B3A\u8BC8\u624B\u6BB5\uFF0C' + title + '\u6709\u6743\u81EA\u52A8\u89E3\u9664\u4F1A\u5458\u8D44\u683C\uFF0C\u60C5\u8282\u4E25\u91CD\u7684\u53EF\u79FB\u4EA4\u53F8\u6CD5\u673A\u5173\u5904\u7406\u3002',
        showCancel: false
      });
    }
  }]);

  return Edit;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Edit , 'pages/edit/edit'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXQuanMiXSwibmFtZXMiOlsidGl0bGUiLCJhcGkiLCJFZGl0IiwiY29uZmlnIiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiVmdldG1vYmlsZSIsIm1peGlucyIsImRhdGEiLCJiYW5uYXIiLCJpbWFnZV91cmwiLCJsaW5rIiwicGFydG5lciIsImxldmVsTGlzdCIsImlkIiwibmFtZSIsIm9yaWdpbmFsX3ByaWNlIiwicHJpY2UiLCJkZXNjIiwidG9wTGlzdCIsImFkY29kZSIsImFkZHJlc3MiLCJsb2NhdGlvbiIsInBvc2l0aW9uIiwiY2hhbmdlZEZpZWxkcyIsImlzX2RlY29yYXRpb24iLCJpc19yYXRpbmciLCJpc190b3AiLCJpc19hZ3JlZWQiLCJsZXZlbCIsInRvcF9sZXZlbCIsInByaW1hcnlfaW1nX3VybCIsIm1vYmlsZSIsInBvc3RfaW1hZ2VzIiwidXNlckluZm8iLCJvdGhlcnMiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJldmVudHMiLCJsb25naXR1ZGUiLCJsYXRpdHVkZSIsImpvaW4iLCJxcW1hcHNkayIsIlFRTWFwV1giLCJrZXkiLCJxcW1hcCIsInJldmVyc2VHZW9jb2RlclAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJldmVyc2VHZW9jb2RlciIsInN1Y2Nlc3MiLCJyZXMiLCJvYmoiLCJ3eCIsImdldExvY2F0aW9uUCIsInR5cGUiLCJscmVzIiwiY29uc29sZSIsImxvZyIsImFkZHJlc3NSZXMiLCJyZXN1bHQiLCJhZF9pbmZvIiwiY3VycmVudFJlZ2lvbiIsImFkZHJlc3NfY29tcG9uZW50IiwiZ2V0TG9jYWwiLCJsb2NhdGlvbjJwb3NpdGlvbiIsInBvc2l0aW9uX2Rlc2NyaXB0aW9uIiwiJGFwcGx5IiwiY2hvb3NlTG9jYXRpb25QIiwic2NhbGUiLCJudW1iZXIiLCJzdG9yYWdlMmRhdGEiLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJjaG9vc2VJbWFnZVAiLCJjb3VudCIsImNob29zZVJlcyIsInRlbXBGaWxlUGF0aHMiLCJ1cGxvYWRGaWxlUCIsInVybCIsIlBvc3RJbWdBZGQiLCJmaWxlUGF0aCIsImhlYWRlciIsImdldFN0b3JhZ2VTeW5jIiwidXBsb2FkUmVzIiwicGFyc2VEYXRhIiwiSlNPTiIsInBhcnNlIiwicHVzaCIsImN1cnJlbnRGaWVsZFZhbHVlIiwiZGV0YWlsIiwidmFsdWUiLCJpbmRleCIsInNwbGljZSIsIl90aGlzIiwiJHd4YXBwIiwicmVtYWluZGVyX2JlZm9yZSIsInJlbWFpbmRlciIsInN0YXR1cyIsImFsZXJ0Iiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJjb250YWN0cyIsInJlbWFpbmRlcl9hZnRlciIsInBvc3RfcHJpY2UiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsInVzZXJfaWQiLCJQb3N0QWRkIiwicG9zdFJlc3VsdCIsImxhc3RJZCIsImFkZEltYWdlQXJyIiwiZm9yRWFjaCIsInBvc3RfaWQiLCJpbWdfdXJsIiwicG9zdF9pbWFnZSIsIlBvc3RJbWdBZGRSZWNvcmQiLCJhZGRSZXN1bHQiLCJwYXkiLCJVc2VyUnVkdWNlUmVtYWluZGVyIiwic2V0U3RvcmFnZVN5bmMiLCJlcnJubyIsImNvbmZpcm0iLCJzd2l0Y2hUYWIiLCJBcHBseVBheSIsInRoZW4iLCJzaG93VG9hc3QiLCJwYXlQYXJhbSIsInJlcXVlc3RQYXltZW50IiwidGltZVN0YW1wIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwic2lnblR5cGUiLCJwYXlTaWduIiwiaXNfZGlzdHJpYnV0b3IiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDRTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFUUEsSyxHQUFVQyxhLENBQVZELEs7O0lBRWFFLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLHVCQUFpQjtBQUNmLHNCQUFj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RUFBbURQLEdBQW5EO0FBQ0Q7QUExQmUsYUFBbEI7QUE0QkQsV0E5QkQsTUE4Qk87QUFDTEUsZUFBR2dELFNBQUgsQ0FBYTtBQUNYekcscUJBQU8sSUFESTtBQUVYMEcsdUJBQVMsTUFGRTtBQUdYQywwQkFBWTtBQUhELGFBQWI7QUFLRDtBQUNGO0FBQ0YsT0E3Q0Q7QUE4Q0Q7OztpQ0FFWS9CLEMsRUFBRztBQUNkLFdBQUssZUFBTCxFQUFzQixRQUF0QixJQUFrQ0EsRUFBRW1CLE1BQUYsQ0FBU0MsS0FBM0M7QUFDRDs7O2tDQUVhcEIsQyxFQUFHO0FBQ2ZuQixTQUFHZ0QsU0FBSCxDQUFhO0FBQ1h6RyxlQUFPLFNBREk7QUFFWDBHLG9EQUFpQjFHLEtBQWpCLG9LQUFtREEsS0FBbkQsNElBQWlGQSxLQUFqRiw0TEFBdUhBLEtBQXZILGlLQUZXO0FBR1gyRyxvQkFBWTtBQUhELE9BQWI7QUFLRDs7OztFQTdaK0JrQyxlQUFLQyxJOztrQkFBbEI1SSxJIiwiZmlsZSI6ImVkaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCB7IHJlcXVlc3QsIHN0b3JhZ2UyZGF0YSB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnXHJcbiAgaW1wb3J0IHsgbG9naW5CeVdlaXhpbiB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3VzZXInXHJcbiAgaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9jb25maWcvYXBpJ1xyXG4gIGltcG9ydCB7IHFxbWFwIH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZydcclxuICBpbXBvcnQgUVFNYXBXWCBmcm9tICcuLi8uLi91dGlscy9xcW1hcC13eC1qc3Nkay5qcydcclxuICBpbXBvcnQgVmdldG1vYmlsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dldG1vYmlsZSdcclxuXHJcbiAgY29uc3QgeyB0aXRsZSB9ID0gYXBpXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcclxuICAgICAgICAnd3hjLWJ1dHRvbic6ICcuLi8uLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWJ1dHRvbi9kaXN0L2luZGV4JyxcclxuICAgICAgICAnd3hjLWlucHV0JzogJy4uLy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtaW5wdXQvZGlzdC9pbmRleCcsXHJcbiAgICAgICAgJ3d4Yy1saXN0JzogJy4uLy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtbGlzdC9kaXN0L2luZGV4JyxcclxuICAgICAgICAnd3hjLWNjJzogJy4uLy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtY2MvZGlzdC9pbmRleCdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInYtZ2V0bW9iaWxlXCI6e1wiY2FsbGJhY2tcIjpcInNldE1vYmlsZVwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICd2LWdldG1vYmlsZSc6IFZnZXRtb2JpbGVcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGJhbm5hcjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGltYWdlX3VybDogJ2h0dHBzOi8vbmlkZXNob3AtYWRtaW4tZHZhLTEyNTYxNzEyMzQuY29zLmFwLWJlaWppbmcubXlxY2xvdWQuY29tL3JpdmVyL3N0YXRpYy8lRTklQTElQjklRTclOUIlQUUlRTUlOUIlOUIvZWRpdC5qcGcnLFxyXG4gICAgICAgICAgbGluazogJydcclxuICAgICAgICB9XHJcbiAgICAgIF0sXHJcbiAgICAgIHBhcnRuZXI6IFsgJ+WFqOWbvScgXSxcclxuICAgICAgbGV2ZWxMaXN0OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICBuYW1lOiAn5Y6f5Lu3MTgg546w5Lu3MTDlhYPvvIjlhajlm73vvIknLFxyXG4gICAgICAgICAgb3JpZ2luYWxfcHJpY2U6IDE4LFxyXG4gICAgICAgICAgcHJpY2U6IDEwLFxyXG4gICAgICAgICAgZGVzYzogJ+WFqOWbvSdcclxuICAgICAgICAgIC8vIGRlc2M6IGDkvaDnmoTnsonkuJ3otK3kubDllYblk4HmiJbogIXliqDlhaUke3RpdGxlfeetie+8jOaCqOWPr+iOt+W+l+aPkOaIkO+8jOi6uuedgOWwseiDvei1mumSsWBcclxuICAgICAgICB9XHJcbiAgICAgIF0sXHJcbiAgICAgIHRvcExpc3Q6IFsn572u6aG25LiA5aSp77yI5pS26LS5MS4wMOWFg++8iScsICfnva7pobbkuIDlkajvvIjmlLbotLk1LjAw5YWD77yJJywgJ+e9rumhtuS4gOaciO+8iOaUtui0uTE1LjAw5YWD77yJJ10sXHJcbiAgICAgIGFkY29kZTogJycsXHJcbiAgICAgIGFkZHJlc3M6ICcnLFxyXG4gICAgICBsb2NhdGlvbjoge30sXHJcbiAgICAgIHBvc2l0aW9uOiBcIlwiLFxyXG4gICAgICBjaGFuZ2VkRmllbGRzOiB7XHJcbiAgICAgICAgaXNfZGVjb3JhdGlvbjogZmFsc2UsXHJcbiAgICAgICAgaXNfcmF0aW5nOiBmYWxzZSxcclxuICAgICAgICBpc190b3A6IGZhbHNlLFxyXG4gICAgICAgIGlzX2FncmVlZDogZmFsc2UsXHJcbiAgICAgICAgbGV2ZWw6IDAsXHJcbiAgICAgICAgdG9wX2xldmVsOiAxLFxyXG4gICAgICAgIHByaW1hcnlfaW1nX3VybDogXCJcIixcclxuICAgICAgICBtb2JpbGU6IFwiXCIsXHJcbiAgICAgICAgcG9zdF9pbWFnZXM6IFtdXHJcbiAgICAgIH0sXHJcbiAgICAgIHVzZXJJbmZvOiB7fSxcclxuICAgICAgb3RoZXJzOiB7fVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge31cclxuXHJcbiAgICBtZXRob2RzID0ge31cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICdiaW5kdGFwJzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiDnu4/nuqzluqblr7nosaHovazlrZfnrKbkuLJcclxuICAgICAqIEBtZXRob2QgbG9jYXRpb24ycG9zaXRpb25cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fVxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSDnu4/luqZf57qs5bqmXHJcbiAgICAqL1xyXG4gICAgbG9jYXRpb24ycG9zaXRpb24obG9jYXRpb24pIHtcclxuICAgICAgcmV0dXJuIFsgbG9jYXRpb24ubG9uZ2l0dWRlLCBsb2NhdGlvbi5sYXRpdHVkZSBdLmpvaW4oJ18nKVxyXG4gICAgfVxyXG4gICAgLyog6I635Y+W5b2T5YmN5L2N572u57uP57qs5bqm5ZKM5o+P6L+wXHJcbiAgICAgKiBAbWV0aG9kIGdldExvY2FsXHJcbiAgICAgKiBAcGFyYW0ge31cclxuICAgICAqIEByZXR1cm4ge1N0cmluZywgT2JqZWN0fSDmiYDlnKjkvY3nva7nmoTooYzmlL/ljLrliJLku6PnoIHvvIzmiYDlnKjkvY3nva7nmoTnnIHluILljLrlkI3np7BcclxuICAgICovXHJcbiAgICBhc3luYyBnZXRMb2NhbCgpIHtcclxuICAgICAgY29uc3QgcXFtYXBzZGsgPSBuZXcgUVFNYXBXWCh7XHJcbiAgICAgICAga2V5OiBxcW1hcC5rZXlcclxuICAgICAgfSlcclxuICAgICAgcXFtYXBzZGsucmV2ZXJzZUdlb2NvZGVyUCA9IG9iaiA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgcXFtYXBzZGsucmV2ZXJzZUdlb2NvZGVyKHtcclxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlcylcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAuLi5vYmpcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgY29uc3QgbHJlcyA9IGF3YWl0IHd4LmdldExvY2F0aW9uUCh7XHJcbiAgICAgICAgdHlwZTogJ3dnczg0J1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgY29uc3QgbG9jYXRpb24gPSB7XHJcbiAgICAgICAgbGF0aXR1ZGU6IGxyZXMubGF0aXR1ZGUsXHJcbiAgICAgICAgbG9uZ2l0dWRlOiBscmVzLmxvbmdpdHVkZVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKCflvZPliY3nu4/nuqzluqY6ICcsIGxvY2F0aW9uKVxyXG5cclxuICAgICAgY29uc3QgYWRkcmVzc1JlcyA9IGF3YWl0IHFxbWFwc2RrLnJldmVyc2VHZW9jb2RlclAoe1xyXG4gICAgICAgIGxvY2F0aW9uOiB7XHJcbiAgICAgICAgICBsYXRpdHVkZTogbHJlcy5sYXRpdHVkZSxcclxuICAgICAgICAgIGxvbmdpdHVkZTogbHJlcy5sb25naXR1ZGVcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIGNvbnNvbGUubG9nKCflvZPliY3kvY3nva7mj4/ov7AnLCBhZGRyZXNzUmVzKVxyXG5cclxuICAgICAgY29uc3Qge1xyXG4gICAgICAgIHJlc3VsdDoge1xyXG4gICAgICAgICAgYWRfaW5mbzoge1xyXG4gICAgICAgICAgICBhZGNvZGVcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBhZGRyZXNzLFxyXG4gICAgICAgICAgYWRkcmVzc19jb21wb25lbnQ6IGN1cnJlbnRSZWdpb25cclxuICAgICAgICB9XHJcbiAgICAgIH0gPSBhZGRyZXNzUmVzXHJcblxyXG4gICAgICBjb25zb2xlLmxvZygn6KGM5pS/5Yy65YiS5Luj56CBJywgYWRjb2RlKVxyXG5cclxuICAgICAgcmV0dXJuIHsgYWRjb2RlLCBhZGRyZXNzLCBjdXJyZW50UmVnaW9uLCBsb2NhdGlvbiB9XHJcbiAgICB9XHJcblxyXG4gICAgLyog54K55Ye75a6a5L2N5oyJ6ZKuICovXHJcbiAgICBhc3luYyBiaW5kTG9jYXRlKCkge1xyXG4gICAgICBjb25zdCB7IGFkY29kZSwgYWRkcmVzcywgbG9jYXRpb24gfSA9IGF3YWl0IHRoaXMuZ2V0TG9jYWwoKVxyXG4gICAgICBcclxuICAgICAgdGhpcy5hZGNvZGUgPSBhZGNvZGVcclxuICAgICAgdGhpcy5hZGRyZXNzID0gYWRkcmVzc1xyXG4gICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb25cclxuICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMubG9jYXRpb24ycG9zaXRpb24obG9jYXRpb24pXHJcbiAgICAgIHRoaXMuY2hhbmdlZEZpZWxkcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb25cclxuICAgICAgdGhpcy5jaGFuZ2VkRmllbGRzLnBvc2l0aW9uX2Rlc2NyaXB0aW9uID0gdGhpcy5hZGRyZXNzXHJcblxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY2hvb3NlTG9jYXRpb24oKSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHd4LmNob29zZUxvY2F0aW9uUCh7XHJcbiAgICAgICAgbGF0aXR1ZGU6IDM4LjkzNzUsXHJcbiAgICAgICAgbG9uZ2l0dWRlOiAxMTcuMzU3MSxcclxuICAgICAgICBzY2FsZTogMjhcclxuICAgICAgfSlcclxuICAgICAgY29uc29sZS5sb2coJ3JlcycsIHJlcylcclxuICAgICAgY29uc3QgeyBhZGRyZXNzLCBsb25naXR1ZGUsIGxhdGl0dWRlIH0gPSByZXNcclxuICAgICAgY29uc3QgbG9jYXRpb24gPSB7IGxvbmdpdHVkZSwgbGF0aXR1ZGUgfVxyXG5cclxuICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uXHJcbiAgICAgIHRoaXMuYWRkcmVzcyA9IGFkZHJlc3NcclxuICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMubG9jYXRpb24ycG9zaXRpb24obG9jYXRpb24pXHJcbiAgICAgIHRoaXMuY2hhbmdlZEZpZWxkcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb25cclxuICAgICAgdGhpcy5jaGFuZ2VkRmllbGRzLnBvc2l0aW9uX2Rlc2NyaXB0aW9uID0gdGhpcy5hZGRyZXNzXHJcblxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgc2V0TW9iaWxlKG51bWJlcikge1xyXG4gICAgICB0aGlzLmNoYW5nZWRGaWVsZHMubW9iaWxlID0gbnVtYmVyXHJcbiAgICAgIHN0b3JhZ2UyZGF0YSh0aGlzKVxyXG4gICAgICBjb25zb2xlLmxvZyhzdG9yYWdlMmRhdGEpXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH1cclxuXHJcbiAgICAvKiDmt7vliqDlm77niYdcclxuICAgICAqIEBtZXRob2QgYWRkSW1hZ2VcclxuICAgICAqIEBwYXJhbSB7fVxyXG4gICAgICogQHJldHVybiB7fSBcclxuICAgICovXHJcbiAgICBhc3luYyBhZGRJbWFnZShlKSB7XHJcbiAgICAgIGNvbnN0IHsgdHlwZSB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRcclxuICAgICAgY29uc3QgY2hvb3NlUmVzID0gYXdhaXQgd3guY2hvb3NlSW1hZ2VQKHsgY291bnQ6IDkgfSlcclxuICAgICAgY29uc3QgeyB0ZW1wRmlsZVBhdGhzIH0gPSBjaG9vc2VSZXNcclxuICAgICAgY29uc3QgdXBsb2FkUmVzID0gYXdhaXQgd3gudXBsb2FkRmlsZVAoe1xyXG4gICAgICAgIHVybDogYXBpLlBvc3RJbWdBZGQsXHJcbiAgICAgICAgZmlsZVBhdGg6IHRlbXBGaWxlUGF0aHNbMF0sXHJcbiAgICAgICAgbmFtZTogJ3Bvc3RfaW1nJyxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICdYLU5pZGVzaG9wLVRva2VuJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gdXBsb2FkUmVzXHJcbiAgICAgIGNvbnNvbGUubG9nKCdkYXRhLCB0eXBlJywgZGF0YSwgdHlwZSlcclxuICAgICAgY29uc3QgcGFyc2VEYXRhID0gSlNPTi5wYXJzZShkYXRhKVxyXG4gICAgICBpZiAodHlwZSA9PT0gJ2ltZ3MnKSB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkRmllbGRzLnBvc3RfaW1hZ2VzLnB1c2gocGFyc2VEYXRhLmRhdGEpXHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3ByaW1hcnknKSB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkRmllbGRzLnByaW1hcnlfaW1nX3VybCA9IHBhcnNlRGF0YS5kYXRhXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH1cclxuICAgIGNoYW5nZUNoZWNrYm94KGUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2UnLCBlKVxyXG4gICAgICBjb25zdCB7IHR5cGUgfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRGaWVsZFZhbHVlID0gdGhpc1snY2hhbmdlZEZpZWxkcyddW3R5cGVdXHJcbiAgICAgIHRoaXNbJ2NoYW5nZWRGaWVsZHMnXVt0eXBlXSA9ICFjdXJyZW50RmllbGRWYWx1ZVxyXG4gICAgfVxyXG4gICAgY2hhbmdlTGV2ZWwoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnbGV2ZWwnLCBlKVxyXG4gICAgICB0aGlzLmNoYW5nZWRGaWVsZHMubGV2ZWwgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgfVxyXG4gICAgY2hhbmdlVG9wKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3RvcF9sZXZlbCcsIGUpXHJcbiAgICAgIHRoaXMuY2hhbmdlZEZpZWxkcy50b3BfbGV2ZWwgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgfVxyXG4gICAgY2xvc2UoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZScsIGUpXHJcbiAgICAgIGNvbnN0IHsgaW5kZXggfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0XHJcbiAgICAgIHRoaXMuY2hhbmdlZEZpZWxkcy5wb3N0X2ltYWdlcy5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICB9XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIGxldCBfdGhpcyA9IHRoaXNcclxuICAgICAgY29uc29sZS5sb2coJ3RoaXMuJHd4YXBwJywgdGhpcy4kd3hhcHApXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgb25TaG93KCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnc2hvdycpXHJcbiAgICAgIGF3YWl0IGxvZ2luQnlXZWl4aW4oKVxyXG4gICAgICBzdG9yYWdlMmRhdGEodGhpcylcclxuXHJcbiAgICAgIHRoaXMuY2hhbmdlZEZpZWxkcy5tb2JpbGUgPSB0aGlzLnVzZXJJbmZvLm1vYmlsZVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGFkZERhdGEoKSB7XHJcbiAgICAgIGNvbnN0IF90aGlzID0gdGhpc1xyXG4gICAgICBjb25zdCB7IGNoYW5nZWRGaWVsZHMsIHVzZXJJbmZvLCBvdGhlcnMgfSA9IF90aGlzXHJcbiAgICAgIGNvbnN0IHsgaXNfZGVjb3JhdGlvbiwgaXNfcmF0aW5nLCBpc190b3AsIHRvcF9sZXZlbCB9ID0gY2hhbmdlZEZpZWxkc1xyXG4gICAgICBjb25zdCB7IHJlbWFpbmRlcjogcmVtYWluZGVyX2JlZm9yZSB9ID0gdXNlckluZm9cclxuICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IG90aGVyc1xyXG4gICAgICBjb25zdCBhbGVydCA9IGNvbnRlbnQgPT4gd3guc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogJ+aPkOekuicsIFxyXG4gICAgICAgIGNvbnRlbnQsXHJcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGxldCBjb250ZW50ID0gJydcclxuICAgICAgaWYgKCFjaGFuZ2VkRmllbGRzLmNvbnRhY3RzIHx8IGNoYW5nZWRGaWVsZHMuY29udGFjdHMgPT09ICcnKSB7XHJcbiAgICAgICAgYWxlcnQoJ+ivt+i+k+WFpeiBlOezu+S6uuWnk+WQjScpXHJcbiAgICAgICAgcmV0dXJuICBcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFjaGFuZ2VkRmllbGRzLm1vYmlsZSB8fCBjaGFuZ2VkRmllbGRzLm1vYmlsZSA9PT0gJycpIHtcclxuICAgICAgICBhbGVydCgn6K+36L6T5YWl5oiW55u05o6l6I635Y+W5omL5py65Y+356CBJylcclxuICAgICAgICByZXR1cm4gIFxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc3RhdHVzID09PSAwKSB7XHJcbiAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JywgXHJcbiAgICAgICAgICBjb250ZW50OiAn5oSf6LCi5oKo55qE5YWz5rOo77yM5oiR5Lus5Lya5bC95b+r5LiO5oKo5Y+W5b6X6IGU57O7JyxcclxuICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHJlbWFpbmRlcl9hZnRlciA9IHJlbWFpbmRlcl9iZWZvcmU7XHJcbiAgICAgIC8vIOiuoeeul+S7t+agvFxyXG4gICAgICBsZXQgcG9zdF9wcmljZSA9IDEwMDBcclxuICAgICAgaWYgKGlzX2RlY29yYXRpb24pIHtcclxuICAgICAgICBwb3N0X3ByaWNlICs9IDMwMDAwXHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzX3JhdGluZykge1xyXG4gICAgICAgIHBvc3RfcHJpY2UgKz0gMjAwMFxyXG4gICAgICB9XHJcbiAgICAgIGlmIChpc190b3ApIHtcclxuICAgICAgICBzd2l0Y2ggKHRvcF9sZXZlbCkge1xyXG4gICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICBwb3N0X3ByaWNlICs9IDEwMFxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICBwb3N0X3ByaWNlICs9IDUwMFxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICBwb3N0X3ByaWNlICs9IDE1MDBcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8g5YWN6LS55Y+R5biD5qyh5pWw5oq15omjXHJcbiAgICAgIGlmIChyZW1haW5kZXJfYmVmb3JlID4gMCkge1xyXG4gICAgICAgIHBvc3RfcHJpY2UgLT0gMTAwMFxyXG4gICAgICAgIHJlbWFpbmRlcl9hZnRlciA9IHJlbWFpbmRlcl9iZWZvcmUgLSAxXHJcbiAgICAgIH1cclxuICAgICAgLy8g54q25oCB5Lu35qC8XHJcbiAgICAgIGlmIChzdGF0dXMgPT09IDApIHtcclxuICAgICAgICBwb3N0X3ByaWNlID0gMFxyXG4gICAgICB9XHJcblxyXG4gICAgICBwb3N0X3ByaWNlID0gcGFyc2VGbG9hdCgocG9zdF9wcmljZSAvIDEwMCkudG9GaXhlZCgyKSlcclxuICAgICAgLy8gcG9zdF9wcmljZSA9IDAuMDFcclxuICAgICAgLy8g5re75Yqg5L2c6ICF5a2X5q61XHJcbiAgICAgIGNoYW5nZWRGaWVsZHMudXNlcl9pZCA9IHRoaXMudXNlckluZm8uaWRcclxuICAgICAgLy8g5re75Yqg5omL5py65a2X5q61XHJcbiAgICAgIC8vIGNoYW5nZWRGaWVsZHMubW9iaWxlID0gdGhpcy51c2VySW5mby5tb2JpbGVcclxuICAgICAgLy8g5re75Yqg5oC75Lu35a2X5q61XHJcbiAgICAgIGNoYW5nZWRGaWVsZHMucG9zdF9wcmljZSA9IHBvc3RfcHJpY2VcclxuICAgICAgaWYgKHBvc3RfcHJpY2UgPT09IDApIHtcclxuICAgICAgICBjaGFuZ2VkRmllbGRzLnN0YXR1cyA9IDFcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZygnY2hhbmdlZEZpZWxkcycsIGNoYW5nZWRGaWVsZHMpXHJcbiAgICAgIGNvbnN0IHBvc3RSZXN1bHQgPSBhd2FpdCByZXF1ZXN0KGFwaS5Qb3N0QWRkLCBjaGFuZ2VkRmllbGRzLCAnUE9TVCcpXHJcbiAgICAgIGNvbnN0IHsgZGF0YTogbGFzdElkIH0gPSBwb3N0UmVzdWx0XHJcbiAgICAgIGNvbnNvbGUubG9nKCdsYXN0SWQnLCBsYXN0SWQpXHJcblxyXG4gICAgICBjb25zdCBhZGRJbWFnZUFyciA9IFtdXHJcbiAgICAgIGNoYW5nZWRGaWVsZHMucG9zdF9pbWFnZXMuZm9yRWFjaChwb3N0X2ltYWdlID0+IHtcclxuICAgICAgICBhZGRJbWFnZUFyci5wdXNoKHsgcG9zdF9pZDogbGFzdElkLCBpbWdfdXJsOiBwb3N0X2ltYWdlIH0pXHJcbiAgICAgIH0pXHJcbiAgICAgIGNvbnN0IGFkZFJlc3VsdCA9IGF3YWl0IHJlcXVlc3QoYXBpLlBvc3RJbWdBZGRSZWNvcmQsIGFkZEltYWdlQXJyLCAnUE9TVCcpXHJcbiAgICAgIGNvbnNvbGUubG9nKCdhZGRSZXN1bHQnLCBhZGRSZXN1bHQpXHJcbiAgICAgIGlmIChwb3N0X3ByaWNlICYmIHBvc3RfcHJpY2UgIT09IDApIHtcclxuICAgICAgICB0aGlzLnBheShsYXN0SWQsIHJlbWFpbmRlcl9hZnRlcilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgY29udGVudCA9ICcnXHJcbiAgICAgICAgaWYgKHJlbWFpbmRlcl9iZWZvcmUgIT09IHJlbWFpbmRlcl9hZnRlcikge1xyXG4gICAgICAgICAgLy8g5L2/55So5qyh5pWw5oq15omjXHJcbiAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KGFwaS5Vc2VyUnVkdWNlUmVtYWluZGVyLCB7IHBvc3RfaWQ6IGxhc3RJZCwgcmVtYWluZGVyX2FmdGVyIH0sIFwiUE9TVFwiKVxyXG5cclxuICAgICAgICAgIGNvbnN0IHVzZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJylcclxuICAgICAgICAgIHVzZXJJbmZvLnJlbWFpbmRlciA9IHJlbWFpbmRlcl9hZnRlclxyXG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJywgdXNlckluZm8pXHJcbiAgICAgICAgICBzdG9yYWdlMmRhdGEodGhpcylcclxuXHJcbiAgICAgICAgICBpZiAocmVzLmVycm5vID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSAn5Y+R5biD5oiQ5Yqf77yM5q2j5Zyo5a6h5qC45LitJ1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGVudCA9ICflj5HluIPmiJDlip8nXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRlbnQgPSAn5Y+R5biD5oiQ5Yqf77yM5q2j5Zyo5a6h5qC45LitLi4uJ1xyXG4gICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsIFxyXG4gICAgICAgICAgY29udGVudCxcclxuICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLCBcclxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICB3eC5zd2l0Y2hUYWIoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL3Bvc3QvcG9zdCdcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUZpZWxkKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2UnLCBlKVxyXG4gICAgICBjb25zdCB7IHR5cGUgfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0XHJcbiAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IGUuZGV0YWlsXHJcbiAgICAgIHRoaXNbJ2NoYW5nZWRGaWVsZHMnXVt0eXBlXSA9IHZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgcGF5KGxhc3RJZCwgcmVtYWluZGVyX2FmdGVyKSB7XHJcbiAgICAgIGNvbnN0IF90aGlzID0gdGhpc1xyXG4gICAgICByZXF1ZXN0KGFwaS5BcHBseVBheSwgeyBwb3N0X2lkOiBsYXN0SWQsIHJlbWFpbmRlcl9hZnRlciB9LCBcIlBPU1RcIilcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi55Sz6K+35YiG6ZSA5ZWGIHJlczogXCIsIHJlcylcclxuICAgICAgICBpZihyZXMuZXJybm8gPT09IDEpe1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6IFwi55Sz6K+35LitLi5cIiB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwYXlQcmVwYXlJZCByZXM6IFwiLCByZXMpXHJcbiAgICAgICAgICBpZiAocmVzLmVycm5vID09PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXlQYXJhbSA9IHJlcy5kYXRhXHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3RQYXltZW50KHtcclxuICAgICAgICAgICAgICAndGltZVN0YW1wJzogcGF5UGFyYW0udGltZVN0YW1wLFxyXG4gICAgICAgICAgICAgICdub25jZVN0cic6IHBheVBhcmFtLm5vbmNlU3RyLFxyXG4gICAgICAgICAgICAgICdwYWNrYWdlJzogcGF5UGFyYW0ucGFja2FnZSxcclxuICAgICAgICAgICAgICAnc2lnblR5cGUnOiBwYXlQYXJhbS5zaWduVHlwZSxcclxuICAgICAgICAgICAgICAncGF5U2lnbic6IHBheVBhcmFtLnBheVNpZ24sXHJcbiAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3MgdG8gcmVxdWVzdFBheW1lbnQgYW5kIHJlcyBpczogXCIsIHJlcylcclxuICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7IFxyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsIFxyXG4gICAgICAgICAgICAgICAgICBjb250ZW50OiAn5pSv5LuY5oiQ5Yqf77yM5q2j5Zyo5a6h5qC45LitJywgXHJcbiAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJylcclxuICAgICAgICAgICAgICAgICAgICB1c2VySW5mby5pc19kaXN0cmlidXRvciA9IDFcclxuICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlckluZm8nLCB1c2VySW5mbylcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy91Y2VudGVyL2luZGV4L2luZGV4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAnZmFpbCc6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmFpbCB0byByZXF1ZXN0UGF5bWVudCBhbmQgcmVzIGlzOiBcIiwgcmVzKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7IFxyXG4gICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JywgXHJcbiAgICAgICAgICAgICAgY29udGVudDogJ+aUr+S7mOmUmeivrycsIFxyXG4gICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZU1vYmlsZShlKSB7XHJcbiAgICAgIHRoaXNbJ2NoYW5nZWRGaWVsZHMnXVsnbW9iaWxlJ10gPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dBZ3JlZW1lbnQoZSkge1xyXG4gICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn44CK5ZCI5LyZ5Lq66aG755+l44CLJyxcclxuICAgICAgICBjb250ZW50OiBg55So5oi35Zyo5L2/55SoJHt0aXRsZX3mj5DkvpvnmoTlkITpobnmnI3liqHnmoTlkIzkuovvvIzmib/or7rmjqXlj5flubbpgbXlrojlkITpobnop4TlrprjgIHop4TliJnvvIwke3RpdGxlfeacieadg+agueaNrumcgOimgeS4jeaXtueahOS/ruaUueacrOWNj+iuruWSjOinhOWIme+8jOaWsOinhOWImeWcqCR7dGl0bGV95Y+R5biD77yM5aaC5pyJ55So5oi36L+d5Y+N5paw6KeE5YiZ77yM5raJ5Y+K6L+d5rOV54qv572q77yM5raJ5Y+K5Lyg6ZSA562J5qy66K+I5omL5q6177yMJHt0aXRsZX3mnInmnYPoh6rliqjop6PpmaTkvJrlkZjotYTmoLzvvIzmg4XoioLkuKXph43nmoTlj6/np7vkuqTlj7jms5XmnLrlhbPlpITnkIbjgIJgLFxyXG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=