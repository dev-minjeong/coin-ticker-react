import {fetchCoinPrice} from "../api";
import { useQuery } from 'react-query';
import styled from "styled-components";

interface PriceProps {
    coinId: string;
};
interface IHistorical {
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
};
const PriceInfo = styled.div`
text-align: center;
    h1{
        font-size: 25px;
        font-weight: 600;
        margin: 30px;
    }
`;
const PriceList = styled.li`
    list-style: none;
    margin-top: 10px;
    background-color: ${(props) => props.theme.boxColor};
    padding: 13px;
    color: ${(props) => props.theme.textColor};
    border-radius: 10px;
`;
function Price({coinId} : PriceProps) {
    const {isLoading, data} = 
        useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinPrice(coinId!), {refetchInterval:10000});
        return (
        <div>{isLoading ? "Loading Price..." : (
            <PriceInfo>
                <h1>Today's Price</h1>
                <PriceList>open price : ${data?.map(price =>price.open.toFixed(0))}</PriceList>
                <PriceList>high price : ${data?.map(price =>price.high.toFixed(0))}</PriceList>
                <PriceList>low price : ${data?.map(price =>price.low.toFixed(0))}</PriceList>
                <PriceList>close price : ${data?.map(price =>price.close.toFixed(0))}</PriceList>
                <PriceList>volume price : ${data?.map(price =>price.volume.toFixed(0))}</PriceList>
            </PriceInfo>
            )
        }
        </div>
    );
}
export default Price;