function () {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    opts.key = opts.key || "koa:sess";
    opts.store = opts.store || new Store();

    return function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
            var id, old, sid;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            id = ctx.cookies.get(opts.key, opts);

                            if (id) {
                                _context4.next = 5;
                                break;
                            }

                            ctx.session = {};
                            _context4.next = 9;
                            break;

                        case 5:
                            _context4.next = 7;
                            return opts.store.get(id);

                        case 7:
                            ctx.session = _context4.sent;

                            // check session should be a object not null
                            if ((0, _typeof3.default)(ctx.session) !== "object" || ctx.session == null) {
                                ctx.session = {};
                            }
                            // ctx.session = typeof ctx.session === "string" ? {} : ctx.session;

                        case 9:
                            old = (0, _stringify2.default)(ctx.session);
                            _context4.next = 12;
                            return next();

                        case 12:
                            if (!(old == (0, _stringify2.default)(ctx.session))) {
                                _context4.next = 14;
                                break;
                            }

                            return _context4.abrupt("return");

                        case 14:
                            if (!id) {
                                _context4.next = 18;
                                break;
                            }

                            _context4.next = 17;
                            return opts.store.destroy(id);

                        case 17:
                            id = null;

                        case 18:
                            if (!(ctx.session && (0, _keys2.default)(ctx.session).length)) {
                                _context4.next = 23;
                                break;
                            }

                            _context4.next = 21;
                            return opts.store.set(ctx.session, (0, _assign2.default)({}, opts, { sid: id }));

                        case 21:
                            sid = _context4.sent;

                            ctx.cookies.set(opts.key, sid, opts);

                        case 23:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));
        return function (_x6, _x7) {
            return ref.apply(this, arguments);
        };
    }();
 }
