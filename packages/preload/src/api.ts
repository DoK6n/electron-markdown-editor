import { ipcRenderer } from 'electron';
import { exposeInMainWorld } from './exposeInMainWorld';
import { FILE_CH, IPC_CH } from '../../../common/types/constants';

const api = {
  ipcRenderer: {
    rtm: (channel: IPC_CH.SIMPLEX_RTM, listener: any) => {
      ipcRenderer.send(channel, listener);
      console.log('1. send', listener);
    },
    mtr: (channel: IPC_CH.SIMPLEX_MTR, func: (...listener: any[]) => void) => {
      ipcRenderer.once(channel, (_event, ...listener) => func(...listener));
    },
    rmr: (channel: IPC_CH.DUPLEX_RMR, listener: any) => {
      ipcRenderer.send(channel, listener);
      console.log('1. send', listener);
    },
    once: (channel: IPC_CH.DUPLEX_RMR_RESPONSE, func: (...listener: any[]) => void) => {
      ipcRenderer.once(channel, (_event, ...listener) => func(...listener));
    },
  },
};

exposeInMainWorld('electron', api);
