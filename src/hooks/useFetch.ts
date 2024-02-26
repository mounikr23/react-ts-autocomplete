import {useState, useEffect} from "react";
import {wait} from "../utils/common";

export default function useFetch(url:string, options?:any, mock?:boolean) {
    const [data, setData] = useState<any>([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if(mock){
                await wait(1000);
            }
            setData(data);
            setLoading(false);
        } catch (error:any) {
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return { data, error, loading };
}