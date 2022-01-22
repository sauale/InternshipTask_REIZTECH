import React, { useEffect, useState } from 'react';
import './App.css';

import CountriesList from './components/CountriesList';

function App() {

  interface ICountry {
    countries:{
      name: string
      region :string
      area : number
    }[]
  }
  const[data,setData]= useState<ICountry["countries"]>([]);

  const[isLoading,setIsLoading] = useState(true);

  const[sortAscendingly,setSortAscendingly] = useState(true);

  const[showOnlyOceania,setShowOnlyOceania] = useState(false);

  const[showSmallerThanLT,setShowSmallerThanLT] = useState(false);

  const[currentPage,setCurrentPage] = useState(0);

  const[countriesCount,setCountriesCount] = useState(0);


  const fetchData = (async () => {
     try{
      const response = await fetch("https://restcountries.com/v2/all?fields=name,region,area");
      
      if(!response.ok){
        throw new Error("Errow while fetching data")
      }

      const data = await response.json();
      setData(data);
      setIsLoading(false);
     }
     catch(e){
       console.log(e);
     }
    }
  );

  useEffect(()=>{
    fetchData();
  },[])

  
  return (
    <div className="App">
     <h1 className='title-header'>Countries List</h1>


     <div className='filter-container'>
      {sortAscendingly ? <button className='myButton' onClick={()=>{ setSortAscendingly((prevState) =>!prevState);setCurrentPage(0)}}> Sort Descendingly </button> :
      <button className='myButton' onClick={()=>{ setSortAscendingly((prevState) =>!prevState);setCurrentPage(0)}}>Sort Ascendingly</button>}
      
      <button className='filterButton' style={showOnlyOceania?{backgroundColor:" #18f353"}:{backgroundColor:"#44c767"}}
       onClick={()=>{setShowOnlyOceania((prevState) =>!prevState);setCurrentPage(0)}}>Oceania filter toggle</button>

      <button className='filterButton' style={showSmallerThanLT?{backgroundColor:" #18f353"}:{backgroundColor:"#44c767"}}
       onClick={()=>{setShowSmallerThanLT((prevState) =>!prevState);setCurrentPage(0)}} >Smaller than LT toggle</button>
     </div>


     <div className='page-container'>

        {currentPage!==0 ? <button className='pageButton' onClick={()=>{setCurrentPage((prevState)=>prevState-1)}} >Previous page</button>:null }
        {countriesCount>currentPage*10 ?<button className='pageButton' onClick={()=>{setCurrentPage((prevState)=>prevState+1)}}>Next page</button>:null }
        <h5 className='current-page-header'>{currentPage*10}-{(currentPage*10)+10}</h5>
     </div>

     { isLoading ? <h2>Loading data...</h2>: <CountriesList countries = {data} ascendingly={sortAscendingly}
      onlyOceania={showOnlyOceania} smallerThanLT={showSmallerThanLT} currentPage={currentPage} passToParent={setCountriesCount}></CountriesList>}

    
    </div>

    
  );
}

export default App;
