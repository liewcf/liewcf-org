---
title: Auto-Tomato
summary: A native macOS menu-bar Pomodoro timer that follows keyboard and mouse activity, counting focused work as active time and breaks as wall-clock time.
repositoryUrl: https://github.com/liewcf/auto-tomato
categories:
  - macOS
  - Swift
  - Productivity
featured: false
draft: false
status: Manual Apple Silicon package
---

## The problem

A fixed countdown cannot tell focused computer use from time spent away. Auto-Tomato keeps the timer in the menu bar and uses keyboard and mouse idle time to pause work automatically, while breaks continue on wall-clock time.

## Important decisions

Activity detection reads IOKit's `HIDIdleTime` registry value instead of intercepting input, so it does not require Accessibility or Input Monitoring permission. Work and rest deliberately use different clocks: work advances only during verified activity, while rest includes time spent away or asleep.

Cancel and inactivity reset also have different meanings. Cancel discards the current work interval, preserves completed-cycle progress, and suppresses automatic restart until a manual Start. An optional inactivity reset can discard an interrupted interval without setting that suppression, allowing a fresh interval when activity returns.

## Implementation

The app is a Swift Package Manager executable using AppKit, SwiftUI, IOKit, UserNotifications, and ServiceManagement without third-party dependencies. A state-machine engine owns timer semantics; the status-bar controller coordinates activity, notifications, settings, login-item behavior, and the optional completion celebration. Settings persist in `UserDefaults`.

Time, timer, idle-state, notification, reminder-scheduling, login-item, and celebration dependencies have injectable seams so core behavior can be exercised without waiting on real time or opening production UI.

## Verification evidence

The source repository's 31 July 2026 verification record reports 156 XCTest tests passing with no failures. Coverage includes the timer engine, activity monitor, settings, notification messages, controller behavior, celebration wiring, time formatting, and the programmatic menu-bar icon.

The same record verifies a version 1.1.1 manual package as a thin `arm64` app with both bundle version fields set to `1.1.1`, a valid code signature, and a clean, readable archive.

## Limitations and status

The documented distribution path is a manual Apple Silicon package for macOS 13 or later. It is ad-hoc signed, not notarized, and is not presented as a normal public macOS download. Recipients may need to use right-click → Open, and macOS 26 may require notifications to be enabled manually in System Settings.
