import { useState } from "react";

export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState( initialState );

    const reset = ( newFormState = initialState ) => {
        setValues( newFormState );
    }
    
    const handleInputChange = ({ target }) => {
        setValues({
            ...values,  // copia el estado actual
            [ target.name ]: target.value  // target.name es el nombre del input 
        });
    };

    return [ values, handleInputChange, reset ];  // retorna un array con los valores y los metodos
}