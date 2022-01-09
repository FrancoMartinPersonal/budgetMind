import React from 'react'
import  styled, {keyframes} from 'styled-components';
import LoginScreen from './LoginScreen';
import { MainDiv } from '../themes/styledConstants';
import { colors } from '../themes/Colors';
import budgetMind from '../img/BUDGETMIND.svg'
function LandingScreen() {
    return (
        <MainDiv>
            <MainLeftDiv>
                <BudgetMindIMG src={budgetMind} alt="budgetmind logo" />
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
const breatheAnimation = keyframes`
 0% { transform: rotateZ(0deg) }

 100% { transform: rotateZ(360deg); }
`

const BudgetMindIMG = styled.img `
 animation-name: ${breatheAnimation};
 animation-duration: 2s;
 animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1);
 animation-iteration-count: infinite;
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
