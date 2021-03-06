import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import useLog from '../hooks/useLog';
import { sign } from 'crypto';
import { dateNormalFormat, sumOfAmounts } from '../functions/Functions';
import { loadCookie } from './Cookies';
import { bindActionCreators } from 'redux';
import { allActions } from '../actions';
import { ButtonSend, SendInput, EquisP, SendSelect, ErrorMessage } from '../themes/styledConstants';
import { ShowConcept } from '../actions/actions';
import { colors } from '../themes/Colors';

interface AmountSendInterface {
    amount: number;
    dateISO: any;
    type: "+" | "-";
}

function EditConcept(props: any) {
    const { showConceptInfo } = useLog()
    const dispatch = useDispatch()
    const { DeleteAmountAction, AddAmountAction } = bindActionCreators(allActions, dispatch)
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

    const onChangeSendAmount = (e: any) => {
        setSendAmount({
            ...sendAmount,
            [e.target.name]: e.target.value
        })
        console.log(sendAmount)
    }

    const onAddAmount = (e: any) => {
        e.preventDefault()
        //make a err control
        let AddAmountToSend = {
            amount: sendAmount.amount,
            id: showConceptInfo._id,
            date: new Date(sendAmount.dateISO)
        }
        if (sendAmount.type == "+") {
            let numberNeg = Number(sendAmount.amount)
            numberNeg = +numberNeg
            AddAmountToSend = {
                amount: numberNeg,
                id: showConceptInfo._id,
                date: new Date(sendAmount.dateISO)
            }
            console.log(numberNeg, 'number before')
        } else if (sendAmount.type == "-") {
            //let numberNeg = Number(-sendAmount.amount)
            let numberNeg = Number(sendAmount.amount)
            numberNeg = -numberNeg
            AddAmountToSend = {
                amount: numberNeg,
                id: showConceptInfo._id,
                date: new Date(sendAmount.dateISO)
            }
            console.log(numberNeg, 'number before')
        }

        console.log(AddAmountToSend)
        AddAmountAction(cookieTokenLoaded, AddAmountToSend)
    }


    return (
        <EditDiv>
            <NameAndX>
                <div>

                </div>
                <h3>
                    {showConceptInfo.concept}
                </h3>
                <EquisP onClick={() => onCloseEdit()}>
                    X
                </EquisP>

            </NameAndX>
            <AddAmountForm onSubmit={(e) => onAddAmount(e)}>
                <AddAmountDiv>

                    <SendInput type="number" name="amount" value={sendAmount.amount} onChange={(e: any) => onChangeSendAmount(e)}>
                    </SendInput>
                    <SendInput type="date" name="dateISO" value={sendAmount.dateISO} onChange={(e: any) => onChangeSendAmount(e)}>
                    </SendInput>
                    <SendSelect name="type" value={sendAmount.type} onChange={(e: any) => onChangeSendAmount(e)}>
                        <option value="+">+</option>
                        <option value="-">-</option>
                    </SendSelect>
                </AddAmountDiv>
                <ButtonSend>send</ButtonSend>
            </AddAmountForm>
            
            <AmountsContainer>
                {
                    showConceptInfo?.amounts?.map((amount: any) => {
                        return (

                            <AmountsDiv key={amount._id}>
                                <AmountH6>
                                    {amount.amount}
                                </AmountH6>
                                <AmountH6>
                                    {dateNormalFormat(amount.date)}
                                </AmountH6>
                                <EquisP onClick={() => onDeleteAmount(amount._id)}>
                                    x
                                </EquisP>
                            </AmountsDiv>


                        )
                    })
                }
                <AmountsDiv>
                    <AmountH6>
                        total
                    </AmountH6>
                    <AmountH6>
                        {sumOfAmounts(showConceptInfo?.amounts)}
                    </AmountH6>
                </AmountsDiv>
                <GeneralDate>
                    {dateNormalFormat(showConceptInfo.date)}
                </GeneralDate>
            </AmountsContainer>
            {showConceptInfo.msg?
          
                <ErrorMessage style={{maxWidth:'fit-content',alignSelf:'center'}}>{showConceptInfo.msg}</ErrorMessage>
           
            :null}
        </EditDiv>
    )
}

const EditDiv = styled.div`
//border:1px solid black;
background: ${colors.secondary.light};
padding: 4px;
`
const NameAndX = styled.div`
padding:1px;
display:flex;
align-items: center;
flex-direction: row;
justify-content: space-between;
`
const AmountsDiv = styled.div`
padding:1px;
margin: 5px;
height:fit-content;
display:flex;
flex-direction: row;
background-color: #c7c7c7;
justify-content: space-between;
align-items: center;

`
const AmountH6  = styled.h6 `
margin: 0 10px;
padding: 3px 9px;
font-size: 15px;
`


const AmountsContainer = styled.div`
height:300px;
 overflow:auto;
`
const AddAmountForm = styled.form`
padding:1px;
height:fit-content;
display:flex;
flex-direction: column;

`
const AddAmountDiv = styled.div`
display:flex;
@media (max-width: 768px) {
    flex-direction: column;
  }

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
margin:0 5px;
width: min-content;
align-self: center;
`
const SendButton = styled.button`

`

export default EditConcept
