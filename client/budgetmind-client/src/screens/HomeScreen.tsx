
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
            <h3>
                welcome {authILoginLog?.user}
            </h3>
        </MainDiv>
    )
}


