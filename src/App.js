import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormValidator from './component/FormValidator/FormValidator';
import ListParenthesisValidator from './component/ListParenthesisValidator/ListParenthesisValidator';
import './App.css'; // Make sure this import is correct for your project

function App() {
  return (
    <Router>
      <div className="App">
        <div className="justify-content-center align-items-center">
          <div className="text-center">
            <div className="mb-3">
              <Link to="/form-validator" className="btn btn-primary btn-md">Provider Entrollement Form</Link>
              <Link to="/list-parenthesis-validator" className="btn btn-primary btn-md">List Parenthesis Validator</Link>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/form-validator" element={<FormValidator />} />
          <Route path="/list-parenthesis-validator" element={<ListParenthesisValidator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;