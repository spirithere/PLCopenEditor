import * as fs from 'fs';
import * as path from 'path';
import { PLCOpenProject, POU } from '../types/PLCOpen.js';

/**
 * Converts a directory structure back into a PLCopen XML JSON object.
 * @param inputDir Input directory path.
 * @returns PLCopen XML JSON object.
 */
export function directoryToXml(inputDir: string): PLCOpenProject {
  const jsonObj: PLCOpenProject = {
    project: {
      types: {
        pous: {
          pou: [],
        },
      },
    },
  };

  const pouDirs = fs.readdirSync(inputDir);
  pouDirs.forEach((pouName) => {
    const pouDir = path.join(inputDir, pouName);
    if (fs.statSync(pouDir).isDirectory()) {
      const stFile = path.join(pouDir, `${pouName}.st`);
      let codeText = '';
      if (fs.existsSync(stFile)) {
        codeText = fs.readFileSync(stFile, 'utf-8');
      }

      const pouObj: POU = {
        '@name': pouName,
        body: {
          ST: {
            '#text': codeText,
          },
        },
      };
      jsonObj.project.types.pous.pou.push(pouObj);
    }
  });

  return jsonObj;
}