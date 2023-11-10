import {
    ADD_TODO,
    DELETE_TODO,
    CLEAR_ALL_TODO,
    EDIT_TODO,
    UPDATE_TODO,
    MARK_COMPLETED,
  } from "../actions/actionTypes";

  const initialState = {
    todos: [
        {
            id: 1,
            title: "ЗАДАЧА 1",
            description: "ЭТО КРЧ 1",
            isCompleted: true,
            isPending: false,
        },
        {
            id: 2,
            title: "ЗАДАЧА 2",
            description: "КУПИТЬ МОЛОКО",
            isCompleted: false,
            isPending: true,
        },
        {
            id: 3,
            title: "ЗАДАЧА 3",
            description: "УБРАТЬ ГОРШОК",
            isCompleted: false,
            isPending: true,
        },
    ],
    isEdit: false,
    editTodoId: "",
  };

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            const { id, title, description } = action.payload;
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: id,
                        title: title,
                        description: description,
                        isCompleted: false,
                        isPending: true,
                    },
                ],
                isEdit: action.isEdit,
            };
        case DELETE_TODO:
            const newTodoList = state.todos.filter((item) => item.id != action.id);
            return {
                ...state,
                todos: newTodoList,
            };

        case EDIT_TODO:
            const editTodo = action.payload;
            let newEditTodo = state?.todos?.find((item) => item?.id === editTodo?.id);
            return {
                ...state,
                isEdit: action.isEdit,
                editTodo: newEditTodo,
            };

        case UPDATE_TODO:
            const { todoId, todoTitle, todoDescription } = action.payload;
            const todos = state.todos.filter((todo) => {
                return todo.id !== todoId;
            });
            
            const todo = state.todos.find((todo) => todo?.id === todoId);
            todo.title = todoTitle;
            todo.description = todoDescription;
            todo.isCompleted = todo?.isCompleted;
            todo.isPending = todo?.isPending;
            todos.push(todo);

            return {
                ...state,
                todos: [...todos],
                isEdit: false,
            };

        case MARK_COMPLETED:
            const { selectedTodoId } = action.payload;
            let allTodos = [];
            
            selectedTodoId.forEach((id) => {
                allTodos = state.todos.filter((todo) => {
                    return todo.id !== id;
                });

                const selectedTodo = state.todos.find((todo) => todo?.id === id);
                selectedTodo.title = selectedTodo?.title;
                selectedTodo.description = selectedTodo?.description;
                selectedTodo.isCompleted = true;
                selectedTodo.isPending = selectedTodo?.isPending;
                allTodos.push(selectedTodo);
            });

            return {
                ...state,
                todos: [...allTodos],
                isEdit: false,
            };

        case CLEAR_ALL_TODO:
            return {
                ...state,
                todos: [],
            };

        default:
            return state;
                
    }
};
export default todoReducer;
