import React from 'react'

const Rating = ({customClass,value}) => {
  return (
    <div className={[customClass]}>{value}</div>
  )
}

export default Rating