import React from 'react'
import { OptionRow } from './components/TestElements';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const OptionSingle = ({ option, index, tickOptions }) => {
  return (
    <>
    <OptionRow>
      <FormControlLabel value={option.text} control={<Radio />} label={option.text}/>
    </OptionRow>
    </>
  )
}

export default OptionSingle
