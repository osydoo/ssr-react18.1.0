import * as React from 'react';
import { renderToPipeableStream } from 'react-dom/server'; // 이름이 변경되었다.
import App from '../src/pages/main/App';
import DataProvider from '../src/pages/main/context/data';
import {API_DELAY, ABORT_DELAY} from './delays';

let assets = {
    'main.js': '/main.js',
    'main.css': '/main.css'
}

module.exports = function renderMain(url, res){
    res.socket.on('error', error => {
        console.error('Fatal', error);
    });
    let didError = false;
    const data = createServerData();
    const {pipe, abort} = renderToPipeableStream(
        <DataProvider data={data}>
            <App assets={assets} />
        </DataProvider>,
        {
            onShellReady(){ // 이것도 변경해줘야한다.
                res.statusCode = didError ? 500 : 200;
                res.setHeader('Content-type', 'text/html');
                res.write('<!DOCTYPE html>');
                pipe(res);
            },
            onError(x){
                didError = true;
                console.error(x);
            }
        }
    );
    setTimeout(abort, ABORT_DELAY);
}


function createServerData(){
    let done = false;
    let promise = null;
    return {
        read() {
            if(done){
                return ;
            }
            if(promise){
                throw promise;
            }
            promise = new Promise(resolve => {
                setTimeout(()=>{
                    done = true;
                    promise = null;
                    resolve();
                }, API_DELAY);
            });
            throw promise;
        }
    }
}