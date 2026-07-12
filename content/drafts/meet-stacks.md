---
title: Meet Stacks. The All-in-One Framework.
description: A full-stack TypeScript framework for Web Artisans. Develop modern apps, clouds, and framework-agnostic libraries, faster.
date: 2026-07-11
author: Chris Breuer
authorBio: Software engineer and founder of Stacks. Passionately obsessed over developer tooling.
---

Stacks is the project I have spent the last years building: a full-stack TypeScript framework that runs on Bun, for people who want to ship whole products instead of wiring together forty tools.

## One codebase, every surface

A single Stacks app gives you routing, server-rendered views, an ORM, authentication, a CMS, queues, mail, storage, search, tests, docs, a blog, and cloud deployment. You scaffold with `buddy`, build your product, and deploy every surface (marketing site, docs, blog, API, app server, infrastructure) with one command.

If you have used Laravel, the shape will feel familiar: expressive routing, an Eloquent-style ORM with traits and relationships, factories and seeders, queues and jobs, and a real CLI. That is deliberate. Laravel got the developer experience right. Stacks brings that same cohesion natively to TypeScript, running on Bun, with types flowing end to end.

## Models drive everything

The part I am most proud of: you describe your schema once, in the model. Validation, migrations, seeders, REST endpoints, and search indexing are all derived from that single definition.

```ts
export default defineModel({
  name: 'Product',
  traits: {
    useApi: { uri: 'products', routes: ['index', 'store', 'show'] },
    useSearch: { searchable: ['name'] },
    useSeeder: { count: 20 },
  },
  attributes: {
    name: {
      fillable: true,
      validation: { rule: schema.string().maxLength(100) },
      factory: faker => faker.commerce.productName(),
    },
  },
})
```

Run `buddy generate:migrations` and Stacks diffs your models against the database and writes the SQL for you. No hand-written migrations unless you want them.

## Own the stack

Most frameworks are a thin layer of glue over hundreds of transitive dependencies. We made a different bet: if a piece is core to the developer experience, we build and maintain it ourselves. The linter, the formatter, the type generator, the templating engine, the CSS engine, the query builder: all ours. The only dependencies that remain are TypeScript and Bun.

Check it out at [stacksjs.com](https://stacksjs.com) or star the repo at [github.com/stacksjs/stacks](https://github.com/stacksjs/stacks). This site runs on it.
