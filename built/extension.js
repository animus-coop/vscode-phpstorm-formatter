"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Provider_1 = require("./Provider");
function activate(context) {
    const provider = new Provider_1.default();
    context.subscriptions.push(provider.documentFormattingEditProvider(), provider.onDidChangeConfiguration());
}
exports.activate = activate;
