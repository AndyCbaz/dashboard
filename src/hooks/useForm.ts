import { useState } from "react";
import { Props } from "../helpers/Login/formProps";


const useForm = (initialValues: Props, onValidate: any) => {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({user:''});

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const err = onValidate(form);
    if(err === null){
        console.log('enviando formulario')
    }else{
        setErrors(err);
    }
  };
  
  const handleChange = (event: any) => {
    const {name, value } = event.target
    setForm({...form, [name]: value})
  }

  return { form, handleSubmit, handleChange };
};

export default useForm;
