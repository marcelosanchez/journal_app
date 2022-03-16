import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleteNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const { active:note } = useSelector( state => state.notes );
    const dispatch = useDispatch();
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { title, body, id } = formValues;

    const activId = useRef( note.id );
    
    useEffect(() => {
        if( note.id !== activId.current ){  // Solo se dispara si y solo si, la nota id cambio
            reset( note );
            activId.current = note.id;  // Si la nota cambia, establezco el nuevo id, para evitar un ciclo infinito
        }
    }, [ note, reset ]);
    
    useEffect(() => {
        dispatch( activeNote(formValues.id, {...formValues}) );
    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch( startDeleteNote(id) );
    }
    

    return (
        <div className='notes__main-content'>
            <NotesAppBar />

            <div className='notes__content'>
                <input 
                    type='text' 
                    placeholder='Some awesome title' 
                    className='notes__title-input'
                    autoComplete='off'
                    name='title'
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder='What happened today?'
                    className='notes__textarea'
                    name='body'
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>

                {
                    note.url &&
                    <div className='notes__image'>
                        <img 
                            src={ note.url } 
                            alt="imagen" 
                        />
                    </div>
                }

            </div>
            <button 
                className='btn btn-danger'
                onClick={ handleDelete }
            >
                Delete
            </button>
        </div>
    )
}
