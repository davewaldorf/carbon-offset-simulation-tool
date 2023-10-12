'use client'

import { useForm, Controller } from 'react-hook-form'
import { getCountryNames } from '@/api/apiService'
import { useEffect, useState } from 'react'
import {  userSlice, useSelector, useDispatch } from '@/lib/redux'


export default function Selector() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [countries, setCountries] = useState([]);
  const { control, handleSubmit } = useForm({
    defaultValues: { country: user.country, mode: user.mode},
  });

  useEffect(() => {
    getCountryNames()
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error(error)
      })
  }, []);

  const onSubmit = (data) => {
    // Dispatch the action to set the user's country and mode
    dispatch(userSlice.actions.setCountryAndMode(data));
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className='mb-10'>
        <Controller
          name="country"
          control={control}
          render={({ field }) => 
          <select className="select select-primary max-w-xs mr-3" {...field}>
          {countries.map((country) => (
            <option  key={country} value={country}>
              {country}
            </option>
          ))}
        </select>}
        />
         <Controller
          name="mode"
          control={control}
          render={({ field }) => 
          <select className="select select-primary max-w-xs mr-3" {...field}>
          <option key="Monthly" value="Monthly">Monthly</option>
          <option key="Yearly" value="Yearly">Yearly</option>
        </select>}
        />
        <button className="btn btn-primary mr-5">START</button>
      </form>
  )
}