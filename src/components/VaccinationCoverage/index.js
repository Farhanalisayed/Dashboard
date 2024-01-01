import {
  ResponsiveContainer,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {lastDaysVaccination} = props

  const dataFormatter = number => {
    if (number > 10000) {
      return `${(number / 10).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="cont">
      <h1 className="heading">Vaccination Coverage</h1>

      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width={1000}
          height={300}
          data={lastDaysVaccination}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: '#6c757d',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={dataFormatter}
            tick={{
              stroke: '#6c757d',
              strokeWidth: 0.5,
              fontSize: 15,
              fontFamily: 'Roboto',
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="20%" />
          <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
