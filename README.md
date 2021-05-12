# About

It is a client to [DB Migrator](https://github.com/eigen-space/db-migrator). 
So you can use it to request db migration in a service that has a liquibase 
migration changelog and needs to apply them to its storage.

# Configuration

You can use environment variables to configure the client:

* `DB_HOST`, the host of the storage which we want to apply migration on 
* `DB_PORT`, the port of the storage which we want to apply migration on
* `DB_USER`, the username to connect to the storage
* `DB_PASSWORD`, the password to connect to the storage
* `DB_NAME`, the database name we are going to migrate
* `MIGRATOR_BASE_URL`, the full base url of the db migrator: <protocol>://<host>:<port>.
  For instance, http://localhost:4010
* `SERVICE_NAME`, the name of service that is going to migrate data.
  It is used only to create a namespace for its changelog so that different
  service with their own migrations do not interfere with each other.
* `CHANGELOG_ARCHIVE_PATH`, the full name/path of the changelog archive. 
  For instance, `/opt/service/changelog.tar`.
  
# Publishing the package

If you want to publish the package, you need to add environment variable:

* `NPM_REGISTRY_ACCESS_TOKEN`. It has to contain the value of the access token 
  to @eigenspace account on the public [npm registry](https://www.npmjs.com/)
  (See `.npmrc`). 
  
# CI configuration

You can find a configured secret for `NPM_REGISTRY_ACCESS_TOKEN` in
[Github Eigenspace secrets](https://github.com/organizations/eigen-space/settings/secrets/actions).

# Why do we have that dependencies?

* `form-data` - it is used to send changelog archive to the migrator

# Why do we have that dev dependencies?

* `@eigenspace/codestyle` - includes lint rules, config for typescript.
* `@eigenspace/commit-linter` - linter for commit messages.
* `@eigenspace/package-publisher` - it publishes the package and set the next version 
  automatically.
* `@types/*` - contains type definitions for specific library.
* `clean-webpack-plugin` - it is used to clean dist folder before build.
* `copy-webpack-plugin` - it is used to copy additional files into dist.
* `eslint` - it checks code for readability, maintainability, and functionality errors.
* `eslint-plugin-eigenspace-script` - includes set of script linting rules
  and configuration for them.
* `husky` - used for configure git hooks.
* `lint-staged` - used for configure linters against staged git files.
* `pg` - it is used to operate with the storage represented as
  Postgres database. It is in dev dependencies because we use it as a peer dependency.
  We expect that every consumer of the library works with a database due to it needs
  db migration. So, it will provide required dependency.
* `ts-loader` - webpack loader to build typescript files.
* `ts-node` - to run without build typescript.
* `typescript` - is a superset of JavaScript that have static type-checking and ECMAScript features.
* `webpack` - it is used to build the package/library.
* `webpack-cli` - it is used to send commands to webpack using commandline interface.