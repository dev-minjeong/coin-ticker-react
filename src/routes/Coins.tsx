import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
    padding: 10px 20px ;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.textColor};
    border-radius: 15px;
    margin: 10px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;
const Title = styled.h1`
font-size: 48px;
    color: ${props => props.theme.accentColor};
`;
const Loader = styled.div`
    text-align: center;
    display: block;
`;
const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;
interface ICoin {
        "id": string,
        "name": string,
        "symbol": string,
        "rank": number,
        "is_new": boolean,
        "is_active": boolean,
        "type": string,
}

function Coins() {
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins); 
    
    return (
        <Container>
            <Helmet>
                <title>Coin</title>
            </Helmet>
            <Header>
                <Title>Coin</Title>
            </Header>
            {isLoading ? <Loader>Loading...</Loader> : (
            <CoinsList>
            {data?.slice(0, 100).map(coin => 
                <Coin key={coin.id}>
                    <Link 
                        to={{pathname: `/${coin.id}`}}
                        state= {{name: coin.name}}> 
                        <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                        {coin.name} &rarr;
                    </Link>
                </Coin>)}
            </CoinsList> 
            )}
        </Container>
    );
}
export default Coins;