const courses = [
  "Hors d'oeuvres 开胃小菜",
  "Soup",
  "Fish",
  "Vegetable",
  "Main Course",
  "Dessert"
]

function getCourseName(number) {
  return courses[number]
}

function getAllCourseNames() {
  return courses
}

export { getAllCourseNames, getCourseName }
