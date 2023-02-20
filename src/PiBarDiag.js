import React from 'react';
import { PieChart, Pie, Cell,ResponsiveContainer } from 'recharts'
import './PiBarDiag.css';
// import { Pie } from 'react-chartjs-2';

function PiBarDiag(props) {
    const array = [];
    const arr = props.arr;
    console.log(arr);
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
        const x = arr[i].slice(0, 2);
        console.log(x);
        if (map.has(x)) {
            const a = map.get(x);
            map.set(x, a + 1);
            console.log(map.get(x));
        } else {
            map.set(x, 1);
        }

    }
    console.log(map);
    const color = [];
    const arrKey = [];
    const arrValue = [];
    for (let [key, value] of map) {
        arrKey.push(key);
        arrValue.push(value);
        //  const col1 = Math.floor(Math.random()*255);
        //  const col2= Math.floor(Math.random()*255);
        //  const col3 = Math.floor(Math.random()*255);
        //  const cl = `rgb(${col1},${col2},${col3})`;
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        console.log(randomColor);
        //color.push(cl);
        const eol = `#${randomColor}`
        color.push(eol);
        const per = value / arr.length * 100;
        const obj = {
            lst: key,
            count: per
        };
        console.log(obj);
        array.push(obj);
        //array = [...array, obj];
    }
    console.log(array);
    let i = 0;

    // const state = {
    //        labels : arrKey,
    //        datasets : [
    //         { 
    //            label : "sumary",
    //            backgroundColor : color,
    //            borderColor : "rgba(0,0,0,1)",
    //            borderWidth : 2,
    //            data : arrValue
    //         }
    //        ]
    // }
    // const option ={
    //     plugins : {
    //         legend : {
    //             display : true,
    //             position : "bottom"
    //         },
    //         title : {
    //             text : "Average per month",
    //             display : true,
    //             fontSize : 20
    //         }
    //     }
    // }
    const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

    return (
        <div className='pibar'>
            {/* <div >
                <PieChart width={220} height={220} >
                    <Pie data={array} dataKey="count" outerRadius={60} fill="#8884d8" label />

                </PieChart>
            </div> */}
            <div>
            <ResponsiveContainer width="100%" height="100%">
        <PieChart width={200} height={200}>
          <Pie
            data={array}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
          >
            {array.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={color[index % color.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
            </div>
            {/* <div>
                 <Pie data={state}  />
            </div> */}
            <div className='piDig'>
                <h5>%time spent on each location</h5>
                {
                    array?.map((item,i) => {
                        return (
                            <>
                                <p className='circle' style={{ backgroundColor: `${color[i]}` }}></p><span className='hero'>{item.lst}</span><br></br>
                                <span className='hero'>{item.count}%</span><br></br>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PiBarDiag
