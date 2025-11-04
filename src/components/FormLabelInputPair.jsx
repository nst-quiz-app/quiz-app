import {v4 as uuidv4} from "uuid";

export default function FormLabelInputPair({labelText, inputType="text", inputValue, onInputValueChange}) {
    const inputId = uuidv4();
    return <div>
        <label htmlFor={inputId}>{labelText}</label>
        <input type={inputType} id={inputId} value={inputValue} onChange={onInputValueChange} />
    </div>
}