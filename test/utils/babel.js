/**
 * MIT License
 *
 * For Jest software
 *
 * Copyright(c) 2014 - present, Facebook, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files(the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
// This file is modified from the original source code to support Mocker.

function invariant(condition, message) {
  if (!condition) {
    throw new Error(`babel-plugin-mocker-hoist: ${message}`);
  }
}

// We allow `mocker`, `expect`, `require`, all default Node.js globals and all
// ES2015 built-ins to be used inside of a `mocker.mock` factory.
// We also allow variables prefixed with `mock` as an escape-hatch.
const WHITELISTED_IDENTIFIERS = {
  Array: true,
  ArrayBuffer: true,
  Boolean: true,
  DataView: true,
  Date: true,
  Error: true,
  EvalError: true,
  Float32Array: true,
  Float64Array: true,
  Function: true,
  Generator: true,
  GeneratorFunction: true,
  Infinity: true,
  Int16Array: true,
  Int32Array: true,
  Int8Array: true,
  InternalError: true,
  Intl: true,
  JSON: true,
  Map: true,
  Math: true,
  NaN: true,
  Number: true,
  Object: true,
  Promise: true,
  Proxy: true,
  RangeError: true,
  ReferenceError: true,
  Reflect: true,
  RegExp: true,
  Set: true,
  String: true,
  Symbol: true,
  SyntaxError: true,
  TypeError: true,
  URIError: true,
  Uint16Array: true,
  Uint32Array: true,
  Uint8Array: true,
  Uint8ClampedArray: true,
  WeakMap: true,
  WeakSet: true,
  arguments: true,
  console: true,
  expect: true,
  isNaN: true,
  mocker: true,
  parseFloat: true,
  parseInt: true,
  require: true,
  undefined: true,
};

Object.keys(global).forEach((name) => {
  WHITELISTED_IDENTIFIERS[name] = true;
  return WHITELISTED_IDENTIFIERS[name];
});

const MOCKER_GLOBAL = {
  name: 'mocker',
};
const IDVisitor = {
  ReferencedIdentifier(path) {
    this.ids.add(path);
  },
  blacklist: ['TypeAnnotation'],
};

const FUNCTIONS = Object.create(null);

FUNCTIONS.mock = (args) => {
  if (args.length === 1) {
    return args[0].isStringLiteral() || args[0].isLiteral();
  }

  if (args.length === 2 || args.length === 3) {
    const moduleFactory = args[1];

    // invariant(
    //   moduleFactory.isFunction(),
    //   'The second argument of `mocker.mock` must be an inline function.',
    // );

    const ids = new Set();
    const parentScope = moduleFactory.parentPath.scope;

    moduleFactory.traverse(IDVisitor, {
      ids,
    });

    // eslint-disable-next-line no-restricted-syntax
    for (const id of ids) {
      const { name } = id.node;

      let found = false;
      let { scope } = id;

      while (scope !== parentScope) {
        if (scope.bindings[name]) {
          found = true;
          break;
        }

        scope = scope.parent;
      }

      if (!found) {
        invariant(
          (scope.hasGlobal(name) && WHITELISTED_IDENTIFIERS[name])
          || /^mock/i.test(name)
          // Allow sinon usage to pass
          || /^sinon/i.test(name)
          // Allow istanbul's coverage variable to pass.
          || /^(?:__)?cov/.test(name),
          `${'The module factory of `mocker.mock()` is not allowed to '
          + 'reference any out-of-scope variables.\n'
          + 'Invalid variable access: '}${
            name
          }\n`
          + `Whitelisted objects: ${
            Object.keys(WHITELISTED_IDENTIFIERS).join(', ')
          }.\n`
          + 'Note: This is a precaution to guard against uninitialized mock '
          + 'variables. If it is ensured that the mock is required lazily, '
          + 'variable names prefixed with `mock` (case insensitive) are permitted.',
        );
      }
    }

    return true;
  }

  return false;
};

FUNCTIONS.unmock = (args) => { return args.length === 1 && args[0].isStringLiteral(); };
FUNCTIONS.deepUnmock = (args) => { return args.length === 1 && args[0].isStringLiteral(); };

FUNCTIONS.disableAutomock = FUNCTIONS.enableAutomock = (args) => { return args.length === 0; };

module.exports = () => {
  // const isMocker = (callee) => {
  //   return callee.get('object').isIdentifier(MOCKER_GLOBAL)
  //   || (callee.isMemberExpression() && isMocker(callee.get('object')));
  // };
  const shouldHoistExpression = (expr) => {
    if (!expr.isCallExpression()) {
      return false;
    }

    const callee = expr.get('callee');
    const object = callee.get('object');
    const property = callee.get('property');

    return (
      property.isIdentifier()
      && FUNCTIONS[property.node.name]
      && (object.isIdentifier(MOCKER_GLOBAL)
        || (callee.isMemberExpression() && shouldHoistExpression(object)))
      && FUNCTIONS[property.node.name](expr.get('arguments'))
    );
  };

  return {
    visitor: {
      ExpressionStatement(path: any) {
        if (shouldHoistExpression(path.get('expression'))) {
          path.node._blockHoist = Infinity;
        }
      },
    },
  };
};
