import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import {
  parsePLCOpenXML,
  serializeToPLCOpenXML,
} from './parsers/xmlHandler.js';
import { xmlToDirectory } from './parsers/xmlToDirectory.js';
import { directoryToXml } from './parsers/directoryToXml.js';

export function activate(context: vscode.ExtensionContext): void {
  console.log('PLCopen XML Editor extension is now active!');

  const importCommand = vscode.commands.registerCommand(
    'extension.importPLCOpenXML',
    async () => {
      const xmlFile = await vscode.window.showOpenDialog({
        filters: { 'XML Files': ['xml'] },
      });

      if (xmlFile && xmlFile.length > 0) {
        try {
          const xmlPath = xmlFile[0].fsPath;
          const jsonObj = parsePLCOpenXML(xmlPath);
          const outputDir = path.dirname(xmlPath);

          xmlToDirectory(jsonObj, outputDir);

          vscode.window.showInformationMessage(
            'Imported PLCopen XML successfully.'
          );
        } catch (error: any) {
          const errorMessage = (error as Error).message;
          vscode.window.showErrorMessage(
            `An error occurred: ${errorMessage}`
          );
        }
      }
    }
  );

  const exportCommand = vscode.commands.registerCommand(
    'extension.exportPLCOpenXML',
    async () => {
      const folder = vscode.workspace.workspaceFolders?.[0];
      if (folder) {
        try {
          const inputDir = folder.uri.fsPath;
          const jsonObj = directoryToXml(inputDir);
          const xmlData = serializeToPLCOpenXML(jsonObj);

          const xmlPath = path.join(inputDir, 'exported_project.xml');
          fs.writeFileSync(xmlPath, xmlData, 'utf-8');

          vscode.window.showInformationMessage(
            'Exported PLCopen XML successfully.'
          );
        } catch (error) {
          vscode.window.showErrorMessage(
            `An error occurred: ${(error as Error).message}`
          );
        }
      } else {
        vscode.window.showErrorMessage('No workspace folder is open.');
      }
    }
  );

  context.subscriptions.push(importCommand, exportCommand);
}

export function deactivate(): void {
  console.log('PLCopen XML Editor extension is now deactivated.');
}