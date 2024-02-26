//libraries
import React, {useEffect, useState} from 'react';

//common components
import Loader from "../Loader/Loader";

//interfaces
import {IData, IItem} from "../../App";

//styles
import styles from './styles.module.css';

interface AutoCompleteProps {
    data?: IData;
    onChange?: (e: string) => void;
    onItemClick?: (item: IItem) => void;
    placeholder?: string;
    searching?: boolean;
}

const Autocomplete = (props: AutoCompleteProps) => {
    const [inputValue, setValue] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
    const [debouncedValue, setDebouncedValue] = useState<string>('');
    const {data=[], onChange=()=>{}, placeholder='Autocomplete', searching=false, onItemClick=()=>{}} = props;

    const highlightSearchText = (text: string) => {
        const pattern = new RegExp("(" + debouncedValue + ")", "gi");
        const highlightedText = text.replace(pattern, `<b>${debouncedValue}</b>`);
        return highlightedText;
    };

    const setDebouncedValues = () => {
        onChange?.(inputValue);
        setDebouncedValue(inputValue);
    };

    const handleItemClick = (item:IItem) => {
        setSelectedItem(item);
        onItemClick?.(item);
    }

    useEffect(() => {
        if(inputValue?.length){
            const timeoutId = setTimeout(() => {
                setDebouncedValues()
            }, 300);
            return () => clearTimeout(timeoutId);
        }else{
            setDebouncedValues();
        }
    }, [inputValue])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const val = e?.target?.value;
        setValue(val);
    };

    const renderDropdown = () => {
        return(
            <>
                <ul className={styles.suggestionsContainer}>
                    {data?.map((item: IItem) => (
                        <li className={styles.suggestionItem}
                            dangerouslySetInnerHTML={{__html: highlightSearchText(item.title)}} key={item?.title} onClick={() => handleItemClick(item)}/>
                    ))}
                </ul>
            </>
        )
    };

    return (
        <div className={styles.container}>
            {selectedItem && Object.keys(selectedItem)?.length ? (<p className={styles.selectedValue}>{selectedItem?.title} <span onClick={() => setSelectedItem(null)}>X</span></p>) : null}
            <div className={styles.innerWrapper}>
                <input className={styles.input} onChange={handleChange} type={'search'} placeholder={placeholder} value={inputValue}/>

                {debouncedValue?.length && searching ? (
                    <div className={`${styles.suggestionsContainer} ${styles.noData}`}>
                        <Loader/>
                    </div>
                ) : debouncedValue && data && data.length ? (
                    renderDropdown()
                ) : debouncedValue && !data?.length && !searching ? (
                    <div className={`${styles.suggestionsContainer} ${styles.noData}`}>
                        <span>No matching suggestions found</span>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Autocomplete;