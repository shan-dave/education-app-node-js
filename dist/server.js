"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("dotenv/config");
const app_1 = tslib_1.__importDefault(require("./app"));
const index_controller_1 = tslib_1.__importDefault(require("./controllers/index.controller"));
const validateEnv_1 = tslib_1.__importDefault(require("./utils/validateEnv"));
validateEnv_1.default();
const indexController = new index_controller_1.default();
const app = new app_1.default(indexController.initializeAllRoutes());
app.listen();
//# sourceMappingURL=server.js.map