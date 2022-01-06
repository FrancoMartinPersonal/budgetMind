import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import useLog from '../hooks/useLog';


function EditConcept(props:any) {
    const { showConceptInfo } = useLog()
    const dispatch = useDispatch()
    console.log(showConceptInfo.concept)
    const onCloseEdit = () => {
        console.log(props)
        props.setEdit(false)
    }

    return (
        <EditDiv>
            <NameAndX>
                <h3>
                    {showConceptInfo.concept}
                </h3>
                <Equis onClick={()=> onCloseEdit()}>
                X
                </Equis>

            </NameAndX>
            <h3>
                {showConceptInfo.date}
            </h3>
        </EditDiv>
    )
}

const EditDiv = styled.div`
//border:1px solid black;

`
const NameAndX = styled.div`
padding:1px;
display:flex;
flex-direction: row;
justify-content: space-around;
`
const Equis = styled.p `
cursor:pointer;
`

export default EditConcept
