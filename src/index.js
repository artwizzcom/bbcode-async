
let _options = {
    replaceNewLine: false,
    dataAttributes: false,
    classes: false,
    classPrefix: '',
};

/**
 * @type {{}}
 * @private
 */
let _customTags = {};

/**
 * @type {{url: _defaultTags.url, email: _defaultTags.email, b: _defaultTags.b, i: _defaultTags.i, u: _defaultTags.u, s: _defaultTags.s, indent: _defaultTags.indent, list: _defaultTags.list, ul: _defaultTags.ul, li: _defaultTags.li, php: _defaultTags.php, javascript: _defaultTags.javascript, java: _defaultTags.java, cpp: _defaultTags.cpp, ruby: _defaultTags.ruby, css: _defaultTags.css, python: _defaultTags.python, code: _defaultTags.code, color: _defaultTags.color, h1: _defaultTags.h1, h2: _defaultTags.h2, h3: _defaultTags.h3, h4: _defaultTags.h4, h5: _defaultTags.h5, h6: _defaultTags.h6, span: _defaultTags.span, img: _defaultTags.img, center: _defaultTags.center, left: _defaultTags.left, right: _defaultTags.right, _tag: _defaultTags._tag}}
 * @private
 */
let _defaultTags = {

    url: function(string, tag, attrs, value, tagDetails, done) {
        let val = '<a'+(tagDetails.class?' class="' + tagDetails.class+'"':'') + tagDetails.data;
        if (tagDetails.attr.alt) val += ' alt="'+tagDetails.attr.alt+'"';
        if (!tagDetails.attr.url) tagDetails.attr.url = attrs;
        done(null, val + ' href="' + tagDetails.attr.url + '">' + value + '</a>');
    },
    email: function(string, tag, attrs, value, tagDetails, done) {
        console.log(attrs);
        let val = '<a'+(tagDetails.class?' class="' + tagDetails.class+'"':'') + tagDetails.data;
        if (tagDetails.attr.alt) val += ' alt="'+tagDetails.attr.alt+'"';
        if (!tagDetails.attr.email) tagDetails.attr.email = attrs;
        if (tagDetails.attr.email.substr(0,7) !== 'mailto:') tagDetails.attr.email = 'mailto:' + attrs;
        done(null, val + ' href="' + tagDetails.attr.email + '">' + value + '</a>');
    },
    b: function(string, tag, attrs, value, tagDetails, done) {
        done(null, '<strong'+tagDetails.data+'>' + value + '</strong>');
    },
    i: function(string, tag, attrs, value, tagDetails, done) {
        done(null, '<em'+tagDetails.data+'>' + value + '</em>');
    },
    u: function(string, tag, attrs, value, tagDetails, done) {
        done(null, '<u'+tagDetails.data+'>' + value + '</u>');
    },
    s: function(string, tag, attrs, value, tagDetails, done) {
        done(null, '<span class="text-decoration:line-through;"'+tagDetails.data+'>' + value + '</span>');
    },
    indent: function(string, tag, attrs, value, tagDetails, done) {
        done(null, '<blockquote'+tagDetails.data+'>' + value + '</blockquote>');
    },
    list: function(string, tag, attrs, value, tagDetails, done) {
        _defaultTags['ul'](string, tag, attrs, value, tagDetails, done);
    },
    ul: function(string, tag, attrs, value, tagDetails, done) {
        let val = '<ul'+tagDetails.data+'>';
        val += value.replace(new RegExp('\\[li]((?:.|[\r\n])*?)\\[/li]', 'ig'), function(string, value) {
            return '<li>'+value.trim()+'</li>'
        });
        done(null, val + '</' + tag + '>');
    },
    li: function(string, tag, attrs, value, tagDetails, done) {
        done(null, '<li'+tagDetails.data+'>' + value + '</li>');
    },
    php: function(string, tag, attrs, value, tagDetails, done) {
        _defaultTags['code'](string, tag, attrs, value, tagDetails, done);
    },
    javascript: function(string, tag, attrs, value, tagDetails, done) {
        _defaultTags['code'](string, tag, attrs, value, tagDetails, done);
    },
    java: function(string, tag, attrs, value, tagDetails, done) {
        _defaultTags['code'](string, tag, attrs, value, tagDetails, done);
    },
    cpp: function(string, tag, attrs, value, tagDetails, done) {
        _defaultTags['code'](string, tag, attrs, value, tagDetails, done);
    },
    ruby: function(string, tag, attrs, value, tagDetails, done) {
        _defaultTags['code'](string, tag, attrs, value, tagDetails, done);
    },
    css: function(string, tag, attrs, value, tagDetails, done) {
        _defaultTags['code'](string, tag, attrs, value, tagDetails, done);
    },
    python: function(string, tag, attrs, value, tagDetails, done) {
        _defaultTags['code'](string, tag, attrs, value, tagDetails, done);
    },
    code: function(string, tag, attrs, value, tagDetails, done) {
        done(null, '<pre class="' + tagDetails.class + (tag === 'code' ? '' : 'code_') + tag + '" '+ tagDetails.data +' >' + value + '</pre>');
    },
    color: function(string, tag, attrs, value, tagDetails, done) {
        if(!tagDetails.attr.color) tagDetails.attr.color = attrs;
        done(null, '<span style="color: '+tagDetails.attr.color+'" '+ tagDetails.data +' >' + value + '</span>');
    },
    h1: function(string, tag, attrs, value, tagDetails, done) {
        _defaultTags['_tag'](string, tag, attrs, value, tagDetails, done);
    },
    h2: function(string, tag, attrs, value, tagDetails, done) {
        _defaultTags['_tag'](string, tag, attrs, value, tagDetails, done);
    },
    h3: function(string, tag, attrs, value, tagDetails, done) {
        _defaultTags['_tag'](string, tag, attrs, value, tagDetails, done);
    },
    h4: function(string, tag, attrs, value, tagDetails, done) {
        _defaultTags['_tag'](string, tag, attrs, value, tagDetails, done);
    },
    h5: function(string, tag, attrs, value, tagDetails, done) {
        _defaultTags['_tag'](string, tag, attrs, value, tagDetails, done);
    },
    h6: function(string, tag, attrs, value, tagDetails, done) {
        _defaultTags['_tag'](string, tag, attrs, value, tagDetails, done);
    },
    span: function(string, tag, attrs, value, tagDetails, done) {
        _defaultTags['_tag'](string, tag, attrs, value, tagDetails, done);
    },
    img: function(string, tag, attrs, value, tagDetails, done) {
        let val = '<img'+(tagDetails.class?' class="' + tagDetails.class+'"':'')+' src="' + value +' '+ tagDetails.data +'"';
        if (tagDetails.attr.width) val += ' width="'+tagDetails.attr.width+'px"';
        if (tagDetails.attr.height) val += ' height="'+tagDetails.attr.height+'px"';
        if (tagDetails.attr.title) val += ' title="'+tagDetails.attr.title+'"';
        if (tagDetails.attr.alt) val += ' alt="'+tagDetails.attr.alt+'"';
        done(null, val + '>');
    },
    center: function(string, tag, attrs, value, tagDetails, done) {
        done(null, '<span style="text-align: center" '+ tagDetails.data +' >' + value + '</span>');
    },
    left: function(string, tag, attrs, value, tagDetails, done) {
        done(null, '<span style="text-align: left" '+ tagDetails.data +' >' + value + '</span>');
    },
    right: function(string, tag, attrs, value, tagDetails, done) {
        done(null, '<span style="text-align: right" '+ tagDetails.data +' >' + value + '</span>');
    },
    _tag: function(string, tag, attrs, value, tagDetails, done) {
        done(null, '<'+tag+ (tagDetails.data ? ' ' + tagDetails.data : '') +'>' + value + '</'+tag+'>');
    },
};

/**
 * @param tag
 * @param attrs
 * @return {{attr: {}, class: Array, data: {}}}
 */
const parseTagAttributes = function(tag, attrs) {
    let obj = {attr: {}, class: [], data: {}};
    if (!attrs) return obj;

    attrs = attrs.match(/[a-zA-Z0-9_-]+=(\'|").*?(\'|")/g);
    if (attrs) {
        for (let i = 0; i < attrs.length; i++) {
            let tmp = attrs[i];
            tmp = tmp.trim().split('=').map((k) => { return k.replace(/(^(\'|")+|(\'|")+$)/mg, '') });
            if (tmp[0] === 'class') {
                obj.class.push(tmp[1]);
            } else {
                let type = (tmp[0].includes('data-')) ? 'data' : 'attr';
                obj[type][tmp[0]] = tmp[1];
            }
        }
    }

    return obj;
};

/**
 * @param dataList
 * @return {string}
 */
const parseDataAttributes = function(dataList) {
    let dataTags = '';
    Object.keys(dataList).forEach((b) => { dataTags += ' '+b+'="'+dataList[b]+'" ' });
    return (dataTags.length ? ' ' + dataTags + ' ' : '');
};

/**
 * @param string
 * @param tag
 * @param attrs
 * @param value
 * @param done
 * @return {*}
 * @private
 */
const _parseTag = function(string, tag, attrs, value, done) {

    value = String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    tag = tag.toLowerCase();

    let val = '';

    let parseAttr = parseTagAttributes(tag, /\[(.*?)\]/g.exec(string)[1])

    let tagDetails = {
        attr: parseAttr.attr,
        data: (_options.dataAttributes) ? parseDataAttributes(parseAttr.data) : '',
        class: (_options.classes) ? (_options.classPrefix?_options.classPrefix+' ':'')+parseAttr.class.join(' '): (_options.classPrefix?_options.classPrefix+' ':''),
    };

    if(typeof _customTags[tag] === 'function') {
        return _customTags[tag](string, tag, attrs, value, tagDetails, done);
    }

    if(typeof _defaultTags[tag] === 'function') {
        return _defaultTags[tag](string, tag, attrs, value, tagDetails, done);
    }

    return done(null, string);

};

/**
 * @param tag
 * @param callback
 * @private
 */
function _registerTag(tag, callback) {
    _customTags[tag] = callback;
}

/**
 * @type {_registerTag}
 */
module.exports.registerTag = _registerTag;

/**
 * @param regex
 * @param content
 * @param next
 * @param done
 * @return {*}
 * @private
 */
function __next(regex, content, next, done) {

    if((m = regex.exec(content)) !== null) {
        return next(m, function(err, _content) {
            if(err) return done(err);
            __next(regex, _content, next, done)
        })
    }
    return done(null, content);

}

/**
 * @param content
 * @param options
 * @param done
 * @private
 */
function _parse(content, options, done) {

    if(typeof options === 'function') {
        done = options;
        options = {};
    }

    let regex = new RegExp('\\[(\\w+)(?:[= ]([^\\]]+))?]((?:.|[\r\n])*?)\\[/\\1]', 'ig');

    _options = Object.assign(_options, options);

    if (_options.replaceNewLine) content = content.replace(/\r?\n/g, '<br>');


    __next(regex, content, function(m, next) {
        _parseTag(m[0],m[1],m[2],m[3], function(err, _content) {
            if(err) return done(err);

            content = content.replace(m[0], _content);
            next(null, content);
        });
    }, done);
}

/**
 * @type {_parse}
 */
module.exports.parse = _parse;