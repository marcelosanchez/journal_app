import { types } from '../types/types';

/*  
    notes: [],
    active: null ||
    active: {
        id: 'AVYTYTECRW',
        title: '',
        body: '',
        imageUrl: '',
        date: 10324890275,
    }
    NotesReducer:
        - El reducer de notes, recibe el estado actual y la accion que se esta ejecutando
        - El reducer de notes, devuelve el nuevo estado

*/

const initialState = {
    notes: [],
    active: null,
}

export const notesReducer = ( state=initialState, action ) => {
    switch (action.type) {
        case types.notesActive:
            return {
                ...state,  // Copia el estado actual
                active: {
                    ...action.payload,  // Usa el payload de la accion para agregar el id y el resto de los datos
                },
            }

        case types.notesAddNew:
            return {
                ...state,
                notes: [
                    action.payload,
                    ...state.notes,
                ],
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }

        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map( 
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                )
            }

        case types.notesDelete:
            return {
                ...state,
                notes: state.notes.filter( note => note.id !== action.payload ),  // Filtra las notas que no coincidan con el id
                active: null,  // Elimina la nota activa
            }
        
        case types.notesLogoutCleaning:
            return {
                ...state,
                notes: [],  // Elimina todas las notas
                active: null,  // Elimina la nota activa
            }

        default:
            return state;
    }
}
