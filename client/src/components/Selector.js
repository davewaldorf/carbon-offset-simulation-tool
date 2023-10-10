'use client'

import { useForm, Controller } from 'react-hook-form'
import { getCountryNames } from '@/api/apiService'
import { useEffect, useState } from 'react'

const modes = [
  "Yearly",
  "Monthly",
];

export default function Selector() {
  const { control, handleSubmit } = useForm(
    {
      defaultValues: {
        Countries: "",
        "Simulation Mode": "",
      }
    }
  )
  const [countries, setCountries] = useState([])

  useEffect(() => {
    getCountryNames()
      .then((data) => {
        setCountries(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error)
      })
  }, []);

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Controller
          name="Countries"
          control={control}
          render={({ field }) => 
          <select className="select select-primary w-full max-w-xs" {...field}>
          <option disabled value="">Country</option>
          {countries.map((country) => (
            <option  key={country} value={country}>
              {country}
            </option>
          ))}
        </select>}
        />
        </div>
        <div className="mb-4"> 
         <Controller
          name="Simulation Mode"
          control={control}
          render={({ field }) => 
          <select className="select select-primary w-full max-w-xs" {...field}>
          <option disabled value="">Simulation Mode</option>
          {modes.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>}
        />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}