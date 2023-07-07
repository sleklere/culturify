import { useState } from "react";

function useInput(validateFn) {
  const [enteredValue, setEnteredValue] = useState("");
  const [touched, setTouched] = useState(false);

  const changeHandler = function (event) {
    setEnteredValue(event.target.value);
    setTouched(true);
  };
  const reset = function () {
    setEnteredValue("");
    setTouched(false);
  };

  const isValid = validateFn(enteredValue);

  const hasError = !isValid && touched;

  const classes = hasError ? "form-input--invalid" : "";

  return {
    value: enteredValue,
    classes,
    hasError,
    isValid,
    changeHandler,
    reset,
  };
}

export default useInput;
