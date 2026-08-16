import { create } from "zustand";
import { fetchdatafromapiforecast} from "./api/weatherapi";


type weatherdetails ={
    location : string ,
    currenttemp : number ,
    forecasting : {date:string , temp:number , condition:string , icon : string}[],
    condition : string ,
    isloading : boolean ,
    error:string|null,
    icons : string ,

    fetchweather : (location:string)=>Promise<void>
}

export const useWeatherdetails = create<weatherdetails>((set)=>({
 
    location : "search",
    currenttemp : 0 ,
    forecasting : [],
    condition : "cloudy",
    isloading:false,
    error: null,
    icons: "",

    fetchweather : async(location)=>{
        set({isloading:true , error:null});
        try{
            const data = await fetchdatafromapiforecast(location) ;
            
            set({
                location : location ,
                currenttemp : data.current.temp_c,
                condition : data.current.condition.text,
                icons : data.current.condition.icon,
                forecasting : data.forecast.forecastday.map((x :any )=>({date:x.date , temp:x.day.avgtemp_c , condition:x.day.condition.text , icon:x.day.condition.icon }))

            })

        }
        catch(error : any){
            if(error.response){
                set({error: error.response.data.error.message})
            }else{
                set({error : "something went wrong"})
            }
            
        }
        finally{
            set({isloading : false})
        }
        
    }
    




}))






//learning
// Achha sawal hai, ye samajhna zaroori hai — chal step by step poora flow todta hoon:

// **Normal flow (jab sab sahi chale):**
// ```
// fetchweather(location) call hua
//     → set({isloading: true})
//     → await fetchdatafromapi(location)   [ye axios.get() call karta hai]
//     → axios internally HTTP request bhejta hai server ko
//     → server response deta hai (200 OK + data)
//     → axios.get() ka Promise RESOLVE hota hai data ke saath
//     → "const data = await ..." line me data mil jaata hai
//     → set({currenttemp: data.current.temp_c, ...})
// ```

// **Ab jab error aata hai — yahan asli confusion hai. Socho error kitni jagah se aa sakta hai:**

// 1. **Server ne khud error bheja** (jaise galat city naam "asdkjh" — server 400/404 status ke saath reply karta hai)
// 2. **Request server tak pahunchi hi nahi** (internet down, wrong URL, CORS block)
// 3. **Code me hi kuch galat ho gaya** (jaise `data.current.temp_c` likha but `data` undefined nikla — typo wagera)

// **Ye teeno cases me kya hota hai:**

// Jab bhi `await` wali line ke andar **kisi bhi wajah se Promise reject hota hai ya exception throw hoti hai**, JS turant us line ke aage ka code chhod deta hai aur seedha **`catch` block me kood jaata hai**. `catch(error)` ka `error` — wahi cheez hai jo **throw/reject hui thi**, chahe wo axios ne di ho ya JS engine ne khud generate ki ho.

// **Ab `error.response` kyu hota hai specifically axios errors me:**

// Axios ka apna rule hai — agar server **koi bhi response deta hai jo 2xx range me nahi hai** (jaise 404, 400, 500), to axios us poori response ko **error object ke andar `.response` property me daal ke throw kar deta hai**. Matlab:

// ```
// error.response.status   → jaise 400, 404
// error.response.data     → server ne jo actual body bheji (weatherapi ka {error: {message: ...}})
// error.response.headers  → response headers
// ```

// **But agar request server tak pahunchi hi nahi** (case 2 — internet down), to axios ke paas koi response hai hi nahi dikhane ko — is case me `error.response` **undefined** rahega, sirf `error.request` milega (jo bataata hai request bheji thi but reply nahi aaya).

// **Isliye tera check zaroori hai:**
// ```ts
// if(error.response){ 
//     // matlab: server ne jawaab diya, but error wala jawaab
// } else {
//     // matlab: server tak pahunche hi nahi, ya kuch aur hi gadbad
// }
// ```

// Ek analogy soch — tune kisi ko letter bheja:
// - **`error.response` case** = tumhe reply mila but usme likha "ye address exist nahi karta"
// - **`error.request` case (else wala)** = letter post kiya but koi reply hi nahi aaya, pata nahi pahuncha bhi ya nahi

// Samajh aaya? Ek baar bata apne words me ye flow explain kar ke, taaki pata chale clear hua ki nahi 🙂