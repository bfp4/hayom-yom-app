import React from "react"
import { useFonts } from "expo-font"
import { HeaderCon, Title } from "./styles"

export default function Header(){
    const [fontsLoaded] = useFonts({
        "lemonada-bold": require("../../assets/fonts/Lemonada-SemiBold.ttf"),
    })

    return(
        <HeaderCon>
            <Title $fontLoaded={fontsLoaded}>Hayom Yom</Title>
        </HeaderCon>
    );
}
