import { ExtensionContext } from 'vscode';
import Provider from './Provider';

export function activate(context: ExtensionContext) {
  const provider = new Provider();

  context.subscriptions.push(
    provider.documentFormattingEditProvider(),
    provider.onDidChangeConfiguration()
  );
}
