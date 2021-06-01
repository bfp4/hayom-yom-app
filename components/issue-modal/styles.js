import styled, { css } from "styled-components"
import constansts from "../../assets/constants"

export const Modal = styled.Modal``

export const ModalContentCon = styled.View`
    background-color: ${constansts.colors.darkGray};
    height: 100%;
    align-items: center;
`

export const CloseModal = styled.View`
    height: 25px;
    width: 100%;
    align-items: flex-start
`

export const HeaderText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    text-decoration: underline
`

export const InputContainer = styled.View`
    width: 80%;
`

export const InputHeader = styled.Text`
    font-size: 20px;
    font-weight: bold;
`

const basicInputStyles = css`
    border: 2px solid black;
    border-radius: 4px;
    width: 100%;
    padding: 5px;
    font-size: 16px;
    background: ${constansts.colors.lightGray}
`

export const NameInput = styled.TextInput`
    ${basicInputStyles};
    margin-bottom: 20px;
`

export const IssueInputCon = styled.View`
    position: relative;
    height: 200px;
    width: 100%
`

export const IssueInput = styled.TextInput`
    ${basicInputStyles};
    height: 100%;
    width: 100%
`

export const LimitText = styled.Text`
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 3px;
    color: rgba(0, 0, 0, 0.5);
`

export const Submit = styled.TouchableOpacity`
    width: 50%;
    background-color: ${constansts.colors.blues};
    align-self: center;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 5px 0px;
    margin-top: 20px;
    opacity: 1;
`

export const SubmitText = styled.Text`
    font-family: 'lemonada-bold';
    color: black
`
