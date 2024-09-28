import { expect } from 'chai';
import { parsePLCOpenXML, serializeToPLCOpenXML } from '../parsers/xmlHandler.js';
import * as path from 'path';
describe('XML Handler Tests', () => {
    it('should parse PLCopen XML file', () => {
        const testFilePath = path.resolve(__dirname, 'testFiles', 'sample.xml');
        const jsonObj = parsePLCOpenXML(testFilePath);
        expect(jsonObj).to.have.property('project');
    });
    it('should serialize JSON object to XML', () => {
        const jsonObj = {
            project: {
                types: {
                    pous: {
                        pou: [],
                    },
                },
            },
        };
        const xmlData = serializeToPLCOpenXML(jsonObj);
        expect(xmlData).to.be.a('string');
        expect(xmlData).to.include('<project>');
    });
});
//# sourceMappingURL=xmlHandler.test.js.map