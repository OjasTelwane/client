import React from 'react'
import { Label, OptionRow, OptionSelect } from './components/TestElements';

const OptionMulti = ({ option, index, tickOptions }) => {
  return (
  <>
      <OptionRow>
        <OptionSelect>
        {
          tickOptions && <input type='checkbox' name='checked_option' value={option.selectedOption} />
        }
        </OptionSelect>
        <Label>{option.text}</Label>
      </OptionRow>
  </>
  )
}

export default OptionMulti
