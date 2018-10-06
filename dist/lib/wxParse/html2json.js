'use strict';

/**
 * author: Di (微信小程序开发工程师)
 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
 *               垂直微信小程序开发交流社区
 * 
 * github地址: https://github.com/icindy/wxParse
 * 
 * for: 微信小程序富文本解析
 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
 */

var __placeImgeUrlHttps = "https";
var __emojisReg = '';
var __emojisBaseSrc = '';
var __emojis = {};
var wxDiscode = require('./wxDiscode.js');
var HTMLParser = require('./htmlparser.js');
// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
// Block Elements - HTML 5
var block = makeMap("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

// Inline Elements - HTML 5
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
var special = makeMap("wxxxcode-style,script,style,view,scroll-view,block");
function makeMap(str) {
    var obj = {},
        items = str.split(",");
    for (var i = 0; i < items.length; i++) {
        obj[items[i]] = true;
    }return obj;
}

function q(v) {
    return '"' + v + '"';
}

function removeDOCTYPE(html) {
    return html.replace(/<\?xml.*\?>\n/, '').replace(/<!doctype.*\>\n/, '').replace(/<!DOCTYPE.*\>\n/, '');
}

function html2json(html, bindName) {
    //处理字符串
    html = removeDOCTYPE(html);
    html = wxDiscode.strDiscode(html);
    //生成node节点
    var bufArray = [];
    var results = {
        node: bindName,
        nodes: [],
        images: [],
        imageUrls: []
    };
    HTMLParser(html, {
        start: function start(tag, attrs, unary) {
            //debug(tag, attrs, unary);
            // node for this element
            var node = {
                node: 'element',
                tag: tag
            };

            if (block[tag]) {
                node.tagType = "block";
            } else if (inline[tag]) {
                node.tagType = "inline";
            } else if (closeSelf[tag]) {
                node.tagType = "closeSelf";
            }

            if (attrs.length !== 0) {
                node.attr = attrs.reduce(function (pre, attr) {
                    var name = attr.name;
                    var value = attr.value;
                    if (name == 'class') {
                        console.dir(value);
                        //  value = value.join("")
                        node.classStr = value;
                    }
                    // has multi attibutes
                    // make it array of attribute
                    if (name == 'style') {
                        console.dir(value);
                        //  value = value.join("")
                        node.styleStr = value;
                    }
                    if (value.match(/ /)) {
                        value = value.split(' ');
                    }

                    // if attr already exists
                    // merge it
                    if (pre[name]) {
                        if (Array.isArray(pre[name])) {
                            // already array, push to last
                            pre[name].push(value);
                        } else {
                            // single value, make it array
                            pre[name] = [pre[name], value];
                        }
                    } else {
                        // not exist, put it
                        pre[name] = value;
                    }

                    return pre;
                }, {});
            }

            //对img添加额外数据
            if (node.tag === 'img') {
                node.imgIndex = results.images.length;
                var imgUrl = node.attr.src;
                imgUrl = wxDiscode.urlToHttpUrl(imgUrl, __placeImgeUrlHttps);
                node.attr.src = imgUrl;
                node.from = bindName;
                results.images.push(node);
                results.imageUrls.push(imgUrl);
            }

            if (unary) {
                // if this tag dosen't have end tag
                // like <img src="hoge.png"/>
                // add to parents
                var parent = bufArray[0] || results;
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                parent.nodes.push(node);
            } else {
                bufArray.unshift(node);
            }
        },
        end: function end(tag) {
            //debug(tag);
            // merge into parent tag
            var node = bufArray.shift();
            if (node.tag !== tag) console.error('invalid state: mismatch end tag');

            if (bufArray.length === 0) {
                results.nodes.push(node);
            } else {
                var parent = bufArray[0];
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                parent.nodes.push(node);
            }
        },
        chars: function chars(text) {
            //debug(text);
            var node = {
                node: 'text',
                text: text,
                textArray: transEmojiStr(text)
            };

            if (bufArray.length === 0) {
                results.nodes.push(node);
            } else {
                var parent = bufArray[0];
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                parent.nodes.push(node);
            }
        },
        comment: function comment(text) {
            //debug(text);
            var node = {
                node: 'comment',
                text: text
            };
            var parent = bufArray[0];
            if (parent.nodes === undefined) {
                parent.nodes = [];
            }
            parent.nodes.push(node);
        }
    });
    return results;
};

function transEmojiStr(str) {
    // var eReg = new RegExp("["+__reg+' '+"]");
    //   str = str.replace(/\[([^\[\]]+)\]/g,':$1:')

    var emojiObjs = [];
    //如果正则表达式为空
    if (__emojisReg.length == 0 || !__emojis) {
        var emojiObj = {};
        emojiObj.node = "text";
        emojiObj.text = str;
        array = [emojiObj];
        return array;
    }
    //这个地方需要调整
    str = str.replace(/\[([^\[\]]+)\]/g, ':$1:');
    var eReg = new RegExp("[:]");
    var array = str.split(eReg);
    for (var i = 0; i < array.length; i++) {
        var ele = array[i];
        var emojiObj = {};
        if (__emojis[ele]) {
            emojiObj.node = "element";
            emojiObj.tag = "emoji";
            emojiObj.text = __emojis[ele];
            emojiObj.baseSrc = __emojisBaseSrc;
        } else {
            emojiObj.node = "text";
            emojiObj.text = ele;
        }
        emojiObjs.push(emojiObj);
    }

    return emojiObjs;
}

function emojisInit() {
    var reg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var baseSrc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/wxParse/emojis/";
    var emojis = arguments[2];

    __emojisReg = reg;
    __emojisBaseSrc = baseSrc;
    __emojis = emojis;
}

module.exports = {
    html2json: html2json,
    emojisInit: emojisInit
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0bWwyanNvbi5qcyJdLCJuYW1lcyI6WyJfX3BsYWNlSW1nZVVybEh0dHBzIiwiX19lbW9qaXNSZWciLCJfX2Vtb2ppc0Jhc2VTcmMiLCJfX2Vtb2ppcyIsInd4RGlzY29kZSIsInJlcXVpcmUiLCJIVE1MUGFyc2VyIiwiZW1wdHkiLCJtYWtlTWFwIiwiYmxvY2siLCJpbmxpbmUiLCJjbG9zZVNlbGYiLCJmaWxsQXR0cnMiLCJzcGVjaWFsIiwic3RyIiwib2JqIiwiaXRlbXMiLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJxIiwidiIsInJlbW92ZURPQ1RZUEUiLCJodG1sIiwicmVwbGFjZSIsImh0bWwyanNvbiIsImJpbmROYW1lIiwic3RyRGlzY29kZSIsImJ1ZkFycmF5IiwicmVzdWx0cyIsIm5vZGUiLCJub2RlcyIsImltYWdlcyIsImltYWdlVXJscyIsInN0YXJ0IiwidGFnIiwiYXR0cnMiLCJ1bmFyeSIsInRhZ1R5cGUiLCJhdHRyIiwicmVkdWNlIiwicHJlIiwibmFtZSIsInZhbHVlIiwiY29uc29sZSIsImRpciIsImNsYXNzU3RyIiwic3R5bGVTdHIiLCJtYXRjaCIsIkFycmF5IiwiaXNBcnJheSIsInB1c2giLCJpbWdJbmRleCIsImltZ1VybCIsInNyYyIsInVybFRvSHR0cFVybCIsImZyb20iLCJwYXJlbnQiLCJ1bmRlZmluZWQiLCJ1bnNoaWZ0IiwiZW5kIiwic2hpZnQiLCJlcnJvciIsImNoYXJzIiwidGV4dCIsInRleHRBcnJheSIsInRyYW5zRW1vamlTdHIiLCJjb21tZW50IiwiZW1vamlPYmpzIiwiZW1vamlPYmoiLCJhcnJheSIsImVSZWciLCJSZWdFeHAiLCJlbGUiLCJiYXNlU3JjIiwiZW1vamlzSW5pdCIsInJlZyIsImVtb2ppcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7O0FBV0EsSUFBSUEsc0JBQXNCLE9BQTFCO0FBQ0EsSUFBSUMsY0FBYyxFQUFsQjtBQUNBLElBQUlDLGtCQUFrQixF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QVY7QUFDQSxZQUFJbUQsV0FBVyxFQUFmO0FBQ0EsWUFBR2xFLFNBQVNzRSxHQUFULENBQUgsRUFBaUI7QUFDZkoscUJBQVN2QyxJQUFULEdBQWdCLFNBQWhCO0FBQ0F1QyxxQkFBU2xDLEdBQVQsR0FBZSxPQUFmO0FBQ0FrQyxxQkFBU0wsSUFBVCxHQUFnQjdELFNBQVNzRSxHQUFULENBQWhCO0FBQ0FKLHFCQUFTSyxPQUFULEdBQWtCeEUsZUFBbEI7QUFDRCxTQUxELE1BS0s7QUFDSG1FLHFCQUFTdkMsSUFBVCxHQUFnQixNQUFoQjtBQUNBdUMscUJBQVNMLElBQVQsR0FBZ0JTLEdBQWhCO0FBQ0Q7QUFDREwsa0JBQVVqQixJQUFWLENBQWVrQixRQUFmO0FBQ0Q7O0FBRUQsV0FBT0QsU0FBUDtBQUNEOztBQUVELFNBQVNPLFVBQVQsR0FBNkQ7QUFBQSxRQUF6Q0MsR0FBeUMsdUVBQXJDLEVBQXFDO0FBQUEsUUFBbENGLE9BQWtDLHVFQUExQixrQkFBMEI7QUFBQSxRQUFQRyxNQUFPOztBQUN6RDVFLGtCQUFjMkUsR0FBZDtBQUNBMUUsc0JBQWdCd0UsT0FBaEI7QUFDQXZFLGVBQVMwRSxNQUFUO0FBQ0g7O0FBRURDLE9BQU9DLE9BQVAsR0FBaUI7QUFDYnRELGVBQVdBLFNBREU7QUFFYmtELGdCQUFXQTtBQUZFLENBQWpCIiwiZmlsZSI6Imh0bWwyanNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBhdXRob3I6IERpICjlvq7kv6HlsI/nqIvluo/lvIDlj5Hlt6XnqIvluIgpXHJcbiAqIG9yZ2FuaXphdGlvbjogV2VBcHBEZXYo5b6u5L+h5bCP56iL5bqP5byA5Y+R6K665Z2bKShodHRwOi8vd2VhcHBkZXYuY29tKVxyXG4gKiAgICAgICAgICAgICAgIOWeguebtOW+ruS/oeWwj+eoi+W6j+W8gOWPkeS6pOa1geekvuWMulxyXG4gKiBcclxuICogZ2l0aHVi5Zyw5Z2AOiBodHRwczovL2dpdGh1Yi5jb20vaWNpbmR5L3d4UGFyc2VcclxuICogXHJcbiAqIGZvcjog5b6u5L+h5bCP56iL5bqP5a+M5paH5pys6Kej5p6QXHJcbiAqIGRldGFpbCA6IGh0dHA6Ly93ZWFwcGRldi5jb20vdC93eHBhcnNlLWFscGhhMC0xLWh0bWwtbWFya2Rvd24vMTg0XHJcbiAqL1xyXG5cclxudmFyIF9fcGxhY2VJbWdlVXJsSHR0cHMgPSBcImh0dHBzXCI7XHJcbnZhciBfX2Vtb2ppc1JlZyA9ICcnO1xyXG52YXIgX19lbW9qaXNCYXNlU3JjID0gJyc7XHJcbnZhciBfX2Vtb2ppcyA9IHt9O1xyXG52YXIgd3hEaXNjb2RlID0gcmVxdWlyZSgnLi93eERpc2NvZGUuanMnKTtcclxudmFyIEhUTUxQYXJzZXIgPSByZXF1aXJlKCcuL2h0bWxwYXJzZXIuanMnKTtcclxuLy8gRW1wdHkgRWxlbWVudHMgLSBIVE1MIDVcclxudmFyIGVtcHR5ID0gbWFrZU1hcChcImFyZWEsYmFzZSxiYXNlZm9udCxicixjb2wsZnJhbWUsaHIsaW1nLGlucHV0LGxpbmssbWV0YSxwYXJhbSxlbWJlZCxjb21tYW5kLGtleWdlbixzb3VyY2UsdHJhY2ssd2JyXCIpO1xyXG4vLyBCbG9jayBFbGVtZW50cyAtIEhUTUwgNVxyXG52YXIgYmxvY2sgPSBtYWtlTWFwKFwiYnIsYSxjb2RlLGFkZHJlc3MsYXJ0aWNsZSxhcHBsZXQsYXNpZGUsYXVkaW8sYmxvY2txdW90ZSxidXR0b24sY2FudmFzLGNlbnRlcixkZCxkZWwsZGlyLGRpdixkbCxkdCxmaWVsZHNldCxmaWdjYXB0aW9uLGZpZ3VyZSxmb290ZXIsZm9ybSxmcmFtZXNldCxoMSxoMixoMyxoNCxoNSxoNixoZWFkZXIsaGdyb3VwLGhyLGlmcmFtZSxpbnMsaXNpbmRleCxsaSxtYXAsbWVudSxub2ZyYW1lcyxub3NjcmlwdCxvYmplY3Qsb2wsb3V0cHV0LHAscHJlLHNlY3Rpb24sc2NyaXB0LHRhYmxlLHRib2R5LHRkLHRmb290LHRoLHRoZWFkLHRyLHVsLHZpZGVvXCIpO1xyXG5cclxuLy8gSW5saW5lIEVsZW1lbnRzIC0gSFRNTCA1XHJcbnZhciBpbmxpbmUgPSBtYWtlTWFwKFwiYWJicixhY3JvbnltLGFwcGxldCxiLGJhc2Vmb250LGJkbyxiaWcsYnV0dG9uLGNpdGUsZGVsLGRmbixlbSxmb250LGksaWZyYW1lLGltZyxpbnB1dCxpbnMsa2JkLGxhYmVsLG1hcCxvYmplY3QscSxzLHNhbXAsc2NyaXB0LHNlbGVjdCxzbWFsbCxzcGFuLHN0cmlrZSxzdHJvbmcsc3ViLHN1cCx0ZXh0YXJlYSx0dCx1LHZhclwiKTtcclxuXHJcbi8vIEVsZW1lbnRzIHRoYXQgeW91IGNhbiwgaW50ZW50aW9uYWxseSwgbGVhdmUgb3BlblxyXG4vLyAoYW5kIHdoaWNoIGNsb3NlIHRoZW1zZWx2ZXMpXHJcbnZhciBjbG9zZVNlbGYgPSBtYWtlTWFwKFwiY29sZ3JvdXAsZGQsZHQsbGksb3B0aW9ucyxwLHRkLHRmb290LHRoLHRoZWFkLHRyXCIpO1xyXG5cclxuLy8gQXR0cmlidXRlcyB0aGF0IGhhdmUgdGhlaXIgdmFsdWVzIGZpbGxlZCBpbiBkaXNhYmxlZD1cImRpc2FibGVkXCJcclxudmFyIGZpbGxBdHRycyA9IG1ha2VNYXAoXCJjaGVja2VkLGNvbXBhY3QsZGVjbGFyZSxkZWZlcixkaXNhYmxlZCxpc21hcCxtdWx0aXBsZSxub2hyZWYsbm9yZXNpemUsbm9zaGFkZSxub3dyYXAscmVhZG9ubHksc2VsZWN0ZWRcIik7XHJcblxyXG4vLyBTcGVjaWFsIEVsZW1lbnRzIChjYW4gY29udGFpbiBhbnl0aGluZylcclxudmFyIHNwZWNpYWwgPSBtYWtlTWFwKFwid3h4eGNvZGUtc3R5bGUsc2NyaXB0LHN0eWxlLHZpZXcsc2Nyb2xsLXZpZXcsYmxvY2tcIik7XHJcbmZ1bmN0aW9uIG1ha2VNYXAoc3RyKSB7XHJcbiAgICB2YXIgb2JqID0ge30sIGl0ZW1zID0gc3RyLnNwbGl0KFwiLFwiKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgb2JqW2l0ZW1zW2ldXSA9IHRydWU7XHJcbiAgICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG5mdW5jdGlvbiBxKHYpIHtcclxuICAgIHJldHVybiAnXCInICsgdiArICdcIic7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZURPQ1RZUEUoaHRtbCkge1xyXG4gICAgcmV0dXJuIGh0bWxcclxuICAgICAgICAucmVwbGFjZSgvPFxcP3htbC4qXFw/Plxcbi8sICcnKVxyXG4gICAgICAgIC5yZXBsYWNlKC88IWRvY3R5cGUuKlxcPlxcbi8sICcnKVxyXG4gICAgICAgIC5yZXBsYWNlKC88IURPQ1RZUEUuKlxcPlxcbi8sICcnKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGh0bWwyanNvbihodG1sLCBiaW5kTmFtZSkge1xyXG4gICAgLy/lpITnkIblrZfnrKbkuLJcclxuICAgIGh0bWwgPSByZW1vdmVET0NUWVBFKGh0bWwpO1xyXG4gICAgaHRtbCA9IHd4RGlzY29kZS5zdHJEaXNjb2RlKGh0bWwpO1xyXG4gICAgLy/nlJ/miJBub2Rl6IqC54K5XHJcbiAgICB2YXIgYnVmQXJyYXkgPSBbXTtcclxuICAgIHZhciByZXN1bHRzID0ge1xyXG4gICAgICAgIG5vZGU6IGJpbmROYW1lLFxyXG4gICAgICAgIG5vZGVzOiBbXSxcclxuICAgICAgICBpbWFnZXM6W10sXHJcbiAgICAgICAgaW1hZ2VVcmxzOltdXHJcbiAgICB9O1xyXG4gICAgSFRNTFBhcnNlcihodG1sLCB7XHJcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uICh0YWcsIGF0dHJzLCB1bmFyeSkge1xyXG4gICAgICAgICAgICAvL2RlYnVnKHRhZywgYXR0cnMsIHVuYXJ5KTtcclxuICAgICAgICAgICAgLy8gbm9kZSBmb3IgdGhpcyBlbGVtZW50XHJcbiAgICAgICAgICAgIHZhciBub2RlID0ge1xyXG4gICAgICAgICAgICAgICAgbm9kZTogJ2VsZW1lbnQnLFxyXG4gICAgICAgICAgICAgICAgdGFnOiB0YWcsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoYmxvY2tbdGFnXSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS50YWdUeXBlID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlubGluZVt0YWddKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnRhZ1R5cGUgPSBcImlubGluZVwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsb3NlU2VsZlt0YWddKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnRhZ1R5cGUgPSBcImNsb3NlU2VsZlwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYXR0cnMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmF0dHIgPSBhdHRycy5yZWR1Y2UoZnVuY3Rpb24gKHByZSwgYXR0cikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gYXR0ci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGF0dHIudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgPT0gJ2NsYXNzJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcih2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICB2YWx1ZSA9IHZhbHVlLmpvaW4oXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jbGFzc1N0ciA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBoYXMgbXVsdGkgYXR0aWJ1dGVzXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBpdCBhcnJheSBvZiBhdHRyaWJ1dGVcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSA9PSAnc3R5bGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gIHZhbHVlID0gdmFsdWUuam9pbihcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnN0eWxlU3RyID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5tYXRjaCgvIC8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGF0dHIgYWxyZWFkeSBleGlzdHNcclxuICAgICAgICAgICAgICAgICAgICAvLyBtZXJnZSBpdFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmVbbmFtZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJlW25hbWVdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxyZWFkeSBhcnJheSwgcHVzaCB0byBsYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVbbmFtZV0ucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzaW5nbGUgdmFsdWUsIG1ha2UgaXQgYXJyYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZVtuYW1lXSA9IFtwcmVbbmFtZV0sIHZhbHVlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdCBleGlzdCwgcHV0IGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZTtcclxuICAgICAgICAgICAgICAgIH0sIHt9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/lr7lpbWfmt7vliqDpop3lpJbmlbDmja5cclxuICAgICAgICAgICAgaWYgKG5vZGUudGFnID09PSAnaW1nJykge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5pbWdJbmRleCA9IHJlc3VsdHMuaW1hZ2VzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHZhciBpbWdVcmwgPSBub2RlLmF0dHIuc3JjO1xyXG4gICAgICAgICAgICAgICAgaW1nVXJsID0gd3hEaXNjb2RlLnVybFRvSHR0cFVybChpbWdVcmwsIF9fcGxhY2VJbWdlVXJsSHR0cHMpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5hdHRyLnNyYyA9IGltZ1VybDtcclxuICAgICAgICAgICAgICAgIG5vZGUuZnJvbSA9IGJpbmROYW1lO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0cy5pbWFnZXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdHMuaW1hZ2VVcmxzLnB1c2goaW1nVXJsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHVuYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIHRhZyBkb3Nlbid0IGhhdmUgZW5kIHRhZ1xyXG4gICAgICAgICAgICAgICAgLy8gbGlrZSA8aW1nIHNyYz1cImhvZ2UucG5nXCIvPlxyXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRvIHBhcmVudHNcclxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBidWZBcnJheVswXSB8fCByZXN1bHRzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudC5ub2RlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Lm5vZGVzID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQubm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ1ZkFycmF5LnVuc2hpZnQobm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuZDogZnVuY3Rpb24gKHRhZykge1xyXG4gICAgICAgICAgICAvL2RlYnVnKHRhZyk7XHJcbiAgICAgICAgICAgIC8vIG1lcmdlIGludG8gcGFyZW50IHRhZ1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGJ1ZkFycmF5LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlLnRhZyAhPT0gdGFnKSBjb25zb2xlLmVycm9yKCdpbnZhbGlkIHN0YXRlOiBtaXNtYXRjaCBlbmQgdGFnJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYnVmQXJyYXkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRzLm5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gYnVmQXJyYXlbMF07XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50Lm5vZGVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQubm9kZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBhcmVudC5ub2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGFyczogZnVuY3Rpb24gKHRleHQpIHtcclxuICAgICAgICAgICAgLy9kZWJ1Zyh0ZXh0KTtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB7XHJcbiAgICAgICAgICAgICAgICBub2RlOiAndGV4dCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgICAgICAgICAgdGV4dEFycmF5OnRyYW5zRW1vamlTdHIodGV4dClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChidWZBcnJheS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdHMubm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBidWZBcnJheVswXTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQubm9kZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5ub2RlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGFyZW50Lm5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1lbnQ6IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICAgICAgICAgIC8vZGVidWcodGV4dCk7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0ge1xyXG4gICAgICAgICAgICAgICAgbm9kZTogJ2NvbW1lbnQnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogdGV4dCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IGJ1ZkFycmF5WzBdO1xyXG4gICAgICAgICAgICBpZiAocGFyZW50Lm5vZGVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHBhcmVudC5ub2RlcyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBhcmVudC5ub2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHRzO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gdHJhbnNFbW9qaVN0cihzdHIpe1xyXG4gIC8vIHZhciBlUmVnID0gbmV3IFJlZ0V4cChcIltcIitfX3JlZysnICcrXCJdXCIpO1xyXG4vLyAgIHN0ciA9IHN0ci5yZXBsYWNlKC9cXFsoW15cXFtcXF1dKylcXF0vZywnOiQxOicpXHJcbiAgXHJcbiAgdmFyIGVtb2ppT2JqcyA9IFtdO1xyXG4gIC8v5aaC5p6c5q2j5YiZ6KGo6L6+5byP5Li656m6XHJcbiAgaWYoX19lbW9qaXNSZWcubGVuZ3RoID09IDAgfHwgIV9fZW1vamlzKXtcclxuICAgICAgdmFyIGVtb2ppT2JqID0ge31cclxuICAgICAgZW1vamlPYmoubm9kZSA9IFwidGV4dFwiO1xyXG4gICAgICBlbW9qaU9iai50ZXh0ID0gc3RyO1xyXG4gICAgICBhcnJheSA9IFtlbW9qaU9ial07XHJcbiAgICAgIHJldHVybiBhcnJheTtcclxuICB9XHJcbiAgLy/ov5nkuKrlnLDmlrnpnIDopoHosIPmlbRcclxuICBzdHIgPSBzdHIucmVwbGFjZSgvXFxbKFteXFxbXFxdXSspXFxdL2csJzokMTonKVxyXG4gIHZhciBlUmVnID0gbmV3IFJlZ0V4cChcIls6XVwiKTtcclxuICB2YXIgYXJyYXkgPSBzdHIuc3BsaXQoZVJlZyk7XHJcbiAgZm9yKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKXtcclxuICAgIHZhciBlbGUgPSBhcnJheVtpXTtcclxuICAgIHZhciBlbW9qaU9iaiA9IHt9O1xyXG4gICAgaWYoX19lbW9qaXNbZWxlXSl7XHJcbiAgICAgIGVtb2ppT2JqLm5vZGUgPSBcImVsZW1lbnRcIjtcclxuICAgICAgZW1vamlPYmoudGFnID0gXCJlbW9qaVwiO1xyXG4gICAgICBlbW9qaU9iai50ZXh0ID0gX19lbW9qaXNbZWxlXTtcclxuICAgICAgZW1vamlPYmouYmFzZVNyYz0gX19lbW9qaXNCYXNlU3JjO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIGVtb2ppT2JqLm5vZGUgPSBcInRleHRcIjtcclxuICAgICAgZW1vamlPYmoudGV4dCA9IGVsZTtcclxuICAgIH1cclxuICAgIGVtb2ppT2Jqcy5wdXNoKGVtb2ppT2JqKTtcclxuICB9XHJcbiAgXHJcbiAgcmV0dXJuIGVtb2ppT2JqcztcclxufVxyXG5cclxuZnVuY3Rpb24gZW1vamlzSW5pdChyZWc9JycsYmFzZVNyYz1cIi93eFBhcnNlL2Vtb2ppcy9cIixlbW9qaXMpe1xyXG4gICAgX19lbW9qaXNSZWcgPSByZWc7XHJcbiAgICBfX2Vtb2ppc0Jhc2VTcmM9YmFzZVNyYztcclxuICAgIF9fZW1vamlzPWVtb2ppcztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBodG1sMmpzb246IGh0bWwyanNvbixcclxuICAgIGVtb2ppc0luaXQ6ZW1vamlzSW5pdFxyXG59O1xyXG5cclxuIl19