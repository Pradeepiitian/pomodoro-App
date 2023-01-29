import React, { useState,useRef } from 'react';
import './App.css';   

function  padTime(time) {
  return time.toString().padStart(2, '0');
  
}

export default function App() {

  const [title, setTitle]=useState('Let The CountDown Be begin!!!');
  const [timeLeft, setTimeLeft]=useState(25*60);
  const [isRunning, setIsRunning]=useState(false);
  const intervalRef=useRef(null);

//start timer function
  function StartTimer() {

    if(intervalRef.current!=null) return;
    intervalRef.current=setInterval(() => {
      setTimeLeft(timeLeft=>{
        if(timeLeft>=1) return timeLeft-1;
        resetTimer();
        return 0;
      });
      
    },1000);

    setIsRunning(true);
    
  }
//stop timer function
  function stopTimer() {
    if(intervalRef.current===null) return;
    clearInterval(intervalRef.current);
    intervalRef.current=null;
    console.log(intervalRef.current);
    setTitle('you stop the timer, Ready to go!!')
    setIsRunning(false);
    
  }
//reset timer function
  function resetTimer(){
    clearInterval(intervalRef.current)
    intervalRef.current=null;
    setTimeLeft(25*60);
    setTitle('Your are on next round, click start!!');
    setIsRunning(false);
  }

  const minutes=padTime(Math.floor(timeLeft/60));
  const seconds=padTime(timeLeft-minutes*60);
  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={StartTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        {isRunning && <button onClick={resetTimer}>Reset</button>}
      </div>
    </div>
  );
}
