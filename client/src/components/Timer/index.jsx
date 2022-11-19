import { useEffect, useState, useRef } from "react";

function Timer({ max, round }) {
  //   const [counter, setCounter] = useState(max);

  //   useEffect(() => {
  //     if (counter > 0) {
  //       setTimeout(() => setCounter(counter - 1), 1000);
  //     }
  //   }, [counter]);

  //   useEffect(() => {
  //     if (round < 4) {
  //       setCounter(max);
  //     }
  //   }, [round]);

  //   return <span>{counter}</span>;

  //---------------------------------------//
  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState(max);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    return {
      total,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(seconds);
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer(max);

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 20);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  useEffect(() => {
    if (timer === 0) alert("time is up!");
  }, [timer]);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  return (
    <div className="App">
      <h2>{timer}</h2>
      <button onClick={onClickReset}>Reset</button>
    </div>
  );
}

export default Timer;
