import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, editTodo, markTodoCompleted, clearAlltodo } from "../redux/actions";

export const TodoLists = () => {
  const todos = useSelector((state) => state.todoReducer.todos);
  const dispatch = useDispatch();
  const [selectedTodo, setSelectedTodo] = useState([]);

  const actionClick = (data) => {
    if (data && data?.type === "edit") {
      dispatch(editTodo(data?.todo?.id));
    } else if (data && data?.type === "delete") {
      dispatch(deleteTodo(data?.todo?.id));
    }
  };

  const changeEvent = (e, todoId) => {
    if (e?.target?.name !== "select_all_todo" && e?.target?.checked === true) {
      if (selectedTodo.indexOf(todoId) === -1) {
        setSelectedTodo((todo) => [...todo, todoId]);
      }
    } else if (e?.target?.name !== "select_all_todo" && e?.target?.checked === false) {
      const todos = selectedTodo.filter((todo) => todo !== todoId);
      setSelectedTodo(todos);
    }

    if (e?.target?.name === "select_all_todo" && e?.target?.checked === true) {
      todos && todos.forEach((todo, index) => {
        const allChkbox = document.getElementsByName(`todo_${index}`);

        for (let chk of allChkbox) {
          chk.checked = true;
          let todoId = todo?.id;

          setSelectedTodo((todo) => [
            ...todo,
            todoId
          ]);
        }
      });
    }

    else if (e?.target?.name === "select_all_todo" && e?.target?.checked === false) {
      todos && todos.forEach((todo, index) => {
        const allChkbox = document.getElementsByName(`todo_${index}`);
        for (let chk of allChkbox) {
          chk.checked = false;
          setSelectedTodo([]);
        }
      });
    }
  };

  const markCompleted = () => {
    dispatch(markTodoCompleted(selectedTodo));
  };

  return (
    <div className="container my-2">
      <div className="row pb-4" style={{height: "60px"}}>
        <div className="col-xl-12 text-right">
          {selectedTodo.length > 0 && (
            <>
              <button
                className="btn btn-danger"
                onClick={() => dispatch(clearAlltodo())}
              >
                ОЧИСТИТЬ СПИСОК
              </button>
              <button
                className="btn btn-success ml-2"
                onClick={markCompleted}
              >
                ПОМЕТИТЬ КАК ГОТОВОЕ
              </button>
            </>
          )}
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th width="3%">
              <input
                type={"checkbox"}
                onChange={(e) => changeEvent(e)}
                name={"select_all_todo"}
              />
            </th>
            <th width="30%">ЗАДАЧА</th>
            <th width="42%">ОПИСАНИЕ</th>
            <th width="8%">СТАТУС</th>
            <th width="20%">ИЗМЕНИТЬ</th>
          </tr>
        </thead>

        <tbody>
          {todos && todos.map((todo, index) => (
            <tr key={index}>
              <td>
                <input
                  type={"checkbox"}
                  value={todo?.id}
                  onChange={(e) => changeEvent(e, todo?.id)}
                  name={`todo_${index}`}
                />
              </td>
              <td>{todo?.title}</td>
              <td>{todo?.description}</td>
              <td>
                {todo?.isCompleted ? (
                  <span style={{ color: 'green' }} className="badge badge-success p-2">ГОТОВО</span>
                ) : todo?.isPending ? (
                  <span style={{ color: 'red' }} className="badge badge-danger p-2">НЕГОТОВООО</span>
                ) : (
                  ""
                )}
              </td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => actionClick({ todo: todo, type: "edit" })}
                >
                  ИЗМЕНИТЬ
                </button>
                <button
                  className="btn btn-danger btn-sm ml-1"
                  onClick={() => actionClick({ todo: todo, type: "delete" })}
                >
                  УДАЛИТЬ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};