const { window, languages, commands, workspace } = require('vscode');
const cp = require('child_process');
const path = require('path');

function showInformationMessage(msg) {
  return window.showInformationMessage(`PHPStorm Formatter: ${msg}`);
}

function showErrorMessage(msg) {
  return window.showErrorMessage(`PHPStorm Formatter: ${msg}`);
}

function formatDocument(doc) {
  const config = workspace.getConfiguration('phpstormFormatter');
  let binPath = config.get('ideBinPath');
  let stylePath = config.get('styleGuidePath');
  const isWin = process.platform === 'win32';

  if (doc.isDirty) {
    return showErrorMessage('Please save your document changes first.');
  }

  if (!binPath) {
    return showErrorMessage(
      'Please configure the phpstormFormatter.ideBinPath setting.'
    );
  }

  // Append the phpstorm format script
  let formatCmd = path.join(binPath, `/format${isWin ? '.bat' : '.sh'}`);

  // Use style guide file if provided
  if (stylePath) {
    formatCmd = `${formatCmd} -s ${stylePath}`;
  }

  // Append target file path
  showInformationMessage('Formatting document...');
  const targetPath = window.activeTextEditor.document.fileName;
  formatCmd = `${formatCmd} ${targetPath}`;

  cp.exec(formatCmd, err => {
    if (err) {
      showErrorMessage('Failed to format');
    } else {
      showInformationMessage('Document formatted');

      // Refresh file content
      if (config.get('revertFile')) {
        window.showTextDocument(doc);
        commands.executeCommand('workbench.action.files.revert');
      }
    }
  });
}

/**
 * Activate
 *
 * @param {*} context
 */
function activate(context) {
  languages.registerDocumentFormattingEditProvider(
    { scheme: 'file' },
    {
      provideDocumentFormattingEdits(document) {
        formatDocument(document);
      }
    }
  );
}
exports.activate = activate;

/**
 * Deactivate
 */
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
