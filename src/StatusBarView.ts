import { StatusBarAlignment, StatusBarItem, window } from 'vscode';

export default class StatusBarView {
  private readonly statusBarItem: StatusBarItem;

  public constructor() {
    this.statusBarItem = window.createStatusBarItem(
      StatusBarAlignment.Right,
      -1
    );
    this.statusBarItem.tooltip = 'PHPStorm Formatter';
  }

  public showLoading(): void {
    this.setText('$(sync~spin) Formatting document...');
  }

  public setText(text: string): void {
    this.statusBarItem.text = text.trim();
    this.statusBarItem.show();
  }

  public hide(): void {
    this.statusBarItem.hide();
  }

  public dispose(): void {
    this.statusBarItem.dispose();
  }
}
