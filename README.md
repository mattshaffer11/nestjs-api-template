# nestjs-api-template

Template for quickly scaffolding Nest.js APIs with some common setup already configured.
A full configuration list is provided below.

## Use

1. Follow the [instructions on GitHub](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) to create your repo.
2. GitHub templates doesn't support automatic variable replacement, so the following files will need updated:
   1. `package.json`: update package name
   1. `docker-compose.yml`: update database credentials
   2. `src/config/configuration.ts`: update database credentials
   3. `src/app.module.ts`: update swagger document title

## What's included 

1. Docker Compose file to run a Postgres container
2. Configuration module loaded and setup to work with Postgres container
3. TypeORM
4. Swagger
5. Todos module example with validation, pipes, and ORM entities
