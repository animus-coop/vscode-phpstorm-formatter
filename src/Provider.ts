import {
  languages,
  window,
  workspace,
  Disposable,
  TextDocument,
  TextEdit,
  Position,
  Range
} from 'vscode';
import Formatter from './Formatter';

export default class Provider {
  private formatter: Formatter;

  public constructor() {
    this.formatter = new Formatter();
  }

  public documentFormattingEditProvider(): Disposable {
    return languages.registerDocumentFormattingEditProvider(
      { scheme: 'file' },
      {
        provideDocumentFormattingEdits: (document: TextDocument) => {
          return new Promise<any>((resolve, reject) => {
            const targetText: string = document.getText();
            const lastLine = document.lineAt(document.lineCount - 1);
            const range: Range = new Range(
              new Position(0, 0),
              lastLine.range.end
            );

            this.formatter
              .format(targetText)
              .then((text: string) => {
                window.showInformationMessage(
                  'PHPStorm Formatter: Document formatted'
                );

                if (targetText !== text) {
                  resolve([new TextEdit(range, text)]);
                } else {
                  reject();
                }
              })
              .catch(err => {
                if (err instanceof Error) {
                  window.showErrorMessage(`PHPStorm Formatter: ${err.message}`);
                }
                reject();
              });
          });
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
