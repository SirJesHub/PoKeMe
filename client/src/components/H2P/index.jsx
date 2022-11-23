import { useState } from "react";
import { useEffect } from "react";
import React from "react";

const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};
export default Popup;

// const AnswerAlert = ({ children }) => {
//   const [isAlertVisible, setIsAlertVisible] = useState(false);

//   useEffect(() => {
//     setIsAlertVisible(true);
//   }, []);

//   setTimeout(() => {
//     setIsAlertVisible(false);
//   }, 1000);

//   return (
//     <div>
//       {isAlertVisible && (
//         <div className="alert-container">
//           <div className="alert-inner">hint: {children}</div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default AnswerAlert;
