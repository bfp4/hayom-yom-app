import React from "react"
import { FooterContainer, FooterText } from "./styles"
import { connect } from "react-redux"
import { changeVisibility } from "../../redux/actions";

function Footer(props){
    const { dispatch } = props
    const handleVisibility = () => dispatch(changeVisibility(true))
    return (
        <FooterContainer delayPressIn={0} onPress={handleVisibility}>
            <FooterText>
                Notify Issue
            </FooterText>
        </FooterContainer>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    }
}

export default connect(mapDispatchToProps)(Footer)
