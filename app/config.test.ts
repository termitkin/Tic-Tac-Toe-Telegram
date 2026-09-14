import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveMongoDbUri } from './config.js';

test('uses the configured MongoDB URI', () => {
  assert.equal(resolveMongoDbUri('mongodb://mongo:27017/acc-test'), 'mongodb://mongo:27017/acc-test');
});

test('falls back to the deployment MongoDB URI', () => {
  assert.equal(resolveMongoDbUri(), 'mongodb://mongodb:27017/tic-tac-toe');
});
