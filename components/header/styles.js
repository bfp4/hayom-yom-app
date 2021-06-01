import styled from "styled-components"
import constants from "../../assets/constants"

export const HeaderCon = styled.View`
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
    background: ${constants.colors.blues};
    padding-top: 36px;
`

export const Title = styled.Text`
    font-family: 'lemonada-bold';
    font-size: 24px;
    color: black;
`