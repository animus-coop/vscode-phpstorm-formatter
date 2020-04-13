import {
  languages,
  window,
  workspace,
  Disposable,
  TextDocument,
  TextEdit,
  Position,
  Range,
  ProgressLocation
} from 'vscode';
import Formatter from './Formatter';

export default class Provider {
  private formatter: Formatter;

  public constructor() {
    this.formatter = new Formatter();
  }

  public documentFormattingEditProvider(): Disposable {
    console.log(languages);

    return languages.registerDocumentFormattingEditProvider(
      [
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
    ],
      {
        provideDocumentFormattingEdits: (document: TextDocument) => {
          return window.withProgress(
            {
              location: ProgressLocation.Notification,
              title: 'PHPStorm Formatter: Formatting document'
            },
            () => {
              return new Promise<any>((resolve, reject) => {
                const targetText: string = document.getText();
                const lastLine = document.lineAt(document.lineCount - 1);
                const range: Range = new Range(
                  new Position(0, 0),
                  lastLine.range.end
                );

                setTimeout(() => {
                  this.formatter
                    .format(targetText)
                    .then((text: string) => {
                      if (targetText !== text) {
                        resolve([new TextEdit(range, text)]);
                      } else {
                        reject();
                      }
                    })
                    .catch(err => {
                      if (err instanceof Error) {
                        window.showErrorMessage(
                          `PHPStorm Formatter: ${err.message}`
                        );
                      }
                      reject();
                    });
                });
              });
            }
          );
        }
      }
    );
  }

  public onDidChangeConfiguration(): Disposable {
    return workspace.onDidChangeConfiguration(() => {
      this.formatter.loadSettings();
    });
  }
}
