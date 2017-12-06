"use strict";
var pug = require("pug");
module.exports = (function (content, attrs, scope) {
    if (!content) {
        return content;
    }
    var match = content.match(/^[^\n\S]+/m);
    var space;
    if (match) {
        space = match[0];
        var regex = new RegExp("^[^\\n\\S]{" + space.length + "}", 'gm');
        content = content.replace(regex, '');
    }
    var render = pug.compile(content, {});
    var data = null;
    if (attrs.data) {
        data = scope.execImport(attrs.data);
    }
    content = render(data);
    if (space) {
        content = content.replace(/^/gm, space);
    }
    return content;
});
