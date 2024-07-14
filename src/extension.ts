import * as vscode from "vscode";
import { exec } from "child_process";
import {
  ServerOptions,
  LanguageClientOptions,
  LanguageClient,
} from "vscode-languageclient/node";
import path from "path";

export function activate(context: vscode.ExtensionContext) {
  const activateOutput = vscode.window.createOutputChannel("activateFunc");
  const absPath = context.asAbsolutePath(path.join("..", "go-lsp"));
  const serverOptions: ServerOptions = () => {
    return new Promise(() => {
      const process = exec(
        `cd ${absPath} && make dev`,
        (error, stdout, stderr) => {
          activateOutput.appendLine(stdout);
          activateOutput.appendLine(stderr);
        },
      );
      activateOutput.appendLine(JSON.stringify(process));
      return process;
    });
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      {
        language: "go",
      },
    ],
  };

  const client = new LanguageClient(
    "vs-code-go-lsp-extension",
    serverOptions,
    clientOptions,
  );
  client.start();
}

// This method is called when your extension is deactivated
export function deactivate() {}
