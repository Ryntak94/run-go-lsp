import * as vscode from "vscode";
import { exec } from "child_process";
import {
  ServerOptions,
  LanguageClientOptions,
  LanguageClient,
} from "vscode-languageclient/node";
import path from "path";
export function activate(context: vscode.ExtensionContext) {
  const absPath = context.asAbsolutePath(
    path.join("..", "go-lsp", "cmd", "main"),
  );

  const serverOptions: ServerOptions = () => {
    const process = exec(`cd ${absPath} && go run main.go`);
    return Promise.resolve(process);
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      {
        language: "go",
      },
    ],
    synchronize: {
      fileEvents: vscode.workspace.createFileSystemWatcher("**/*.go"),
    },
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
