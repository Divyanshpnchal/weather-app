import { useWeatherdetails } from "../weatherdetails";
type forcastsprops = {
    date : string ,
    temp : number ,
    condition:string ,
    icon : string
}
export function Forecasting(){
    const {forecasting}  = useWeatherdetails();
    
    return (
        <div className="flex gap-3 overflow-x-auto w-full px-2 justify-center" >
           {forecasting.map((items)=>
           <Forecast 
            key={items.date} 
            date={items.date} 
            temp={items.temp} 
            condition={items.condition} 
            icon={items.icon} >
            </Forecast>)
           }
        </div>
    )
}

function Forecast({date , temp , condition , icon  }:forcastsprops){
  return (
    <div className="flex flex-col items-center bg-amber-50 rounded-xl p-2 min-w-[90px] text-center shadow-md/20">
      <p className="text-xs text-gray-600">{date}</p>
      <img src={icon} alt={condition} className="w-10 h-10" />
      <p className="text-sm font-semibold">{temp}°C</p>
      <p className="text-[10px] text-gray-500 leading-tight">{condition}</p>
    </div>
  );
}