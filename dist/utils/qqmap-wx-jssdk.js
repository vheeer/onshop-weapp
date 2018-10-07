'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 微信小程序JavaScriptSDK
 * 
 * @version 1.0
 * @date 2017-01-10
 * @author jaysonzhou@tencent.com
 */

var ERROR_CONF = {
    KEY_ERR: 311,
    KEY_ERR_MSG: 'key格式错误',
    PARAM_ERR: 310,
    PARAM_ERR_MSG: '请求参数信息有误',
    SYSTEM_ERR: 600,
    SYSTEM_ERR_MSG: '系统错误',
    WX_ERR_CODE: 1000,
    WX_OK_CODE: 200
};
var BASE_URL = 'https://apis.map.qq.com/ws/';
var URL_SEARCH = BASE_URL + 'place/v1/search';
var URL_SUGGESTION = BASE_URL + 'place/v1/suggestion';
var URL_GET_GEOCODER = BASE_URL + 'geocoder/v1/';
var URL_CITY_LIST = BASE_URL + 'district/v1/list';
var URL_AREA_LIST = BASE_URL + 'district/v1/getchildren';
var URL_DISTANCE = BASE_URL + 'distance/v1/';
var Utils = {
    /**
     * 得到终点query字符串
     * @param {Array|String} 检索数据
     */
    location2query: function location2query(data) {
        if (typeof data == 'string') {
            return data;
        }
        var query = '';
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            if (!!query) {
                query += ';';
            }
            if (d.location) {
                query = query + d.location.lat + ',' + d.location.lng;
            }
            if (d.latitude && d.longitude) {
                query = query + d.latitude + ',' + d.longitude;
            }
        }
        return query;
    },


    /**
     * 使用微信接口进行定位
     */
    getWXLocation: function getWXLocation(success, fail, complete) {
        wx.getLocation({
            type: 'gcj02',
            success: success,
            fail: fail,
            complete: complete
        });
    },


    /**
     * 获取location参数
     */
    getLocationParam: function getLocationParam(location) {
        if (typeof location == 'string') {
            var locationArr = location.split(',');
            if (locationArr.length === 2) {
                location = {
                    latitude: location.split(',')[0],
                    longitude: location.split(',')[1]
                };
            } else {
                location = {};
            }
        }
        return location;
    },


    /**
     * 回调函数默认处理
     */
    polyfillParam: function polyfillParam(param) {
        param.success = param.success || function () {};
        param.fail = param.fail || function () {};
        param.complete = param.complete || function () {};
    },


    /**
     * 验证param对应的key值是否为空
     * 
     * @param {Object} param 接口参数
     * @param {String} key 对应参数的key
     */
    checkParamKeyEmpty: function checkParamKeyEmpty(param, key) {
        if (!param[key]) {
            var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + key + '参数格式有误');
            param.fail(errconf);
            param.complete(errconf);
            return true;
        }
        return false;
    },


    /**
     * 验证参数中是否存在检索词keyword
     * 
     * @param {Object} param 接口参数
     */
    checkKeyword: function checkKeyword(param) {
        return !this.checkParamKeyEmpty(param, 'keyword');
    },


    /**
     * 验证location值
     * 
     * @param {Object} param 接口参数
     */
    checkLocation: function checkLocation(param) {
        var location = this.getLocationParam(param.location);
        if (!location || !location.latitude || !location.longitude) {
            var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + ' location参数格式有误');
            param.fail(errconf);
            param.complete(errconf);
            return false;
        }
        return true;
    },


    /**
     * 构造错误数据结构
     * @param {Number} errCode 错误码
     * @param {Number} errMsg 错误描述
     */
    buildErrorConfig: function buildErrorConfig(errCode, errMsg) {
        return {
            status: errCode,
            message: errMsg
        };
    },


    /**
     * 构造微信请求参数，公共属性处理
     * 
     * @param {Object} param 接口参数
     * @param {Object} param 配置项
     */
    buildWxRequestConfig: function buildWxRequestConfig(param, options) {
        var that = this;
        options.header = { "content-type": "application/json" };
        options.method = 'GET';
        options.success = function (res) {
            var data = res.data;
            if (data.status === 0) {
                param.success(data);
            } else {
                param.fail(data);
            }
        };
        options.fail = function (res) {
            res.statusCode = ERROR_CONF.WX_ERR_CODE;
            param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, result.errMsg));
        };
        options.complete = function (res) {
            var statusCode = +res.statusCode;
            switch (statusCode) {
                case ERROR_CONF.WX_ERR_CODE:
                    {
                        param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
                        break;
                    }
                case ERROR_CONF.WX_OK_CODE:
                    {
                        var data = res.data;
                        if (data.status === 0) {
                            param.complete(data);
                        } else {
                            param.complete(that.buildErrorConfig(data.status, data.message));
                        }
                        break;
                    }
                default:
                    {
                        param.complete(that.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));
                    }

            }
        };
        return options;
    },


    /**
     * 处理用户参数是否传入坐标进行不同的处理
     */
    locationProcess: function locationProcess(param, locationsuccess, locationfail, locationcomplete) {
        var that = this;
        locationfail = locationfail || function (res) {
            res.statusCode = ERROR_CONF.WX_ERR_CODE;
            param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
        };
        locationcomplete = locationcomplete || function (res) {
            if (res.statusCode == ERROR_CONF.WX_ERR_CODE) {
                param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
            }
        };
        if (!param.location) {
            that.getWXLocation(locationsuccess, locationfail, locationcomplete);
        } else if (that.checkLocation(param)) {
            var location = Utils.getLocationParam(param.location);
            locationsuccess(location);
        }
    }
};

var QQMapWX = function () {

    /**
     * 构造函数
     * 
     * @param {Object} options 接口参数,key 为必选参数
     */
    function QQMapWX(options) {
        _classCallCheck(this, QQMapWX);

        if (!options.key) {
            throw Error('key值不能为空');
        }
        this.key = options.key;
    }

    /**
     * POI周边检索
     *
     * @param {Object} options 接口参数对象
     * 
     * 参数对象结构可以参考
     * @see http://lbs.qq.com/webservice_v1/guide-search.html
     */


    _createClass(QQMapWX, [{
        key: 'search',
        value: function search(options) {
            var that = this;
            options = options || {};

            Utils.polyfillParam(options);

            if (!Utils.checkKeyword(options)) {
                return;
            }

            var requestParam = {
                keyword: options.keyword,
                orderby: options.orderby || '_distance',
                page_size: options.page_size || 10,
                page_index: options.page_index || 1,
                output: 'json',
                key: that.key
            };

            if (options.address_format) {
                requestParam.address_format = options.address_format;
            }

            if (options.filter) {
                requestParam.filter = options.filter;
            }

            var distance = options.distance || "1000";
            var auto_extend = options.auto_extend || 1;

            var locationsuccess = function locationsuccess(result) {
                requestParam.boundary = "nearby(" + result.latitude + "," + result.longitude + "," + distance + "," + auto_extend + ")";
                wx.request(Utils.buildWxRequestConfig(options, {
                    url: URL_SEARCH,
                    data: requestParam
                }));
            };
            Utils.locationProcess(options, locationsuccess);
        }

        /**
         * sug模糊检索
         *
         * @param {Object} options 接口参数对象
         * 
         * 参数对象结构可以参考
         * http://lbs.qq.com/webservice_v1/guide-suggestion.html
         */

    }, {
        key: 'getSuggestion',
        value: function getSuggestion(options) {
            var that = this;
            options = options || {};
            Utils.polyfillParam(options);

            if (!Utils.checkKeyword(options)) {
                return;
            }

            var requestParam = {
                keyword: options.keyword,
                region: options.region || '全国',
                region_fix: options.region_fix || 0,
                policy: options.policy || 0,
                output: 'json',
                key: that.key
            };
            wx.request(Utils.buildWxRequestConfig(options, {
                url: URL_SUGGESTION,
                data: requestParam
            }));
        }

        /**
         * 逆地址解析
         *
         * @param {Object} options 接口参数对象
         * 
         * 请求参数结构可以参考
         * http://lbs.qq.com/webservice_v1/guide-gcoder.html
         */

    }, {
        key: 'reverseGeocoder',
        value: function reverseGeocoder(options) {
            var that = this;
            options = options || {};
            Utils.polyfillParam(options);
            var requestParam = {
                coord_type: options.coord_type || 5,
                get_poi: options.get_poi || 0,
                output: 'json',
                key: that.key
            };
            if (options.poi_options) {
                requestParam.poi_options = options.poi_options;
            }

            var locationsuccess = function locationsuccess(result) {
                requestParam.location = result.latitude + ',' + result.longitude;
                wx.request(Utils.buildWxRequestConfig(options, {
                    url: URL_GET_GEOCODER,
                    data: requestParam
                }));
            };
            Utils.locationProcess(options, locationsuccess);
        }

        /**
         * 地址解析
         *
         * @param {Object} options 接口参数对象
         * 
         * 请求参数结构可以参考
         * http://lbs.qq.com/webservice_v1/guide-geocoder.html
         */

    }, {
        key: 'geocoder',
        value: function geocoder(options) {
            var that = this;
            options = options || {};
            Utils.polyfillParam(options);

            if (Utils.checkParamKeyEmpty(options, 'address')) {
                return;
            }

            var requestParam = {
                address: options.address,
                output: 'json',
                key: that.key
            };

            wx.request(Utils.buildWxRequestConfig(options, {
                url: URL_GET_GEOCODER,
                data: requestParam
            }));
        }

        /**
         * 获取城市列表
         *
         * @param {Object} options 接口参数对象
         * 
         * 请求参数结构可以参考
         * http://lbs.qq.com/webservice_v1/guide-region.html
         */

    }, {
        key: 'getCityList',
        value: function getCityList(options) {
            var that = this;
            options = options || {};
            Utils.polyfillParam(options);
            var requestParam = {
                output: 'json',
                key: that.key
            };

            wx.request(Utils.buildWxRequestConfig(options, {
                url: URL_CITY_LIST,
                data: requestParam
            }));
        }

        /**
         * 获取对应城市ID的区县列表
         *
         * @param {Object} options 接口参数对象
         * 
         * 请求参数结构可以参考
         * http://lbs.qq.com/webservice_v1/guide-region.html
         */

    }, {
        key: 'getDistrictByCityId',
        value: function getDistrictByCityId(options) {
            var that = this;
            options = options || {};
            Utils.polyfillParam(options);

            if (Utils.checkParamKeyEmpty(options, 'id')) {
                return;
            }

            var requestParam = {
                id: options.id || '',
                output: 'json',
                key: that.key
            };

            wx.request(Utils.buildWxRequestConfig(options, {
                url: URL_AREA_LIST,
                data: requestParam
            }));
        }

        /**
         * 用于单起点到多终点的路线距离(非直线距离)计算：
         * 支持两种距离计算方式：步行和驾车。
         * 起点到终点最大限制直线距离10公里。
         *
         * @param {Object} options 接口参数对象
         * 
         * 请求参数结构可以参考
         * http://lbs.qq.com/webservice_v1/guide-distance.html
         */

    }, {
        key: 'calculateDistance',
        value: function calculateDistance(options) {
            var that = this;
            options = options || {};
            Utils.polyfillParam(options);

            if (Utils.checkParamKeyEmpty(options, 'to')) {
                return;
            }

            var requestParam = {
                mode: options.mode || 'walking',
                to: Utils.location2query(options.to),
                output: 'json',
                key: that.key
            };

            var locationsuccess = function locationsuccess(result) {
                requestParam.from = result.latitude + ',' + result.longitude;
                wx.request(Utils.buildWxRequestConfig(options, {
                    url: URL_DISTANCE,
                    data: requestParam
                }));
            };
            if (options.from) {
                options.location = options.from;
            }

            Utils.locationProcess(options, locationsuccess);
        }
    }]);

    return QQMapWX;
}();

module.exports = QQMapWX;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInFxbWFwLXd4LWpzc2RrLmpzIl0sIm5hbWVzIjpbIkVSUk9SX0NPTkYiLCJLRVlfRVJSIiwiS0VZX0VSUl9NU0ciLCJQQVJBTV9FUlIiLCJQQVJBTV9FUlJfTVNHIiwiU1lTVEVNX0VSUiIsIlNZU1RFTV9FUlJfTVNHIiwiV1hfRVJSX0NPREUiLCJXWF9PS19DT0RFIiwiQkFTRV9VUkwiLCJVUkxfU0VBUkNIIiwiVVJMX1NVR0dFU1RJT04iLCJVUkxfR0VUX0dFT0NPREVSIiwiVVJMX0NJVFlfTElTVCIsIlVSTF9BUkVBX0xJU1QiLCJVUkxfRElTVEFOQ0UiLCJVdGlscyIsImxvY2F0aW9uMnF1ZXJ5IiwiZGF0YSIsInF1ZXJ5IiwiaSIsImxlbmd0aCIsImQiLCJsb2NhdGlvbiIsImxhdCIsImxuZyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiZ2V0V1hMb2NhdGlvbiIsInN1Y2Nlc3MiLCJmYWlsIiwiY29tcGxldGUiLCJ3eCIsImdldExvY2F0aW9uIiwidHlwZSIsImdldExvY2F0aW9uUGFyYW0iLCJsb2NhdGlvbkFyciIsInNwbGl0IiwicG9seWZpbGxQYXJhbSIsInBhcmFtIiwiY2hlY2tQYXJhbUtleUVtcHR5Iiwia2V5IiwiZXJyY29uZiIsImJ1aWxkRXJyb3JDb25maWciLCJjaGVja0tleXdvcmQiLCJjaGVja0xvY2F0aW9uIiwiZXJyQ29kZSIsImVyck1zZyIsInN0YXR1cyIsIm1lc3NhZ2UiLCJidWlsZFd4UmVxdWVzdENvbmZpZyIsIm9wdGlvbnMiLCJ0aGF0IiwiaGVhZGVyIiwibWV0aG9kIiwicmVzIiwic3RhdHVzQ29kZSIsInJlc3VsdCIsImxvY2F0aW9uUHJvY2VzcyIsImxvY2F0aW9uc3VjY2VzcyIsImxvY2F0aW9uZmFpbCIsImxvY2F0aW9uY29tcGxldGUiLCJRUU1hcFdYIiwiRXJyb3IiLCJyZXF1ZXN0UGFyYW0iLCJrZXl3b3JkIiwib3JkZXJieSIsInBhZ2Vfc2l6ZSIsInBhZ2VfaW5kZXgiLCJvdXRwdXQiLCJhZGRyZXNzX2Zvcm1hdCIsImZpbHRlciIsImRpc3RhbmNlIiwiYXV0b19leHRlbmQiLCJib3VuZGFyeSIsInJlcXVlc3QiLCJ1cmwiLCJyZWdpb24iLCJyZWdpb25fZml4IiwicG9saWN5IiwiY29vcmRfdHlwZSIsImdldF9wb2kiLCJwb2lfb3B0aW9ucyIsImFkZHJlc3MiLCJpZCIsIm1vZGUiLCJ0byIsImZyb20iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7Ozs7QUFRQSxJQUFJQSxhQUFhO0FBQ2JDLGFBQVMsR0FESTtBQUViQyxpQkFBYSxTQUZBO0FBR2JDLGVBQVcsR0FIRTtBQUliQyxtQkFBZSxVQUpGO0FBS2JDLGdCQUFZLEdBTEM7QUFNYkMsb0JBQWdCLE1BTkg7QUFPYkMsaUJBQWEsSUFQQTtBQVFiQyxnQkFBWTtBQVJDLENBQWpCO0FBVUEsSUFBSUMsV0FBVyw2QkFBZjtBQUNBLElBQUlDLGFBQWFELFdBQVcsaUJBQTVCO0FBQ0EsSUFBSUUsaUJBQWlCRixXQUFXLHFCQUFoQztBQUNBLElBQUlHLG1CQUFtQkgsV0FBVyxjQUFsQztBQUNBLElBQUlJLGdCQUFnQkosV0FBVyxrQkFBL0I7QUFDQSxJQUFJSyxnQkFBZ0JMLFdBQVcseUJBQS9CO0FBQ0EsSUFBSU0sZUFBZU4sV0FBVyxjQUE5QjtBQUNBLElBQUlPLFFBQVE7QUFDUjs7OztBQUlBQyxrQkFMUSwwQkFLT0MsSUFMUCxFQUthO0FBQ2pCLFlBQUksT0FBT0EsSUFBUCxJQUFlLFFBQW5CLEVBQTZCO0FBQ3pCLG1CQUFPQSxJQUFQO0FBQ0g7QUFDRCxZQUFJQyxRQUFRLEVBQVo7QUFDQSxhQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsS0FBS0csTUFBekIsRUFBaUNELEdBQWpDLEVBQXNDO0FBQ2xDLGdCQUFJRSxJQUFJSixLQUFLRSxDQUFMLENBQVI7QUFDQSxnQkFBSSxDQUFDLENBQUNELEtBQU4sRUFBYTtBQUNUQSx5QkFBUyxHQUFUO0FBQ0g7QUFDRCxnQkFBSUcsRUFBRUMsUUFBTixFQUFn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QUNBRCxzQkFBVUEsV0FBVyxFQUFyQjtBQUNBbkMsa0JBQU1zQixhQUFOLENBQW9CYSxPQUFwQjs7QUFFQSxnQkFBSW5DLE1BQU13QixrQkFBTixDQUF5QlcsT0FBekIsRUFBa0MsSUFBbEMsQ0FBSixFQUE2QztBQUN6QztBQUNIOztBQUVELGdCQUFJYSxlQUFlO0FBQ2ZxQixzQkFBTWxDLFFBQVFrQyxJQUFSLElBQWdCLFNBRFA7QUFFZkMsb0JBQUl0RSxNQUFNQyxjQUFOLENBQXFCa0MsUUFBUW1DLEVBQTdCLENBRlc7QUFHZmpCLHdCQUFRLE1BSE87QUFJZjVCLHFCQUFLVyxLQUFLWDtBQUpLLGFBQW5COztBQU9BLGdCQUFJa0Isa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFVRixNQUFWLEVBQWtCO0FBQ3BDTyw2QkFBYXVCLElBQWIsR0FBb0I5QixPQUFPL0IsUUFBUCxHQUFrQixHQUFsQixHQUF3QitCLE9BQU85QixTQUFuRDtBQUNBSyxtQkFBRzJDLE9BQUgsQ0FBVzNELE1BQU1rQyxvQkFBTixDQUEyQkMsT0FBM0IsRUFBb0M7QUFDM0N5Qix5QkFBSzdELFlBRHNDO0FBRTNDRywwQkFBTThDO0FBRnFDLGlCQUFwQyxDQUFYO0FBSUgsYUFORDtBQU9BLGdCQUFJYixRQUFRb0MsSUFBWixFQUFrQjtBQUNkcEMsd0JBQVE1QixRQUFSLEdBQW1CNEIsUUFBUW9DLElBQTNCO0FBQ0g7O0FBRUR2RSxrQkFBTTBDLGVBQU4sQ0FBc0JQLE9BQXRCLEVBQStCUSxlQUEvQjtBQUNIOzs7Ozs7QUFHTDZCLE9BQU9DLE9BQVAsR0FBaUIzQixPQUFqQiIsImZpbGUiOiJxcW1hcC13eC1qc3Nkay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDlvq7kv6HlsI/nqIvluo9KYXZhU2NyaXB0U0RLXHJcbiAqIFxyXG4gKiBAdmVyc2lvbiAxLjBcclxuICogQGRhdGUgMjAxNy0wMS0xMFxyXG4gKiBAYXV0aG9yIGpheXNvbnpob3VAdGVuY2VudC5jb21cclxuICovXHJcblxyXG52YXIgRVJST1JfQ09ORiA9IHtcclxuICAgIEtFWV9FUlI6IDMxMSxcclxuICAgIEtFWV9FUlJfTVNHOiAna2V55qC85byP6ZSZ6K+vJyxcclxuICAgIFBBUkFNX0VSUjogMzEwLFxyXG4gICAgUEFSQU1fRVJSX01TRzogJ+ivt+axguWPguaVsOS/oeaBr+acieivrycsXHJcbiAgICBTWVNURU1fRVJSOiA2MDAsXHJcbiAgICBTWVNURU1fRVJSX01TRzogJ+ezu+e7n+mUmeivrycsXHJcbiAgICBXWF9FUlJfQ09ERTogMTAwMCxcclxuICAgIFdYX09LX0NPREU6IDIwMFxyXG59O1xyXG52YXIgQkFTRV9VUkwgPSAnaHR0cHM6Ly9hcGlzLm1hcC5xcS5jb20vd3MvJztcclxudmFyIFVSTF9TRUFSQ0ggPSBCQVNFX1VSTCArICdwbGFjZS92MS9zZWFyY2gnO1xyXG52YXIgVVJMX1NVR0dFU1RJT04gPSBCQVNFX1VSTCArICdwbGFjZS92MS9zdWdnZXN0aW9uJztcclxudmFyIFVSTF9HRVRfR0VPQ09ERVIgPSBCQVNFX1VSTCArICdnZW9jb2Rlci92MS8nO1xyXG52YXIgVVJMX0NJVFlfTElTVCA9IEJBU0VfVVJMICsgJ2Rpc3RyaWN0L3YxL2xpc3QnO1xyXG52YXIgVVJMX0FSRUFfTElTVCA9IEJBU0VfVVJMICsgJ2Rpc3RyaWN0L3YxL2dldGNoaWxkcmVuJztcclxudmFyIFVSTF9ESVNUQU5DRSA9IEJBU0VfVVJMICsgJ2Rpc3RhbmNlL3YxLyc7XHJcbnZhciBVdGlscyA9IHtcclxuICAgIC8qKlxyXG4gICAgICog5b6X5Yiw57uI54K5cXVlcnnlrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSDmo4DntKLmlbDmja5cclxuICAgICAqL1xyXG4gICAgbG9jYXRpb24ycXVlcnkoZGF0YSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHF1ZXJ5ID0gJyc7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBkID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgaWYgKCEhcXVlcnkpIHtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5ICs9ICc7JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZC5sb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgcXVlcnkgPSBxdWVyeSArIGQubG9jYXRpb24ubGF0ICsgJywnICsgZC5sb2NhdGlvbi5sbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGQubGF0aXR1ZGUgJiYgZC5sb25naXR1ZGUpIHtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gcXVlcnkgKyBkLmxhdGl0dWRlICsgJywnICsgZC5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHF1ZXJ5O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOS9v+eUqOW+ruS/oeaOpeWPo+i/m+ihjOWumuS9jVxyXG4gICAgICovXHJcbiAgICBnZXRXWExvY2F0aW9uKHN1Y2Nlc3MsIGZhaWwsIGNvbXBsZXRlKSB7XHJcbiAgICAgICAgd3guZ2V0TG9jYXRpb24oe1xyXG4gICAgICAgICAgICB0eXBlOiAnZ2NqMDInLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBzdWNjZXNzLFxyXG4gICAgICAgICAgICBmYWlsOiBmYWlsLFxyXG4gICAgICAgICAgICBjb21wbGV0ZTogY29tcGxldGVcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5Zsb2NhdGlvbuWPguaVsFxyXG4gICAgICovXHJcbiAgICBnZXRMb2NhdGlvblBhcmFtKGxvY2F0aW9uKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhdGlvbiA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB2YXIgbG9jYXRpb25BcnIgPSBsb2NhdGlvbi5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICBpZiAobG9jYXRpb25BcnIubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBsYXRpdHVkZTogbG9jYXRpb24uc3BsaXQoJywnKVswXSxcclxuICAgICAgICAgICAgICAgICAgICBsb25naXR1ZGU6IGxvY2F0aW9uLnNwbGl0KCcsJylbMV1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbiA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsb2NhdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlm57osIPlh73mlbDpu5jorqTlpITnkIZcclxuICAgICAqL1xyXG4gICAgcG9seWZpbGxQYXJhbShwYXJhbSkge1xyXG4gICAgICAgIHBhcmFtLnN1Y2Nlc3MgPSBwYXJhbS5zdWNjZXNzIHx8IGZ1bmN0aW9uICgpIHsgfTtcclxuICAgICAgICBwYXJhbS5mYWlsID0gcGFyYW0uZmFpbCB8fCBmdW5jdGlvbiAoKSB7IH07XHJcbiAgICAgICAgcGFyYW0uY29tcGxldGUgPSBwYXJhbS5jb21wbGV0ZSB8fCBmdW5jdGlvbiAoKSB7IH07XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aqM6K+BcGFyYW3lr7nlupTnmoRrZXnlgLzmmK/lkKbkuLrnqbpcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIOaOpeWPo+WPguaVsFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleSDlr7nlupTlj4LmlbDnmoRrZXlcclxuICAgICAqL1xyXG4gICAgY2hlY2tQYXJhbUtleUVtcHR5KHBhcmFtLCBrZXkpIHtcclxuICAgICAgICBpZiAoIXBhcmFtW2tleV0pIHtcclxuICAgICAgICAgICAgdmFyIGVycmNvbmYgPSB0aGlzLmJ1aWxkRXJyb3JDb25maWcoRVJST1JfQ09ORi5QQVJBTV9FUlIsIEVSUk9SX0NPTkYuUEFSQU1fRVJSX01TRyArIGtleSArJ+WPguaVsOagvOW8j+acieivrycpO1xyXG4gICAgICAgICAgICBwYXJhbS5mYWlsKGVycmNvbmYpO1xyXG4gICAgICAgICAgICBwYXJhbS5jb21wbGV0ZShlcnJjb25mKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpqozor4Hlj4LmlbDkuK3mmK/lkKblrZjlnKjmo4DntKLor41rZXl3b3JkXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbSDmjqXlj6Plj4LmlbBcclxuICAgICAqL1xyXG4gICAgY2hlY2tLZXl3b3JkKHBhcmFtKXtcclxuICAgICAgICByZXR1cm4gIXRoaXMuY2hlY2tQYXJhbUtleUVtcHR5KHBhcmFtLCAna2V5d29yZCcpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmqjOivgWxvY2F0aW9u5YC8XHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbSDmjqXlj6Plj4LmlbBcclxuICAgICAqL1xyXG4gICAgY2hlY2tMb2NhdGlvbihwYXJhbSkge1xyXG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbShwYXJhbS5sb2NhdGlvbik7XHJcbiAgICAgICAgaWYgKCFsb2NhdGlvbiB8fCAhbG9jYXRpb24ubGF0aXR1ZGUgfHwgIWxvY2F0aW9uLmxvbmdpdHVkZSkge1xyXG4gICAgICAgICAgICB2YXIgZXJyY29uZiA9IHRoaXMuYnVpbGRFcnJvckNvbmZpZyhFUlJPUl9DT05GLlBBUkFNX0VSUiwgRVJST1JfQ09ORi5QQVJBTV9FUlJfTVNHICsgJyBsb2NhdGlvbuWPguaVsOagvOW8j+acieivrycpXHJcbiAgICAgICAgICAgIHBhcmFtLmZhaWwoZXJyY29uZik7XHJcbiAgICAgICAgICAgIHBhcmFtLmNvbXBsZXRlKGVycmNvbmYpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaehOmAoOmUmeivr+aVsOaNrue7k+aehFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGVyckNvZGUg6ZSZ6K+v56CBXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZXJyTXNnIOmUmeivr+aPj+i/sFxyXG4gICAgICovXHJcbiAgICBidWlsZEVycm9yQ29uZmlnKGVyckNvZGUsIGVyck1zZykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0YXR1czogZXJyQ29kZSxcclxuICAgICAgICAgICAgbWVzc2FnZTogZXJyTXNnXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnoTpgKDlvq7kv6Hor7fmsYLlj4LmlbDvvIzlhazlhbHlsZ7mgKflpITnkIZcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIOaOpeWPo+WPguaVsFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIOmFjee9rumhuVxyXG4gICAgICovXHJcbiAgICBidWlsZFd4UmVxdWVzdENvbmZpZyhwYXJhbSwgb3B0aW9ucykge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICBvcHRpb25zLmhlYWRlciA9IHsgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfTtcclxuICAgICAgICBvcHRpb25zLm1ldGhvZCA9ICdHRVQnO1xyXG4gICAgICAgIG9wdGlvbnMuc3VjY2VzcyA9IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbS5zdWNjZXNzKGRhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGFyYW0uZmFpbChkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgb3B0aW9ucy5mYWlsID0gZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IEVSUk9SX0NPTkYuV1hfRVJSX0NPREU7XHJcbiAgICAgICAgICAgIHBhcmFtLmZhaWwodGhhdC5idWlsZEVycm9yQ29uZmlnKEVSUk9SX0NPTkYuV1hfRVJSX0NPREUsIHJlc3VsdC5lcnJNc2cpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9wdGlvbnMuY29tcGxldGUgPSBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXNDb2RlID0gK3Jlcy5zdGF0dXNDb2RlO1xyXG4gICAgICAgICAgICBzd2l0Y2goc3RhdHVzQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFUlJPUl9DT05GLldYX0VSUl9DT0RFOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uY29tcGxldGUodGhhdC5idWlsZEVycm9yQ29uZmlnKEVSUk9SX0NPTkYuV1hfRVJSX0NPREUsIHJlcy5lcnJNc2cpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgRVJST1JfQ09ORi5XWF9PS19DT0RFOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW0uY29tcGxldGUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW0uY29tcGxldGUodGhhdC5idWlsZEVycm9yQ29uZmlnKGRhdGEuc3RhdHVzLCBkYXRhLm1lc3NhZ2UpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OntcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5jb21wbGV0ZSh0aGF0LmJ1aWxkRXJyb3JDb25maWcoRVJST1JfQ09ORi5TWVNURU1fRVJSLCBFUlJPUl9DT05GLlNZU1RFTV9FUlJfTVNHKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWkhOeQhueUqOaIt+WPguaVsOaYr+WQpuS8oOWFpeWdkOagh+i/m+ihjOS4jeWQjOeahOWkhOeQhlxyXG4gICAgICovXHJcbiAgICBsb2NhdGlvblByb2Nlc3MocGFyYW0sIGxvY2F0aW9uc3VjY2VzcywgbG9jYXRpb25mYWlsLCBsb2NhdGlvbmNvbXBsZXRlKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGxvY2F0aW9uZmFpbCA9IGxvY2F0aW9uZmFpbCB8fCBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gRVJST1JfQ09ORi5XWF9FUlJfQ09ERTtcclxuICAgICAgICAgICAgcGFyYW0uZmFpbCh0aGF0LmJ1aWxkRXJyb3JDb25maWcoRVJST1JfQ09ORi5XWF9FUlJfQ09ERSwgcmVzLmVyck1zZykpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbG9jYXRpb25jb21wbGV0ZSA9IGxvY2F0aW9uY29tcGxldGUgfHwgZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gRVJST1JfQ09ORi5XWF9FUlJfQ09ERSkge1xyXG4gICAgICAgICAgICAgICAgcGFyYW0uY29tcGxldGUodGhhdC5idWlsZEVycm9yQ29uZmlnKEVSUk9SX0NPTkYuV1hfRVJSX0NPREUsIHJlcy5lcnJNc2cpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKCFwYXJhbS5sb2NhdGlvbikge1xyXG4gICAgICAgICAgICB0aGF0LmdldFdYTG9jYXRpb24obG9jYXRpb25zdWNjZXNzLCBsb2NhdGlvbmZhaWwsIGxvY2F0aW9uY29tcGxldGUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhhdC5jaGVja0xvY2F0aW9uKHBhcmFtKSkge1xyXG4gICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBVdGlscy5nZXRMb2NhdGlvblBhcmFtKHBhcmFtLmxvY2F0aW9uKTtcclxuICAgICAgICAgICAgbG9jYXRpb25zdWNjZXNzKGxvY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBRUU1hcFdYIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaehOmAoOWHveaVsFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyDmjqXlj6Plj4LmlbAsa2V5IOS4uuW/hemAieWPguaVsFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKCFvcHRpb25zLmtleSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcigna2V55YC85LiN6IO95Li656m6Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMua2V5ID0gb3B0aW9ucy5rZXk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQT0nlkajovrnmo4DntKJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyDmjqXlj6Plj4LmlbDlr7nosaFcclxuICAgICAqIFxyXG4gICAgICog5Y+C5pWw5a+56LGh57uT5p6E5Y+v5Lul5Y+C6ICDXHJcbiAgICAgKiBAc2VlIGh0dHA6Ly9sYnMucXEuY29tL3dlYnNlcnZpY2VfdjEvZ3VpZGUtc2VhcmNoLmh0bWxcclxuICAgICAqL1xyXG4gICAgc2VhcmNoKG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgICAgIFV0aWxzLnBvbHlmaWxsUGFyYW0ob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICghVXRpbHMuY2hlY2tLZXl3b3JkKG9wdGlvbnMpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByZXF1ZXN0UGFyYW0gPSB7XHJcbiAgICAgICAgICAgIGtleXdvcmQ6IG9wdGlvbnMua2V5d29yZCxcclxuICAgICAgICAgICAgb3JkZXJieTogb3B0aW9ucy5vcmRlcmJ5IHx8ICdfZGlzdGFuY2UnLFxyXG4gICAgICAgICAgICBwYWdlX3NpemU6IG9wdGlvbnMucGFnZV9zaXplIHx8IDEwLFxyXG4gICAgICAgICAgICBwYWdlX2luZGV4OiBvcHRpb25zLnBhZ2VfaW5kZXggfHwgMSxcclxuICAgICAgICAgICAgb3V0cHV0OiAnanNvbicsXHJcbiAgICAgICAgICAgIGtleTogdGhhdC5rZXlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5hZGRyZXNzX2Zvcm1hdCkge1xyXG4gICAgICAgICAgICByZXF1ZXN0UGFyYW0uYWRkcmVzc19mb3JtYXQgPSBvcHRpb25zLmFkZHJlc3NfZm9ybWF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuZmlsdGVyKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RQYXJhbS5maWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IG9wdGlvbnMuZGlzdGFuY2UgfHwgXCIxMDAwXCI7XHJcbiAgICAgICAgdmFyIGF1dG9fZXh0ZW5kID0gb3B0aW9ucy5hdXRvX2V4dGVuZCB8fCAxO1xyXG5cclxuICAgICAgICB2YXIgbG9jYXRpb25zdWNjZXNzID0gZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXF1ZXN0UGFyYW0uYm91bmRhcnkgPSBcIm5lYXJieShcIiArIHJlc3VsdC5sYXRpdHVkZSArIFwiLFwiICsgcmVzdWx0LmxvbmdpdHVkZSArIFwiLFwiICsgZGlzdGFuY2UgKyBcIixcIiArIGF1dG9fZXh0ZW5kICtcIilcIjtcclxuICAgICAgICAgICAgd3gucmVxdWVzdChVdGlscy5idWlsZFd4UmVxdWVzdENvbmZpZyhvcHRpb25zLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6IFVSTF9TRUFSQ0gsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByZXF1ZXN0UGFyYW1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVdGlscy5sb2NhdGlvblByb2Nlc3Mob3B0aW9ucywgbG9jYXRpb25zdWNjZXNzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHN1Z+aooeeziuajgOe0olxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIOaOpeWPo+WPguaVsOWvueixoVxyXG4gICAgICogXHJcbiAgICAgKiDlj4LmlbDlr7nosaHnu5PmnoTlj6/ku6Xlj4LogINcclxuICAgICAqIGh0dHA6Ly9sYnMucXEuY29tL3dlYnNlcnZpY2VfdjEvZ3VpZGUtc3VnZ2VzdGlvbi5odG1sXHJcbiAgICAgKi9cclxuICAgIGdldFN1Z2dlc3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBVdGlscy5wb2x5ZmlsbFBhcmFtKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAoIVV0aWxzLmNoZWNrS2V5d29yZChvcHRpb25zKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmVxdWVzdFBhcmFtID0ge1xyXG4gICAgICAgICAgICBrZXl3b3JkOiBvcHRpb25zLmtleXdvcmQsXHJcbiAgICAgICAgICAgIHJlZ2lvbjogb3B0aW9ucy5yZWdpb24gfHwgJ+WFqOWbvScsXHJcbiAgICAgICAgICAgIHJlZ2lvbl9maXg6IG9wdGlvbnMucmVnaW9uX2ZpeCB8fCAwLFxyXG4gICAgICAgICAgICBwb2xpY3k6IG9wdGlvbnMucG9saWN5IHx8IDAsXHJcbiAgICAgICAgICAgIG91dHB1dDogJ2pzb24nLFxyXG4gICAgICAgICAgICBrZXk6IHRoYXQua2V5XHJcbiAgICAgICAgfTtcclxuICAgICAgICB3eC5yZXF1ZXN0KFV0aWxzLmJ1aWxkV3hSZXF1ZXN0Q29uZmlnKG9wdGlvbnMsIHtcclxuICAgICAgICAgICAgdXJsOiBVUkxfU1VHR0VTVElPTixcclxuICAgICAgICAgICAgZGF0YTogcmVxdWVzdFBhcmFtXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCG5Zyw5Z2A6Kej5p6QXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMg5o6l5Y+j5Y+C5pWw5a+56LGhXHJcbiAgICAgKiBcclxuICAgICAqIOivt+axguWPguaVsOe7k+aehOWPr+S7peWPguiAg1xyXG4gICAgICogaHR0cDovL2xicy5xcS5jb20vd2Vic2VydmljZV92MS9ndWlkZS1nY29kZXIuaHRtbFxyXG4gICAgICovXHJcbiAgICByZXZlcnNlR2VvY29kZXIob3B0aW9ucykge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBVdGlscy5wb2x5ZmlsbFBhcmFtKG9wdGlvbnMpO1xyXG4gICAgICAgIHZhciByZXF1ZXN0UGFyYW0gPSB7XHJcbiAgICAgICAgICAgIGNvb3JkX3R5cGU6IG9wdGlvbnMuY29vcmRfdHlwZSB8fCA1LFxyXG4gICAgICAgICAgICBnZXRfcG9pOiBvcHRpb25zLmdldF9wb2kgfHwgMCxcclxuICAgICAgICAgICAgb3V0cHV0OiAnanNvbicsXHJcbiAgICAgICAgICAgIGtleTogdGhhdC5rZXlcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChvcHRpb25zLnBvaV9vcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RQYXJhbS5wb2lfb3B0aW9ucyA9IG9wdGlvbnMucG9pX29wdGlvbnNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBsb2NhdGlvbnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RQYXJhbS5sb2NhdGlvbiA9IHJlc3VsdC5sYXRpdHVkZSArICcsJyArIHJlc3VsdC5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3QoVXRpbHMuYnVpbGRXeFJlcXVlc3RDb25maWcob3B0aW9ucywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiBVUkxfR0VUX0dFT0NPREVSLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogcmVxdWVzdFBhcmFtXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFV0aWxzLmxvY2F0aW9uUHJvY2VzcyhvcHRpb25zLCBsb2NhdGlvbnN1Y2Nlc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyw5Z2A6Kej5p6QXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMg5o6l5Y+j5Y+C5pWw5a+56LGhXHJcbiAgICAgKiBcclxuICAgICAqIOivt+axguWPguaVsOe7k+aehOWPr+S7peWPguiAg1xyXG4gICAgICogaHR0cDovL2xicy5xcS5jb20vd2Vic2VydmljZV92MS9ndWlkZS1nZW9jb2Rlci5odG1sXHJcbiAgICAgKi9cclxuICAgIGdlb2NvZGVyKG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgVXRpbHMucG9seWZpbGxQYXJhbShvcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrUGFyYW1LZXlFbXB0eShvcHRpb25zLCAnYWRkcmVzcycpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByZXF1ZXN0UGFyYW0gPSB7XHJcbiAgICAgICAgICAgIGFkZHJlc3M6IG9wdGlvbnMuYWRkcmVzcyxcclxuICAgICAgICAgICAgb3V0cHV0OiAnanNvbicsXHJcbiAgICAgICAgICAgIGtleTogdGhhdC5rZXlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3eC5yZXF1ZXN0KFV0aWxzLmJ1aWxkV3hSZXF1ZXN0Q29uZmlnKG9wdGlvbnMsIHtcclxuICAgICAgICAgICAgdXJsOiBVUkxfR0VUX0dFT0NPREVSLFxyXG4gICAgICAgICAgICBkYXRhOiByZXF1ZXN0UGFyYW1cclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Z+O5biC5YiX6KGoXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMg5o6l5Y+j5Y+C5pWw5a+56LGhXHJcbiAgICAgKiBcclxuICAgICAqIOivt+axguWPguaVsOe7k+aehOWPr+S7peWPguiAg1xyXG4gICAgICogaHR0cDovL2xicy5xcS5jb20vd2Vic2VydmljZV92MS9ndWlkZS1yZWdpb24uaHRtbFxyXG4gICAgICovXHJcbiAgICBnZXRDaXR5TGlzdChvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIFV0aWxzLnBvbHlmaWxsUGFyYW0ob3B0aW9ucyk7XHJcbiAgICAgICAgdmFyIHJlcXVlc3RQYXJhbSA9IHtcclxuICAgICAgICAgICAgb3V0cHV0OiAnanNvbicsXHJcbiAgICAgICAgICAgIGtleTogdGhhdC5rZXlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3eC5yZXF1ZXN0KFV0aWxzLmJ1aWxkV3hSZXF1ZXN0Q29uZmlnKG9wdGlvbnMsIHtcclxuICAgICAgICAgICAgdXJsOiBVUkxfQ0lUWV9MSVNULFxyXG4gICAgICAgICAgICBkYXRhOiByZXF1ZXN0UGFyYW1cclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blr7nlupTln47luIJJROeahOWMuuWOv+WIl+ihqFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIOaOpeWPo+WPguaVsOWvueixoVxyXG4gICAgICogXHJcbiAgICAgKiDor7fmsYLlj4LmlbDnu5PmnoTlj6/ku6Xlj4LogINcclxuICAgICAqIGh0dHA6Ly9sYnMucXEuY29tL3dlYnNlcnZpY2VfdjEvZ3VpZGUtcmVnaW9uLmh0bWxcclxuICAgICAqL1xyXG4gICAgZ2V0RGlzdHJpY3RCeUNpdHlJZChvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIFV0aWxzLnBvbHlmaWxsUGFyYW0ob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmIChVdGlscy5jaGVja1BhcmFtS2V5RW1wdHkob3B0aW9ucywgJ2lkJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHJlcXVlc3RQYXJhbSA9IHtcclxuICAgICAgICAgICAgaWQ6IG9wdGlvbnMuaWQgfHwgJycsXHJcbiAgICAgICAgICAgIG91dHB1dDogJ2pzb24nLFxyXG4gICAgICAgICAgICBrZXk6IHRoYXQua2V5XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd3gucmVxdWVzdChVdGlscy5idWlsZFd4UmVxdWVzdENvbmZpZyhvcHRpb25zLCB7XHJcbiAgICAgICAgICAgIHVybDogVVJMX0FSRUFfTElTVCxcclxuICAgICAgICAgICAgZGF0YTogcmVxdWVzdFBhcmFtXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55So5LqO5Y2V6LW354K55Yiw5aSa57uI54K555qE6Lev57q/6Led56a7KOmdnuebtOe6v+i3neemuynorqHnrpfvvJpcclxuICAgICAqIOaUr+aMgeS4pOenjei3neemu+iuoeeul+aWueW8j++8muatpeihjOWSjOmpvui9puOAglxyXG4gICAgICog6LW354K55Yiw57uI54K55pyA5aSn6ZmQ5Yi255u057q/6Led56a7MTDlhazph4zjgIJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyDmjqXlj6Plj4LmlbDlr7nosaFcclxuICAgICAqIFxyXG4gICAgICog6K+35rGC5Y+C5pWw57uT5p6E5Y+v5Lul5Y+C6ICDXHJcbiAgICAgKiBodHRwOi8vbGJzLnFxLmNvbS93ZWJzZXJ2aWNlX3YxL2d1aWRlLWRpc3RhbmNlLmh0bWxcclxuICAgICAqL1xyXG4gICAgY2FsY3VsYXRlRGlzdGFuY2Uob3B0aW9ucykge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBVdGlscy5wb2x5ZmlsbFBhcmFtKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAoVXRpbHMuY2hlY2tQYXJhbUtleUVtcHR5KG9wdGlvbnMsICd0bycpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByZXF1ZXN0UGFyYW0gPSB7XHJcbiAgICAgICAgICAgIG1vZGU6IG9wdGlvbnMubW9kZSB8fCAnd2Fsa2luZycsXHJcbiAgICAgICAgICAgIHRvOiBVdGlscy5sb2NhdGlvbjJxdWVyeShvcHRpb25zLnRvKSxcclxuICAgICAgICAgICAgb3V0cHV0OiAnanNvbicsXHJcbiAgICAgICAgICAgIGtleTogdGhhdC5rZXlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgbG9jYXRpb25zdWNjZXNzID0gZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXF1ZXN0UGFyYW0uZnJvbSA9IHJlc3VsdC5sYXRpdHVkZSArICcsJyArIHJlc3VsdC5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3QoVXRpbHMuYnVpbGRXeFJlcXVlc3RDb25maWcob3B0aW9ucywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiBVUkxfRElTVEFOQ0UsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByZXF1ZXN0UGFyYW1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9ucy5mcm9tKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMubG9jYXRpb24gPSBvcHRpb25zLmZyb207XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFV0aWxzLmxvY2F0aW9uUHJvY2VzcyhvcHRpb25zLCBsb2NhdGlvbnN1Y2Nlc3MpO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFFRTWFwV1g7Il19