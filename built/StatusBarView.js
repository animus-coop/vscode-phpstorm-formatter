"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class StatusBarView {
    constructor() {
        this.statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, -1);
        this.statusBarItem.tooltip = 'PHPStorm Formatter';
    }
    showLoading() {
        this.setText('$(sync~spin) Formatting document...');
    }
    setText(text) {
        this.statusBarItem.text = text.trim();
        this.statusBarItem.show();
    }
    hide() {
        this.statusBarItem.hide();
    }
    dispose() {
        this.statusBarItem.dispose();
    }
}
exports.default = StatusBarView;
