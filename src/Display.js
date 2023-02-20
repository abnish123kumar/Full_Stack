import React, { useEffect, useState } from 'react'

import { FaAngleRight, FaAngleLeft, FaSearch, FaArrowRight } from "react-icons/fa";
import './Display.css'
import PiBarDiag from './PiBarDiag';
function Display(props) {
  const arr = props.arr;
  //console.log(arr);
  const [input, setinput] = useState('');
  const [syst, setSyst] = useState([]);
  const [detailArray, setDetailsArray] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [see, setSee] = useState(false);
  // const [pi, setPi] = useState([]);
  const [count, setCount] = useState(0);
  const pi = [];

  useEffect(() => {
    let list = [];
    if (arr.length > 0) {
      console.log(arr.length);
      let brr = [];
      brr.push(arr[0]);
      // console.log(arr[0].Id);
      for (let i = 1; i < arr.length; i++) {
        //console.log("abnish");
        if (arr[i].Id !== arr[i - 1].Id) {
          //console.log(i)
          const a = [...brr];
          console.log(a);
          list.push(a);

          while (brr.length > 0) {
            brr.pop();
          }
          //console.log("after deleting ",brr.length);
          brr.push(arr[i]);

        } else
          brr.push(arr[i]);
      }
      const a = [...brr];
      // console.log(a);
      list.push(a);
      console.log(list);
    }
    setSyst(list);
    if (input) {
      const apple = [];
      for (let i = 0; i < list.length; i++) {
        const a = list[i];
        const b = a[a.length - 1];
        if (b.Id.includes(input)) {
          apple.push(a);
          console.log(b);
        }
        if (b.type.includes(input)) {
          apple.push(a);
          console.log(b);
        }
      }
      setSyst(apple)
    }
    //  else{
    //    setSyst(list);
    //  }
  }, [input])

  const details = (i) => {
    if (syst) {
      console.log(syst[i]);
      const dd = [...syst[i]];
      setDetailsArray(dd);
      setShowDetail(true);
    }
  }
  //  useEffect(()=>{
  //   const copy = [...syst];


  //  },[input])

  const newArray = [];
  const searchValue = (e) => {
    setinput(e.target.value);

  }
  const seeDeatails = () => {
    setSee(true);
  }

  const decrease = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
      console.log("decrease", count)
    }
  }

  const increase = () => {
    if (count < syst.length / 5) {
      setCount(prev => prev + 1);
      console.log("increase", count);
    }
  }

  return (
    <> {!showDetail ?
      <div >
        <h1>GPS Summary</h1>
        <div className='display'>
          <div>
            {/* <FaSearch/><input  type="text" className='search' placeholder='search By DeviceId'></input> */}
            <form className="nosubmit">
              <input className="nosubmit" type="search" placeholder="Search By DeviceId/Type..." onChange={(e) => searchValue(e)} />
            </form>
          </div>
          <div>
            <span>{`${Math.min((count) * 5 + 1, syst.length)}-${Math.min((count + 1) * 5, syst.length)}`} of {`${syst.length}`}</span>  <span onClick={() => decrease()}><FaAngleLeft /></span><span onClick={() => increase()}> <FaAngleRight /></span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>DeviceId</th>
              <th>DeviceType</th>
              <th>Latest Timestamp</th>
              <th>Latest Location</th>
              <th>   -    </th>
            </tr>
          </thead>
          <tbody>
            {
              syst?.map((item, i) => {

                return (
                  i >= count * 5 && i < (count + 1) * 5 ?
                    <tr key={i}>
                      <td>{item[item.length - 1].Id}  </td>
                      <td>{item[item.length - 1].type}  </td>
                      <td>{item[item.length - 1].time_date}  </td>
                      <td>   {item[item.length - 1].location}  </td>
                      <td onMouseOver={() => seeDeatails()} onMouseOut={() => setSee(false)} onClick={() => details(i)}>{see ? <>details <FaAngleRight /> </> : <FaArrowRight />}  </td>
                    </tr> : null)
              })
            }
          </tbody>
        </table>
      </div> : null}
      <> {showDetail ? <div className='details'>{
        detailArray.length > 0 ? <> <span className='header'>{detailArray[0].Id} </span><br />
          <span className='header'>{detailArray[0].type}</span></> : null
      } <div className='dataShow'>
          <table>
            <thead>
              <tr>
                <th>Latest Timestamp</th>
                <th>Latest Location</th>

              </tr>
            </thead>
            <tbody>
              {
                detailArray?.map((item, i) => {
                  pi.push(item.location);
                  return (
                    <tr key={i}>
                      <td>{item.time_date}</td>
                      <td>{item.location}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          {
            pi ? <PiBarDiag arr={pi} /> : <h2>hero</h2>
          }
        </div>
      </div> : null}</>

    </>
  )
}

export default Display
