
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { bindActionCreators, Dispatch } from 'redux';
import { allActions } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { MainDiv, ButtonSend } from '../themes/styledConstants';
import useLog from '../hooks/useLog';
import { loadCookie } from '../components/Cookies';

import { createAction } from '@reduxjs/toolkit';
import EditConcept from '../components/EditConcept';
import { sumOfAmounts, dateNormalFormat } from '../functions/Functions';
import { ActionType } from '../constants/constants';
import { colors } from '../themes/Colors';
import BudgetNew from '../components/BudgetNew';

interface ConceptSendInterface {
    concept: string;
    amount: number;
    dateISO: any;
    type: "+" | "-";
}

export default function HomeScreen() {
    const { authILoginLog, listInfo, showConceptInfo, createInfo,deleteInfo } = useLog()
    const dispatch = useDispatch()
    const { CheckListAction, ValidateAction, CreateAction,DeleteAction, ShowConcept,EraseSaveInfo } = bindActionCreators(allActions, dispatch)
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
    }, [createInfo, showConceptInfo,deleteInfo])

    const onDeleteConcepts = (id: string) => {
        EraseSaveInfo(ActionType.DELETE)
        DeleteAction(cookieLoaded,id)
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
        let createToSend = {
            concept: sendCon.concept,
            amount: Number(sendCon.amount),
            date: new Date(sendCon.dateISO),

        }
        if (sendCon.type == "+") {
            let numberNeg = Number(sendCon.amount)
            numberNeg = +numberNeg
            createToSend = {
                concept: sendCon.concept,
                amount: numberNeg,
                date: new Date(sendCon.dateISO),

            }
        } else if (sendCon.type == "-") {
            let numberNeg = Number(sendCon.amount)
            numberNeg = -numberNeg
            createToSend = {
                concept: sendCon.concept,
                amount: numberNeg,
                date: new Date(sendCon.dateISO),

            }
        }


        console.log(createToSend, 'create to send')
        EraseSaveInfo(ActionType.CREATE)
        CreateAction(cookieLoaded, createToSend)
    }

    const ListOrderByDate = (recents?: boolean) => {
        let bunchOfAmounts: any = []
        listInfo.map((concepts: any) => {
            concepts.amounts.map((amounts: any) => {
                bunchOfAmounts.push({ ...amounts,
                    date: dateNormalFormat(amounts.date),
                     name: concepts.concept,
                    createdAt:amounts.createdAt,

                 })
            })
        })
        console.log(bunchOfAmounts, "before sort")
          bunchOfAmounts?.sort(function (a: any, b: any) {
            return new Date(a.createdAt.toString()).valueOf() - new Date(b.createdAt.toString()).valueOf();
        });
        console.log(bunchOfAmounts, "after sort")
        if (recents) {
            return bunchOfAmounts
        } else {
            return bunchOfAmounts?.reverse()
        }
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
    const ListOfAmounts = () => {
        return (
            <div>

                {ListOrderByDate()?.map((amounts: any) => {
                    return (
                        <ListRowDiv>
                            <ConceptH6>
                                {amounts.name}
                            </ConceptH6>
                            <ConceptH6>
                                {dateNormalFormat(amounts.date)}
                            </ConceptH6>
                            {amounts.amount.toString().startsWith("-") ?
                                <AmountH6 theme={'red'}>
                                    {amounts.amount}
                                </AmountH6> :
                                <AmountH6 theme={'green'}>
                                    +{amounts.amount}
                                </AmountH6>
                            }
                        </ListRowDiv>
                    )




                })}

            </div>
        )
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
                        <ButtonSend>
                            enviar
                        </ButtonSend>

                    </CreateForm >
                    <div>
                        <h6>
                            {createInfo}
                        </h6>
                    </div>
                    <ListDiv>

                        {listInfo.length>0 ? <ListOfAmounts></ListOfAmounts>: <BudgetNew/>}

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
                    <h3>{deleteInfo}</h3>
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
 //border:1px solid black;
 padding:10px;
 height:fit-content;
 display:flex;
 justify-content: center;
flex-direction:column;
`
const ListRowDiv = styled.div`
 border:1px solid black;
 padding:10px;
 display:flex;
 justify-content: center;

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

flex-direction:column;
`
const AmountH6 = styled.p`
    color:${props => props.theme};
    padding:0 10px;
    font-size:18px;
    margin:2px;
`

const CreateDiv = styled.div`

padding:10px;
`
const CreateInput = styled.input`
background-color: ${colors.primary.main};
color:white;
margin: 5px;
width: 150px;
padding: 4px;
outline: none;
border-radius: 3px;
border: none;
&:focus {
    border-bottom: 4px solid olive;
}
`
const CreateSend = styled.button`

`
const CreateForm = styled.form`
display:flex;
background-color:${colors.secondary.light};
flex-direction:column;
justify-content:center;
border-radius: 2px;
padding:10px;
`
const EquisP = styled.p`
margin:0;
cursor:pointer;

`
const AsideRig = styled.aside`

`