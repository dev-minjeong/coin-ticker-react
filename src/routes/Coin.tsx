import { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import {
    useLocation,
    Link,
    Routes,
    Route,
    useParams,
    useMatch,
} from "react-router-dom";
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Price from "./Price";
import Chart  from "./Chart";
    
const Container = styled.div`
    padding: 10px 20px ;
    max-width: 600px;
    margin: 0 auto;
    font-family: sans-serif;
`;
const Header = styled.header`
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
`;
const BackBtn = styled.div`
    font-size: 25px;
    color: ${props =>  props.theme.textColor};
    margin: 20px 0;
    cursor: pointer;
    a {
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
const CoinInfo = styled.div`
    margin-top: 30px;
`;
const Box = styled.div`
    background-color: #164b80;
    color: white;
    display: flex;
    justify-content: space-between;
    border-radius: 13px;
    padding: 5px 10px;
    margin: 20px auto;
    text-align: center;
`;
const InfoList = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`;
const InfoKey = styled.span`
    font-size: 13px;
`;
const InfoValue = styled.span`
    font-size: 20px;
    margin-top: 10px;
`;
const Description = styled.p`
    margin: 10px 0;
`;
const TapBtn = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;
const Tap = styled.div<{ isActive:boolean }>`
    background-color: #164b80;
    width: 270px;
    border-radius: 10px;
    color: ${props => props.isActive ? props.theme.accentColor : "white"};
    a {
        display: flex;
        align-items: center;
        padding: 10px;
        transition: color 0.2s ease-in;
        justify-content: center;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;


interface RouteParams {
    coinId:string;
}
interface RouteState {
    name : string;
}
interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_staus: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}
interface TickersData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h:number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m:number;
            percent_change_24h: number;
            percent_change_30d:number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

function Coin() {
    const { coinId }= useParams();
    const state = useLocation().state as RouteState; 
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const {isLoading: infoLoaing, data: infoData} = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId!)); 
    const {isLoading: tickersLoading, data: tickersData} = 
        useQuery<TickersData>(["tickers", coinId], () => fetchCoinTickers(coinId!), {refetchInterval:5000}); 

    const loading = infoLoaing || tickersLoading;
    return (
        <Container>
            <Helmet>
                <title>{state?.name ? state.name : loading? "Loading..." : infoData?.name}</title>
            </Helmet>
            <Header>
                <Title>{state?.name ? state.name : loading? "Loading..." : infoData?.name}</Title> 
            </Header>
            {loading ? <Loader>Loading...</Loader> : (
            <CoinInfo>
                <Box>
                    <InfoList><InfoKey>RANK:</InfoKey><InfoValue>{infoData?.rank}</InfoValue></InfoList>
                    <InfoList><InfoKey>SYMBOL:</InfoKey><InfoValue>${infoData?.symbol}</InfoValue></InfoList>
                    <InfoList><InfoKey>PRICE:</InfoKey><InfoValue>${tickersData?.quotes.USD.price.toFixed(2)}</InfoValue></InfoList>
                </Box>
                <Description>{infoData?.description}</Description>
                <Box>
                    <InfoList><InfoKey>TOTAL SUPPLY:</InfoKey><InfoValue>{tickersData?.total_supply}</InfoValue></InfoList>
                    <InfoList><InfoKey>MAX SUPPLY:</InfoKey><InfoValue>{tickersData?.max_supply}</InfoValue></InfoList>    
                </Box>
                <TapBtn>
                    <Tap isActive={chartMatch !== null}>
                        <Link to={`/${coinId}/chart`}>Chart</Link> 
                    </Tap>
                    <Tap isActive={priceMatch !== null}>
                        <Link to={`/${coinId}/price`}>Price</Link>
                    </Tap>
                </TapBtn>
                <Routes>
                    <Route path="chart" element={<Chart coinId={coinId!}/>}>
                    </Route>
                    <Route path="price" element={<Price coinId={coinId!}/>}> 
                    </Route>
                </Routes>
                <BackBtn>
                    <Link to={`/`}>← Back</Link>
                </BackBtn>
            </CoinInfo>
            )}
        </Container>
    );
}
export default Coin;