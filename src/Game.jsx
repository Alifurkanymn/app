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
  const [resetInterval, setResetInterval] = useState(null);
  const [resetSecongInterval, setResetSecondInterval] = useState(null);

  useEffect(() => {
    setQuestion(QUESTIONS[index].question);
    setOptions(QUESTIONS[index].options);
    setAnswer(QUESTIONS[index].answer);
  }, [index]);

  const selectOption = (value) => {
    console.log("aa", index);

    if (value === answer) {
      setCorrectCount(correctCount + 1);
    } else {
      setWrongCount(wrongCount + 1);
    }

    if (index + 1 < QUESTIONS.length) {
      setIndex(index + 1);
    } else {
      setIsFinish(true);
      clearInterval(resetInterval);
      clearInterval(resetSecongInterval);
    }
    selectedOptions.push(value);
    setSelectedOptions(selectedOptions);
    clearInterval(resetInterval);
    const newResetInterval = setInterval(() => {
      setCounter(0);
      console.log(index);
      if (index + 1 < QUESTIONS.length) {
        setIndex((prev) => prev + 1);
        console.log(index);
      } else {
        setIsFinish(true);
        clearInterval(resetInterval);
        clearInterval(resetSecongInterval);
      }
    }, 4000);

    setCounter(0);
    setResetInterval(newResetInterval);
  };

  useEffect(() => {
    const secondInterval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);
    setResetSecondInterval(secondInterval);

    const thirtySecondInterval = setInterval(() => {
      setCounter(0);
      console.log("aga", index);
      if (index + 1 < QUESTIONS.length) {
        setIndex((prev) => prev + 1);
      } else {
        setIsFinish(true);
        clearInterval(resetInterval);
        clearInterval(resetSecongInterval);
      }
    }, 4000);
    setResetInterval(thirtySecondInterval);

    return () => {
      clearInterval(secondInterval);
      clearInterval(thirtySecondInterval);
    };
  }, []);

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
          {counter < 0
            ? null
            : options.map((value, index) => (
                <button key={index} onClick={() => selectOption(value)}>
                  {value}
                </button>
              ))}
          <div>{counter}</div>
        </div>
      )}
    </div>
  );
}
