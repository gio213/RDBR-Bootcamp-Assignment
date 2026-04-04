import React from "react";

const page = async () => {
  const courses = await fetch(
    "https://api.redclass.redberryinternship.ge/api/courses?page=2",
  ).then((res) => res.json());

  console.log(courses);
  return <div></div>;
};

export default page;
