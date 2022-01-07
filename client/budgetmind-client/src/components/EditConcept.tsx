import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import useLog from '../hooks/useLog';
import { sign } from 'crypto';
import { dateNormalFormat, sumOfAmounts } from '../functions/Functions';


function EditConcept(props: any) {
    const { showConceptInfo } = useLog()
    const dispatch = useDispatch()
    console.log(showConceptInfo.concept)
    const onCloseEdit = () => {
        console.log(props)
        props.setEdit(false)
    }
  const onDeleteAmount = () => {
      
  }

    return (
        <EditDiv>
            <NameAndX>
                <h3>
                    {showConceptInfo.concept}
                </h3>
                <Equis onClick={() => onCloseEdit()}>
                    X
                </Equis>

            </NameAndX>
            <div>
                {
                    showConceptInfo?.amounts?.map((amount: any) => {
                        return (


                            <AmountsDiv>
                                <h6>
                                    {amount.amount}
                                </h6>
                                <h6>
                                    {dateNormalFormat(amount.date)}
                                </h6>
                                <Equis>
                                x
                                </Equis>
                            </AmountsDiv>


                        )
                    })
                }
                <AmountsDiv>
                    <h6>
                        total
                    </h6>
                    <h6>
                        {sumOfAmounts(showConceptInfo?.amounts)}
                    </h6>
                </AmountsDiv>
                <GeneralDate>
                    {dateNormalFormat(showConceptInfo.date)}
                </GeneralDate>
            </div>
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
const AmountsDiv = styled.div`
padding:1px;
display:flex;
flex-direction: row;
justify-content: space-around;
`
const Equis = styled.p`
cursor:pointer;
`
const GeneralDate = styled.h3`
text-align: center;
color: #422;
`
export default EditConcept
