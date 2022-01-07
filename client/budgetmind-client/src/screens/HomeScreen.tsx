
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { bindActionCreators, Dispatch } from 'redux';
import { allActions } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { MainDiv } from '../themes/styledConstants';
import useLog from '../hooks/useLog';
import { loadCookie } from '../components/Cookies';
import { CheckListAction } from '../actions/actions';
import { createAction } from '@reduxjs/toolkit';
import EditConcept from '../components/EditConcept';
import { sumOfAmounts } from '../functions/Functions';

interface ConceptSendInterface {
    concept: string;
    amount: number;
    dateISO: any;
    type: "+" | "-";
}

export default function HomeScreen() {
    const { authILoginLog, listInfo, createErr, createInfo } = useLog()
    const dispatch = useDispatch()
    const { CheckListAction, ValidateAction, CreateAction, ShowConcept } = bindActionCreators(allActions, dispatch)
    let cookieLoaded = loadCookie('token')
    const [edit, setEdit] = useState<boolean>(false)
    const [sendCon, setSendCon] = useState<ConceptSendInterface>({
        concept: "",
        amount: 0,
        dateISO: "",
        type: "+"

    })
    useEffect(() => {
        //in this instance, we already have a token. we need to bring it to us with an endpoint
        ValidateAction(cookieLoaded)
        CheckListAction(cookieLoaded)
    }, [])
    useEffect(() => {
        //in this instance, we already have a token. we need to bring it to us with an endpoint
        CheckListAction(cookieLoaded)
    }, [createInfo])

    const onDeleteConcepts = (e: any) => {
        console.log(e)
    }
    const onAddConcepts = (e: any) => {
        console.log(e)
    }
    const onEditConcepts = (id: string) => {
        if (!edit) {
            setEdit(true)
            ShowConcept(cookieLoaded, id)
        } else if (edit) {
            ShowConcept(cookieLoaded, id)
        }
    }
    const onSubmitSendConcepts = (e: any) => {
        e.preventDefault()
        //make a err control
        if (sendCon.type == "+") {
            setSendCon({
                ...sendCon,
                amount: Number(+sendCon.amount)
            })
        } else if (sendCon.type == "-") {
            let numberNeg = Number(-sendCon.amount)
            numberNeg = -numberNeg
            console.log(numberNeg, 'number before')
            setSendCon({
                ...sendCon,
                amount: numberNeg
            })
        }

        let createToSend = {
            concept: sendCon.concept,
            amount: Number(sendCon.amount),
            date: new Date(sendCon.dateISO),

        }
        console.log(createToSend, 'create to send')
        CreateAction(cookieLoaded, createToSend)
    }
    const onChangeSendConcepts = (e: any) => {
        console.log(e.target.name)
        console.log(e.target.value)
        let name = e.target.name

        setSendCon({
            ...sendCon,
            [name]: e.target.value
        })
    }
  


    return (
        <MainDiv>
            <GeneralDiv>


                <WelcomeDiv>

                    <WelcomeH5>
                        welcome {authILoginLog?.user}
                    </WelcomeH5>
                </WelcomeDiv>
                <MiddleDiv>
                    <CreateForm onSubmit={onSubmitSendConcepts}>
                        <CreateDiv>
                            <CreateInput type="text" name="concept"
                                onChange={(e: any) => onChangeSendConcepts(e)} value={sendCon.concept} />
                            <CreateInput type="number" name="amount"
                                onChange={(e: any) => onChangeSendConcepts(e)} value={sendCon.amount} />
                            <CreateInput type="date" name="dateISO"
                                onChange={(e: any) => onChangeSendConcepts(e)} value={sendCon.dateISO} />
                            <select name="type"
                                onChange={(e: any) => onChangeSendConcepts(e)} value={sendCon.type} >
                                <option value="+">+</option>
                                <option value="-">-</option>
                            </select>

                        </CreateDiv>
                        <CreateSend>
                            enviar
                        </CreateSend>

                    </CreateForm >
                    <div>
                        <h6>
                            {createInfo}
                        </h6>
                    </div>
                    <ListDiv>

                        <ListRowDiv>

                            <ConceptH6>
                                concept
                            </ConceptH6>
                            <AmountH6 theme={"green"}>
                                +500
                            </AmountH6>
                        </ListRowDiv>
                        <ListRowDiv>

                            <ConceptH6>
                                concept2
                            </ConceptH6>
                            <AmountH6 theme={"red"}>
                                -356
                            </AmountH6>
                        </ListRowDiv>

                    </ListDiv>

                </MiddleDiv>
                <AsideRig>

                    {edit && <EditConcept setEdit={setEdit} />}
                    <ListDiv>

                        {listInfo?.map((e: any) => {
                            return (<ListRowDiv key={e._id}>

                                <ConceptH6>
                                    {e.concept}
                                </ConceptH6>
                                <AmountNetoH6 >
                                    {sumOfAmounts(e.amounts)}
                                </AmountNetoH6>
                                <EquisP onClick={() => onDeleteConcepts(e._id)}
                                >x
                                </EquisP>
                                <button onClick={() => onEditConcepts(e._id)}>edit</button>
                            </ListRowDiv>)

                        })}

                    </ListDiv>
                </AsideRig>

            </GeneralDiv>
        </MainDiv>
    )
}
const GeneralDiv = styled.div`
 display:flex;
 justify-content:space-around;
 width:100%;
 @media (max-width: 768px) {
     flex-direction: column;
    }
    //flex-direction:row;
`


const ListDiv = styled.div`
 border:1px solid black;
 padding:10px;
 height:fit-content;
 display:flex;
flex-direction:column;
`
const ListRowDiv = styled.div`
 border:1px solid black;
 padding:10px;
 display:flex;
 flex-direction:row;
 @media (max-width: 768px) {
     flex-direction: column;
    }
`

const ConceptH6 = styled.p`
    color:#333;
    padding:0 10px;
    font-size:18px;
    margin:2px;
    `
const AmountNetoH6 = styled.p`
    color:#66698a;
    font-weight:800;
    padding:0 10px;
    font-size:18px;
    margin:2px;
`
const WelcomeDiv = styled.div`
 padding:10px;
 height:fit-content;
 border:1px solid black;
`

const WelcomeH5 = styled.h5`
    color:green;
    font-size:25px;
    text-align:center;
`
const MiddleDiv = styled.div`
padding:10px;
display:flex;
justify-content:center;
flex-direction:column;
`
const AmountH6 = styled.p`
    color:${props => props.theme};
    padding:0 10px;
    font-size:18px;
    margin:2px;
`

const CreateDiv = styled.div`
border:1px solid black;
padding:10px;
`
const CreateInput = styled.input`

`
const CreateSend = styled.button`

`
const CreateForm = styled.form`
display:flex;
flex-direction:column;
justify-content:center;
border:1px solid black;
`
const EquisP = styled.p`
margin:0;
cursor:pointer;

`
const AsideRig = styled.aside`

`