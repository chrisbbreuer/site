---
title: Meet Stacks. The All-in-One Framework.
description: A full-stack TypeScript framework for Web Artisans. Develop modern apps, clouds, and framework-agnostic libraries, faster.
date: 2026-07-11
author: Chris Breuer
authorBio: Software engineer and founder of Stacks. Passionately obsessed over developer tooling.
---

Stacks is the project I have spent the last years building: a full-stack TypeScript framework that runs on Bun, for building a product's frontend, backend, and deployment in one codebase.

## One codebase, every surface

A single Stacks app gives you routing, server-rendered views, an ORM, authentication, a CMS, queues, mail, storage, search, tests, docs, a blog, and cloud deployment. You scaffold with `buddy`, build your product, and deploy every surface (marketing site, docs, blog, API, app server, infrastructure) with one command.

If you have used Laravel, the shape will feel familiar: expressive routing, an Eloquent-style ORM with traits and relationships, factories and seeders, queues and jobs, and a real CLI. That is deliberate. Laravel got the developer experience right. Stacks brings that same cohesion natively to TypeScript, running on Bun, with types flowing end to end.

## Models drive everything

The part I am most proud of: you describe your schema once, in the model. Validation, migrations, seeders, REST endpoints, and search indexing are all derived from that single definition.

```ts
import { defineModel } from '@stacksjs/orm'
import { schema } from '@stacksjs/validation'

export default defineModel({
  name: 'Product',
  table: 'products',
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

Run `buddy generate:migrations` to generate SQL from the model changes. Review the SQL, then apply it with `buddy migrate`. The model snapshot tracks the schema history; hand-written migrations are still available when you need them.

## Own the stack

We build and maintain the tools at the core of the Stacks developer experience: the linter, formatter, declaration emitter, templating engine, CSS engine, and query builder. They share conventions and are used by the framework itself. Stacks also integrates external packages and services where the application needs them.

Check it out at [stacksjs.com](https://stacksjs.com) or star the repo at [github.com/stacksjs/stacks](https://github.com/stacksjs/stacks). This site runs on it.
