import { Constants } from 'expo';

const { manifest } = Constants;

const port = '8080';
const appNameInUrl = 'mojaepbih';

const getDevServer = () => {
  const expoDevAddress = (typeof manifest.packagerOpts === 'object') && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(':').shift().concat(`:${port}/${appNameInUrl}`)
    : 'api.example.com';
  return `http://${expoDevAddress}`;
};

const getProdServer = () => 'api.prod.com';

const getServerAddress = () => (__DEV__ ? getDevServer() : getProdServer());


const api = getServerAddress();
export default api;
