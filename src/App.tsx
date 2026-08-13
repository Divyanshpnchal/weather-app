
import './App.css'
import {SearchBar} from "./components/Searchbar"
import CurrentWeather from './components/CurrentWeather'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const client = new QueryClient(); 

function App() {
  return(
    <QueryClientProvider client={client}>
      <div className=" h-screen w-screen bg-gray-900 flex" >
        <div className= " gap-3  flex flex-1 bg-gray-900 flex-col items-center justify-center" >
          <div className='text-amber-50  text-4xl mb-8  '>
            Weather app
          </div>
          <div className=''>
            <SearchBar></SearchBar>
          </div>
        </div>
        
        <div className=" flex items-center justify-center flex-1 bg-gray-700">
          <CurrentWeather></CurrentWeather>
        </div>

          
      </div>


    </QueryClientProvider>

  )

}

export default App
