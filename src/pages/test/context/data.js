import {createContext, useContext} from 'react';

const DataContext = createContext(null);

export default function DataProvider({children, data}){
    return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

const fakeData = [
    "second page",
    'test page',
    'move page',
];

export function useData(){
    const ctx = useContext(DataContext);
    if(ctx !== null){
        ctx.read();
    }
    return fakeData;
}