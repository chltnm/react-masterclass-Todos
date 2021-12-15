import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
//Categories."TO_DO"로 사용 각 주어진 번호도 있음
//enum은 일련의 숫자를 문자로 표현

export interface IToDo {
  //toDos object 따라서 setToDos할때 이 문법 따라야함
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    // if (category == "TO_DO")
    //   return toDos.filter((toDo) => toDo.category === "TO_DO");
    // if (category == "DOING")
    //   return toDos.filter((toDo) => toDo.category === "DOING");
    // if (category == "DONE")
    return toDos.filter((toDo) => toDo.category === category);

    // [
    //   toDos.filter((toDo) => toDo.category === "TO_DO"),
    //   toDos.filter((toDo) => toDo.category === "DOING"),
    //   toDos.filter((toDo) => toDo.category === "DONE"),
    // ]; //[ TO_DO array , DOING array, DONE array ] 출력
  },
});
// atom value 중 하나를 get 해서 다르게 출력
