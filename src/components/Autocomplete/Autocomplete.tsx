import React from 'react';
import styles from './styles.module.css';
import {IData, IItem} from "../../App";

interface AutoCompleteProps {
    data?: IData;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    value?: string;
    searching?: boolean;
}
const Autocomplete = (props: AutoCompleteProps) => {
    const {data=[], onChange, placeholder='Autocomplete', value='', searching=false} = props;
    const highlightSearchText = (text: string) => {
        const pattern = new RegExp("(" + value + ")", "gi");
        const highlightedText = text.replace(pattern, `<b>${value}</b>`);
        return highlightedText;
    };

    return (
        <div className={styles.container}>
            <input className={styles.input} onChange={onChange} type={'search'} placeholder={placeholder} value={value}/>

            {value && data && data.length ? (
                <ul className={styles.suggestionsContainer}>
                    {data?.map((item: IItem) => (
                        <li className={styles.suggestionItem}
                            dangerouslySetInnerHTML={{__html: highlightSearchText(item.title)}}/>
                    ))}
                </ul>
            ) : value && !data?.length && !searching ? (
                <div className={styles.suggestionsContainer}>
                    <span>No matching suggestions found</span>
                </div>
            ) : null}
        </div>
    )
}

export default Autocomplete;