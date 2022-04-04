import React from 'react';
import { useState } from 'react';
import './app.css';
import { FILE_CH, IPC_CH } from '../../../common/types/constants';
import { Button, ButtonGroup } from '@mui/material';

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const initialData = {
    status: 'renderer',
    number: 100,
  };
  const [data, setData] = useState(initialData);

  const sendToMain = () => {
    // window.electron.ipcRenderer.rtm(IPC_CH.SIMPLEX_RTM, data);
    window.electron.ipcRenderer.rtm(IPC_CH.SIMPLEX_RTM, data);
  };
  const receiveFromMain = () => {
    window.electron.ipcRenderer.mtr(IPC_CH.SIMPLEX_MTR, (listener: any) => {
      console.log('2. receive', listener);
    });
  };
  const sendAndReceive = () => {
    window.electron.ipcRenderer.rmr(IPC_CH.DUPLEX_RMR, data);
    window.electron.ipcRenderer.once(IPC_CH.DUPLEX_RMR_RESPONSE, (listener: any) => {
      console.log('4. receive', listener);
    });
  };

  const onChange = (e: any) => {
    let file = e.target.files[0];
    console.log(e.target.files[0].size, e.target.files[0].name);
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') setText(fileReader.result);
    };
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Demo</h1>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={() => setCount(count => count + 1)}>count: {count}</Button>
          <Button onClick={sendToMain}>RTM</Button>
          <Button onClick={receiveFromMain}>MTR</Button>
          <Button onClick={sendAndReceive}>RMR</Button>
        </ButtonGroup>
        <br />
        <Button component="label">
          Upload File
          <input type="file" onChange={onChange} hidden />
        </Button>
        <p>{text}</p>
      </header>
    </div>
  );
}

export default App;
