import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';
import {IData, IItem} from "../../App";
import Loader from "../Loader/Loader";

interface AutoCompleteProps {
    data?: IData;
    onChange?: (e: string) => void;
    placeholder?: string;
    value?: string;
    searching?: boolean;
}
const Autocomplete = (props: AutoCompleteProps) => {
    const [inputValue, setValue] = useState<string>('')
    const {data=[], onChange=()=>{}, placeholder='Autocomplete', value='', searching=false} = props;

    const highlightSearchText = (text: string) => {
        const pattern = new RegExp("(" + value + ")", "gi");
        const highlightedText = text.replace(pattern, `<b>${value}</b>`);
        return highlightedText;
    };


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onChange?.(inputValue);
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [inputValue])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const val = e?.target?.value;
        setValue(val)
    }

    return (
        <div className={styles.container}>
            <input className={styles.input} onChange={handleChange} type={'search'} placeholder={placeholder} value={inputValue}/>

            {value?.length && searching ? (
                <div className={`${styles.suggestionsContainer} ${styles.noData}`}>
                    <Loader/>
                </div>
            ) : value && data && data.length ? (
                <ul className={styles.suggestionsContainer}>
                    {data?.map((item: IItem) => (
                        <li className={styles.suggestionItem}
                            dangerouslySetInnerHTML={{__html: highlightSearchText(item.title)}} key={item?.title}/>
                    ))}
                </ul>
            ) : value && !data?.length && !searching ? (
                <div className={`${styles.suggestionsContainer} ${styles.noData}`}>
                    <span>No matching suggestions found</span>
                </div>
            ) : null}
        </div>
    )
}

export default Autocomplete;