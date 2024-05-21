import React, { useEffect, useState } from "react";
import { QUESTIONS } from "./data";
import Finish from "./Finish";

export default function Game() {
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isFinish, setIsFinish] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setQuestion(QUESTIONS[index].question);
    setOptions(QUESTIONS[index].options);
    setAnswer(QUESTIONS[index].answer);
  }, [index]);

  const selectOption = (value) => {
    if (value === answer) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }

    setSelectedOptions((prev) => [...prev, value]);

    if (index + 1 < QUESTIONS.length) {
      setIndex((prev) => prev + 1);
      setCounter(0); // Reset counter when moving to next question
    } else {
      setIsFinish(true);
    }
  };

  useEffect(() => {
    const secondInterval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);

    const thirtySecondInterval = setInterval(() => {
      if (index + 1 < QUESTIONS.length) {
        setIndex((prev) => prev + 1);
        setCounter(0); 
      } else {
        setIsFinish(true);
        clearInterval(secondInterval);
        clearInterval(thirtySecondInterval);
      }
    }, 4000); 

    return () => {
      clearInterval(secondInterval);
      clearInterval(thirtySecondInterval);
    };
  }, [index]);

  return (
    <div>
      {isFinish ? (
        <Finish
          correctCount={correctCount}
          wrongCount={wrongCount}
          selectedOptions={selectedOptions}
        />
      ) : (
        <div>
          <div>{question}</div>
          {options.map((value, idx) => (
            <button key={idx} onClick={() => selectOption(value)}>
              {value}
            </button>
          ))}
          <div>{counter}</div>
        </div>
      )}
    </div>
  );
}
