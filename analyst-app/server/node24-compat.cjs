'use strict';

// A scoped compatibility shim remains for legacy NestJS 6 ecosystem packages. 
// PostgreSQL user persistence no longer relies on TypeORM.
const util = require('node:util');
if (typeof util.isNullOrUndefined !== 'function') {
  util.isNullOrUndefined = value => value === null || value === undefined;
}
