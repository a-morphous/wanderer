// src/index.ts
import fs from "fs";
import path from "path";
var CopyPlugin = class {
  constructor() {
    this.extensions = "UNUSED";
  }
  url(fileInfo, site) {
    return fileInfo.id;
  }
  build(opts) {
    const targetFilePath = path.resolve(opts.site.buildDirectory, opts.url);
    const sourceFilePath = path.resolve(opts.file.sourcePath);
    if (!fs.existsSync(path.dirname(targetFilePath))) {
      fs.mkdirSync(path.dirname(targetFilePath), { recursive: true });
    }
    fs.copyFileSync(sourceFilePath, targetFilePath);
    return true;
  }
};
export {
  CopyPlugin as default
};
