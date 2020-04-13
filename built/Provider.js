"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const Formatter_1 = require("./Formatter");
class Provider {
    constructor() {
        this.formatter = new Formatter_1.default();
    }
    documentFormattingEditProvider() {
        console.log(vscode_1.languages);
        return vscode_1.languages.registerDocumentFormattingEditProvider([
            { scheme: 'file', language: 'php' },
            { scheme: 'file', language: 'json' },
            { scheme: 'file', language: 'python' },
            { scheme: 'file', language: 'typescript' },
            { scheme: 'file', language: 'xml' },
            { scheme: 'file', language: 'xsl' },
            { scheme: 'file', language: 'yaml' },
            { scheme: 'file', language: 'vb' },
            { scheme: 'file', language: 'javascript' },
            { scheme: 'file', language: 'html' },
            { scheme: 'file', language: 'ini' },
            { scheme: 'file', language: 'java' },
            { scheme: 'file', language: 'go' },
            { scheme: 'file', language: 'css' },
            { scheme: 'file', language: 'dockerfile' },
            { scheme: 'file', language: 'cpp' },
            { scheme: 'file', language: 'c' },
            { scheme: 'file', language: 'less' },
            { scheme: 'file', language: 'scss' },
            { scheme: 'file', language: 'shellscript' },
            { scheme: 'file', language: 'jsonc' },
            { scheme: 'file', language: 'swift' },
            { scheme: 'file', language: 'ruby' },
            { scheme: 'file', language: 'sql' },
        ], {
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
