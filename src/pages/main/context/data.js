import {createContext, useContext} from 'react';

const DataContext = createContext(null);

export default function DataProvider({children, data}){
    return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

const fakeData = [
    "Wait, it doesn't wait for React to load?",
    'How does this even work?',
    'I like marshmallows',
];

export function useData(){
    const ctx = useContext(DataContext);
    if(ctx !== null){
        ctx.read();
    }
    return fakeData;
}