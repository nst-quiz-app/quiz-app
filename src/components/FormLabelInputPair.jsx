import { useId } from "react";

export default function FormLabelInputPair({ labelText, inputType = "text", inputValue, onInputValueChange, autoComplete = false }) {
    const inputId = useId();
    return <div>
        <label htmlFor={inputId}>{labelText}</label>
        <input type={inputType} id={inputId} value={inputValue} onChange={onInputValueChange} autoComplete={autoComplete ? "on" : "off"} />
    </div>
}