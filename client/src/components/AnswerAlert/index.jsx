import { useState } from "react";
import { useEffect } from "react";

const AnswerAlert = ({ children }) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    setIsAlertVisible(true);
  }, []);

  setTimeout(() => {
    setIsAlertVisible(false);
  }, 1000);

  return (
    <div>
      {isAlertVisible && (
        <div className="alert-container">
          <div className="alert-inner">hint: {children}</div>
        </div>
      )}
    </div>
  );
};
export default AnswerAlert;
