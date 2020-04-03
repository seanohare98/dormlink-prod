// useRequiredFields.js
import { useState } from 'react';

export default function useFormFields(init) {
  const [fieldsFilled, setFieldsFilled] = useState(init);

  function handleChange(event) {
    const { name, value } = event.target;
    fieldsFilled[name] = value;
    setFieldsFilled({ ...fieldsFilled });
    console.log(fieldsFilled);
  }

  return [fieldsFilled, handleChange];
}
