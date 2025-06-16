import doctorsData from '../doctorsData'

export const getAllDoctors = async () => {
  const data = await new Promise(resolve => setTimeout(() => resolve(doctorsData), 500))

  return data
}