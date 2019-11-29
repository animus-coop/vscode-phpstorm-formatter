# Change Log

All notable changes to the "vscode-phpstorm-formatter" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.3] - 2019-11-29
### Added
- Allow dirty documents formatting: format the document text on a tmp file and write it back on the target document. Suggestion by [@lllopo](https://github.com/lllopo).

### Changed
- Switch to TypeScript and restructure the code.
- Update extension settings without reloading.
- Loading notification.
- Support all programming languages.

### Removed
- Remove `phpstormFormatter.revertFile` setting.

## [0.0.2] - 2019-11-16
### Added
- Badges on README.

### Changed
- Fix README typos.

## [0.0.1] - 2019-11-15
- Initial commit