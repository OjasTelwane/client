import React from 'react';
import {BoxDiv, TitleField} from './components/dashboardComponentElements'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

import { Link } from 'react-router-dom';

const AddButton = ({name, url}) => {
    return(
        <>
            <BoxDiv>
                <Link
                    to={url}
                >
                    <center>
                        <AddCircleOutlineRoundedIcon color='primary' sx={{ fontSize: 80 }}/>
                        <TitleField>{name}</TitleField>
                    </center>
                </Link>
            </BoxDiv>
        </>
    )
}
export default AddButton;