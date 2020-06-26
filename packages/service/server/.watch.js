const chokidar = require('chokidar');
const {promises} = require('fs');
const path = require('path');

const watcher = chokidar.watch('./src/**/*.ts');

watcher.on('unlink', async (filePath) => {
  if (filePath.endsWith('.d.ts')) return;

  console.log(`Watcher: unlinked ${filePath}`);
  const parsedPath = path.parse(filePath, '.ts');

  ['d.ts', 'js', 'd.ts.map', 'js.map'].forEach(async (ext) => {
    const buildFile = path.join(parsedPath.dir, `${parsedPath.name}.${ext}`);

    try {
      console.log(`Unlinking ${buildFile}`);
      await promises.unlink(buildFile);
    } catch (e) {
      console.log(`Failed: ${e.message}`);
    }
  });
});