import {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useSocket, socketRequest } from "../services/socket-io";

const Timer2 = forwardRef(({ max, test }, ref) => {
  const { socket } = useSocket();
  const Ref = useRef(null);

  const [timer, setTimer] = useState(max);

  socket.on("updating_timer2", () => {
    resetTimerFunc2();
  });

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
    deadline.setSeconds(deadline.getSeconds() + max);
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
    if (timer === 0) {
      if (max === 10) {
        max = 20;
      } else if (max === 20) {
        max = 10;
      }
      clearTimer(getDeadTime());
    }
  }, [timer]);

  useImperativeHandle(ref, () => ({
    resetTimerFunc2,
  }));

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const resetTimerFunc2 = () => {
    max = 10;
    clearTimer(getDeadTime());
  };

  return (
    <div className="App">
      <h2>{timer}</h2>
    </div>
  );
});

export default Timer2;
