import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error("Error fetching questions:", error));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
    setPage("List");
  }

  function handleDeleteQuestion(id) {
    setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
  }

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions(prevQuestions =>
      prevQuestions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q)
    );
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
        <QuestionForm onAddQuestion={handleAddQuestion} /> : 
        <QuestionList 
          questions={questions} 
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      }
    </main>
  );
}

export default App;