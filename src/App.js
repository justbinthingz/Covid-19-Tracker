import './App.css';
import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import InfoBox from './InfoBox'
import MapComp from './MapComp'
import Table from './Table'
import LineGraph from './LineGraph'
import { sortData, prettyPrintStat } from './util'
import "leaflet/dist/leaflet.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVirus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState("cases")

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(res => res.json())
      .then((data) => {
        setCountryInfo(data);
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //country name
            value: country.countryInfo.iso2 //the country iso like 'UK', 'IND'
          }))
          const sortedData = sortData(data);
          setTableData(sortedData)
          setMapCountries(data);
          setCountries(countries)
        })
    }
    getCountriesData();
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then((res) => res.json())
      .then(data => {

        //setting the countrycode in dropdown value
        setCountry(countryCode);

        //all data from country response
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
      })
  }

  return (
    <div className="app">
      <div className="app_left">
        {/* Header */}
        <div className="app_header">
          <h1 className="app_title">
            C
            <FontAwesomeIcon icon={faVirus} style={{ color: "grey" }} />
            VID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country) => {
                  return (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </div>

        {/* InfoBoxes */}
        <div className="app_stats">
          <InfoBox active={casesType === 'cases'} infoType="cases" onClick={e => setCasesType('cases')} title="Coronavirus cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />

          <InfoBox active={casesType === 'recovered'} infoType="recovered" onClick={e => setCasesType('recovered')} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} />

          <InfoBox active={casesType === 'deaths'} infoType="deaths" onClick={e => setCasesType('deaths')} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} />
        </div>

        <MapComp casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          <br></br>
          <h3>Worldwide new {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
