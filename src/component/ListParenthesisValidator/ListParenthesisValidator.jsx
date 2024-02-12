import React, { useState } from "react";
import "./ListParenthesisValidator.css";

const LispCodeValidator = () => {
  const [lispCode, setCode] = useState("");
  const [isValid, setIsValid] = useState(null);

  const validateParentheses = (input) => {
    if (input.length === 0) return false;
    const stack = [];
    for (let char of input) {
      if (char === "(") {
        stack.push(char);
      } else if (char === ")") {
        if (stack.length === 0) {
          return false;
        }
        stack.pop();
      }
    }
    return stack.length === 0;
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsValid(validateParentheses(lispCode));
  };

  return (
    <div className="col-md-8 mx-auto">
      <h2>LISP Parentheses Validator</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          value={lispCode}
          onChange={handleCodeChange}
          placeholder="Enter your LISP code here..."
          rows="10"
        />
        <div class="container">
          <div class="row">
            <div class="col text-center">
              <button type="submit" className="btn btn-primary d-inline-block text-align-center">
                Validate Code
              </button>
            </div>
          </div>
        </div>
      </form>
      
      {isValid !== null && (
        <div
          className={`alert ${isValid ? "alert-success" : "alert-danger"} mt-2`}
          role="alert"
        >
          {isValid
            ? "All parentheses are properly closed and nested."
            : "Parentheses are not properly closed and nested."}
        </div>
      )}
    </div>
  );
};

export default LispCodeValidator;
