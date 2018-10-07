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
        image_url: 'https://nideshop-admin-dva-1256171234.cos.ap-beijing.myqcloud.com/youxuanke/upload/images/hospital.jpg',
        link: ''
      }],
      partner: ['全国'],
      levelList: [{
        id: 1,
        name: '原价18 现价10元（全国）',
        original_price: 18,
        price: 10,
        desc: '全国'
        // desc: '你的粉丝购买商品或者加入优选客联盟等，您可获得提成，躺着就能赚钱'
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
        // content: '优选客在使用优选客联盟提供的各项服务的同事，承诺接受并遵守各项规定、规则，优选客联盟有权根据需要不时的修改本协议和规则，新规则在优选客联盟平台发布，如有优选客违反新规则，涉及违法犯罪，涉及传销等欺诈手段，优选客联盟有权自动解除优选客，情节严重的可移交司法机关处理。\n佣金规则：1、下级购买商品为商品价格*0.02*分成比=佣金；2、推荐成为合伙人直接从下级加入费用提70%，二级加入费用提20%；该佣金规则持续到2018年10月1号0点，届时更改规则。'
        content: '优选客在使用优选客联盟提供的各项服务的同事，承诺接受并遵守各项规定、规则，优选客联盟有权根据需要不时的修改本协议和规则，新规则在优选客联盟平台发布，如有优选客违反新规则，涉及违法犯罪，涉及传销等欺诈手段，优选客联盟有权自动解除优选客，情节严重的可移交司法机关处理。',
        showCancel: false
      });
    }
  }]);

  return Edit;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Edit , 'pages/edit/edit'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXQuanMiXSwibmFtZXMiOlsiRWRpdCIsImNvbmZpZyIsInVzaW5nQ29tcG9uZW50cyIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIlZnZXRtb2JpbGUiLCJtaXhpbnMiLCJkYXRhIiwiYmFubmFyIiwiaW1hZ2VfdXJsIiwibGluayIsInBhcnRuZXIiLCJsZXZlbExpc3QiLCJpZCIsIm5hbWUiLCJvcmlnaW5hbF9wcmljZSIsInByaWNlIiwiZGVzYyIsInRvcExpc3QiLCJhZGNvZGUiLCJhZGRyZXNzIiwibG9jYXRpb24iLCJwb3NpdGlvbiIsImNoYW5nZWRGaWVsZHMiLCJpc19kZWNvcmF0aW9uIiwiaXNfcmF0aW5nIiwiaXNfdG9wIiwiaXNfYWdyZWVkIiwibGV2ZWwiLCJ0b3BfbGV2ZWwiLCJwcmltYXJ5X2ltZ191cmwiLCJtb2JpbGUiLCJwb3N0X2ltYWdlcyIsInVzZXJJbmZvIiwib3RoZXJzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZXZlbnRzIiwibG9uZ2l0dWRlIiwibGF0aXR1ZGUiLCJqb2luIiwicXFtYXBzZGsiLCJRUU1hcFdYIiwia2V5IiwicXFtYXAiLCJyZXZlcnNlR2VvY29kZXJQIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXZlcnNlR2VvY29kZXIiLCJzdWNjZXNzIiwicmVzIiwib2JqIiwid3giLCJnZXRMb2NhdGlvblAiLCJ0eXBlIiwibHJlcyIsImNvbnNvbGUiLCJsb2ciLCJhZGRyZXNzUmVzIiwicmVzdWx0IiwiYWRfaW5mbyIsImN1cnJlbnRSZWdpb24iLCJhZGRyZXNzX2NvbXBvbmVudCIsImdldExvY2FsIiwibG9jYXRpb24ycG9zaXRpb24iLCJwb3NpdGlvbl9kZXNjcmlwdGlvbiIsIiRhcHBseSIsImNob29zZUxvY2F0aW9uUCIsInNjYWxlIiwibnVtYmVyIiwic3RvcmFnZTJkYXRhIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiY2hvb3NlSW1hZ2VQIiwiY291bnQiLCJjaG9vc2VSZXMiLCJ0ZW1wRmlsZVBhdGhzIiwidXBsb2FkRmlsZVAiLCJ1cmwiLCJhcGkiLCJQb3N0SW1nQWRkIiwiZmlsZVBhdGgiLCJoZWFkZXIiLCJnZXRTdG9yYWdlU3luYyIsInVwbG9hZFJlcyIsInBhcnNlRGF0YSIsIkpTT04iLCJwYXJzZSIsInB1c2giLCJjdXJyZW50RmllbGRWYWx1ZSIsImRldGFpbCIsInZhbHVlIiwiaW5kZXgiLCJzcGxpY2UiLCJfdGhpcyIsIiR3eGFwcCIsInJlbWFpbmRlcl9iZWZvcmUiLCJyZW1haW5kZXIiLCJzdGF0dXMiLCJyZW1haW5kZXJfYWZ0ZXIiLCJwb3N0X3ByaWNlIiwicGFyc2VGbG9hdCIsInRvRml4ZWQiLCJ1c2VyX2lkIiwiUG9zdEFkZCIsInBvc3RSZXN1bHQiLCJsYXN0SWQiLCJhZGRJbWFnZUFyciIsImZvckVhY2giLCJwb3N0X2lkIiwiaW1nX3VybCIsInBvc3RfaW1hZ2UiLCJQb3N0SW1nQWRkUmVjb3JkIiwiYWRkUmVzdWx0IiwicGF5IiwiY29udGVudCIsIlVzZXJSdWR1Y2VSZW1haW5kZXIiLCJzZXRTdG9yYWdlU3luYyIsImVycm5vIiwic2hvd01vZGFsIiwidGl0bGUiLCJzaG93Q2FuY2VsIiwiY29uZmlybSIsInN3aXRjaFRhYiIsIkFwcGx5UGF5IiwidGhlbiIsInNob3dUb2FzdCIsInBheVBhcmFtIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJub25jZVN0ciIsInBhY2thZ2UiLCJzaWduVHlwZSIsInBheVNpZ24iLCJpc19kaXN0cmlidXRvciIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsdUJBQWlCO0FBQ2Ysc0JBQWMsZ0RBREM7QUFFZixxQkFBYSwrQ0FGRTtBQUdmLG9CQUFZLDhDQUhHO0FBSWYsa0JB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Q0FBWixFQUFzRFAsR0FBdEQ7QUFDQUUsbUJBQUdvRSxTQUFILENBQWE7QUFDWEMseUJBQU8sSUFESTtBQUVYTCwyQkFBUyxZQUZFO0FBR1hNLDhCQUFZLEtBSEQ7QUFJWHpFLDJCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckIsd0JBQUlsQixXQUFXb0IsR0FBR2dDLGNBQUgsQ0FBa0IsVUFBbEIsQ0FBZjtBQUNBcEQsNkJBQVN1RyxjQUFULEdBQTBCLENBQTFCO0FBQ0FuRix1QkFBR2tFLGNBQUgsQ0FBa0IsVUFBbEIsRUFBOEJ0RixRQUE5QjtBQUNBLHdCQUFJa0IsSUFBSXlFLE9BQVIsRUFBaUI7QUFDZnZFLHlCQUFHd0UsU0FBSCxDQUFhO0FBQ1g3Qyw2QkFBSztBQURNLHVCQUFiO0FBR0Q7QUFDRjtBQWJVLGlCQUFiO0FBZUQsZUF2QmU7QUF3QmhCLHNCQUFRLGNBQVU3QixHQUFWLEVBQWU7QUFDckJNLHdCQUFRQyxHQUFSLENBQVkscUNBQVosRUFBbURQLEdBQW5EO0FBQ0Q7QUExQmUsYUFBbEI7QUE0QkQsV0E5QkQsTUE4Qk87QUFDTEUsZUFBR29FLFNBQUgsQ0FBYTtBQUNYQyxxQkFBTyxJQURJO0FBRVhMLHVCQUFTLE1BRkU7QUFHWE0sMEJBQVk7QUFIRCxhQUFiO0FBS0Q7QUFDRjtBQUNGLE9BN0NEO0FBOENEOzs7aUNBRVluRCxDLEVBQUc7QUFDZCxXQUFLLGVBQUwsRUFBc0IsUUFBdEIsSUFBa0NBLEVBQUVvQixNQUFGLENBQVNDLEtBQTNDO0FBQ0Q7OztrQ0FFYXJCLEMsRUFBRztBQUNmbkIsU0FBR29FLFNBQUgsQ0FBYTtBQUNYQyxlQUFPLFNBREk7QUFFWDtBQUNBTCxpQkFBUyxzSUFIRTtBQUlYTSxvQkFBWTtBQUpELE9BQWI7QUFNRDs7OztFQW5ZK0JjLGVBQUtDLEk7O2tCQUFsQjVJLEkiLCJmaWxlIjoiZWRpdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IHsgcmVxdWVzdCwgc3RvcmFnZTJkYXRhIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbCdcclxuICBpbXBvcnQgYXBpIGZyb20gJy4uLy4uL2NvbmZpZy9hcGknXHJcbiAgaW1wb3J0IHsgcXFtYXAgfSBmcm9tICcuLi8uLi9jb25maWcvY29uZmlnJ1xyXG4gIGltcG9ydCBRUU1hcFdYIGZyb20gJy4uLy4uL3V0aWxzL3FxbWFwLXd4LWpzc2RrLmpzJ1xyXG4gIGltcG9ydCBWZ2V0bW9iaWxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ2V0bW9iaWxlJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XHJcbiAgICAgICAgJ3d4Yy1idXR0b24nOiAnLi4vLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy1idXR0b24vZGlzdC9pbmRleCcsXHJcbiAgICAgICAgJ3d4Yy1pbnB1dCc6ICcuLi8uLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWlucHV0L2Rpc3QvaW5kZXgnLFxyXG4gICAgICAgICd3eGMtbGlzdCc6ICcuLi8uLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWxpc3QvZGlzdC9pbmRleCcsXHJcbiAgICAgICAgJ3d4Yy1jYyc6ICcuLi8uLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWNjL2Rpc3QvaW5kZXgnXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ2LWdldG1vYmlsZVwiOntcImNhbGxiYWNrXCI6XCJzZXRNb2JpbGVcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAndi1nZXRtb2JpbGUnOiBWZ2V0bW9iaWxlXHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW11cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBiYW5uYXI6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbWFnZV91cmw6ICdodHRwczovL25pZGVzaG9wLWFkbWluLWR2YS0xMjU2MTcxMjM0LmNvcy5hcC1iZWlqaW5nLm15cWNsb3VkLmNvbS95b3V4dWFua2UvdXBsb2FkL2ltYWdlcy9ob3NwaXRhbC5qcGcnLFxyXG4gICAgICAgICAgbGluazogJydcclxuICAgICAgICB9XHJcbiAgICAgIF0sXHJcbiAgICAgIHBhcnRuZXI6IFsgJ+WFqOWbvScgXSxcclxuICAgICAgbGV2ZWxMaXN0OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICBuYW1lOiAn5Y6f5Lu3MTgg546w5Lu3MTDlhYPvvIjlhajlm73vvIknLFxyXG4gICAgICAgICAgb3JpZ2luYWxfcHJpY2U6IDE4LFxyXG4gICAgICAgICAgcHJpY2U6IDEwLFxyXG4gICAgICAgICAgZGVzYzogJ+WFqOWbvSdcclxuICAgICAgICAgIC8vIGRlc2M6ICfkvaDnmoTnsonkuJ3otK3kubDllYblk4HmiJbogIXliqDlhaXkvJjpgInlrqLogZTnm5/nrYnvvIzmgqjlj6/ojrflvpfmj5DmiJDvvIzourrnnYDlsLHog73otZrpkrEnXHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgICB0b3BMaXN0OiBbJ+e9rumhtuS4gOWkqe+8iOaUtui0uTEuMDDlhYPvvIknLCAn572u6aG25LiA5ZGo77yI5pS26LS5NS4wMOWFg++8iScsICfnva7pobbkuIDmnIjvvIjmlLbotLkxNS4wMOWFg++8iSddLFxyXG4gICAgICBhZGNvZGU6ICcnLFxyXG4gICAgICBhZGRyZXNzOiAnJyxcclxuICAgICAgbG9jYXRpb246IHt9LFxyXG4gICAgICBwb3NpdGlvbjogXCJcIixcclxuICAgICAgY2hhbmdlZEZpZWxkczoge1xyXG4gICAgICAgIGlzX2RlY29yYXRpb246IGZhbHNlLFxyXG4gICAgICAgIGlzX3JhdGluZzogZmFsc2UsXHJcbiAgICAgICAgaXNfdG9wOiBmYWxzZSxcclxuICAgICAgICBpc19hZ3JlZWQ6IGZhbHNlLFxyXG4gICAgICAgIGxldmVsOiAwLFxyXG4gICAgICAgIHRvcF9sZXZlbDogMSxcclxuICAgICAgICBwcmltYXJ5X2ltZ191cmw6IFwiXCIsXHJcbiAgICAgICAgbW9iaWxlOiBcIlwiLFxyXG4gICAgICAgIHBvc3RfaW1hZ2VzOiBbXVxyXG4gICAgICB9LFxyXG4gICAgICB1c2VySW5mbzoge30sXHJcbiAgICAgIG90aGVyczoge31cclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHt9XHJcblxyXG4gICAgbWV0aG9kcyA9IHt9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAnYmluZHRhcCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyog57uP57qs5bqm5a+56LGh6L2s5a2X56ym5LiyXHJcbiAgICAgKiBAbWV0aG9kIGxvY2F0aW9uMnBvc2l0aW9uXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH1cclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30g57uP5bqmX+e6rOW6plxyXG4gICAgKi9cclxuICAgIGxvY2F0aW9uMnBvc2l0aW9uKGxvY2F0aW9uKSB7XHJcbiAgICAgIHJldHVybiBbIGxvY2F0aW9uLmxvbmdpdHVkZSwgbG9jYXRpb24ubGF0aXR1ZGUgXS5qb2luKCdfJylcclxuICAgIH1cclxuICAgIC8qIOiOt+WPluW9k+WJjeS9jee9rue7j+e6rOW6puWSjOaPj+i/sFxyXG4gICAgICogQG1ldGhvZCBnZXRMb2NhbFxyXG4gICAgICogQHBhcmFtIHt9XHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmcsIE9iamVjdH0g5omA5Zyo5L2N572u55qE6KGM5pS/5Yy65YiS5Luj56CB77yM5omA5Zyo5L2N572u55qE55yB5biC5Yy65ZCN56ewXHJcbiAgICAqL1xyXG4gICAgYXN5bmMgZ2V0TG9jYWwoKSB7XHJcbiAgICAgIGNvbnN0IHFxbWFwc2RrID0gbmV3IFFRTWFwV1goe1xyXG4gICAgICAgIGtleTogcXFtYXAua2V5XHJcbiAgICAgIH0pXHJcbiAgICAgIHFxbWFwc2RrLnJldmVyc2VHZW9jb2RlclAgPSBvYmogPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHFxbWFwc2RrLnJldmVyc2VHZW9jb2Rlcih7XHJcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgLi4ub2JqXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGNvbnN0IGxyZXMgPSBhd2FpdCB3eC5nZXRMb2NhdGlvblAoe1xyXG4gICAgICAgIHR5cGU6ICd3Z3M4NCdcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGNvbnN0IGxvY2F0aW9uID0ge1xyXG4gICAgICAgIGxhdGl0dWRlOiBscmVzLmxhdGl0dWRlLFxyXG4gICAgICAgIGxvbmdpdHVkZTogbHJlcy5sb25naXR1ZGVcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZygn5b2T5YmN57uP57qs5bqmOiAnLCBsb2NhdGlvbilcclxuXHJcbiAgICAgIGNvbnN0IGFkZHJlc3NSZXMgPSBhd2FpdCBxcW1hcHNkay5yZXZlcnNlR2VvY29kZXJQKHtcclxuICAgICAgICBsb2NhdGlvbjoge1xyXG4gICAgICAgICAgbGF0aXR1ZGU6IGxyZXMubGF0aXR1ZGUsXHJcbiAgICAgICAgICBsb25naXR1ZGU6IGxyZXMubG9uZ2l0dWRlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICBjb25zb2xlLmxvZygn5b2T5YmN5L2N572u5o+P6L+wJywgYWRkcmVzc1JlcylcclxuXHJcbiAgICAgIGNvbnN0IHtcclxuICAgICAgICByZXN1bHQ6IHtcclxuICAgICAgICAgIGFkX2luZm86IHtcclxuICAgICAgICAgICAgYWRjb2RlXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYWRkcmVzcyxcclxuICAgICAgICAgIGFkZHJlc3NfY29tcG9uZW50OiBjdXJyZW50UmVnaW9uXHJcbiAgICAgICAgfVxyXG4gICAgICB9ID0gYWRkcmVzc1Jlc1xyXG5cclxuICAgICAgY29uc29sZS5sb2coJ+ihjOaUv+WMuuWIkuS7o+eggScsIGFkY29kZSlcclxuXHJcbiAgICAgIHJldHVybiB7IGFkY29kZSwgYWRkcmVzcywgY3VycmVudFJlZ2lvbiwgbG9jYXRpb24gfVxyXG4gICAgfVxyXG5cclxuICAgIC8qIOeCueWHu+WumuS9jeaMiemSriAqL1xyXG4gICAgYXN5bmMgYmluZExvY2F0ZSgpIHtcclxuICAgICAgY29uc3QgeyBhZGNvZGUsIGFkZHJlc3MsIGxvY2F0aW9uIH0gPSBhd2FpdCB0aGlzLmdldExvY2FsKClcclxuICAgICAgXHJcbiAgICAgIHRoaXMuYWRjb2RlID0gYWRjb2RlXHJcbiAgICAgIHRoaXMuYWRkcmVzcyA9IGFkZHJlc3NcclxuICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uXHJcbiAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLmxvY2F0aW9uMnBvc2l0aW9uKGxvY2F0aW9uKVxyXG4gICAgICB0aGlzLmNoYW5nZWRGaWVsZHMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uXHJcbiAgICAgIHRoaXMuY2hhbmdlZEZpZWxkcy5wb3NpdGlvbl9kZXNjcmlwdGlvbiA9IHRoaXMuYWRkcmVzc1xyXG5cclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNob29zZUxvY2F0aW9uKCkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCB3eC5jaG9vc2VMb2NhdGlvblAoe1xyXG4gICAgICAgIGxhdGl0dWRlOiAzOC45Mzc1LFxyXG4gICAgICAgIGxvbmdpdHVkZTogMTE3LjM1NzEsXHJcbiAgICAgICAgc2NhbGU6IDI4XHJcbiAgICAgIH0pXHJcbiAgICAgIGNvbnNvbGUubG9nKCdyZXMnLCByZXMpXHJcbiAgICAgIGNvbnN0IHsgYWRkcmVzcywgbG9uZ2l0dWRlLCBsYXRpdHVkZSB9ID0gcmVzXHJcbiAgICAgIGNvbnN0IGxvY2F0aW9uID0geyBsb25naXR1ZGUsIGxhdGl0dWRlIH1cclxuXHJcbiAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvblxyXG4gICAgICB0aGlzLmFkZHJlc3MgPSBhZGRyZXNzXHJcbiAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLmxvY2F0aW9uMnBvc2l0aW9uKGxvY2F0aW9uKVxyXG4gICAgICB0aGlzLmNoYW5nZWRGaWVsZHMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uXHJcbiAgICAgIHRoaXMuY2hhbmdlZEZpZWxkcy5wb3NpdGlvbl9kZXNjcmlwdGlvbiA9IHRoaXMuYWRkcmVzc1xyXG5cclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNldE1vYmlsZShudW1iZXIpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VkRmllbGRzLm1vYmlsZSA9IG51bWJlclxyXG4gICAgICBzdG9yYWdlMmRhdGEodGhpcylcclxuICAgICAgY29uc29sZS5sb2coc3RvcmFnZTJkYXRhKVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcblxyXG4gICAgLyog5re75Yqg5Zu+54mHXHJcbiAgICAgKiBAbWV0aG9kIGFkZEltYWdlXHJcbiAgICAgKiBAcGFyYW0ge31cclxuICAgICAqIEByZXR1cm4ge30gXHJcbiAgICAqL1xyXG4gICAgYXN5bmMgYWRkSW1hZ2UoZSkge1xyXG4gICAgICBjb25zdCB7IHR5cGUgfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0XHJcbiAgICAgIGNvbnN0IGNob29zZVJlcyA9IGF3YWl0IHd4LmNob29zZUltYWdlUCh7IGNvdW50OiA5IH0pXHJcbiAgICAgIGNvbnN0IHsgdGVtcEZpbGVQYXRocyB9ID0gY2hvb3NlUmVzXHJcbiAgICAgIGNvbnN0IHVwbG9hZFJlcyA9IGF3YWl0IHd4LnVwbG9hZEZpbGVQKHtcclxuICAgICAgICB1cmw6IGFwaS5Qb3N0SW1nQWRkLFxyXG4gICAgICAgIGZpbGVQYXRoOiB0ZW1wRmlsZVBhdGhzWzBdLFxyXG4gICAgICAgIG5hbWU6ICdwb3N0X2ltZycsXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAnWC1OaWRlc2hvcC1Ub2tlbic6IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICBjb25zdCB7IGRhdGEgfSA9IHVwbG9hZFJlc1xyXG4gICAgICBjb25zb2xlLmxvZygnZGF0YSwgdHlwZScsIGRhdGEsIHR5cGUpXHJcbiAgICAgIGNvbnN0IHBhcnNlRGF0YSA9IEpTT04ucGFyc2UoZGF0YSlcclxuICAgICAgaWYgKHR5cGUgPT09ICdpbWdzJykge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlZEZpZWxkcy5wb3N0X2ltYWdlcy5wdXNoKHBhcnNlRGF0YS5kYXRhKVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdwcmltYXJ5Jykge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlZEZpZWxkcy5wcmltYXJ5X2ltZ191cmwgPSBwYXJzZURhdGEuZGF0YVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcbiAgICBjaGFuZ2VDaGVja2JveChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdlJywgZSlcclxuICAgICAgY29uc3QgeyB0eXBlIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldFxyXG4gICAgICBjb25zdCBjdXJyZW50RmllbGRWYWx1ZSA9IHRoaXNbJ2NoYW5nZWRGaWVsZHMnXVt0eXBlXVxyXG4gICAgICB0aGlzWydjaGFuZ2VkRmllbGRzJ11bdHlwZV0gPSAhY3VycmVudEZpZWxkVmFsdWVcclxuICAgIH1cclxuICAgIGNoYW5nZUxldmVsKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2xldmVsJywgZSlcclxuICAgICAgdGhpcy5jaGFuZ2VkRmllbGRzLmxldmVsID0gZS5kZXRhaWwudmFsdWVcclxuICAgIH1cclxuICAgIGNoYW5nZVRvcChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd0b3BfbGV2ZWwnLCBlKVxyXG4gICAgICB0aGlzLmNoYW5nZWRGaWVsZHMudG9wX2xldmVsID0gZS5kZXRhaWwudmFsdWVcclxuICAgIH1cclxuICAgIGNsb3NlKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2UnLCBlKVxyXG4gICAgICBjb25zdCB7IGluZGV4IH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldFxyXG4gICAgICB0aGlzLmNoYW5nZWRGaWVsZHMucG9zdF9pbWFnZXMuc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgfVxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICBsZXQgX3RoaXMgPSB0aGlzXHJcbiAgICAgIGNvbnNvbGUubG9nKCd0aGlzLiR3eGFwcCcsIHRoaXMuJHd4YXBwKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uU2hvdygpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3Nob3cnKVxyXG4gICAgICBzdG9yYWdlMmRhdGEodGhpcylcclxuICAgICAgdGhpcy5jaGFuZ2VkRmllbGRzLm1vYmlsZSA9IHRoaXMudXNlckluZm8ubW9iaWxlXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgYWRkRGF0YSgpIHtcclxuICAgICAgY29uc3QgX3RoaXMgPSB0aGlzXHJcbiAgICAgIGNvbnN0IHsgY2hhbmdlZEZpZWxkcywgdXNlckluZm8sIG90aGVycyB9ID0gX3RoaXNcclxuICAgICAgY29uc3QgeyBpc19kZWNvcmF0aW9uLCBpc19yYXRpbmcsIGlzX3RvcCwgdG9wX2xldmVsIH0gPSBjaGFuZ2VkRmllbGRzXHJcbiAgICAgIGNvbnN0IHsgcmVtYWluZGVyOiByZW1haW5kZXJfYmVmb3JlIH0gPSB1c2VySW5mb1xyXG4gICAgICBjb25zdCB7IHN0YXR1cyB9ID0gb3RoZXJzXHJcblxyXG4gICAgICBsZXQgcmVtYWluZGVyX2FmdGVyID0gcmVtYWluZGVyX2JlZm9yZTtcclxuICAgICAgLy8g6K6h566X5Lu35qC8XHJcbiAgICAgIGxldCBwb3N0X3ByaWNlID0gMTAwMFxyXG4gICAgICBpZiAoaXNfZGVjb3JhdGlvbikge1xyXG4gICAgICAgIHBvc3RfcHJpY2UgKz0gMzAwMDBcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNfcmF0aW5nKSB7XHJcbiAgICAgICAgcG9zdF9wcmljZSArPSAyMDAwXHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzX3RvcCkge1xyXG4gICAgICAgIHN3aXRjaCAodG9wX2xldmVsKSB7XHJcbiAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgIHBvc3RfcHJpY2UgKz0gMTAwXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIHBvc3RfcHJpY2UgKz0gNTAwXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHBvc3RfcHJpY2UgKz0gMTUwMFxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyDlhY3otLnlj5HluIPmrKHmlbDmirXmiaNcclxuICAgICAgaWYgKHJlbWFpbmRlcl9iZWZvcmUgPiAwKSB7XHJcbiAgICAgICAgcG9zdF9wcmljZSAtPSAxMDAwXHJcbiAgICAgICAgcmVtYWluZGVyX2FmdGVyID0gcmVtYWluZGVyX2JlZm9yZSAtIDFcclxuICAgICAgfVxyXG4gICAgICAvLyDnirbmgIHku7fmoLxcclxuICAgICAgaWYgKHN0YXR1cyA9PT0gMCkge1xyXG4gICAgICAgIHBvc3RfcHJpY2UgPSAwXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBvc3RfcHJpY2UgPSBwYXJzZUZsb2F0KChwb3N0X3ByaWNlIC8gMTAwKS50b0ZpeGVkKDIpKVxyXG4gICAgICAvLyBwb3N0X3ByaWNlID0gMC4wMVxyXG4gICAgICAvLyDmt7vliqDkvZzogIXlrZfmrrVcclxuICAgICAgY2hhbmdlZEZpZWxkcy51c2VyX2lkID0gdGhpcy51c2VySW5mby5pZFxyXG4gICAgICAvLyDmt7vliqDmiYvmnLrlrZfmrrVcclxuICAgICAgLy8gY2hhbmdlZEZpZWxkcy5tb2JpbGUgPSB0aGlzLnVzZXJJbmZvLm1vYmlsZVxyXG4gICAgICAvLyDmt7vliqDmgLvku7flrZfmrrVcclxuICAgICAgY2hhbmdlZEZpZWxkcy5wb3N0X3ByaWNlID0gcG9zdF9wcmljZVxyXG4gICAgICBpZiAocG9zdF9wcmljZSA9PT0gMCkge1xyXG4gICAgICAgIGNoYW5nZWRGaWVsZHMuc3RhdHVzID0gMVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2VkRmllbGRzJywgY2hhbmdlZEZpZWxkcylcclxuICAgICAgY29uc3QgcG9zdFJlc3VsdCA9IGF3YWl0IHJlcXVlc3QoYXBpLlBvc3RBZGQsIGNoYW5nZWRGaWVsZHMsICdQT1NUJylcclxuICAgICAgY29uc3QgeyBkYXRhOiBsYXN0SWQgfSA9IHBvc3RSZXN1bHRcclxuICAgICAgY29uc29sZS5sb2coJ2xhc3RJZCcsIGxhc3RJZClcclxuXHJcbiAgICAgIGNvbnN0IGFkZEltYWdlQXJyID0gW11cclxuICAgICAgY2hhbmdlZEZpZWxkcy5wb3N0X2ltYWdlcy5mb3JFYWNoKHBvc3RfaW1hZ2UgPT4ge1xyXG4gICAgICAgIGFkZEltYWdlQXJyLnB1c2goeyBwb3N0X2lkOiBsYXN0SWQsIGltZ191cmw6IHBvc3RfaW1hZ2UgfSlcclxuICAgICAgfSlcclxuICAgICAgY29uc3QgYWRkUmVzdWx0ID0gYXdhaXQgcmVxdWVzdChhcGkuUG9zdEltZ0FkZFJlY29yZCwgYWRkSW1hZ2VBcnIsICdQT1NUJylcclxuICAgICAgY29uc29sZS5sb2coJ2FkZFJlc3VsdCcsIGFkZFJlc3VsdClcclxuICAgICAgaWYgKHBvc3RfcHJpY2UgJiYgcG9zdF9wcmljZSAhPT0gMCkge1xyXG4gICAgICAgIHRoaXMucGF5KGxhc3RJZCwgcmVtYWluZGVyX2FmdGVyKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gJydcclxuICAgICAgICBpZiAocmVtYWluZGVyX2JlZm9yZSAhPT0gcmVtYWluZGVyX2FmdGVyKSB7XHJcbiAgICAgICAgICAvLyDkvb/nlKjmrKHmlbDmirXmiaNcclxuICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3QoYXBpLlVzZXJSdWR1Y2VSZW1haW5kZXIsIHsgcG9zdF9pZDogbGFzdElkLCByZW1haW5kZXJfYWZ0ZXIgfSwgXCJQT1NUXCIpXHJcblxyXG4gICAgICAgICAgY29uc3QgdXNlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygndXNlckluZm8nKVxyXG4gICAgICAgICAgdXNlckluZm8ucmVtYWluZGVyID0gcmVtYWluZGVyX2FmdGVyXHJcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlckluZm8nLCB1c2VySW5mbylcclxuICAgICAgICAgIHN0b3JhZ2UyZGF0YSh0aGlzKVxyXG5cclxuICAgICAgICAgIGlmIChyZXMuZXJybm8gPT09IDApIHtcclxuICAgICAgICAgICAgY29udGVudCA9ICflj5HluIPmiJDlip/vvIzmraPlnKjlrqHmoLjkuK0nXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gJ+WPkeW4g+aIkOWKnydcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29udGVudCA9ICflj5HluIPmiJDlip/vvIzmraPlnKjlrqHmoLjkuK0uLi4nXHJcbiAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JywgXHJcbiAgICAgICAgICBjb250ZW50LFxyXG4gICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsIFxyXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvcG9zdC9wb3N0J1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlRmllbGQoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZScsIGUpXHJcbiAgICAgIGNvbnN0IHsgdHlwZSB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRcclxuICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gZS5kZXRhaWxcclxuICAgICAgdGhpc1snY2hhbmdlZEZpZWxkcyddW3R5cGVdID0gdmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBwYXkobGFzdElkLCByZW1haW5kZXJfYWZ0ZXIpIHtcclxuICAgICAgY29uc3QgX3RoaXMgPSB0aGlzXHJcbiAgICAgIHJlcXVlc3QoYXBpLkFwcGx5UGF5LCB7IHBvc3RfaWQ6IGxhc3RJZCwgcmVtYWluZGVyX2FmdGVyIH0sIFwiUE9TVFwiKVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLnlLPor7fliIbplIDllYYgcmVzOiBcIiwgcmVzKVxyXG4gICAgICAgIGlmKHJlcy5lcnJubyA9PT0gMSl7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogXCLnlLPor7fkuK0uLlwiIH0pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBheVByZXBheUlkIHJlczogXCIsIHJlcylcclxuICAgICAgICAgIGlmIChyZXMuZXJybm8gPT09IDApIHtcclxuICAgICAgICAgICAgbGV0IHBheVBhcmFtID0gcmVzLmRhdGFcclxuICAgICAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xyXG4gICAgICAgICAgICAgICd0aW1lU3RhbXAnOiBwYXlQYXJhbS50aW1lU3RhbXAsXHJcbiAgICAgICAgICAgICAgJ25vbmNlU3RyJzogcGF5UGFyYW0ubm9uY2VTdHIsXHJcbiAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwYXlQYXJhbS5wYWNrYWdlLFxyXG4gICAgICAgICAgICAgICdzaWduVHlwZSc6IHBheVBhcmFtLnNpZ25UeXBlLFxyXG4gICAgICAgICAgICAgICdwYXlTaWduJzogcGF5UGFyYW0ucGF5U2lnbixcclxuICAgICAgICAgICAgICAnc3VjY2Vzcyc6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2VzcyB0byByZXF1ZXN0UGF5bWVudCBhbmQgcmVzIGlzOiBcIiwgcmVzKVxyXG4gICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHsgXHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JywgXHJcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmlK/ku5jmiJDlip/vvIzmraPlnKjlrqHmoLjkuK0nLCBcclxuICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXNlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygndXNlckluZm8nKVxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJbmZvLmlzX2Rpc3RyaWJ1dG9yID0gMVxyXG4gICAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycsIHVzZXJJbmZvKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL3VjZW50ZXIvaW5kZXgvaW5kZXgnXHJcbiAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICdmYWlsJzogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmYWlsIHRvIHJlcXVlc3RQYXltZW50IGFuZCByZXMgaXM6IFwiLCByZXMpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHsgXHJcbiAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLCBcclxuICAgICAgICAgICAgICBjb250ZW50OiAn5pSv5LuY6ZSZ6K+vJywgXHJcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlTW9iaWxlKGUpIHtcclxuICAgICAgdGhpc1snY2hhbmdlZEZpZWxkcyddWydtb2JpbGUnXSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0FncmVlbWVudChlKSB7XHJcbiAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6ICfjgIrlkIjkvJnkurrpobvnn6XjgIsnLFxyXG4gICAgICAgIC8vIGNvbnRlbnQ6ICfkvJjpgInlrqLlnKjkvb/nlKjkvJjpgInlrqLogZTnm5/mj5DkvpvnmoTlkITpobnmnI3liqHnmoTlkIzkuovvvIzmib/or7rmjqXlj5flubbpgbXlrojlkITpobnop4TlrprjgIHop4TliJnvvIzkvJjpgInlrqLogZTnm5/mnInmnYPmoLnmja7pnIDopoHkuI3ml7bnmoTkv67mlLnmnKzljY/orq7lkozop4TliJnvvIzmlrDop4TliJnlnKjkvJjpgInlrqLogZTnm5/lubPlj7Dlj5HluIPvvIzlpoLmnInkvJjpgInlrqLov53lj43mlrDop4TliJnvvIzmtonlj4rov53ms5Xniq/nvarvvIzmtonlj4rkvKDplIDnrYnmrLror4jmiYvmrrXvvIzkvJjpgInlrqLogZTnm5/mnInmnYPoh6rliqjop6PpmaTkvJjpgInlrqLvvIzmg4XoioLkuKXph43nmoTlj6/np7vkuqTlj7jms5XmnLrlhbPlpITnkIbjgIJcXG7kvaPph5Hop4TliJnvvJox44CB5LiL57qn6LSt5Lmw5ZWG5ZOB5Li65ZWG5ZOB5Lu35qC8KjAuMDIq5YiG5oiQ5q+UPeS9o+mHke+8mzLjgIHmjqjojZDmiJDkuLrlkIjkvJnkurrnm7TmjqXku47kuIvnuqfliqDlhaXotLnnlKjmj5A3MCXvvIzkuoznuqfliqDlhaXotLnnlKjmj5AyMCXvvJvor6XkvaPph5Hop4TliJnmjIHnu63liLAyMDE45bm0MTDmnIgx5Y+3MOeCue+8jOWxiuaXtuabtOaUueinhOWImeOAgidcclxuICAgICAgICBjb250ZW50OiAn5LyY6YCJ5a6i5Zyo5L2/55So5LyY6YCJ5a6i6IGU55uf5o+Q5L6b55qE5ZCE6aG55pyN5Yqh55qE5ZCM5LqL77yM5om/6K+65o6l5Y+X5bm26YG15a6I5ZCE6aG56KeE5a6a44CB6KeE5YiZ77yM5LyY6YCJ5a6i6IGU55uf5pyJ5p2D5qC55o2u6ZyA6KaB5LiN5pe255qE5L+u5pS55pys5Y2P6K6u5ZKM6KeE5YiZ77yM5paw6KeE5YiZ5Zyo5LyY6YCJ5a6i6IGU55uf5bmz5Y+w5Y+R5biD77yM5aaC5pyJ5LyY6YCJ5a6i6L+d5Y+N5paw6KeE5YiZ77yM5raJ5Y+K6L+d5rOV54qv572q77yM5raJ5Y+K5Lyg6ZSA562J5qy66K+I5omL5q6177yM5LyY6YCJ5a6i6IGU55uf5pyJ5p2D6Ieq5Yqo6Kej6Zmk5LyY6YCJ5a6i77yM5oOF6IqC5Lil6YeN55qE5Y+v56e75Lqk5Y+45rOV5py65YWz5aSE55CG44CCJyxcclxuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuIl19