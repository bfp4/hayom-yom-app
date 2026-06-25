import styled from "styled-components"
import constants from "../../assets/constants"

export const ModalCard = styled.View`
    width: 100%;
    max-width: 360px;
    background: white;
    border-radius: 10px;
    border: 2px solid ${constants.colors.blues};
    padding: 16px 12px 12px;
`

export const ModalHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    padding-horizontal: 4px;
`

export const ModalTitle = styled.Text`
    font-size: 18px;
    color: black;
`

export const CloseButton = styled.Pressable`
    padding: 4px;
`

export const TodayButton = styled.Pressable`
    border: 2px solid ${constants.colors.blues};
    border-radius: 10px;
    padding: 12px;
    align-items: center;
    margin-top: 12px;
`

export const TodayButtonText = styled.Text`
    font-size: 16px;
    color: ${constants.colors.blues};
`

export const MonthYearRow = styled.View`
    flex-direction: row;
    gap: 8px;
    margin-bottom: 8px;
    padding-horizontal: 4px;
`

export const SelectorButton = styled.Pressable`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 2px solid ${constants.colors.blues};
    border-radius: 10px;
    padding: 10px 12px;
`

export const SelectorButtonText = styled.Text`
    font-size: 14px;
    color: ${constants.colors.blues};
`

export const PickerList = styled.ScrollView`
    max-height: 140px;
    border: 2px solid ${constants.colors.lightGray};
    border-radius: 10px;
    margin-bottom: 8px;
`

export const PickerOption = styled.Pressable`
    padding: 10px 14px;
    background: ${props => props.$selected ? constants.colors.blues : "white"};
`

export const PickerOptionText = styled.Text`
    font-size: 15px;
    color: ${props => props.$selected ? "white" : "black"};
    text-align: center;
`
