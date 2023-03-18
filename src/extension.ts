import * as vscode from "vscode";

function openParentWorkspace(uri: vscode.Uri, forceNewWindow: boolean) {
  const wsFolder = vscode.workspace.getWorkspaceFolder(uri);

  if (!wsFolder) {
    return;
  }

  const parent = vscode.Uri.joinPath(wsFolder.uri, "..");
  vscode.commands.executeCommand("vscode.openFolder", parent, forceNewWindow);
}

export function activate(context: vscode.ExtensionContext) {
  let reopenParentDirInNewWindow = vscode.commands.registerCommand(
    "open-parent.reopenParentWorkspace",
    (uri: any) => {
      if (uri instanceof vscode.Uri) {
        openParentWorkspace(uri, false);
      }
    }
  );

  context.subscriptions.push(reopenParentDirInNewWindow);

  let openParentDirInNewWindow = vscode.commands.registerCommand(
    "open-parent.openParentWorkspace",
    (uri: any) => {
      if (uri instanceof vscode.Uri) {
        openParentWorkspace(uri, true);
      }
    }
  );

  context.subscriptions.push(openParentDirInNewWindow);
}

export function deactivate() {}
