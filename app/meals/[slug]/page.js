import { notFound } from "next/navigation";
import { getMeal } from "../../../lib/meals";
import style from "./page.module.css";
import Image from "next/image";
import DeleteMeal from "../../../components/meals/delete-meal";

export default async function MealDetailsPage({ params }) {
  const { slug } = await params;
  const meal = getMeal(slug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={style.header}>
        <div className={style.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={style.headerText}>
          <h1>{meal.title}</h1>
          <p className={style.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={style.summary}>{meal.summary}</p>
          <DeleteMeal slug={slug} />
        </div>
      </header>
      <main>
        <p
          className={style.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }} //inserts raw HTML into react components
        ></p>
      </main>
    </>
  );
}
