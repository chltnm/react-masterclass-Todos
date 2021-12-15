import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string; // input에서 submit한 value 이름
  category: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = (data: IForm) => {
    setToDos((oldToDos) => [
      { text: data.toDo, id: Date.now(), category }, //설정되어있는 category 에서 list 생성
      ...oldToDos,
    ]);
    setValue("toDo", "");
    setValue("category", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      {/* <input
        {...register("category", {
          required: false,
        })}
        placeholder="create category"
      ></input>
      <button>Add Category</button>
      <br></br>
      <br></br> */}
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
