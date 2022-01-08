import React from 'react'
import styled from 'styled-components';
import LoginScreen from './LoginScreen';
import { MainDiv } from '../themes/styledConstants';
import { colors } from '../themes/Colors';

function LandingScreen() {
    return (
        <MainDiv>
            <MainLeftDiv>
                <WelcomeMain>
                    Welcome to BudgetMind
                </WelcomeMain>
                <WelcomeText>
                    in this app you can create concepts, add amounts
                    as well edit them with date, lets create a Account!
                </WelcomeText>
            </MainLeftDiv>
            <MainRightDiv>
                <LoginScreen />
            </MainRightDiv>
        </MainDiv>
    )
}



const MainLeftDiv = styled.div`
width:50%;
padding:10px;
height:fit-content;
display: flex;
margin-top: 30px;
flex-direction: column;
justify-content: center;
align-items: center;
@media (max-width: 768px) {
    align-self: center;
    }


`
const WelcomeDiv = styled.div`
display: flex;
justify-content: center;

`
const WelcomeMain = styled.h2`
color: ${colors.primary.main};
`
const WelcomeText = styled.h3`
color: ${colors.secondary.main};
`
const MainRightDiv = styled.div`
width:50%;
padding:10px;
display: flex;
justify-content: center;
align-items: center;
@media (max-width: 768px) {
    align-self: center;
    }
`

export default LandingScreen
