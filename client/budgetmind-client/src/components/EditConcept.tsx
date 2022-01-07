import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import useLog from '../hooks/useLog';
import { sign } from 'crypto';
import { dateNormalFormat, sumOfAmounts } from '../functions/Functions';
import { loadCookie } from './Cookies';
import { bindActionCreators } from 'redux';
import { allActions } from '../actions';
import { ButtonSend } from '../themes/styledConstants';
import { ShowConcept } from '../actions/actions';

interface AmountSendInterface {
    amount: number;
    dateISO: any;
    type: "+" | "-";
}

function EditConcept(props: any) {
    const { showConceptInfo } = useLog()
    const dispatch = useDispatch()
    const { DeleteAmountAction,AddAmountAction } = bindActionCreators(allActions, dispatch)
    console.log(showConceptInfo.concept)

    const [sendAmount, setSendAmount] = useState<AmountSendInterface>({
        amount: 0,
        dateISO: "",
        type: "+"

    })
    let cookieTokenLoaded = loadCookie('token')
    const onCloseEdit = () => {
        console.log(props)
        props.setEdit(false)
    }
    const onDeleteAmount = (id: string) => {

        DeleteAmountAction(cookieTokenLoaded, id)
    }

    const onChangeSendAmount= (e:any) => {
        setSendAmount({
            ...sendAmount,
        [e.target.name] : e.target.value
        })
        console.log(sendAmount)
    }

    const onAddAmount = (e:any) => {
        e.preventDefault()
         //make a err control
         let AddAmountToSend = {
            amount:sendAmount.amount,
            id:showConceptInfo._id,
            date:new Date(sendAmount.dateISO)
    }
        if (sendAmount.type == "+") {
            let numberNeg = Number(sendAmount.amount)
            numberNeg = +numberNeg
             AddAmountToSend = {
                amount:numberNeg,
                id:showConceptInfo._id,
                date:new Date(sendAmount.dateISO)
            }
            console.log(numberNeg, 'number before')
        } else if (sendAmount.type == "-") {
            //let numberNeg = Number(-sendAmount.amount)
            let numberNeg = Number(sendAmount.amount)
            numberNeg = -numberNeg
             AddAmountToSend = {
                amount:numberNeg,
                id:showConceptInfo._id,
                date:new Date(sendAmount.dateISO)
        }
            console.log(numberNeg, 'number before')
        }
        
        console.log(AddAmountToSend)
        AddAmountAction(cookieTokenLoaded,AddAmountToSend)
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
            <AddAmountForm onSubmit={(e)=> onAddAmount(e)}>
                <InputAmount type="number" name="amount" value={sendAmount.amount} onChange={(e:any)=> onChangeSendAmount(e)}>
                </InputAmount>
                <InputDate type="date" name="dateISO" value={sendAmount.dateISO} onChange={(e:any)=> onChangeSendAmount(e)}>
                </InputDate>
                <SelectType name="type" value={sendAmount.type} onChange={(e:any)=> onChangeSendAmount(e)}>
                    <option value="+">+</option>
                    <option value="-">-</option>
                </SelectType>
                <ButtonSend>send</ButtonSend>
            </AddAmountForm>
            <AmountsContainer>
                {
                    showConceptInfo?.amounts?.map((amount: any) => {
                        return (

                            <AmountsDiv key={amount._id}>
                                <h6>
                                    {amount.amount}
                                </h6>
                                <h6>
                                    {dateNormalFormat(amount.date)}
                                </h6>
                                <Equis onClick={() => onDeleteAmount(amount._id)}>
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
            </AmountsContainer>
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
height:fit-content;
display:flex;
flex-direction: row;
justify-content: space-around;

`
const AmountsContainer = styled.div `
height:300px;
 overflow:auto;
`
const AddAmountForm = styled.form`
padding:1px;
height:fit-content;
display:flex;
flex-direction: row;
justify-content: space-around;
@media (max-width: 768px) {
    flex-direction: column;
  }


`
const Equis = styled.p`
cursor:pointer;
`
const GeneralDate = styled.h3`
text-align: center;
color: #422;
`
const InputAmount = styled.input`

`
const InputDate = styled.input`
`

const SelectType = styled.select`

`
const SendButton = styled.button`

`

export default EditConcept
