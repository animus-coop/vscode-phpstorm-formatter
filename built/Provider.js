"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const Formatter_1 = require("./Formatter");
class Provider {
    constructor() {
        this.formatter = new Formatter_1.default();
    }
    documentFormattingEditProvider() {
        return vscode_1.languages.registerDocumentFormattingEditProvider({ scheme: 'file' }, {
            provideDocumentFormattingEdits: (document) => {
                return vscode_1.window.withProgress({
                    location: vscode_1.ProgressLocation.Notification,
                    title: 'PHPStorm Formatter: Formatting document'
                }, () => {
                    return new Promise((resolve, reject) => {
                        const targetText = document.getText();
                        const lastLine = document.lineAt(document.lineCount - 1);
                        const range = new vscode_1.Range(new vscode_1.Position(0, 0), lastLine.range.end);
                        setTimeout(() => {
                            this.formatter
                                .format(targetText)
                                .then((text) => {
                                if (targetText !== text) {
                                    resolve([new vscode_1.TextEdit(range, text)]);
                                }
                                else {
                                    reject();
                                }
                            })
                                .catch(err => {
                                if (err instanceof Error) {
                                    vscode_1.window.showErrorMessage(`PHPStorm Formatter: ${err.message}`);
                                }
                                reject();
                            });
                        });
                    });
                });
            }
        });
    }
    onDidChangeConfiguration() {
        return vscode_1.workspace.onDidChangeConfiguration(() => {
            this.formatter.loadSettings();
        });
    }
}
exports.default = Provider;
