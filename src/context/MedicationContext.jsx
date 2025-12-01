import React, { createContext, useContext, useReducer, useEffect } from 'react';

const MedicationContext = createContext();

const initialState = {
  medications: [], // { id, name, dosage, frequency, time, refillCount, totalPills }
  logs: [], // { id, medicationId, action: 'taken' | 'skipped', timestamp }
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_DATA':
      return { ...state, ...action.payload };
    case 'ADD_MEDICATION':
      return { ...state, medications: [...state.medications, action.payload] };
    case 'DELETE_MEDICATION':
      return { ...state, medications: state.medications.filter(m => m.id !== action.payload) };
    case 'UPDATE_MEDICATION':
      return {
        ...state,
        medications: state.medications.map(m => m.id === action.payload.id ? action.payload : m)
      };
    case 'LOG_ACTION':
      return { ...state, logs: [action.payload, ...state.logs] };
    case 'DECREMENT_INVENTORY':
      return {
        ...state,
        medications: state.medications.map(m => 
          m.id === action.payload 
            ? { ...m, refillCount: Math.max(0, m.refillCount - 1) } 
            : m
        )
      };
    case 'REFILL_MEDICATION':
      return {
        ...state,
        medications: state.medications.map(m => 
          m.id === action.payload.id 
            ? { ...m, refillCount: m.refillCount + action.payload.amount } 
            : m
        )
      };
    default:
      return state;
  }
}

export function MedicationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedMeds = localStorage.getItem('medications');
    const savedLogs = localStorage.getItem('logs');
    if (savedMeds || savedLogs) {
      dispatch({
        type: 'LOAD_DATA',
        payload: {
          medications: savedMeds ? JSON.parse(savedMeds) : [],
          logs: savedLogs ? JSON.parse(savedLogs) : []
        }
      });
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(state.medications));
    localStorage.setItem('logs', JSON.stringify(state.logs));
  }, [state.medications, state.logs]);

  return (
    <MedicationContext.Provider value={{ state, dispatch }}>
      {children}
    </MedicationContext.Provider>
  );
}

export function useMedication() {
  return useContext(MedicationContext);
}
