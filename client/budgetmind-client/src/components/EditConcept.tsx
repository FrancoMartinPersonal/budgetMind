import React from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import useLog from '../hooks/useLog';

function EditConcept() {
    const {  showConceptInfo } = useLog()
    const dispatch = useDispatch()
    console.log(showConceptInfo.concept)
    return (
        <EditDiv>
            <h3>
                {showConceptInfo.concept}
            </h3>
            <h3>
                {showConceptInfo.date}
            </h3>
        </EditDiv>
    )
}

const EditDiv = styled.div `
border:1px solid black;

`

export default EditConcept
