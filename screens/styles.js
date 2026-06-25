import styled from "styled-components"
import constants from "../assets/constants"

export const ScreenContainer = styled.View`
    flex: 1;
    background: white;
`

export const ScreenContent = styled.ScrollView`
    flex: 1;
    padding: 16px;
`

export const EmptyText = styled.Text`
    font-family: 'lemonada';
    font-size: 16px;
    color: ${constants.colors.darkGray};
    text-align: center;
    margin-top: 40px;
`

export const FavoriteItem = styled.Pressable`
    border: 2px solid ${constants.colors.blues};
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 12px;
`

export const FavoriteDate = styled.Text`
    font-family: 'lemonada-bold';
    font-size: 16px;
    color: black;
    margin-bottom: 6px;
`

export const FavoritePreview = styled.Text`
    font-family: 'lemonada';
    font-size: 14px;
    color: ${constants.colors.darkGray};
`

export const SettingsSection = styled.View`
    margin-bottom: 24px;
`

export const SettingsLabel = styled.Text`
    font-family: 'lemonada-bold';
    font-size: 16px;
    color: black;
    margin-bottom: 8px;
`

export const SettingsDescription = styled.Text`
    font-family: 'lemonada';
    font-size: 14px;
    color: ${constants.colors.darkGray};
    margin-bottom: 16px;
`

export const TimeButton = styled.Pressable`
    border: 2px solid ${constants.colors.blues};
    border-radius: 10px;
    padding: 14px;
    align-items: center;
`

export const TimeButtonText = styled.Text`
    font-family: 'lemonada-bold';
    font-size: 18px;
    color: ${constants.colors.blues};
`

export const LayoutOption = styled.Pressable`
    border: 2px solid ${({ $selected }) => ($selected ? constants.colors.blues : constants.colors.lightGray)};
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 10px;
    background: ${({ $selected }) => ($selected ? "rgba(0, 122, 255, 0.08)" : "white")};
`

export const LayoutOptionText = styled.Text`
    font-family: 'lemonada-bold';
    font-size: 16px;
    color: ${({ $selected }) => ($selected ? constants.colors.blues : constants.colors.darkGray)};
`

export const CalendarContainer = styled.View`
    flex: 1;
    padding: 8px;
`
