import React from 'react'
import styled from 'styled-components';
import { colors } from '../themes/Colors';
import BudgetMindNew from '../img/BUDGETMINDNEW.svg'


function BudgetNew() {
    return (
        <BudgetNewDiv>
            <BudgetNewMsg>add your first amount and concept!</BudgetNewMsg>
           <BudgetNewIMG src={BudgetMindNew} alt=""/>
        </BudgetNewDiv>
    )
}
const BudgetNewIMG = styled.img `

`
const BudgetNewDiv = styled.div `
display: flex;
flex-direction: column;
align-self: center;
`

const BudgetNewMsg = styled.h3 `
color:${colors.secondary.light};
font-size: 30px;
font-weight: 800;
`
export default BudgetNew
