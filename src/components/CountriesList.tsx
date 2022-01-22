
import React from "react";
import Country from "./Country";


interface IProps {
    countries:{
      name: string
      region :string
      area : number
    }[]
    ascendingly :boolean
    onlyOceania :boolean
    smallerThanLT: boolean
    currentPage:number
    passToParent: (length:number)=>void
  }
const CountriesList:React.FC<IProps>= ({countries,ascendingly,onlyOceania,smallerThanLT,currentPage,passToParent}) =>{

    let Countries = countries
    if(ascendingly){
        Countries.sort((a,b)=> a.name.localeCompare(b.name))
    }else{
        Countries.sort((a,b)=> b.name.localeCompare(a.name));
    }
    if(onlyOceania){
      Countries = Countries.filter((country)=> country.region === "Oceania" )
    }

    if(smallerThanLT){
     let LT = countries.find(country => country.name ==="Lithuania");
     let areaLT :number;
     if(LT){
          areaLT = LT.area;
     }
     
     Countries = Countries.filter((country)=> country.area < areaLT )
        
    }
    
    passToParent(Countries.length);
    Countries = Countries.slice(currentPage*10,(currentPage*10)+10)
     
    
    
    return(
            <div>
                {Countries.map(country=>(
                    <Country country={country}></Country>
                ))}
            </div>
    )
}

export default CountriesList;