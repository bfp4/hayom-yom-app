import React from "react"
import { CardCon } from "./styles"

export default function Card({ children }){
    return(
        <CardCon>
            {children}
        </CardCon>
    )
}