import React from 'react'
import styled from 'styled-components'
import { colors } from '../themes/Colors'
import SessionScreen from './SessionScreen';



function NavScreen() {
    return (
        <MainNav>
            <SessionScreen/>
        </MainNav>
    )
}
const MainNav = styled.div `
width:100%;
height: 50px;
background: ${_ =>`linear-gradient(112deg, ${colors.secondary.main} 52%, ${colors.primary.main}  52%)`};
display:flex;

`
export default NavScreen
