import fs from 'fs';
import parser from '@babel/parser';

const code = fs.readFileSync('./src/index.js', 'utf-8');
const outputDir = './output';
const outputFilePath = `${outputDir}/payload.json`;
const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx']});
const payload = extractUsefulPayload(ast);


function extractUsefulPayload(ast) {
  let payload = [];

  babelTraverse(ast, {
    FunctionDeclaration(path) {
      payload.push({
        type: 'FunctionDeclaration',
        name: path.node.id.name,
        params: path.node.params.map(param => param.name),
      });
    },

    CallExpression(path) {
      payload.push({
        type: 'CallExpression',
        name: path.node.callee.name,
        arguments: path.node.arguments.map(arg => arg.name || arg.value),
      });
    },

    VariableDeclaration(path) {
      payload.push({
        type: 'VariableDeclaration',
        variables: path.node.declarations.map(decl => ({
          name: decl.id.name,
          value: decl.init ? decl.init.value : null,
        })),
      });
    },
  });

  return payload;
}

function babelTraverse(ast, visitor) {
  const traverseNode = (node) => {
    if (node && visitor[node.type]) { visitor[node.type]({ node });}
    for (let key in node) {
      if (node[key] && typeof node[key] === 'object') {
        Array.isArray(node[key]) ? node[key].forEach(traverseNode) : traverseNode(node[key]);
      }
    }
  };
  traverseNode(ast);
}

if (!fs.existsSync(outputDir)) { fs.mkdirSync(outputDir, { recursive: true }); }

fs.writeFileSync(outputFilePath, JSON.stringify(payload, null, 2), 'utf-8');

console.log('Полезная нагрузка:', payload);
console.log(`Полезная нагрузка сохранена в файл: ${outputFilePath}`);
