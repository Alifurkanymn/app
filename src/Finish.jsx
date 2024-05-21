import React from "react";

function Finish({ correctCount, wrongCount, selectedOptions }) {
  return (
    <div>
      <div>dogru cevap:{correctCount}</div>
      <div>yanlis cevap:{wrongCount}</div>
      {selectedOptions.map((value, index) => (
        <div key={index}>
          {index + 1}. sorunun cevabi: {value}
        </div>
      ))}
    </div>
  );
}

export default Finish;
