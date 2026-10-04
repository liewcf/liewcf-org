---
title: EnjinMel SMTP records WordPress 7.1-RC4 compatibility checks
summary: The 0.2.5 verification record reports 51 tests and 164 assertions passing, plus a fix for a test-only PHP deprecation.
publishedAt: 2026-08-19
draft: false
project: enjinmel-smtp
---

EnjinMel SMTP 0.2.5 was checked against WordPress 7.1-RC4 with PHP 8.3 and MySQL 8.4. The repository records 51 PHPUnit tests and 164 assertions passing, along with smoke checks and coding-standard checks.

A declared property in the test suite removes a PHP 8.2+ dynamic-property deprecation. The record reports no plugin runtime changes were needed and zero risky tests after the fix.

This evidence concerns the release candidate tested at that time. The repository leaves the final-version check and Tested up to metadata bump as follow-up work; it does not establish compatibility testing against the final WordPress 7.1 release.

Source: [compatibility verification and test-only fix](https://github.com/liewcf/enjinmel-smtp/commit/f3bc74e82b48fe40bfa0d7b5e3143b51dc18dd72).
