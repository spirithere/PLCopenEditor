import * as fs from 'fs';
import * as path from 'path';
import { PLCOpenProject, POU } from '../types/PLCOpen.js';

/**
 * Converts PLCopen XML JSON object to directory structure.
 * @param jsonObj Parsed PLCopen XML JSON object.
 * @param outputDir Output directory path.
 */
export function xmlToDirectory(
  jsonObj: PLCOpenProject,
  outputDir: string
): void {
  const pous = jsonObj.project.types.pous.pou;
  if (!Array.isArray(pous)) return;

  pous.forEach((pou: POU) => {
    const pouName = pou['@name'];
    const pouDir = path.join(outputDir, pouName);
    if (!fs.existsSync(pouDir)) {
      fs.mkdirSync(pouDir, { recursive: true });
    }

    const code = pou.body?.ST?.['#text'] || '';
    fs.writeFileSync(path.join(pouDir, `${pouName}.st`), code);
  });
}