import React from 'react';
import {IData, IItem} from "../../App";

interface AutoCompleteProps {
    data?: IData;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    value?: string;
}
const Autocomplete = (props: AutoCompleteProps) => {
    const {data=[], onChange, placeholder='Autocomplete', value=''} = props;
console.log('232', data)
    return (
        <div>
            <input onChange={onChange} type={'search'} placeholder={placeholder} value={value}/>
            {data && data.length ? data?.map((item:IItem) => (
                <p>{item.title}</p>
            )) : null }
        </div>
    )
}

export default Autocomplete;