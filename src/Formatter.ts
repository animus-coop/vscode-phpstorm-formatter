import { window, workspace } from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';

const isWin = process.platform === 'win32';

export default class Formatter {
  private binPath: string;
  private styleGuidePath: string;

  constructor() {
    this.loadSettings();
  }

  public loadSettings(): void {
    let config = workspace.getConfiguration('phpstormFormatter');
    this.binPath = config.get('ideBinPath');
    this.styleGuidePath = config.get('styleGuidePath');
  }

  private isWsl(): boolean {
    if (process.platform !== 'linux') {
      return false;
    }

    if (os.release().toLowerCase().includes('microsoft')) {
      return true;
    }

    try {
      return fs
        .readFileSync('/proc/version', 'utf8')
        .toLowerCase()
        .includes('microsoft');
    } catch (_) {
      return false;
    }
  }

  public format(targetText: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this.isWsl()) {
        return reject(new Error('WSL is not supported.'));
      }

      if (!this.binPath) {
        return reject(
          new Error(
            'Please configure the phpstormFormatter.ideBinPath setting.'
          )
        );
      }

      const targetPath: string = window.activeTextEditor.document.fileName;
      const targetExt: string = path.extname(targetPath);

      // Create tmp file
      const tmpDir: string = os.tmpdir();
      const tmpFileName: string = path.normalize(
        `${tmpDir}/animus-${Math.random()
          .toString(36)
          .substring(7)
          .replace(/[^a-z]+/g, '')}${targetExt}`
      );

      try {
        fs.writeFileSync(tmpFileName, targetText);
      } catch (err) {
        return reject(new Error(`Could not create tmp file in "${tmpDir}"`));
      }

      // Set the phpstorm format script base command
      let formatCmd: string = path.join(
        this.binPath,
        `/format${isWin ? '.bat' : '.sh'}`
      );

      if (isWin) {
        formatCmd = formatCmd.replace(/ /g, '^ ');
      }

      // Use style guide file if provided
      if (this.styleGuidePath) {
        if (isWin) {
          this.styleGuidePath = this.styleGuidePath.replace(/ /g, '^ ');
        }

        formatCmd = `${formatCmd} -s ${this.styleGuidePath}`;
      }

      // Run phpstorm formatter script
      try {
        cp.execSync(`${formatCmd} ${tmpFileName}`);
      } catch (err) {
        console.error('PHPSTORM Formatter: ' + err);
        return reject(new Error('Failed to format the document'));
      }

      // Get formatted text
      const formatted: string = fs.readFileSync(tmpFileName, 'utf-8');

      // Remove tmp file
      try {
        fs.unlinkSync(tmpFileName);
      } catch (err) {}

      // Return new document text
      if (formatted.length > 0) {
        resolve(formatted);
      } else {
        reject();
      }
    });
  }
}
