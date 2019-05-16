import { Constants } from 'expo';
const { manifest } = Constants;

const port = '8080';
const appNameInUrl = 'mojaepbih';

let getDevServer = function() {
    let expoDevAddress = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
        ? manifest.debuggerHost.split(`:`).shift().concat(`:${port}/${appNameInUrl}`)
        : `api.example.com`;
    return `http://${expoDevAddress}`
};

let getProdServer = function() {
    return `api.prod.com`;
};

let getServerAddress = function() {
    return __DEV__ ? getDevServer() : getProdServer();
};

export const api = getServerAddress();