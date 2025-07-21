"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseWrapper = void 0;
const responseWrapper = (req, res, next) => {
    const originalJsonRes = res.json.bind(res);
    res.json = (data) => {
        // checking if response has errored value
        if ((data === null || data === void 0 ? void 0 : data.success) === false || res.statusCode >= 400) {
            return originalJsonRes(data);
        }
        const response = {
            success: true,
            data,
        };
        return originalJsonRes(response);
    };
    next();
};
exports.responseWrapper = responseWrapper;
