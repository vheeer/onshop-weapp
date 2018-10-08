'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _util = require('./../../utils/util.js');

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
        // desc: '你的粉丝购买商品或者加入优选客平台等，您可获得提成，躺着就能赚钱'
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
                (0, _util.storage2data)(this);
                this.changedFields.mobile = this.userInfo.mobile;

              case 3:
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
        var _this, changedFields, userInfo, others, is_decoration, is_rating, is_top, top_level, remainder_before, status, remainder_after, post_price, postResult, lastId, addImageArr, addResult, content, res, _userInfo;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _this = this;
                changedFields = _this.changedFields, userInfo = _this.userInfo, others = _this.others;
                is_decoration = changedFields.is_decoration, is_rating = changedFields.is_rating, is_top = changedFields.is_top, top_level = changedFields.top_level;
                remainder_before = userInfo.remainder;
                status = others.status;
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
                  _context7.next = 19;
                  break;
                }

                _context7.t0 = top_level;
                _context7.next = _context7.t0 === 0 ? 13 : _context7.t0 === 1 ? 15 : _context7.t0 === 2 ? 17 : 19;
                break;

              case 13:
                post_price += 100;
                return _context7.abrupt('break', 19);

              case 15:
                post_price += 500;
                return _context7.abrupt('break', 19);

              case 17:
                post_price += 1500;
                return _context7.abrupt('break', 19);

              case 19:
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
                _context7.next = 28;
                return (0, _util.request)(_api2.default.PostAdd, changedFields, 'POST');

              case 28:
                postResult = _context7.sent;
                lastId = postResult.data;

                console.log('lastId', lastId);

                addImageArr = [];

                changedFields.post_images.forEach(function (post_image) {
                  addImageArr.push({ post_id: lastId, img_url: post_image });
                });
                _context7.next = 35;
                return (0, _util.request)(_api2.default.PostImgAddRecord, addImageArr, 'POST');

              case 35:
                addResult = _context7.sent;

                console.log('addResult', addResult);

                if (!(post_price && post_price !== 0)) {
                  _context7.next = 41;
                  break;
                }

                this.pay(lastId, remainder_after);
                _context7.next = 53;
                break;

              case 41:
                content = '';

                if (!(remainder_before !== remainder_after)) {
                  _context7.next = 51;
                  break;
                }

                _context7.next = 45;
                return (0, _util.request)(_api2.default.UserRuduceRemainder, { post_id: lastId, remainder_after: remainder_after }, "POST");

              case 45:
                res = _context7.sent;
                _userInfo = wx.getStorageSync('userInfo');

                _userInfo.remainder = remainder_after;
                wx.setStorageSync('userInfo', _userInfo);
                (0, _util.storage2data)(this);

                if (res.errno === 0) {
                  content = '发布成功，正在审核中';
                } else {
                  content = '发布成功';
                }

              case 51:
                content = '发布成功，正在审核中...';
                wx.showModal({
                  title: '提示',
                  content: content,
                  showCancel: false,
                  success: function success(res) {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '/pages/post/post'
                      });
                    }
                  }
                });

              case 53:
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
        // content: '优选客在使用优选客平台提供的各项服务的同事，承诺接受并遵守各项规定、规则，优选客平台有权根据需要不时的修改本协议和规则，新规则在优选客平台平台发布，如有优选客违反新规则，涉及违法犯罪，涉及传销等欺诈手段，优选客平台有权自动解除优选客，情节严重的可移交司法机关处理。\n佣金规则：1、下级购买商品为商品价格*0.02*分成比=佣金；2、推荐成为合伙人直接从下级加入费用提70%，二级加入费用提20%；该佣金规则持续到2018年10月1号0点，届时更改规则。'
        content: '优选客在使用优选客平台提供的各项服务的同事，承诺接受并遵守各项规定、规则，优选客平台有权根据需要不时的修改本协议和规则，新规则在优选客平台平台发布，如有优选客违反新规则，涉及违法犯罪，涉及传销等欺诈手段，优选客平台有权自动解除优选客，情节严重的可移交司法机关处理。',
        showCancel: false
      });
    }
  }]);

  return Edit;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Edit , 'pages/edit/edit'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXQuanMiXSwibmFtZXMiOlsiRWRpdCIsImNvbmZpZyIsInVzaW5nQ29tcG9uZW50cyIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIlZnZXRtb2JpbGUiLCJtaXhpbnMiLCJkYXRhIiwiYmFubmFyIiwiaW1hZ2VfdXJsIiwibGluayIsInBhcnRuZXIiLCJsZXZlbExpc3QiLCJpZCIsIm5hbWUiLCJvcmlnaW5hbF9wcmljZSIsInByaWNlIiwiZGVzYyIsInRvcExpc3QiLCJhZGNvZGUiLCJhZGRyZXNzIiwibG9jYXRpb24iLCJwb3NpdGlvbiIsImNoYW5nZWRGaWVsZHMiLCJpc19kZWNvcmF0aW9uIiwiaXNfcmF0aW5nIiwiaXNfdG9wIiwiaXNfYWdyZWVkIiwibGV2ZWwiLCJ0b3BfbGV2ZWwiLCJwcmltYXJ5X2ltZ191cmwiLCJtb2JpbGUiLCJwb3N0X2ltYWdlcyIsInVzZXJJbmZvIiwib3RoZXJzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZXZlbnRzIiwibG9uZ2l0dWRlIiwibGF0aXR1ZGUiLCJqb2luIiwicXFtYXBzZGsiLCJRUU1hcFdYIiwia2V5IiwicXFtYXAiLCJyZXZlcnNlR2VvY29kZXJQIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXZlcnNlR2VvY29kZXIiLCJzdWNjZXNzIiwicmVzIiwib2JqIiwid3giLCJnZXRMb2NhdGlvblAiLCJ0eXBlIiwibHJlcyIsImNvbnNvbGUiLCJsb2ciLCJhZGRyZXNzUmVzIiwicmVzdWx0IiwiYWRfaW5mbyIsImN1cnJlbnRSZWdpb24iLCJhZGRyZXNzX2NvbXBvbmVudCIsImdldExvY2FsIiwibG9jYXRpb24ycG9zaXRpb24iLCJwb3NpdGlvbl9kZXNjcmlwdGlvbiIsIiRhcHBseSIsImNob29zZUxvY2F0aW9uUCIsInNjYWxlIiwibnVtYmVyIiwic3RvcmFnZTJkYXRhIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiY2hvb3NlSW1hZ2VQIiwiY291bnQiLCJjaG9vc2VSZXMiLCJ0ZW1wRmlsZVBhdGhzIiwidXBsb2FkRmlsZVAiLCJ1cmwiLCJhcGkiLCJQb3N0SW1nQWRkIiwiZmlsZVBhdGgiLCJoZWFkZXIiLCJnZXRTdG9yYWdlU3luYyIsInVwbG9hZFJlcyIsInBhcnNlRGF0YSIsIkpTT04iLCJwYXJzZSIsInB1c2giLCJjdXJyZW50RmllbGRWYWx1ZSIsImRldGFpbCIsInZhbHVlIiwiaW5kZXgiLCJzcGxpY2UiLCJfdGhpcyIsIiR3eGFwcCIsInJlbWFpbmRlcl9iZWZvcmUiLCJyZW1haW5kZXIiLCJzdGF0dXMiLCJyZW1haW5kZXJfYWZ0ZXIiLCJwb3N0X3ByaWNlIiwicGFyc2VGbG9hdCIsInRvRml4ZWQiLCJ1c2VyX2lkIiwiUG9zdEFkZCIsInBvc3RSZXN1bHQiLCJsYXN0SWQiLCJhZGRJbWFnZUFyciIsImZvckVhY2giLCJwb3N0X2lkIiwiaW1nX3VybCIsInBvc3RfaW1hZ2UiLCJQb3N0SW1nQWRkUmVjb3JkIiwiYWRkUmVzdWx0IiwicGF5IiwiY29udGVudCIsIlVzZXJSdWR1Y2VSZW1haW5kZXIiLCJzZXRTdG9yYWdlU3luYyIsImVycm5vIiwic2hvd01vZGFsIiwidGl0bGUiLCJzaG93Q2FuY2VsIiwiY29uZmlybSIsInN3aXRjaFRhYiIsIkFwcGx5UGF5IiwidGhlbiIsInNob3dUb2FzdCIsInBheVBhcmFtIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJub25jZVN0ciIsInBhY2thZ2UiLCJzaWduVHlwZSIsInBheVNpZ24iLCJpc19kaXN0cmlidXRvciIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsdUJBQWlCO0FBQ2Ysc0JBQWMsZ0RBREM7QUFFZixxQkFBYSwrQ0FGRTtBQUdmLG9CQUFZLDhDQUhHO0FBSWYsa0JB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Q0FBWixFQUFzRFAsR0FBdEQ7QUFDQUUsbUJBQUdvRSxTQUFILENBQWE7QUFDWEMseUJBQU8sSUFESTtBQUVYTCwyQkFBUyxZQUZFO0FBR1hNLDhCQUFZLEtBSEQ7QUFJWHpFLDJCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckIsd0JBQUlsQixXQUFXb0IsR0FBR2dDLGNBQUgsQ0FBa0IsVUFBbEIsQ0FBZjtBQUNBcEQsNkJBQVN1RyxjQUFULEdBQTBCLENBQTFCO0FBQ0FuRix1QkFBR2tFLGNBQUgsQ0FBa0IsVUFBbEIsRUFBOEJ0RixRQUE5QjtBQUNBLHdCQUFJa0IsSUFBSXlFLE9BQVIsRUFBaUI7QUFDZnZFLHlCQUFHd0UsU0FBSCxDQUFhO0FBQ1g3Qyw2QkFBSztBQURNLHVCQUFiO0FBR0Q7QUFDRjtBQWJVLGlCQUFiO0FBZUQsZUF2QmU7QUF3QmhCLHNCQUFRLGNBQVU3QixHQUFWLEVBQWU7QUFDckJNLHdCQUFRQyxHQUFSLENBQVkscUNBQVosRUFBbURQLEdBQW5EO0FBQ0Q7QUExQmUsYUFBbEI7QUE0QkQsV0E5QkQsTUE4Qk87QUFDTEUsZUFBR29FLFNBQUgsQ0FBYTtBQUNYQyxxQkFBTyxJQURJO0FBRVhMLHVCQUFTLE1BRkU7QUFHWE0sMEJBQVk7QUFIRCxhQUFiO0FBS0Q7QUFDRjtBQUNGLE9BN0NEO0FBOENEOzs7aUNBRVluRCxDLEVBQUc7QUFDZCxXQUFLLGVBQUwsRUFBc0IsUUFBdEIsSUFBa0NBLEVBQUVvQixNQUFGLENBQVNDLEtBQTNDO0FBQ0Q7OztrQ0FFYXJCLEMsRUFBRztBQUNmbkIsU0FBR29FLFNBQUgsQ0FBYTtBQUNYQyxlQUFPLFNBREk7QUFFWDtBQUNBTCxpQkFBUyxzSUFIRTtBQUlYTSxvQkFBWTtBQUpELE9BQWI7QUFNRDs7OztFQW5ZK0JjLGVBQUtDLEk7O2tCQUFsQjVJLEkiLCJmaWxlIjoiZWRpdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IHsgcmVxdWVzdCwgc3RvcmFnZTJkYXRhIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbCdcclxuICBpbXBvcnQgYXBpIGZyb20gJy4uLy4uL2NvbmZpZy9hcGknXHJcbiAgaW1wb3J0IHsgcXFtYXAgfSBmcm9tICcuLi8uLi9jb25maWcvY29uZmlnJ1xyXG4gIGltcG9ydCBRUU1hcFdYIGZyb20gJy4uLy4uL3V0aWxzL3FxbWFwLXd4LWpzc2RrLmpzJ1xyXG4gIGltcG9ydCBWZ2V0bW9iaWxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ2V0bW9iaWxlJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XHJcbiAgICAgICAgJ3d4Yy1idXR0b24nOiAnLi4vLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy1idXR0b24vZGlzdC9pbmRleCcsXHJcbiAgICAgICAgJ3d4Yy1pbnB1dCc6ICcuLi8uLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWlucHV0L2Rpc3QvaW5kZXgnLFxyXG4gICAgICAgICd3eGMtbGlzdCc6ICcuLi8uLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWxpc3QvZGlzdC9pbmRleCcsXHJcbiAgICAgICAgJ3d4Yy1jYyc6ICcuLi8uLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWNjL2Rpc3QvaW5kZXgnXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ2LWdldG1vYmlsZVwiOntcImNhbGxiYWNrXCI6XCJzZXRNb2JpbGVcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAndi1nZXRtb2JpbGUnOiBWZ2V0bW9iaWxlXHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW11cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBiYW5uYXI6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbWFnZV91cmw6ICdodHRwczovL25pZGVzaG9wLWFkbWluLWR2YS0xMjU2MTcxMjM0LmNvcy5hcC1iZWlqaW5nLm15cWNsb3VkLmNvbS9yaXZlci9zdGF0aWMvJUU5JUExJUI5JUU3JTlCJUFFJUU1JTlCJTlCL2VkaXQuanBnJyxcclxuICAgICAgICAgIGxpbms6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgICBwYXJ0bmVyOiBbICflhajlm70nIF0sXHJcbiAgICAgIGxldmVsTGlzdDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgbmFtZTogJ+WOn+S7tzE4IOeOsOS7tzEw5YWD77yI5YWo5Zu977yJJyxcclxuICAgICAgICAgIG9yaWdpbmFsX3ByaWNlOiAxOCxcclxuICAgICAgICAgIHByaWNlOiAxMCxcclxuICAgICAgICAgIGRlc2M6ICflhajlm70nXHJcbiAgICAgICAgICAvLyBkZXNjOiAn5L2g55qE57KJ5Lid6LSt5Lmw5ZWG5ZOB5oiW6ICF5Yqg5YWl5LyY6YCJ5a6i5bmz5Y+w562J77yM5oKo5Y+v6I635b6X5o+Q5oiQ77yM6Lq6552A5bCx6IO96LWa6ZKxJ1xyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuICAgICAgdG9wTGlzdDogWyfnva7pobbkuIDlpKnvvIjmlLbotLkxLjAw5YWD77yJJywgJ+e9rumhtuS4gOWRqO+8iOaUtui0uTUuMDDlhYPvvIknLCAn572u6aG25LiA5pyI77yI5pS26LS5MTUuMDDlhYPvvIknXSxcclxuICAgICAgYWRjb2RlOiAnJyxcclxuICAgICAgYWRkcmVzczogJycsXHJcbiAgICAgIGxvY2F0aW9uOiB7fSxcclxuICAgICAgcG9zaXRpb246IFwiXCIsXHJcbiAgICAgIGNoYW5nZWRGaWVsZHM6IHtcclxuICAgICAgICBpc19kZWNvcmF0aW9uOiBmYWxzZSxcclxuICAgICAgICBpc19yYXRpbmc6IGZhbHNlLFxyXG4gICAgICAgIGlzX3RvcDogZmFsc2UsXHJcbiAgICAgICAgaXNfYWdyZWVkOiBmYWxzZSxcclxuICAgICAgICBsZXZlbDogMCxcclxuICAgICAgICB0b3BfbGV2ZWw6IDEsXHJcbiAgICAgICAgcHJpbWFyeV9pbWdfdXJsOiBcIlwiLFxyXG4gICAgICAgIG1vYmlsZTogXCJcIixcclxuICAgICAgICBwb3N0X2ltYWdlczogW11cclxuICAgICAgfSxcclxuICAgICAgdXNlckluZm86IHt9LFxyXG4gICAgICBvdGhlcnM6IHt9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7fVxyXG5cclxuICAgIG1ldGhvZHMgPSB7fVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgJ2JpbmR0YXAnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qIOe7j+e6rOW6puWvueixoei9rOWtl+espuS4slxyXG4gICAgICogQG1ldGhvZCBsb2NhdGlvbjJwb3NpdGlvblxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9XHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IOe7j+W6pl/nuqzluqZcclxuICAgICovXHJcbiAgICBsb2NhdGlvbjJwb3NpdGlvbihsb2NhdGlvbikge1xyXG4gICAgICByZXR1cm4gWyBsb2NhdGlvbi5sb25naXR1ZGUsIGxvY2F0aW9uLmxhdGl0dWRlIF0uam9pbignXycpXHJcbiAgICB9XHJcbiAgICAvKiDojrflj5blvZPliY3kvY3nva7nu4/nuqzluqblkozmj4/ov7BcclxuICAgICAqIEBtZXRob2QgZ2V0TG9jYWxcclxuICAgICAqIEBwYXJhbSB7fVxyXG4gICAgICogQHJldHVybiB7U3RyaW5nLCBPYmplY3R9IOaJgOWcqOS9jee9rueahOihjOaUv+WMuuWIkuS7o+egge+8jOaJgOWcqOS9jee9rueahOecgeW4guWMuuWQjeensFxyXG4gICAgKi9cclxuICAgIGFzeW5jIGdldExvY2FsKCkge1xyXG4gICAgICBjb25zdCBxcW1hcHNkayA9IG5ldyBRUU1hcFdYKHtcclxuICAgICAgICBrZXk6IHFxbWFwLmtleVxyXG4gICAgICB9KVxyXG4gICAgICBxcW1hcHNkay5yZXZlcnNlR2VvY29kZXJQID0gb2JqID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBxcW1hcHNkay5yZXZlcnNlR2VvY29kZXIoe1xyXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIC4uLm9ialxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBjb25zdCBscmVzID0gYXdhaXQgd3guZ2V0TG9jYXRpb25QKHtcclxuICAgICAgICB0eXBlOiAnd2dzODQnXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBjb25zdCBsb2NhdGlvbiA9IHtcclxuICAgICAgICBsYXRpdHVkZTogbHJlcy5sYXRpdHVkZSxcclxuICAgICAgICBsb25naXR1ZGU6IGxyZXMubG9uZ2l0dWRlXHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS5sb2coJ+W9k+WJjee7j+e6rOW6pjogJywgbG9jYXRpb24pXHJcblxyXG4gICAgICBjb25zdCBhZGRyZXNzUmVzID0gYXdhaXQgcXFtYXBzZGsucmV2ZXJzZUdlb2NvZGVyUCh7XHJcbiAgICAgICAgbG9jYXRpb246IHtcclxuICAgICAgICAgIGxhdGl0dWRlOiBscmVzLmxhdGl0dWRlLFxyXG4gICAgICAgICAgbG9uZ2l0dWRlOiBscmVzLmxvbmdpdHVkZVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgY29uc29sZS5sb2coJ+W9k+WJjeS9jee9ruaPj+i/sCcsIGFkZHJlc3NSZXMpXHJcblxyXG4gICAgICBjb25zdCB7XHJcbiAgICAgICAgcmVzdWx0OiB7XHJcbiAgICAgICAgICBhZF9pbmZvOiB7XHJcbiAgICAgICAgICAgIGFkY29kZVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGFkZHJlc3MsXHJcbiAgICAgICAgICBhZGRyZXNzX2NvbXBvbmVudDogY3VycmVudFJlZ2lvblxyXG4gICAgICAgIH1cclxuICAgICAgfSA9IGFkZHJlc3NSZXNcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKCfooYzmlL/ljLrliJLku6PnoIEnLCBhZGNvZGUpXHJcblxyXG4gICAgICByZXR1cm4geyBhZGNvZGUsIGFkZHJlc3MsIGN1cnJlbnRSZWdpb24sIGxvY2F0aW9uIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiDngrnlh7vlrprkvY3mjInpkq4gKi9cclxuICAgIGFzeW5jIGJpbmRMb2NhdGUoKSB7XHJcbiAgICAgIGNvbnN0IHsgYWRjb2RlLCBhZGRyZXNzLCBsb2NhdGlvbiB9ID0gYXdhaXQgdGhpcy5nZXRMb2NhbCgpXHJcbiAgICAgIFxyXG4gICAgICB0aGlzLmFkY29kZSA9IGFkY29kZVxyXG4gICAgICB0aGlzLmFkZHJlc3MgPSBhZGRyZXNzXHJcbiAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvblxyXG4gICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5sb2NhdGlvbjJwb3NpdGlvbihsb2NhdGlvbilcclxuICAgICAgdGhpcy5jaGFuZ2VkRmllbGRzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvblxyXG4gICAgICB0aGlzLmNoYW5nZWRGaWVsZHMucG9zaXRpb25fZGVzY3JpcHRpb24gPSB0aGlzLmFkZHJlc3NcclxuXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBjaG9vc2VMb2NhdGlvbigpIHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgd3guY2hvb3NlTG9jYXRpb25QKHtcclxuICAgICAgICBsYXRpdHVkZTogMzguOTM3NSxcclxuICAgICAgICBsb25naXR1ZGU6IDExNy4zNTcxLFxyXG4gICAgICAgIHNjYWxlOiAyOFxyXG4gICAgICB9KVxyXG4gICAgICBjb25zb2xlLmxvZygncmVzJywgcmVzKVxyXG4gICAgICBjb25zdCB7IGFkZHJlc3MsIGxvbmdpdHVkZSwgbGF0aXR1ZGUgfSA9IHJlc1xyXG4gICAgICBjb25zdCBsb2NhdGlvbiA9IHsgbG9uZ2l0dWRlLCBsYXRpdHVkZSB9XHJcblxyXG4gICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb25cclxuICAgICAgdGhpcy5hZGRyZXNzID0gYWRkcmVzc1xyXG4gICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5sb2NhdGlvbjJwb3NpdGlvbihsb2NhdGlvbilcclxuICAgICAgdGhpcy5jaGFuZ2VkRmllbGRzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvblxyXG4gICAgICB0aGlzLmNoYW5nZWRGaWVsZHMucG9zaXRpb25fZGVzY3JpcHRpb24gPSB0aGlzLmFkZHJlc3NcclxuXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBzZXRNb2JpbGUobnVtYmVyKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlZEZpZWxkcy5tb2JpbGUgPSBudW1iZXJcclxuICAgICAgc3RvcmFnZTJkYXRhKHRoaXMpXHJcbiAgICAgIGNvbnNvbGUubG9nKHN0b3JhZ2UyZGF0YSlcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qIOa3u+WKoOWbvueJh1xyXG4gICAgICogQG1ldGhvZCBhZGRJbWFnZVxyXG4gICAgICogQHBhcmFtIHt9XHJcbiAgICAgKiBAcmV0dXJuIHt9IFxyXG4gICAgKi9cclxuICAgIGFzeW5jIGFkZEltYWdlKGUpIHtcclxuICAgICAgY29uc3QgeyB0eXBlIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldFxyXG4gICAgICBjb25zdCBjaG9vc2VSZXMgPSBhd2FpdCB3eC5jaG9vc2VJbWFnZVAoeyBjb3VudDogOSB9KVxyXG4gICAgICBjb25zdCB7IHRlbXBGaWxlUGF0aHMgfSA9IGNob29zZVJlc1xyXG4gICAgICBjb25zdCB1cGxvYWRSZXMgPSBhd2FpdCB3eC51cGxvYWRGaWxlUCh7XHJcbiAgICAgICAgdXJsOiBhcGkuUG9zdEltZ0FkZCxcclxuICAgICAgICBmaWxlUGF0aDogdGVtcEZpbGVQYXRoc1swXSxcclxuICAgICAgICBuYW1lOiAncG9zdF9pbWcnLFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgJ1gtTmlkZXNob3AtVG9rZW4nOiB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgY29uc3QgeyBkYXRhIH0gPSB1cGxvYWRSZXNcclxuICAgICAgY29uc29sZS5sb2coJ2RhdGEsIHR5cGUnLCBkYXRhLCB0eXBlKVxyXG4gICAgICBjb25zdCBwYXJzZURhdGEgPSBKU09OLnBhcnNlKGRhdGEpXHJcbiAgICAgIGlmICh0eXBlID09PSAnaW1ncycpIHtcclxuICAgICAgICB0aGlzLmNoYW5nZWRGaWVsZHMucG9zdF9pbWFnZXMucHVzaChwYXJzZURhdGEuZGF0YSlcclxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAncHJpbWFyeScpIHtcclxuICAgICAgICB0aGlzLmNoYW5nZWRGaWVsZHMucHJpbWFyeV9pbWdfdXJsID0gcGFyc2VEYXRhLmRhdGFcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfVxyXG4gICAgY2hhbmdlQ2hlY2tib3goZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZScsIGUpXHJcbiAgICAgIGNvbnN0IHsgdHlwZSB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRcclxuICAgICAgY29uc3QgY3VycmVudEZpZWxkVmFsdWUgPSB0aGlzWydjaGFuZ2VkRmllbGRzJ11bdHlwZV1cclxuICAgICAgdGhpc1snY2hhbmdlZEZpZWxkcyddW3R5cGVdID0gIWN1cnJlbnRGaWVsZFZhbHVlXHJcbiAgICB9XHJcbiAgICBjaGFuZ2VMZXZlbChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdsZXZlbCcsIGUpXHJcbiAgICAgIHRoaXMuY2hhbmdlZEZpZWxkcy5sZXZlbCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9XHJcbiAgICBjaGFuZ2VUb3AoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygndG9wX2xldmVsJywgZSlcclxuICAgICAgdGhpcy5jaGFuZ2VkRmllbGRzLnRvcF9sZXZlbCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9XHJcbiAgICBjbG9zZShlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdlJywgZSlcclxuICAgICAgY29uc3QgeyBpbmRleCB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRcclxuICAgICAgdGhpcy5jaGFuZ2VkRmllbGRzLnBvc3RfaW1hZ2VzLnNwbGljZShpbmRleCwgMSlcclxuICAgIH1cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgbGV0IF90aGlzID0gdGhpc1xyXG4gICAgICBjb25zb2xlLmxvZygndGhpcy4kd3hhcHAnLCB0aGlzLiR3eGFwcClcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvblNob3coKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdzaG93JylcclxuICAgICAgc3RvcmFnZTJkYXRhKHRoaXMpXHJcbiAgICAgIHRoaXMuY2hhbmdlZEZpZWxkcy5tb2JpbGUgPSB0aGlzLnVzZXJJbmZvLm1vYmlsZVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGFkZERhdGEoKSB7XHJcbiAgICAgIGNvbnN0IF90aGlzID0gdGhpc1xyXG4gICAgICBjb25zdCB7IGNoYW5nZWRGaWVsZHMsIHVzZXJJbmZvLCBvdGhlcnMgfSA9IF90aGlzXHJcbiAgICAgIGNvbnN0IHsgaXNfZGVjb3JhdGlvbiwgaXNfcmF0aW5nLCBpc190b3AsIHRvcF9sZXZlbCB9ID0gY2hhbmdlZEZpZWxkc1xyXG4gICAgICBjb25zdCB7IHJlbWFpbmRlcjogcmVtYWluZGVyX2JlZm9yZSB9ID0gdXNlckluZm9cclxuICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IG90aGVyc1xyXG5cclxuICAgICAgbGV0IHJlbWFpbmRlcl9hZnRlciA9IHJlbWFpbmRlcl9iZWZvcmU7XHJcbiAgICAgIC8vIOiuoeeul+S7t+agvFxyXG4gICAgICBsZXQgcG9zdF9wcmljZSA9IDEwMDBcclxuICAgICAgaWYgKGlzX2RlY29yYXRpb24pIHtcclxuICAgICAgICBwb3N0X3ByaWNlICs9IDMwMDAwXHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzX3JhdGluZykge1xyXG4gICAgICAgIHBvc3RfcHJpY2UgKz0gMjAwMFxyXG4gICAgICB9XHJcbiAgICAgIGlmIChpc190b3ApIHtcclxuICAgICAgICBzd2l0Y2ggKHRvcF9sZXZlbCkge1xyXG4gICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICBwb3N0X3ByaWNlICs9IDEwMFxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICBwb3N0X3ByaWNlICs9IDUwMFxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICBwb3N0X3ByaWNlICs9IDE1MDBcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8g5YWN6LS55Y+R5biD5qyh5pWw5oq15omjXHJcbiAgICAgIGlmIChyZW1haW5kZXJfYmVmb3JlID4gMCkge1xyXG4gICAgICAgIHBvc3RfcHJpY2UgLT0gMTAwMFxyXG4gICAgICAgIHJlbWFpbmRlcl9hZnRlciA9IHJlbWFpbmRlcl9iZWZvcmUgLSAxXHJcbiAgICAgIH1cclxuICAgICAgLy8g54q25oCB5Lu35qC8XHJcbiAgICAgIGlmIChzdGF0dXMgPT09IDApIHtcclxuICAgICAgICBwb3N0X3ByaWNlID0gMFxyXG4gICAgICB9XHJcblxyXG4gICAgICBwb3N0X3ByaWNlID0gcGFyc2VGbG9hdCgocG9zdF9wcmljZSAvIDEwMCkudG9GaXhlZCgyKSlcclxuICAgICAgLy8gcG9zdF9wcmljZSA9IDAuMDFcclxuICAgICAgLy8g5re75Yqg5L2c6ICF5a2X5q61XHJcbiAgICAgIGNoYW5nZWRGaWVsZHMudXNlcl9pZCA9IHRoaXMudXNlckluZm8uaWRcclxuICAgICAgLy8g5re75Yqg5omL5py65a2X5q61XHJcbiAgICAgIC8vIGNoYW5nZWRGaWVsZHMubW9iaWxlID0gdGhpcy51c2VySW5mby5tb2JpbGVcclxuICAgICAgLy8g5re75Yqg5oC75Lu35a2X5q61XHJcbiAgICAgIGNoYW5nZWRGaWVsZHMucG9zdF9wcmljZSA9IHBvc3RfcHJpY2VcclxuICAgICAgaWYgKHBvc3RfcHJpY2UgPT09IDApIHtcclxuICAgICAgICBjaGFuZ2VkRmllbGRzLnN0YXR1cyA9IDFcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZygnY2hhbmdlZEZpZWxkcycsIGNoYW5nZWRGaWVsZHMpXHJcbiAgICAgIGNvbnN0IHBvc3RSZXN1bHQgPSBhd2FpdCByZXF1ZXN0KGFwaS5Qb3N0QWRkLCBjaGFuZ2VkRmllbGRzLCAnUE9TVCcpXHJcbiAgICAgIGNvbnN0IHsgZGF0YTogbGFzdElkIH0gPSBwb3N0UmVzdWx0XHJcbiAgICAgIGNvbnNvbGUubG9nKCdsYXN0SWQnLCBsYXN0SWQpXHJcblxyXG4gICAgICBjb25zdCBhZGRJbWFnZUFyciA9IFtdXHJcbiAgICAgIGNoYW5nZWRGaWVsZHMucG9zdF9pbWFnZXMuZm9yRWFjaChwb3N0X2ltYWdlID0+IHtcclxuICAgICAgICBhZGRJbWFnZUFyci5wdXNoKHsgcG9zdF9pZDogbGFzdElkLCBpbWdfdXJsOiBwb3N0X2ltYWdlIH0pXHJcbiAgICAgIH0pXHJcbiAgICAgIGNvbnN0IGFkZFJlc3VsdCA9IGF3YWl0IHJlcXVlc3QoYXBpLlBvc3RJbWdBZGRSZWNvcmQsIGFkZEltYWdlQXJyLCAnUE9TVCcpXHJcbiAgICAgIGNvbnNvbGUubG9nKCdhZGRSZXN1bHQnLCBhZGRSZXN1bHQpXHJcbiAgICAgIGlmIChwb3N0X3ByaWNlICYmIHBvc3RfcHJpY2UgIT09IDApIHtcclxuICAgICAgICB0aGlzLnBheShsYXN0SWQsIHJlbWFpbmRlcl9hZnRlcilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgY29udGVudCA9ICcnXHJcbiAgICAgICAgaWYgKHJlbWFpbmRlcl9iZWZvcmUgIT09IHJlbWFpbmRlcl9hZnRlcikge1xyXG4gICAgICAgICAgLy8g5L2/55So5qyh5pWw5oq15omjXHJcbiAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KGFwaS5Vc2VyUnVkdWNlUmVtYWluZGVyLCB7IHBvc3RfaWQ6IGxhc3RJZCwgcmVtYWluZGVyX2FmdGVyIH0sIFwiUE9TVFwiKVxyXG5cclxuICAgICAgICAgIGNvbnN0IHVzZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJylcclxuICAgICAgICAgIHVzZXJJbmZvLnJlbWFpbmRlciA9IHJlbWFpbmRlcl9hZnRlclxyXG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJywgdXNlckluZm8pXHJcbiAgICAgICAgICBzdG9yYWdlMmRhdGEodGhpcylcclxuXHJcbiAgICAgICAgICBpZiAocmVzLmVycm5vID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSAn5Y+R5biD5oiQ5Yqf77yM5q2j5Zyo5a6h5qC45LitJ1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGVudCA9ICflj5HluIPmiJDlip8nXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRlbnQgPSAn5Y+R5biD5oiQ5Yqf77yM5q2j5Zyo5a6h5qC45LitLi4uJ1xyXG4gICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsIFxyXG4gICAgICAgICAgY29udGVudCxcclxuICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLCBcclxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICB3eC5zd2l0Y2hUYWIoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL3Bvc3QvcG9zdCdcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUZpZWxkKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2UnLCBlKVxyXG4gICAgICBjb25zdCB7IHR5cGUgfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0XHJcbiAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IGUuZGV0YWlsXHJcbiAgICAgIHRoaXNbJ2NoYW5nZWRGaWVsZHMnXVt0eXBlXSA9IHZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgcGF5KGxhc3RJZCwgcmVtYWluZGVyX2FmdGVyKSB7XHJcbiAgICAgIGNvbnN0IF90aGlzID0gdGhpc1xyXG4gICAgICByZXF1ZXN0KGFwaS5BcHBseVBheSwgeyBwb3N0X2lkOiBsYXN0SWQsIHJlbWFpbmRlcl9hZnRlciB9LCBcIlBPU1RcIilcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi55Sz6K+35YiG6ZSA5ZWGIHJlczogXCIsIHJlcylcclxuICAgICAgICBpZihyZXMuZXJybm8gPT09IDEpe1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6IFwi55Sz6K+35LitLi5cIiB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwYXlQcmVwYXlJZCByZXM6IFwiLCByZXMpXHJcbiAgICAgICAgICBpZiAocmVzLmVycm5vID09PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXlQYXJhbSA9IHJlcy5kYXRhXHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3RQYXltZW50KHtcclxuICAgICAgICAgICAgICAndGltZVN0YW1wJzogcGF5UGFyYW0udGltZVN0YW1wLFxyXG4gICAgICAgICAgICAgICdub25jZVN0cic6IHBheVBhcmFtLm5vbmNlU3RyLFxyXG4gICAgICAgICAgICAgICdwYWNrYWdlJzogcGF5UGFyYW0ucGFja2FnZSxcclxuICAgICAgICAgICAgICAnc2lnblR5cGUnOiBwYXlQYXJhbS5zaWduVHlwZSxcclxuICAgICAgICAgICAgICAncGF5U2lnbic6IHBheVBhcmFtLnBheVNpZ24sXHJcbiAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3MgdG8gcmVxdWVzdFBheW1lbnQgYW5kIHJlcyBpczogXCIsIHJlcylcclxuICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7IFxyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsIFxyXG4gICAgICAgICAgICAgICAgICBjb250ZW50OiAn5pSv5LuY5oiQ5Yqf77yM5q2j5Zyo5a6h5qC45LitJywgXHJcbiAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJylcclxuICAgICAgICAgICAgICAgICAgICB1c2VySW5mby5pc19kaXN0cmlidXRvciA9IDFcclxuICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlckluZm8nLCB1c2VySW5mbylcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy91Y2VudGVyL2luZGV4L2luZGV4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAnZmFpbCc6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmFpbCB0byByZXF1ZXN0UGF5bWVudCBhbmQgcmVzIGlzOiBcIiwgcmVzKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7IFxyXG4gICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JywgXHJcbiAgICAgICAgICAgICAgY29udGVudDogJ+aUr+S7mOmUmeivrycsIFxyXG4gICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZU1vYmlsZShlKSB7XHJcbiAgICAgIHRoaXNbJ2NoYW5nZWRGaWVsZHMnXVsnbW9iaWxlJ10gPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dBZ3JlZW1lbnQoZSkge1xyXG4gICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn44CK5ZCI5LyZ5Lq66aG755+l44CLJyxcclxuICAgICAgICAvLyBjb250ZW50OiAn5LyY6YCJ5a6i5Zyo5L2/55So5LyY6YCJ5a6i5bmz5Y+w5o+Q5L6b55qE5ZCE6aG55pyN5Yqh55qE5ZCM5LqL77yM5om/6K+65o6l5Y+X5bm26YG15a6I5ZCE6aG56KeE5a6a44CB6KeE5YiZ77yM5LyY6YCJ5a6i5bmz5Y+w5pyJ5p2D5qC55o2u6ZyA6KaB5LiN5pe255qE5L+u5pS55pys5Y2P6K6u5ZKM6KeE5YiZ77yM5paw6KeE5YiZ5Zyo5LyY6YCJ5a6i5bmz5Y+w5bmz5Y+w5Y+R5biD77yM5aaC5pyJ5LyY6YCJ5a6i6L+d5Y+N5paw6KeE5YiZ77yM5raJ5Y+K6L+d5rOV54qv572q77yM5raJ5Y+K5Lyg6ZSA562J5qy66K+I5omL5q6177yM5LyY6YCJ5a6i5bmz5Y+w5pyJ5p2D6Ieq5Yqo6Kej6Zmk5LyY6YCJ5a6i77yM5oOF6IqC5Lil6YeN55qE5Y+v56e75Lqk5Y+45rOV5py65YWz5aSE55CG44CCXFxu5L2j6YeR6KeE5YiZ77yaMeOAgeS4i+e6p+i0reS5sOWVhuWTgeS4uuWVhuWTgeS7t+agvCowLjAyKuWIhuaIkOavlD3kvaPph5HvvJsy44CB5o6o6I2Q5oiQ5Li65ZCI5LyZ5Lq655u05o6l5LuO5LiL57qn5Yqg5YWl6LS555So5o+QNzAl77yM5LqM57qn5Yqg5YWl6LS555So5o+QMjAl77yb6K+l5L2j6YeR6KeE5YiZ5oyB57ut5YiwMjAxOOW5tDEw5pyIMeWPtzDngrnvvIzlsYrml7bmm7TmlLnop4TliJnjgIInXHJcbiAgICAgICAgY29udGVudDogJ+S8mOmAieWuouWcqOS9v+eUqOS8mOmAieWuouW5s+WPsOaPkOS+m+eahOWQhOmhueacjeWKoeeahOWQjOS6i++8jOaJv+ivuuaOpeWPl+W5tumBteWuiOWQhOmhueinhOWumuOAgeinhOWIme+8jOS8mOmAieWuouW5s+WPsOacieadg+agueaNrumcgOimgeS4jeaXtueahOS/ruaUueacrOWNj+iuruWSjOinhOWIme+8jOaWsOinhOWImeWcqOS8mOmAieWuouW5s+WPsOW5s+WPsOWPkeW4g++8jOWmguacieS8mOmAieWuoui/neWPjeaWsOinhOWIme+8jOa2ieWPiui/neazleeKr+e9qu+8jOa2ieWPiuS8oOmUgOetieasuuiviOaJi+aute+8jOS8mOmAieWuouW5s+WPsOacieadg+iHquWKqOino+mZpOS8mOmAieWuou+8jOaDheiKguS4pemHjeeahOWPr+enu+S6pOWPuOazleacuuWFs+WkhOeQhuOAgicsXHJcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiJdfQ==