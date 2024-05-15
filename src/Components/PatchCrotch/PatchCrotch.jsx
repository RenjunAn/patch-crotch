import React, { useRef, useState } from 'react';
import './PatchCrotch.css';
import dog from '../Assets/dog.png';
import cat from '../Assets/cat.png';
import drop from '../Assets/drop.mp3';
import win from '../Assets/win.wav';

const initialData = ["", "", "", "", ""]


const PatchCrotch = () => {

    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [dogCount, setDogCount] = useState(0);
    const [catCount, setCatCount] = useState(0);
    const [data, setData] = useState(initialData);
    const boxRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

    const titleRef = useRef(null);
    const dropSound = useRef(new Audio(drop));
    const winSound = useRef(new Audio(win));

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return 0;
        }
        
        if (count % 2 === 0 && dogCount < 2 ) {
            setData(prevData => {
                const newData = prevData.map((item, index) => index === num ? "x" : item);
                checkWin(newData);
                return newData;
            });
            setCount(count+1);
            setDogCount(dogCount + 1);
            dropSound.current.play();
        }
        else if(count % 2 === 1 && catCount <2){
            setData(prevData => {
                const newData = prevData.map((item, index) => index === num ? "o" : item);
                checkWin(newData);
                return newData;
            });
            setCount(count+1);
            setCatCount(catCount + 1);
            dropSound.current.play();
        }       
    }

    const handleDragStart = (e, index) => {
        if (data[index] !== "") {
            if ((count % 2 === 0 && data[index] !== "x") || (count % 2 === 1 && data[index] !== "o")) {
            addShakeEffect(e.target);
            return; }
            e.dataTransfer.setData("text/plain", index);
    }
    }
    const handleDrop = (e, targetIndex) => {
        const sourceIndex = e.dataTransfer.getData("text");
        if (sourceIndex !== "" && canDrop(parseInt(sourceIndex), targetIndex) && data[targetIndex] === "") {
            const newData = [...data];
            newData[targetIndex] = newData[sourceIndex];
            newData[sourceIndex] = "";
            setData(newData);
            setCount(count + 1);
            checkWin(newData); 
            dropSound.current.play();
    }
    }
    const canDrop = (sourceIndex, targetIndex) => {
        const allowedDrops = {
        0: [1, 2, 3],
        1: [0, 2],
        2: [0, 1, 3, 4],
        3: [0, 2, 4],
        4: [2, 3],
        };
        return allowedDrops[sourceIndex].includes(targetIndex);
  }

    const checkWin = (currentData) => {
        if (currentData[0] === currentData[1] && currentData[2] === currentData[3] && currentData[2] !== "" && currentData[0] !== "")
        {
            won(currentData[2]);
        }
        if (currentData[0] === currentData[2] && currentData[3] === currentData[4] && currentData[0] !== "" && currentData[3] !== "")
        {
            won(currentData[0]);
            }
    }
        
    const won = (winner) => {
        setLock(true);
        winSound.current.play();
        if (winner === "x") {
            titleRef.current.innerHTML = `Congratulations: <img src=${dog} > win!`;
        }
        else {
            titleRef.current.innerHTML = `Congratulations: <img src=${cat} > win!`;
        }
    }

    const reset = () => {
        setLock(false);
        setCount(0);
        setDogCount(0);
        setCatCount(0);
        setData(initialData);
        titleRef.current.innerHTML = 'Patch Crotch Game In <span>React</span>';
        // box_array.map((e)=> {
        //     e.current.innerHTML = "";
        // })
    }
    const addShakeEffect = (element) => {
        element.classList.add('shake');
        setTimeout(() => {
        element.classList.remove('shake');
        }, 500); 
    }
  return (
      <div className='container'>
          <h1 className='title' ref = {titleRef}>Patch Crotch Game In <span>React</span></h1>
          <div className='board'>
              <div className="row1">
                  <div className="boxes" ref={boxRefs[0]} onClick={(e) => { toggle(e, 0) }}
                      onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 0)}>
                    {data[0] && (
                        <img
                        src={data[0] === "x" ? dog : cat}
                        alt="box0"
                        draggable
                        onDragStart={(e) => handleDragStart(e, 0)}
                        />
                    )}
                  </div>
                  <div className="boxes" ></div>
                  <div className="boxes" ref={boxRefs[1]} onClick={(e) => { toggle(e, 1) }}
                      onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 1)}>
                    {data[1] && (
                        <img
                        src={data[1] === "x" ? dog : cat}
                        alt="box1"
                        draggable
                        onDragStart={(e) => handleDragStart(e, 1)}
                        />
                    )}
                  </div>
              </div>
              <div className="row2">
                  <div className="boxes" ></div>
                  <div className="boxes" ref={boxRefs[2]} onClick={(e) => { toggle(e, 2) }}
                      onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 2)}>
                      {data[2] && (
                          <img
                          src={data[2] === "x"? dog : cat}
                          alt="box2"
                        draggable
                              onDragStart={(e) => handleDragStart(e, 2)}
                          />
                      )}
                      </div>
                  <div className="boxes" ></div>
              </div>
              <div className="row3">
                  <div className="boxes" ref={boxRefs[3]} onClick={(e) => { toggle(e, 3) }}
                      onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 3)}>
                    {data[3] && (
                          <img
                          src={data[3] === "x"? dog : cat}
                          alt="box3"
                            draggable
                              onDragStart={(e) => handleDragStart(e, 3)}
                          />
                      )} 
                  </div>
                  <div className="boxes" ></div>
                  <div className="boxes" ref={boxRefs[4]} onClick={(e) => { toggle(e, 4) }}
                      onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 4)}>
                      {data[4] && (
                          <img
                          src={data[4] === "x"? dog : cat}
                          alt="box4"
                            draggable
                              onDragStart={(e) => handleDragStart(e, 4)}
                          />
                      )} 
                  </div>
              </div>
              <div className="line">
                  <div className="line1"></div>
                  <div className="line2"></div>
                  <div className="line3"></div>
                  <div className="line4"></div>
                  <div className="line5"></div>
              </div>
          </div>
          <button className='reset' onClick={()=>{reset()}}>Reset</button>
    
    </div>
  );
};

export default PatchCrotch;