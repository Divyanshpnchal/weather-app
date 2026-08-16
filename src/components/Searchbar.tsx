import { useState } from "react"
import { useWeatherdetails } from "../weatherdetails"



export function SearchBar(){
    const [input , setinput] = useState("");
    const {fetchweather} = useWeatherdetails();
    return (
        <div className="flex flex-col gap-5">
            <input onChange={(e)=>setinput(e.target.value)} className="p-3 max-md: shadow-xl/30 bg-transparent border border-indigo-600 rounded-xl text-amber-50" type="text" placeholder=" Enter Location" />
            <button onClick={()=>fetchweather(input)} className="bg-sky-500 hover:bg-sky-700  text-amber-50 p-2 rounded-xl shadow-xl/30 ">Search</button>   
        </div>
    )
}