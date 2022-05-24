"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const hpp_1 = tslib_1.__importDefault(require("hpp"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = tslib_1.__importDefault(require("swagger-jsdoc"));
const mongoose_1 = require("mongoose");
const database_1 = require("./database");
const error_middleware_1 = tslib_1.__importDefault(require("./middlewares/error.middleware"));
const logger_1 = require("./utils/logger");
require("reflect-metadata");
class App {
    constructor(routes) {
        this.app = express_1.default();
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV || 'development';
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandling();
        this.app.use('/media', express_1.default.static('./media'));
    }
    listen() {
        this.app.listen(this.port, () => {
            logger_1.logger.info(`🚀 App listening on the PORT: ${this.port}, ENV: ${this.env}`);
        });
    }
    getServer() {
        return this.app;
    }
    connectToDatabase() {
        if (this.env !== 'production') {
            mongoose_1.set('debug', true);
        }
        mongoose_1.connect(database_1.dbConnection.url)
            .then(() => {
            logger_1.logger.info('🟢 The database is connected.');
        })
            .catch((error) => {
            logger_1.logger.error(`🔴 Unable to connect to the database: ${error}.`);
        });
    }
    initializeMiddlewares() {
        if (this.env === 'production') {
            this.app.use(morgan_1.default('combined', { stream: logger_1.stream }));
            this.app.use(cors_1.default({ origin: 'your.domain.com', credentials: true }));
        }
        else {
            this.app.use(morgan_1.default('dev', { stream: logger_1.stream }));
            this.app.use(cors_1.default());
        }
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
            next();
        });
        this.app.use(hpp_1.default());
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(cookie_parser_1.default());
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            console.log(`${__dirname}\\media`);
            this.app.use('/', route.router);
        });
    }
    initializeSwagger() {
        const swaggerOptions = swagger_jsdoc_1.default({
            definition: {
                openapi: '3.0.1',
                info: {
                    title: 'Encrypted Education App',
                    version: '1.0.0',
                    description: 'Project-management application',
                },
                servers: [
                    {
                        url: 'http://localhost:3000',
                        description: 'development server',
                    },
                ],
            },
            apis: ['src/routes/*.ts'],
        });
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerOptions));
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map