import React from "react"
import { Text } from "react-native"
import { CardCon } from "./styles"

export default function Card({ children }){
    return(
        <CardCon>
            {children}
        </CardCon>
    )
}