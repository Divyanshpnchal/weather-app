import { useWeatherdetails } from "../weatherdetails";
import { Forecasting } from "./Forecast";

function CurrentWeather(){
    const { location, currenttemp, forecasting, condition ,icons  } = useWeatherdetails();   
   
    return (
    <div className="flex flex-col justify-between items-center bg-gray-400 h-[500px] w-[500px] py-4 rounded-4xl ">
        <div className=" w-full text-center py-2">
            {location}
        </div>
        <div className="flex justify-center items-center text-center w-full">
            <img src={icons} alt="" className="w-[150px] h-[150px]" />

        </div>

        <div className="flex flex-col items-center w-full py-1 ">
            <div className="text-6xl">{currenttemp}</div>
            <div>{condition}</div>
        </div>

        <div className=" w-full flex justify-center items-center h-25 m-3">
            <Forecasting></Forecasting>
        </div>
    </div>  
    )



}


export default CurrentWeather ;