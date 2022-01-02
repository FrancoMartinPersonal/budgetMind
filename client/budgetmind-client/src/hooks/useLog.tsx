import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import React from 'react';


function useLog () {

    const selectorState = useSelector((e: RootState) => e.Log)
    const authLog = selectorState?.auth!.auth
    const authInfoLog = selectorState?.auth!.info
    const authILoginLog = selectorState?.auth!.login
    const tokenLog = selectorState?.validate!.token
    const tokenMsgLog = selectorState?.validate!.msg
    const listInfo = selectorState.list.concepts
    const createInfo = selectorState.create.msg
    const createErr = selectorState.create.err
    return {
        authLog,
        authInfoLog,
        authILoginLog,
        tokenLog,
        tokenMsgLog,
        listInfo,
        createErr,
        createInfo,
    }
}
export default useLog