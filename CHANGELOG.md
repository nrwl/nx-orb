# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
 - **[fix]**: Use explicitly main branch's previous commit when last successful sha was not found
 - **[fix]**: Use CircleCI internal env var to check if run is pull request
 - **[feat]**: Optionally disable filtering the past workflow runs by branch

## [1.5.1] - 2022-06-27
 - **[fix]**: Build url regex broken for pipeline ids < 10

## [1.5.0] - 2022-05-27
 - **[feat]**: Support CircleCI Enterprise setups

## [1.4.1] - 2022-05-11
 - **[fix]**: Fix handling of boolean parameters

## [1.4.0] - 2022-04-05
### Added
 - **[feat]**: Add support for `on-hold` workflows

## [1.3.0] - 2022-03-24
### Added
 - **[feat]**: Add main branch name environment variable support

## [1.2.2] - 2022-03-17
### Added
 - **[fix]**: Improve error message on missing or invalid private token

[1.2.2]: https://github.com/nrwl/nx-orb/releases/tag/v1.2.2

## [1.2.1] - 2022-03-17
### Changed
 - **[fix]**: Enable cross browser commit check

[1.2.1]: https://github.com/nrwl/nx-orb/releases/tag/v1.2.1

## [1.2.0] - 2022-03-16
### Added
 - **[feature]**: Add support for targeting specific workflow
### Changed
 - **[docs]**: Update information on `private.yml` example

[1.2.0]: https://github.com/nrwl/nx-orb/releases/tag/v1.2.0

## [1.1.4] - 2022-03-15
### Added
 - **[docs]**: Create `private.yml` example

[1.1.4]: https://github.com/nrwl/nx-orb/releases/tag/v1.1.4

## [1.1.3] - 2021-12-28
### Added
 - **[docs]**: Add private token information to README

[1.1.3]: https://github.com/nrwl/nx-orb/releases/tag/v1.1.3

## [1.1.2] - 2021-10-28
### Added
 - **[docs]**: Add information for private repositories to README

[1.1.2]: https://github.com/nrwl/nx-orb/releases/tag/v1.1.2

## [1.1.0] - 2021-09-20
### Added
 - **[feature]**: Support for private repos

[1.1.0]: https://github.com/nrwl/nx-orb/releases/tag/v1.1.0

## [1.0.0] - 2021-07-23
### Added
 - Initial Release
### Changed
 - Initial Release
### Removed
 - Initial Release

[1.0.0]: https://github.com/nrwl/nx-orb/releases/tag/v1.0.0
