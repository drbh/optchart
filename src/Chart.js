import React, { useState, useEffect } from 'react';
import { Line  } from '@ant-design/charts';
import { PageHeader, Tabs, Button, Statistic, Descriptions } from 'antd';
import 'antd/dist/antd.css';


const findIntersection = (x1, y1, x2, y2, x3, y3, x4, y4) => {
  var px = ((x1*y2-y1*x2)*(x3-x4) - (x1-x2)*(x3*y4-y3*x4)) / ((x1-x2)*(y3-y4) - (y1-y2)*(x3-x4))
  var py = ((x1*y2-y1*x2)*(y3-y4) - (y1-y2)*(x3*y4-y3*x4)) / ((x1-x2)*(y3-y4) - (y1-y2)*(x3-x4))

  // console.log(px, py)
  return {px, py}
}

const round = function(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
};

const DemoDualAxes: React.FC = (props) => {

  const balance = props.balance

  const currentPrice = props.currentPrice //21.18
  var strike = props.strike //20
  var costOfOption = props.costOfOption //1.85
  var equityLine = []
  var numberOfShares = Math.floor(balance/currentPrice) //236.0
  var costOfStockPosition = currentPrice * numberOfShares // at 

  var optionBreakeven = (strike + costOfOption)

  var numberOfContracts = Math.floor(balance/(costOfOption*100))
  var costOfOptionPosition = costOfOption * (numberOfContracts * 100)
  
  

  let coords = findIntersection(
    // optionBreakeven, 0.0, maxPrice , (maxPrice-optionBreakeven)*numberOfContracts*100,
    optionBreakeven, 0.0, 100, ((100-optionBreakeven)*(numberOfContracts*100)), 
    currentPrice, 0.0, 100, (100 * numberOfShares)-costOfStockPosition,
    // currentPrice, 0.0, 23.5, 547.52
  )

  
  const minPrice = (strike * 0.5)
  const maxPrice = (coords.px *1.5)
  // const maxPrice = (currentPrice * 1.1)



  for (var price = (minPrice*100); price <= (maxPrice*100); price++) {

    var usedPrice = price / 100.0
    var value = usedPrice * numberOfShares
    value = round(value - costOfStockPosition, 8)

    // console.log(usedPrice, value)
    // equityLine.push([price, value])
    equityLine.push({value: value, price: usedPrice.toFixed(2), key: "series1"})
  }
  // console.log(equityLine)

  var optionLine = []


  for (var price = (minPrice*100); price <= (maxPrice*100); price++) {

    var usedPrice = price / 100.0
    // console.log(costOfOptionPosition)

    var value = (usedPrice-strike) * (numberOfContracts*100) 

    if (usedPrice < strike) {
      value = 0
      // continue //
    }

    value = round(value - costOfOptionPosition, 8)

    // optionLine.push([price, value])
    equityLine.push({value: value, price: usedPrice.toFixed(2), key: "series2"})
  }

  var mmax = props.maxx
  var mmin = props.minx

console.log(mmax, mmin)
  // console.log("coords",coords)

  var config = {
    data: equityLine,
    height: 800,
    xField: 'price',
    yField: 'value',
    // yAxis: {
      // min: mmin,//-200
      // max: mmax//1000
    // },
    // legend: false,
    seriesField: 'key',
    // stepType: 'hvh',
    annotations: [
      // {
      //   type: 'regionFilter',
      //   start: ['min', 'median'],
      //   end: ['max', '0'],
      //   color: '#F4664A',
      // },
      // {
      //   type: 'text',
      //   position: ['min', 'median'],
      //   content : 'median' , 
      //   offsetY: -4,
      //   style: { textBaseline: 'bottom' },
      // },
      {
        type: 'line',
        // start: ['min', 'median'],
        start: ['min', 0],
        end: ['max', 0],
        // end: ['max', 'median'],
        style: {
          stroke: '#F4664A',
          lineDash : [ 2 , 2 ] ,  
        },
      },
      {
        type: 'line',
        // start: ['min', 'median'],
        start: ['min', coords.py],
        end: ['max', coords.py],
        // end: ['max', 'median'],
        style: {
          stroke: '#FF00FF',
          lineDash : [ 2 , 2 ] ,  
        },
      }
    ],
  };

  return <> 

    <PageHeader
      className="site-page-header-responsive"
      onBack={
        () => {}
      }
      title="Title"
      subTitle="This is a subtitle"
    >

    <Descriptions size="small" column={3}>
    <Descriptions.Item label="Current Price">{currentPrice}</Descriptions.Item>
    <Descriptions.Item label="Strike Price">{strike}</Descriptions.Item>
    <Descriptions.Item label="Equity Cost">{costOfStockPosition}</Descriptions.Item>
    <Descriptions.Item label="Option Cost">{costOfOptionPosition}</Descriptions.Item>
    <Descriptions.Item label="Option Breakeven">{optionBreakeven}</Descriptions.Item>
    <Descriptions.Item label="Option Price">{costOfOption}</Descriptions.Item>
    <Descriptions.Item label="Number of Contracts">{numberOfContracts}</Descriptions.Item>
    <Descriptions.Item label="Number of Shares">{numberOfShares}</Descriptions.Item>
    <Descriptions.Item label="Share Leverage">{round((numberOfContracts*100)/numberOfShares,3)}</Descriptions.Item>
    <Descriptions.Item label="Options > Equity Breakeven">{round(coords.px, 3)}</Descriptions.Item>
    <Descriptions.Item label="Break Value">{round(coords.py, 3)}</Descriptions.Item>
    <Descriptions.Item label="Percent to profit">{round((round(coords.px, 3)/currentPrice)-1,3)}</Descriptions.Item>
  </Descriptions>

    </PageHeader>


    <Line {...config} /> 
  </>
};
export default DemoDualAxes;