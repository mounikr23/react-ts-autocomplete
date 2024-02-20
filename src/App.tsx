import React, {useEffect, useState} from 'react';
import {wait} from "./utils/common";
import Autocomplete from "./components/Autocomplete/Autocomplete";
import './App.css';

export interface IData extends Array<IItem>{}

export interface IItem {
    "id": number;
    "title": string;
    "price": number;
    "description": string;
    "category": string;
    "image": string;
    "rating": {
        "rate": number;
        "count": number;
    };
}
function App() {
    const [autocompleteInputValue, setAutocompleteInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<any>([]);
    const [data, setData] = useState<IData>([]);
    const [searching, setSearching] = useState<boolean>(false);



    useEffect(  () => {
        (async () => {
            const response =  await fetchData();
            setData(response);
        })()
    }, [])

    const fetchData = async () => {
        const json = await fetch('https://fakestoreapi.com/products');
        const data = await json.json();
        return data;
    }

    const handleAutocompleteInputChange = async (value:string) => {
        setAutocompleteInputValue(value);
        setSearching(true);
        await filterData(value);
    }

    const filterData = async (query: string) => {
        await wait(800);
        const filteredData = data.filter(
            (x: IItem) => x?.title.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
        query === ""
            ? setSuggestions([])
            : setSuggestions([...filteredData]);
        setSearching(false);
    }

    return (
        <div className="App">
            <div className="wrapper">
                <Autocomplete onChange={handleAutocompleteInputChange} value={autocompleteInputValue} data={suggestions} searching={searching}/>
            </div>
        </div>
  );
}

export default App;
