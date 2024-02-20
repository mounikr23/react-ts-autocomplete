//libraries
import React, {useState} from 'react';

//utils
import {wait} from "./utils/common";
import useFetch from "./hooks/useFetch";
import {PRODUCTS_URL} from "./constants/urls";

//common components
import Autocomplete from "./components/Autocomplete/Autocomplete";

//styles
import './App.css';
import Loader from "./components/Loader/Loader";

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
    const [suggestions, setSuggestions] = useState<any>([]);
    const [searching, setSearching] = useState<boolean>(false);
    const {data, loading} = useFetch(PRODUCTS_URL, {}, true);

    const handleAutocompleteInputChange = async (value:string) => {
        setSearching(true);
        await filterData(value);
    };

    const filterData = async (query: string) => {
        await wait(500);
        const filteredData = data.filter(
            (x: IItem) => x?.title.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
        query === ""
            ? setSuggestions([])
            : setSuggestions([...filteredData]);
        setSearching(false);
    };

    return (
        <div className="App">
            <h2>React Autocomplete</h2>

            <div className="wrapper">
                {loading ? <Loader/> : null}
                {data && data?.length ? <Autocomplete onChange={handleAutocompleteInputChange} data={suggestions} searching={searching}/> : null}
            </div>
        </div>
  );
}

export default App;
