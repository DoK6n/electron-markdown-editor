import { BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { URL } from 'url';
import { FILE_CH, IPC_CH } from '../../../common/types/constants';

async function createWindow() {
  const browserWindow = new BrowserWindow({
    show: false, // Use 'ready-to-show' event to show window
    width: 1024,
    height: 728,
    webPreferences: {
      nativeWindowOpen: true,
      nodeIntegration: true, // Renderer Process에서 NodeJS API 접근
      contextIsolation: true,
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(__dirname, '../../preload/dist/index.cjs'),
    },
  });

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  browserWindow.on('ready-to-show', () => {
    browserWindow?.show();

    if (import.meta.env.DEV) {
      browserWindow?.webContents.openDevTools();
    }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl =
    import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString();

  await browserWindow.loadURL(pageUrl);

  return browserWindow;
}

/**
 * Restore existing BrowserWindow or Create new BrowserWindow
 */
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

  if (window === undefined) {
    window = await createWindow();
  }

  if (window.isMinimized()) {
    window.restore();
  }

  window.focus();

  // renderer로 부터 받음
  ipcMain.on(IPC_CH.SIMPLEX_RTM, (event, request) => {
    console.log('2. receive', request);
  });

  // main에서 renderer로 보냄
  // TODO
  window.webContents.send(IPC_CH.SIMPLEX_MTR, { status: 'main', number: 0 });

  // renderer로 부터 받은 데이터를 가공해서 다시 renderer로 보냄
  ipcMain.on(IPC_CH.DUPLEX_RMR, (event, request) => {
    console.log('2. receive: ', request);
    const response = { ...request, number: 500 };
    event.reply(IPC_CH.DUPLEX_RMR_RESPONSE, response);
    console.log('3. send: ', response);
  });
}
