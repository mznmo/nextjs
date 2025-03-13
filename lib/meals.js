import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db"); //establishing database connection

export function getMeals() {
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals where slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true }); //lowercase
  meal.instructions = xss(meal.instructions);

  const imgID = Math.random() * 100;

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}_${imgID}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (err) => {
    if (err) {
      throw new Error("Error saving file");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `
  ).run(meal);
}

export function deleteMeals(slug) {
  db.prepare("DELETE FROM meals WHERE slug =?").run(slug);
}
