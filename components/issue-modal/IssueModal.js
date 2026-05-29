import React, { useState } from "react"
import { TouchableWithoutFeedback  } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux"
import { changeVisibility } from "../../redux/actions";
import { Modal, ModalContentCon, HeaderText, CloseModal, InputContainer, InputHeader, NameInput, IssueInputCon, IssueInput, LimitText, Submit, SubmitText } from "./styles"

function IssueModal(){
    const visibility = useSelector(state => state.modalVisibility)
    const dispatch = useDispatch()
    // eslint-disable-next-line no-unused-vars -- preserved for upcoming email submission
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")

    const handleVisibility = () => {
        setName("")
        setMessage("")
        dispatch(changeVisibility(false))
    }

    function handleSubmit(){
        // TODO: send issue via email — submission transport not yet implemented
        handleVisibility()
    }

    return (
        <Modal 
            visible={visibility}
        >
            <ModalContentCon>
                <CloseModal>
                <TouchableWithoutFeedback 
                    onPress={handleVisibility}
                    delayPressIn={0}
                >
                    <FontAwesomeIcon icon={faTimes} size={25} style={{margin: 5}} />
                </TouchableWithoutFeedback>
                </CloseModal>
                <HeaderText>Notify Issue</HeaderText>
                <InputContainer>
                    <InputHeader>Name</InputHeader>
                    <NameInput 
                        onChangeText={val => setName(val)}
                        placeholder="You Can Remain Anonymous"
                    />
                    <InputHeader>Issue Message</InputHeader>
                    <IssueInputCon>
                        <IssueInput 
                            multiline={true}
                            style={{
                                textAlignVertical: 'top'
                            }}
                            onChangeText={val => setMessage(val)}
                            maxLength={300}
                        />
                        <LimitText>Character Limit: 300</LimitText> 
                    </IssueInputCon>
                    <Submit
                        disabled={message == ""}
                        style={message == "" ? {backgroundColor: 'rgba(2, 105, 161, 0.5)'} : null}
                        onPress={handleSubmit}
                    >
                        <SubmitText
                            style={message == "" ? {color: 'rgba(0, 0, 0, 0.4)'} : null}
                        >
                            Submit
                        </SubmitText>
                    </Submit>
                </InputContainer>
            </ModalContentCon>
        </Modal>
    )
}

export default IssueModal