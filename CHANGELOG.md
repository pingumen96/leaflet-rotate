# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-11-07

### Added
- Introduced `LeafletRotate.install(L)` entry point so consumers control when the Leaflet namespace is extended.
- Added documentation and examples demonstrating the new opt-in installer workflow.
- Added change log to track future releases.

### Changed
- Refactored all side-effecting modules to export idempotent installer helpers.
- Updated Rollup bundle configuration to expose named exports and avoid JSON import assertions.
- Updated example and test harness to call the installer explicitly before using rotation features.

### Fixed
- Prevented debug helpers from crashing when Leaflet-Rotate is loaded without installation.
