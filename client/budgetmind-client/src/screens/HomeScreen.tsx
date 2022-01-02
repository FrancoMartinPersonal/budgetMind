
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

interface ConceptSendInterface {
    concept:string;
    amount:number;
    dateISO:any;
    type:"+"|"-";
}

export default function HomeScreen() {
    const { authILoginLog,listInfo,createErr,createInfo } = useLog()
    const dispatch = useDispatch()
    const { CheckListAction,ValidateAction,CreateAction } = bindActionCreators(allActions, dispatch)
    let cookieLoaded = loadCookie('token')
    const [sendCon,setSendCon] = useState<ConceptSendInterface>({
        concept : "",
        amount:0,
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
    }, [createErr])

    const onSubmitSendConcepts = (e:any) => {
        e.preventDefault()
        //make a err control
        let createToSend = {
            concept:sendCon.concept,
            amount:sendCon.amount,
            date: new Date (sendCon.dateISO),
            type: sendCon.type
        }
        console.log(createToSend,'create to send')
        CreateAction(cookieLoaded, createToSend)
    }
    const onChangeSendConcepts = (e:any) => {
        console.log(e.target.name)
        console.log(e.target.value)
        let name = e.target.name
        
        setSendCon({
            ...sendCon,
            [name] : e.target.value
        })
    }

    console.log( new Date (sendCon.dateISO))
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
                            <CreateInput type="text"  name="concept" 
                            onChange={(e:any) => onChangeSendConcepts(e)} value={sendCon.concept}/>
                            <CreateInput type="number"  name="amount" 
                            onChange={(e:any) => onChangeSendConcepts(e)} value={sendCon.amount}/>
                            <CreateInput type="date" name="dateISO" 
                            onChange={(e:any) => onChangeSendConcepts(e)} value={sendCon.dateISO} />
                            <select name="type" 
                            onChange={(e:any) => onChangeSendConcepts(e)} value={sendCon.type} >
                                <option value="+">+</option>
                                <option value="-">-</option>
                            </select>

                        </CreateDiv>
                        <CreateSend>
                            enviar
                        </CreateSend>

                    </CreateForm >
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
                <ListDiv>
                    {listInfo?.map((e:any) => {
                    return(<ListRowDiv>
                       
                        <ConceptH6>
                            {e.concept}
                        </ConceptH6>
                        <AmountNetoH6 >
                            {e.amount}
                        </AmountNetoH6>
                        </ListRowDiv>)
                       
                    })}
                    {/* <ListRowDiv>

                        <ConceptH6>
                            concept2
                        </ConceptH6>
                        <AmountNetoH6 theme={'red'}>
                            900
                        </AmountNetoH6>
                    </ListRowDiv> */}

                </ListDiv>
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