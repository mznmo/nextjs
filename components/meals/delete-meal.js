import style from "./delete-meal.module.css";
import { deleteMeal } from "../../lib/action";

export default function DeleteMeal({ slug }) {
  async function handleDelete() {
    "use server"; // Ensures server-side execution
    await deleteMeal(slug);
  }

  return (
    <button className={style.button} onClick={handleDelete}>
      Delete
    </button>
  );
}
