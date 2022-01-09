import styled, { css } from "styled-components";
import { colors } from '../themes/Colors'
import { Link, useNavigate } from 'react-router-dom';

export const MainDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin:10px 30px;
@media (max-width: 768px) {
     flex-direction: column;
    }
`
export const LoginDiv = styled.div`
width: 350px;
height: max-content;
//border: 1px solid ${colors.secondary.main};
border-radius: 4px;
display: flex;
flex-direction: column;
background: #d3d3d3;
align-self: center;
//justify-content: space-around;
margin: 70px 0;
`
export const LoginMainText = styled.h3`
text-align: center;
color: ${colors.secondary.main};
font-size:30px;
`
export const LoginTagInputDiv = styled.div`
display:flex;
flex-direction: column;
padding:15px 50px;
margin:20px 0 ;
color:green;
`
export const ButtonSend = styled.button`
outline: none;
background: ${_ => `linear-gradient(112deg, ${colors.secondary.main} 52%, ${colors.primary.main}  52%)`};
border: 2px solid  ${colors.secondary.main};
border-radius: 20px;
font-weight: 700;
display:flex;
justify-content: center;
align-items: center;
height:30px;
color:#ffffff;
margin:10px auto;
width: 100px;

  transition: all .2s ease-out;


  
&:hover {
     ${css`
   // transform: rotate(360deg);
   border-radius: 1px;

  `}; 
  
  }

`

export const FormSend = styled.form`

`
export const LoginTag = styled.label`
padding:5px;
text-align: center;

font-weight: 700;
`
export const LoginInput = styled.input`
padding:10px ;
border:none;
font-weight: 700;
color:white;
text-rendering:geometricPrecision;
border-radius: 6px;
margin-bottom: 10px;
background:  ${colors.secondary.main};
&:focus {
outline-color: white;
}
`

export const RegisterDiv = styled.div`
display: flex;
align-self: center;
flex-direction: row;
margin: 10px;
`
export const RegisterText = styled.p`
font-weight: 600;
color:${colors.secondary.main};
margin:2px;
`
export const RegisterLink = styled(Link)`
margin:2px;
text-decoration:none;
font-weight: 700;
color:${colors.primary.main};
transition: all .2s ease-out;

&:hover {
    color:#4792a8;
}
`
export const ErrorMessage = styled.p`
color:#c05421;
text-align: center;
`

export const EquisP = styled.p`
margin: 10px;
color:white;
height: min-content;
width: min-content;
padding: 3px 9px;
border-radius:3px;
background: ${colors.secondary.light};
font-size: 13px;
cursor:pointer;

`

export const SendInput = styled.input`
background-color: ${colors.primary.light};
color:${colors.primary.dark};
align-self: center;
margin: 5px;
width: 140px;
padding: 4px;
outline: none;
border-radius: 3px;
border: none;
&:focus {
    border-bottom: 4px solid ${colors.primary.dark};
}
`