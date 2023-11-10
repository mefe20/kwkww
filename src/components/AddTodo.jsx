import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, updateTodo } from "../redux/actions";

export const AddTodo = () => {
  const [value, setValue] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const isEdit = useSelector((state) => state.todoReducer.isEdit);
  const editTodo = useSelector((state) => state.todoReducer.editTodo);

  useEffect(() => {
    editTodo && setValue(() => editTodo);
  }, [editTodo]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!value?.title) {
      setError((error) => ({
        ...error,
        title: 'ВВЕДИ НАЗВАНИЕ ЗАДАЧИ',
      }));
      return;
    }
    if (!value?.description) {
      setError((error) => ({
        ...error,
        description: 'ВВЕДИ ОПИСАНИЕ ЗАДАЧИ'
      }));
      return;
    }

    if (isEdit) {
      dispatch(updateTodo(editTodo.id, value));
    }
    else {
      dispatch(addNewTodo(value));
    }
    setValue({title: '', description: ''});
    document.getElementById("todoForm").reset();
  };

  const changeEvent = (e) => {
    setValue(
      {
        ...value,
        [e.target.name]: e.target.value,
      },
    );
    if (e?.target?.name === "title") {
      setError({
        title: "",
      });
    }
    if (e?.target?.name === "description") {
      setError({
        description: ""
      });
    }
  };

  return (
    <div className="container my-4 py-1 border">
      <form className="mt-3 mb-2" id="todoForm" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-xl-3">
            <label className="sr-only">ЗАДАЧА</label>
            <input
              type="text"
              name="title"
              className="form-control mb-2 mr-sm-3"
              placeholder="НАЗВАНИЕ ЗАДАЧИ"
              defaultValue={value?.title}
              onChange={(e) => changeEvent(e)}
            />
            <span className="text-danger">{error?.title}</span>
          </div>

          <div className="col-xl-3">
            <label className="sr-only">ОПИСАНИЕ</label>
            <input
              type="text"
              name="description"
              className="form-control mb-2 mr-sm-3"
              placeholder="ОПИСАНИЕ"
              defaultValue={value?.description}
              onChange={(e) => changeEvent(e)}
            />
             <span className="text-danger">{error?.description}</span>
          </div>

          <div className="col-xl-2">
            <button className="btn btn-primary mb-2" type="submit"> {isEdit ? 'ОБНОВИТЬ' : 'СОЗДАТЬ'} </button>
          </div>
        </div>
      </form>
    </div>
  );
};