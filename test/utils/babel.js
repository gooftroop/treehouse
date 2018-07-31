const templateOptions = {
  placeholderPattern: /^([A-Z0-9]+)([A-Z0-9_]+)$/,
};

const MOCKER_VALUE = 'mocker';
const MOCKER_GLOBAL = { name: MOCKER_VALUE };

const isMocker = (expr) => {
  const callee = expr.get('callee');

  if (!callee.node) {
    return false;
  }
  const object = callee.get('object');

  return (
    (callee.isIdentifier(MOCKER_GLOBAL) || (callee.isMemberExpression() && isMocker(object)))
  );
};


module.exports = (args) => {
  debugger;
  const { template } = args;

  // const enable = template('rewiremock.enable();\n', templateOptions);
  // const disable = template('rewiremock.disable();\n', templateOptions);

  const registrations = template(
    `(function() {
      global["MOCKER_HOISTED"] = global["MOCKER_HOISTED"] || [];
      global["MOCKER_HOISTED"].push(function(mocker) {
        MOCKS
       });
    })();`,
    templateOptions,
  );

  const REGISTRATIONS = Symbol('registrations');

  return {
    visitor: {
      Program: {
        enter({ node }) {
          debugger;
          // eslint-disable-next-line no-param-reassign
          node[REGISTRATIONS] = {
            imports: [],
            mocks: [],
          };
        },
        exit({ node }) {
          debugger;
          const { imports, mocks } = node[REGISTRATIONS];

          if (mocks.length) {
            const found = imports.find(({ inode }) => {
              return inode.source.value.indexOf(MOCKER_VALUE) >= 0;
            });

            if (!found) {
              /* eslint-disable no-console */
              console.warn(`${MOCKER_VALUE} not found in imports`);
            }

            const mocker = registrations({
              MOCKS: [...mocks],
            });

            node.body.push(mocker);

            // eslint-disable-next-line no-underscore-dangle
            mocker._blockHoist = Infinity;
          }
        },
      },

      ImportDeclaration(path) {
        debugger;
        path.parent[REGISTRATIONS].imports.push(path);
      },

      ExpressionStatement(path) {
        debugger;
        if (!path.parent[REGISTRATIONS]) {
          return false;
        }

        const expr = path.get('expression');

        if (!expr.isCallExpression()) {
          return false;
        }

        if (isMocker(expr)) {
          path.parent[REGISTRATIONS].mocks.push(path.node);
          path.remove();
        }

        return true;
      },
    },
  };
};
