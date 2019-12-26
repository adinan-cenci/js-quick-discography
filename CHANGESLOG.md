# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2019-12-26
### Added
- New visual identity by [@tylerfortune8](https://github.com/tylerfortune8).
- Version navigation.

### Changed
- SearchArtist result proprieties are now camelcase: 
  "beginarea" became "beginArea".
  "endarea" became "endArea".

- SearchReleaseGroup result proprieties are now camelcase: 
  "primarytype" became "primaryType".
  "secondarytype" became "secondaryType".

- SearchRelease.primaryType and SearchReleaseGroup.primaryType no longer have 
  a default value.