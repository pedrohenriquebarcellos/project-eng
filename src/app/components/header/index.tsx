"use client";

import { Gauge } from 'phosphor-react';
import { HeaderContainer } from "./style";

export default function Header() {
    return (
        <HeaderContainer>
            <Gauge size={32} />
            <h1>MaicoSoft <small>Dashboard</small></h1>
        </HeaderContainer>
    )
}