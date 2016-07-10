"use strict";
const router_1 = require('../router/router');
function Generate(path, Comp) {
    router_1.Router.generateRoute(path);
    const { template } = (new Comp()).create();
    router_1.Router.path = '/';
    template.replace('</head>', '<script>(function () { window._prerender = true })()</script></head>');
    return template;
}
exports.Generate = Generate;
//# sourceMappingURL=server.js.map