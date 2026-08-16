import test from 'node:test';
import assert from 'node:assert/strict';
import { validateRegister, validateLogin } from '../src/validations/auth.validation.js';

test('register validation rejects missing fields', () => {
  const result = validateRegister({});
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.password);
});

test('register validation rejects short password', () => {
  const result = validateRegister({ name: 'John', email: 'john@test.com', password: '123' });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.password);
});

test('register validation accepts valid input', () => {
  const result = validateRegister({
    name: 'John',
    email: 'john@test.com',
    password: 'password123',
  });
  assert.equal(result.isValid, true);
});

test('login validation rejects invalid email', () => {
  const result = validateLogin({ email: 'not-an-email', password: 'password123' });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.email);
});
