import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";
//interface만 가져와서 ToDo.text 안하고 그냥 key바로 써도 됨

function ToDo({ text, category, id }: IToDo) {
  const toDos = useRecoilValue(toDoState);
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.name;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      // const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      console.log(newToDo); //category가 바꼈기때문에

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  useEffect(() => {
    window.localStorage.setItem("toDos_key", JSON.stringify(toDos));
  }, [toDos]);

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
