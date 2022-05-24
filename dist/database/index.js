"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const tslib_1 = require("tslib");
const config_1 = tslib_1.__importDefault(require("config"));
const { url } = config_1.default.get('dbConfig');
exports.dbConnection = {
    url: url,
    options: {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        dbName: "test"
    },
};
//# sourceMappingURL=index.js.map