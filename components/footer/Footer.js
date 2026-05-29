import React from "react"
import { FooterContainer, FooterText } from "./styles"
import { useDispatch } from "react-redux"
import { changeVisibility } from "../../redux/actions";

function Footer(){
    const dispatch = useDispatch()
    const handleVisibility = () => dispatch(changeVisibility(true))
    return (
        <FooterContainer delayPressIn={0} onPress={handleVisibility}>
            <FooterText>
                Notify Issue
            </FooterText>
        </FooterContainer>
    );
}

export default Footer
