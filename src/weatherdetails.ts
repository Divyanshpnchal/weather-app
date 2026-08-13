import { create } from "zustand";


type weatherdetails ={
    location : String ,
    currenttemp : number ,
    forcasting : {day:string , temp:number , condition:string}[],
    condition : string ,
    setcondition : (curr:string)=>void,
    setlocation : (location : string)=> void ,
    setcurrenttemp : (temp:number)=> void ,
    setforcasting : (data : {day:string , temp:number , condition:string}[])=> void 
}

export const useWeatherdetails = create<weatherdetails>((set)=>({

    location : "dehradun",
    currenttemp : 35 ,
    forcasting : [],
    condition : "cloudy",
    setcondition:(curr)=>set({condition : curr}),
    setlocation : (loc)=> set({location : loc}),
    setcurrenttemp : (temp)=>set({currenttemp : temp}),
    setforcasting : (data)=>set({forcasting : data}),
}))


const fetchweather  = async ()=>{
    
}
