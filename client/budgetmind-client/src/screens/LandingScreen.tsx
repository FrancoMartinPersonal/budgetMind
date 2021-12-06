import React from 'react'
import styled from 'styled-components';
import LoginScreen from './LoginScreen';

function LandingScreen() {
    return (
        <MainDiv>
            <MainLeftDiv>
                <h3>
                    texto de ejemplo
                </h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Neque voluptatibus itaque aut quaerat et in numquam, minus
                      mollitia veritatis similique modi? Possimus, natus! Harum 
                      explicabo porro laudantium non, beatae magnam?
                </p>
            </MainLeftDiv>
            <MainRightDiv>
                <LoginScreen/>
            </MainRightDiv>
        </MainDiv>
    )
}

const MainDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin:10px 30px;
`
const MainLeftDiv = styled.div`
width:50%;
padding:10px;
`
const MainRightDiv = styled.div`
width:50%;
padding:10px;
display: flex;
justify-content: center;
align-items: center;
`

export default LandingScreen
