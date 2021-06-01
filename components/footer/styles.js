import styled from "styled-components"
import constansts from "../../assets/constants"

export const FooterContainer = styled.TouchableOpacity`
    background: ${constansts.colors.darkGray};
    justify-content: center;
    align-items: center;
`

export const FooterText = styled.Text`
    font-size: 17px;
    font-weight: 600;
    padding: 10px;
`