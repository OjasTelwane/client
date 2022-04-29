import React from 'react';
import OptionSingle from './optionSingle';
import OptionMulti from './optionMulti';
import OptionReorder from './optionReorder';
// import RadioGroup from '@material-ui/core/RadioGroup';

const Option = ({ questionID, option, questionType, index, tickOptions, handleChange, value }) => {
  console.log(value);
  return (
    <div>     
    {questionType === 0 && (
      // <RadioGroup
      //   aria-label={questionID}
      //   name={questionID}
      //   value={value.selected_option_id}
      //   onChange={handleChange}
      //   id={questionID}
      // >
      <OptionSingle option={option} index={questionID} tickOptions={tickOptions} /> 
     )}

     {questionType === 1 && ( 
      <OptionMulti option={option} index={index} tickOptions={tickOptions} /> 
    )}

    {questionType === 2 && (
      <OptionReorder option={option} index={index} tickOptions={tickOptions} /> 
    )}
    </div>
  )
}

export default Option
