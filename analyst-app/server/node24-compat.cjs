'use strict';

// NestJS 6 @nestjs/typeorm uses util.isNullOrUndefined at module initialization.
// Node.js 24 removed that deprecated helper. Keep the compatibility shim scoped
// to the Analyst server process until the separate framework migration.
const util = require('node:util');
if (typeof util.isNullOrUndefined !== 'function') {
  util.isNullOrUndefined = value => value === null || value === undefined;
}
