import { useForm, Controller } from 'react-hook-form'
import { getCountryNames } from '../api/apiService'
import { useEffect, useState } from 'react'
import { userSlice, useSelector, useDispatch } from '../lib/redux'
import { getCountryCO2 } from '../api/apiService'

export default function Selector() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [countries, setCountries] = useState([]);
  const { control, handleSubmit } = useForm({
    defaultValues: { country: user.country, mode: user.mode },
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
    dispatch(userSlice.actions.setCountryAndMode(data));
    const { country, mode } = data;
    getCountryCO2(country, mode)
      .then((data) => {
        dispatch(userSlice.actions.setCarbonConsumption(data));
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mb-10 mt-10'>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <Controller
          name="country"
          control={control}
          render={({ field }) =>
            <select className="select select-primary max-w-xs mr-3 mb-3 md:mb-0" {...field}>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>}
        />
        <Controller
          name="mode"
          control={control}
          render={({ field }) =>
            <select className="select select-primary max-w-xs mr-3 mb-3 md:mb-0" {...field}>
              <option key="Monthly" value="Monthly">Monthly</option>
              <option key="Yearly" value="Yearly">Yearly</option>
            </select>}
        />
        <button className="btn btn-primary">START</button>
      </div>
    </form>
  )
}