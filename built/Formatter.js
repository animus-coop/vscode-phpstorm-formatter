"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const cp = require("child_process");
const path = require("path");
const os = require("os");
const fs = require("fs");
const StatusBarView_1 = require("./StatusBarView");
const isWin = process.platform === 'win32';
class Formatter {
    constructor() {
        this.loadSettings();
        this.statusBar = new StatusBarView_1.default();
    }
    loadSettings() {
        let config = vscode_1.workspace.getConfiguration('phpstormFormatter');
        this.binPath = config.get('ideBinPath');
        this.styleGuidePath = config.get('styleGuidePath');
    }
    format(targetText) {
        return new Promise((resolve, reject) => {
            if (!this.binPath) {
                return reject(new Error('Please configure the phpstormFormatter.ideBinPath setting.'));
            }
            // TODO: this.statusBar.showLoading();
            const targetPath = vscode_1.window.activeTextEditor.document.fileName;
            const targetExt = path.extname(targetPath);
            // Create tmp file
            const tmpDir = os.tmpdir();
            const tmpFileName = path.normalize(`${tmpDir}/animus-${Math.random()
                .toString(36)
                .substring(7)
                .replace(/[^a-z]+/g, '')}${targetExt}`);
            try {
                fs.writeFileSync(tmpFileName, targetText);
            }
            catch (err) {
                return reject(new Error(`Could not create tmp file in "${tmpDir}"`));
            }
            // Append the phpstorm format script
            let formatCmd = path.join(this.binPath, `/format${isWin ? '.bat' : '.sh'}`);
            // Use style guide file if provided
            if (this.styleGuidePath) {
                formatCmd = `${formatCmd} -s ${this.styleGuidePath}`;
            }
            // Run phpstorm formatter script
            try {
                cp.execSync(`${formatCmd} ${tmpFileName}`);
            }
            catch (err) {
                return reject(new Error('Failed to format document'));
            }
            // Get formatted text
            const formatted = fs.readFileSync(tmpFileName, 'utf-8');
            // Remove tmp file
            try {
                fs.unlinkSync(tmpFileName);
            }
            catch (err) { }
            // Return new document text
            if (formatted.length > 0) {
                resolve(formatted);
            }
            else {
                reject();
            }
        });
    }
}
exports.default = Formatter;
