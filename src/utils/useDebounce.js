import { useState,useEffect } from "react";
export default function useDebounce(value,delay){
    const[debouncedValue,setDebouncedValue]=useState(value);
    useEffect(()=>{
        const timeOutId= setTimeout(() =>{
            setDebouncedValue(value)    

        },delay)
        return () => clearTimeout(timeOutId);
    },[value,delay]);
    return debouncedValue;
}