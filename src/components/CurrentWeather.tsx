import { useWeatherdetails } from "../weatherdetails";


function CurrentWeather(){
    const { location, currenttemp, forcasting, condition ,setcurrenttemp  } = useWeatherdetails();   
   
    return (
    <div className="flex flex-col justify-between items-center bg-amber-300 h-[400px] w-[400px] py-4 rounded-4xl ">
        <div className="bg-amber-600 w-full text-center py-2">
            {location}
        </div>
        <div className="flex justify-center items-center text-center w-full bg-red-400 ">
            image

        </div>

        <div className="flex flex-col items-center bg-blue-50 w-full py-2 mt-30">
            <div className="text-6xl">{currenttemp}</div>
            <div>{condition}</div>
        </div>

        <div className="bg-violet-500 w-full flex justify-center items-center h-[100px] m-3">
            forecasting
        </div>
    </div>  
    )



}


export default CurrentWeather ;