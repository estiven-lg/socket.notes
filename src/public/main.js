const form = document.querySelector("#formNotes");

const id = document.querySelector("#idNote");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(id.value)
  if(id.value!==''){
    updateNote({ id:id.value , title:title.value, description:description.value })
  }else{
    
    saveNote({ title:title.value, description:description.value });
  }
  // console.log(title.value,description.value)
  
  id.value = ""
title.value = "";
description.value ="";
  
});
