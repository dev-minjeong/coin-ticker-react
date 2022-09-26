import { fetchCoinHistory } from '../api';
import { useQuery } from 'react-query';
import ApexChart from 'react-apexcharts';
import React from 'react';

interface ChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId!),
    { refetchInterval: 10000 }
  );
  return (
    <></>
    // <div>
    //   {isLoading ? (
    //     'Loading Chart...'
    //   ) : (
    //     <ApexChart
    //       type='candlestick'
    //       series={[
    //         {
    //           data: data?.map((price) => {
    //             return [
    //               Date.parse(price.time_close),
    //               price.open,
    //               price.high,
    //               price.low,
    //               price.close,
    //             ];
    //           }),
    //         },
    //       ]}
    //       options={{
    //         theme: {
    //           mode: 'dark',
    //         },
    //         chart: {
    //           type: 'candlestick',
    //           height: 350,
    //           width: 500,
    //           toolbar: {
    //             show: false,
    //           },
    //           background: 'transparent',
    //         },
    //         stroke: {
    //           curve: 'smooth',
    //           width: 2,
    //         },
    //         yaxis: {
    //           show: false,
    //         },
    //         xaxis: {
    //           type: 'datetime',
    //           categories: data?.map((price) => price.time_close),
    //           labels: {
    //             style: { colors: '#1e90ff' },
    //           },
    //         },
    //         plotOptions: {
    //           candlestick: {
    //             colors: {
    //               upward: '#3C90EB',
    //               downward: '#c04332',
    //             },
    //           },
    //         },
    //       }}
    //     ></ApexChart>
    //   )}
    // </div>
  );
}
export default Chart;
