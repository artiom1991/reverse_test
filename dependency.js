import fs from 'fs';


const payload = JSON.parse(fs.readFileSync('./output/payload.json', 'utf-8'));
const dependencies = {};
const controlFlow = [];

payload.forEach(item => {
  if (item.type === 'FunctionDeclaration') {
    dependencies[item.name] = {
      type: 'function',
      dependsOn: []
    };
  }

  if (item.type === 'CallExpression') {
    const functionName = item.name || item.arguments[0];
    if (dependencies[functionName]) {
      dependencies[functionName].dependsOn.push(item.arguments);
    } else {
      dependencies[functionName] = {
        type: 'external',
        dependsOn: item.arguments
      };
    }

    controlFlow.push({
      from: item.arguments[0] || 'start',
      to: functionName,
    });
  }
});

let dependenciesDot = 'digraph G {\n';
for (const funcName in dependencies) {
  if (dependencies[funcName].type === 'function') {
    dependenciesDot += `  ${funcName?funcName:"undefiend"} [shape=box];\n`;
    dependencies[funcName].dependsOn.forEach(dependency => {
      if (dependency) {
        dependency.forEach(dep => {
          dependenciesDot += `  ${funcName} -> ${dep};\n`;
        });
      }
    });
  } else {
    dependenciesDot += `  ${funcName?funcName:"undefiend"}  [shape=ellipse, color=red];\n`;
  }
}
dependenciesDot += '}\n';

let controlFlowDot = 'digraph G {\n';
controlFlow.forEach(item => { controlFlowDot += `  ${item.from} -> ${item.to}\n`;});
controlFlowDot += '}\n';


fs.writeFileSync('./output/dependencies.dot', dependenciesDot);
fs.writeFileSync('./output/controlFlow.dot', controlFlowDot);

console.log('Граф зависимостей записан в dependencies.dot');
console.log('Граф потока управления записан в controlFlow.dot');

