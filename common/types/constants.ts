export const enum IPC_CH {
  SIMPLEX_RTM = 'RENDERER_TO_MAIN',
  SIMPLEX_MTR = 'MAIN_TO_RENDERER',
  DUPLEX_RMR = 'RENDERER_MAIN_RENDERER',
  DUPLEX_RMR_RESPONSE = 'RENDERER_MAIN_RENDERER_RESPONSE',
}

export const enum FILE_CH {
  READ = 'FILE_READ',
  UPDATE = 'FILE_UPDATE',
  UPLOAD = 'FILE_UPLOAD',
}
