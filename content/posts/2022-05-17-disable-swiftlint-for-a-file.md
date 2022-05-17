---
title: Disable SwiftLint for a file
description: Put `// swiftlint:disable all` at the top of the file.
url: /disable-swiftlint-for-a-file/
date: 2022-05-17
---

[SwiftLint][0] is great, but sometimes you want to completely ignore something. Add this to the top of a file to achieve that:

```swift
// swiftlint:disable all
```

Alternatively, you can update your SwiftLint configuration. Add this to your `.swiftlint.yml` configuration file:

```yml
excluded:
  - Path/To/File/To/Exclude.swift
```

And SwiftLint will stop complaining about it!

[0]: https://realm.github.io/SwiftLint/
