import styled from "styled-components";
import constants from "../../assets/constants";

export const ScrollView = styled.ScrollView`
`

export const HayomYomCon = styled.View`
    display: flex;
    flex-direction: ${({ $layout }) => ($layout === "side-by-side" ? "row" : "column")};
    align-items: flex-start;
    gap: 0px;
    padding-horizontal: ${({ $layout }) => ($layout === "side-by-side" ? "0px" : "20px")};
`

export const EnglishText = styled.Text`
    font-family: ${({ $fontLoaded }) => ($fontLoaded ? "lemonada" : undefined)};
    flex: ${({ $stacked }) => ($stacked ? "none" : "1")};
    width: ${({ $stacked }) => ($stacked ? "100%" : "auto")};
`

export const HebrewText = styled.Text`
    font-family: ${({ $fontLoaded }) => ($fontLoaded ? "lemonada-bold" : undefined)};
    flex: ${({ $stacked }) => ($stacked ? "none" : "1")};
    width: ${({ $stacked }) => ($stacked ? "100%" : "auto")};
`

export const StackDivider = styled.View`
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-vertical: 16px;
`

export const StackDividerLine = styled.View`
    flex: 1;
    height: 1px;
    background-color: ${constants.colors.lightGray};
`

export const StackDividerCircle = styled.View`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${constants.colors.lightGray};
    margin-horizontal: 14px;
`