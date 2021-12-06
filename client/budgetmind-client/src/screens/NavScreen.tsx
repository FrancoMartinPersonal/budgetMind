import React from 'react'
import styled from 'styled-components'
import { colors } from '../themes/Colors'



function NavScreen() {
    return (
        <MainNav>
            
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
