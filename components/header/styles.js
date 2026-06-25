import styled from "styled-components"
import constants from "../../assets/constants"

export const HeaderCon = styled.View`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    background: ${constants.colors.blues};
    padding-top: 48px;
`

export const Title = styled.Text`
    font-family: ${({ $fontLoaded }) => ($fontLoaded ? "lemonada-bold" : undefined)};
    font-size: 24px;
    color: black;
`