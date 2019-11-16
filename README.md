# PHPStorm Formatter for Visual Studio Code

PHPStorm Formatter integrated into Visual Studio Code. **Note: PHPStorm IDE required.**

## Features

Format documents using PHPStorm command line formatter.

![Formatter in action](https://raw.githubusercontent.com/animus-coop/vscode-phpstorm-formatter/master/screenshot.gif)

## Requirements

PHPStorm IDE is required. This extension executes the IDE command line formatter from Visual Studio Code formatting feature.

More information about PHPStorm command line formatter [here](https://www.jetbrains.com/help/idea/command-line-formatter.html).

## Installation

Install through VS Code extensions. Search for `PHPStorm Formatter`

[Visual Studio Code Market Place: PHPStorm Formatter](https://marketplace.visualstudio.com/items?itemName=animus-coop.vscode-phpstorm-formatter)

Can also be installed in VS Code: Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

```
ext install animus-coop.vscode-phpstorm-formatter
```

## Extension Settings

This extension contributes the following settings:

- `phpstormFormatter.ideBinPath`: The full path to the PHPStorm <IDE_HOME>/bin directory.
- `phpstormFormatter.styleGuidePath`: Format code according to this code style settings file.
- `phpstormFormatter.revertFile`: Automatically revert file after formatting. Used to force a refresh of the formatted file content.

## Known Issues

- The PHPStorm command line formatter cannot be run while another instance of PHPStorm IDE is running, therefore this formatter cannot be used while PHPStorm is running.
- As on the background we're using an external formatter; you must save your document before attempting to format it.

---
## Release Notes

### [0.0.1] - 2019-11-15
- Initial commit

[Read the complete CHANGELOG](https://github.com/animus-coop/vscode-phpstorm-formatter/blob/master/CHANGELOG.md)
