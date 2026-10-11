---
title: What is Composability-First Design?
description: Also known as Atomic-First Design. An explanation of the design principles behind composable libraries, and how they improve your development experience.
date: 2022-06-11
author: Chris Breuer
authorBio: Software engineer and founder of Stacks. Passionately obsessed over developer tooling.
featured: true
---

Composability-First Design, also called "Atomic-First Design," starts with components and functions that can be reused across projects. The work includes how those pieces are styled, tested, documented, and distributed.

![Illustration of Atomic UI & FX Design](/images/diagram.png)

## Why reuse takes work

Building complex components is oftentimes difficult using traditional development and design approaches. In addition to the already many questions a developer has to answer: _should I use Vue? React? Svelte, Solid, or Angular? How do I distribute it via a package manager, like npm?_ Over time, questions like these become exhausting to answer, while trying to find "the best tech stack."

Much of the work is in the infrastructure around the library. Before someone else can use it, you need to settle questions such as:

- Which code style should be followed?
- Code formatting setup _(e.g. ESLint, Prettier, etc.)_
- Create a custom, project-specific CI _(e.g. GitHub Actions, Circle CI, Travis CI, etc.)_
- Automatic library changelog generations upon releases, based on git naming conventions
- Distribution channels setup _(e.g. package managers like npm and CDNs)_
- Create a documentation site and web presence for the library
- Does your IDE help as much as it possibly could?

No matter which component or function library you are building, these concerns all have to be, and should be, addressed one way or another.

## What makes a library composable

Have you ever needed to reuse one of your components from Project A in Project B? Or have you ever needed to access a project-specific function from Project B? How about a beautiful, working modal experience? Or calendar components?

A composable library separates components and functions into reusable units that other projects can import. Each piece has a clear purpose and a boundary that lets you use it independently.

> Think of Lodash for "functions," and minimal HTML for the "components."

## Questions to settle first

Before adopting this approach, decide who will use the library and how:

- Are you developing a UI component library or a function library? Or both?
- How is the library styled, if styling is required at all?
  - Tailwind CSS, Windi CSS, Bootstrap, Tachyons? Or something else, or custom?
  - In case styling is required, are "icons" utilized within the UI?
- How is the library distributed across different code bases? npm and/or CDNs?
- Is the library meant to be built for max compatibility?

_Both components and functions should be designed with reusability (composability) in mind._

## The atomic core

I split the work into two engines:

1. The Atomic UI engine
2. The Atomic FX engine

The Atomic UI engine, at its core, is made up of an instant atomic CSS engine, coupled with several UI techniques to ensure the most reusable and composable UI experience. To quote Adam Wathan, the creator of Tailwind CSS:

> Maintaining a utility-first (atomic) CSS project turns out to be a lot easier than maintaining a large CSS codebase, simply because HTML is so much easier to maintain than CSS. Large companies like GitHub, Netflix, Heroku, Kickstarter, Twitch, Segment, and more are using this approach with great success.

Much has been written about atomic CSS engines, in particular because CSS is "notoriously hard to scale" (Sarah Dayan of Algolia). If you like to hear about other experiences, check out the following resources:

- [By The Numbers: A Year and a Half with Atomic CSS](https://medium.com/@johnpolacek/by-the-numbers-a-year-and-half-with-atomic-css-39d75b1263b4) by John Polacek
- [The Case for Atomic/Utility-First CSS](https://johnpolacek.github.io/the-case-for-atomic-css/) curated by John Polacek
- [Building a Scalable CSS Architecture](https://blog.algolia.com/redesigning-our-docs-part-4-building-a-scalable-css-architecture/) by Sarah Dayan of Algolia
- [No, Utility Classes Aren't the Same As Inline Styles](https://frontstuff.io/no-utility-classes-arent-the-same-as-inline-styles) by Sarah Dayan of Algolia
- [Diana Mounter on using utility classes at GitHub](http://www.fullstackradio.com/75), a Fullstack Radio podcast interview

## Maintainability

Maintainability concerns are a major reason and inspiration for a composable atomic UI/FX engine. When every piece of your stack is broken down to its smallest reusable unit, maintaining and evolving the whole becomes dramatically simpler. This idea became a core reason I started working on Stacks, where composability-first thinking is applied to the entire framework, not just the UI layer.

If you have questions, [email me](mailto:hi@chrisbreuer.me).
