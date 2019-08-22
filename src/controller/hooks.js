import { useState } from "react";

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
    const handleChange = event => {
        if (typeof event === "string" || event === true || event === false) {
            setValue(event);
        } else {
            setValue(event.target.value);
        }
    };
    return { value, onChange: handleChange };
};
export default useFormInput;
