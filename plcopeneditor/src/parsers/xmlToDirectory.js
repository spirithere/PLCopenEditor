import * as fs from 'fs';
import * as path from 'path';
/**
 * Converts PLCopen XML JSON object to directory structure.
 * @param jsonObj Parsed PLCopen XML JSON object.
 * @param outputDir Output directory path.
 */
export function xmlToDirectory(jsonObj, outputDir) {
    const pous = jsonObj.project.types.pous.pou;
    if (!Array.isArray(pous))
        return;
    pous.forEach((pou) => {
        const pouName = pou['@name'];
        const pouDir = path.join(outputDir, pouName);
        if (!fs.existsSync(pouDir)) {
            fs.mkdirSync(pouDir, { recursive: true });
        }
        const code = pou.body?.ST?.['#text'] || '';
        fs.writeFileSync(path.join(pouDir, `${pouName}.st`), code);
    });
}
//# sourceMappingURL=xmlToDirectory.js.map