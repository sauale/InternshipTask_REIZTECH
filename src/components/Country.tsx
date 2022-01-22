import "./Country.css"

interface IProps {
    country:{
      name: string
      region :string
      area : number
    }
  }

const Country:React.FC<IProps>= ({country})=>{
    return(
        <div className="country-container">
            <div className="country-element">
             <h5 className="country-element-key">Name: </h5>
             <h5 className="country-element-value">{country.name}</h5>
            </div>

            <div className="country-element">
             <h5 className="country-element-key">Region: </h5>
             <h5 className="country-element-value">{country.region}</h5>
            </div>

            <div className="country-element">
             <h5 className="country-element-key">Area: </h5>
             <h5 className="country-element-value">{country.area}</h5>
            </div>

        </div>
    )
}

export default Country