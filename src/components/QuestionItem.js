import React, { useState } from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers } = question;
  const [correctIndex, setCorrectIndex] = useState(question.correctIndex);

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => onDeleteQuestion(id))
      .catch(error => console.error("Error deleting question:", error));
  }

  function handleChange(event) {
    const newCorrectIndex = parseInt(event.target.value);
    setCorrectIndex(newCorrectIndex);  

    const updatedQuestion = { ...question, correctIndex: newCorrectIndex };
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then(response => response.json())
      .then(() => onUpdateQuestion(updatedQuestion))
      .catch(error => {
        console.error("Error updating question:", error);
        setCorrectIndex(question.correctIndex);  // Revert on error
      });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleChange}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;