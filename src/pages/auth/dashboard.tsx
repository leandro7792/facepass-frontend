import useSWR from 'swr'
import api from '../../services/api'


const Dashboard: React.FC = () => {

  const { data, error } = useSWR('entities/777', api.delete)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      <h1>OLA MUNDO</h1>
    </div>
  )
}

export default Dashboard
