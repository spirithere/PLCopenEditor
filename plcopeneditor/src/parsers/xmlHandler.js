import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import * as fs from 'fs';
/**
 * Parses a PLCopen XML file into a JSON object.
 * @param filePath Path to the XML file.
 * @returns Parsed JSON object.
 */
export function parsePLCOpenXML(filePath) {
    const xmlData = fs.readFileSync(filePath, 'utf-8');
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
        parseAttributeValue: true,
    });
    return parser.parse(xmlData);
}
/**
 * Serializes a JSON object into a PLCopen XML string.
 * @param jsonObj JSON object representing the PLCopen project.
 * @returns XML string.
 */
export function serializeToPLCOpenXML(jsonObj) {
    const builder = new XMLBuilder({
        ignoreAttributes: false,
        attributeNamePrefix: '',
        format: true,
        indentBy: '  ',
    });
    return builder.build(jsonObj);
}
//# sourceMappingURL=xmlHandler.js.map