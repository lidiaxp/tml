"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    server: { port: process.env.PORT || 5000 },
    db: { url: process.env.MONGOLAB_URI},
    security: { saltRounds: process.env.SALT_ROUNDS || 10 },
};
