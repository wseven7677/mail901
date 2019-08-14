import path from 'path'
import fs from 'fs'

function smallIt(name) {
    const arr = name.split('');
    arr[0] = arr[0].toLowerCase();
    return arr.join('');
}

function generateFile(list, folderName){
    let importContent = list
    .map(one => {
        return `import ${one.split('.')[0]} from '../${folderName}/${one}';`;
    });

    let exportContent = list
    .map(one => {
        const name = one.split('.')[0];
        const smallName = smallIt(name);
        return `${smallName}: new ${name}(),`;
    });
    exportContent.unshift(`export default {`);
    exportContent.push(`};`);

    let content = [...importContent, ...exportContent];
    return content.join('\n');
};

function main() {
    console.log(`boot start...`);

    const controllerPath = path.resolve(__dirname, '../controller');
    const servicePath = path.resolve(__dirname, '../service');

    const controllerList = fs.readdirSync(controllerPath);
    const serviceList = fs.readdirSync(servicePath);

    //
    const fController = generateFile(controllerList, 'controller');
    fs.writeFileSync(__dirname + '/controller.js', fController);

    const fService = generateFile(serviceList, 'service');
    fs.writeFileSync(__dirname + '/service.js', fService);

    console.log(`boot done.`);
}

main();