import React from 'react';
import { Card } from 'react-bootstrap';

const QuestionCard = ({
  isActive,
  isVerified,
  verifiedBy,
  createdBy,
  modifiedBy,
  text,
  file,
  fileContentType,
  selection_type,
  selection_selection,
  tags 
}) => {

  return (
    <Card style={{ width: '18rem' }} className='question'>
      <Card.Body>
        <Card.Title className='question-text'>{text}</Card.Title>
        <div className='question-details'>
          <div>Is Active: {isActive}</div>
          <div>Is Verified: {isVerified} </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default QuestionCard;
