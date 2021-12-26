
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { bindActionCreators, Dispatch } from 'redux';
import { allActions } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { MainDiv } from '../themes/styledConstants';
import useLog from '../hooks/useLog';

export default function HomeScreen() {
    const { authILoginLog } = useLog()
    useEffect(() => {
        //in this instance, we already have a token. we need to bring it to us with an endpoint

    }, [])
    console.log(authILoginLog)
    return (
        <MainDiv>
            <GeneralDiv>
                <ListDiv>
                    <ListRowDiv>
                        <ConceptH6>
                            concept
                        </ConceptH6>
                        <AmountH6  theme={"green"}>
                            +500
                        </AmountH6>
                    </ListRowDiv>
                    <ListRowDiv>

                        <ConceptH6>
                            concept
                        </ConceptH6>
                        <AmountH6 theme={'red'}>
                            -500
                        </AmountH6>
                    </ListRowDiv>

                </ListDiv>

                <WelcomeDiv>

                    <WelcomeH5>
                        welcome {authILoginLog?.user}
                    </WelcomeH5>
                </WelcomeDiv>
                <CreateDiv>
                <CreateInput type="text"/>
                <CreateInput type="number"/>
                </CreateDiv>
            </GeneralDiv>
        </MainDiv>
    )
}
const GeneralDiv = styled.div`
 display:flex;
 justify-content:space-between;
 width:100%;
 //flex-direction:row;
`

const ListDiv = styled.div`
 border:1px solid black;
 padding:10px;
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
const AmountH6 = styled.p`
    color:${props => props.theme};
    padding:0 10px;
    font-size:18px;
    margin:2px;
`
const WelcomeDiv = styled.div`
 padding:10px;
 border:1px solid black;
`

const WelcomeH5 = styled.h5`
    color:green;
    font-size:25px;
`
const CreateDiv = styled.div `
border:1px solid black;
padding:10px;
`
const CreateInput = styled.input `

`