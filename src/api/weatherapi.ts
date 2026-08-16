import axios from "axios";

const API_KEY = "4a89437b39c04c12b3654807261108";


export async function fetchdatafromapiforecast(location:string){
    const response = await axios.get("http://api.weatherapi.com/v1/forecast.json",{
        params : {key:API_KEY ,q:location , days:4}
    });
    return response.data;
}






