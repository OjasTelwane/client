import React from 'react'

const OptionReorder = ({ option, index, tickOptions }) => {
  return (
    <>
    <label >Option Reorder {index+1}</label>
    <br />
    <input type='text' value={option.text} />
    <br />

    </>
  )
}

export default OptionReorder
