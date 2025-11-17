import { createStore } from "redux";

const STORAGE_KEY = "employees";

function loadEmployees() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return [];
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

const initialState = {
    employees: loadEmployees(),
};

function employeesReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_EMPLOYEE":
            return {
                ...state,
                employees: [...state.employees, action.payload],
            };

        case "UPDATE_EMPLOYEE":
            return {
                ...state,
                employees: state.employees.map((emp) =>
                    emp.id === action.payload.id
                        ? { ...emp, ...action.payload.updates }
                        : emp
                ),
            };

        case "DELETE_EMPLOYEE":
            return {
                ...state,
                employees: state.employees.filter(
                    (emp) => emp.id !== action.payload
                ),
            };

        default:
            return state;
    }
}

const devtools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(employeesReducer, devtools);

// Persist to localStorage whenever state changes
store.subscribe(() => {
    const { employees } = store.getState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
});

export default store;
