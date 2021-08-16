library = [];

document.addEventListener("DOMContentLoaded", function () {
  display_library();
  //adds event to show form
  let show = document.querySelector("#showform_btn");
  show.addEventListener("click", showform);
  let form = document.querySelector("form");
  form.addEventListener("submit", add_book);
});

function Book(author, marker, title, pages) {
  this.author = author;
  this.marker = marker;
  this.title = title;
  this.pages = pages;
}

function display_library() {
  scroll = document.querySelector(".card-columns");
  scroll.innerHTML = "";
  let id_counter = -1;
  if (library.length > 0) {
    library.forEach((element) => {
      //set these varibles to say exactly whats needed in HTML
      let tick = "";
      let read = "";
      id_counter += 1;
      if (element.marker == "true") {
        tick = "checked";
        read = "<h3> Read </h3>";
      } else {
        tick = "";
        read = "<h3> Not read </h3>";
      }
      let newElement = document.createElement("div");
      //creates a div inserts the book information
      newElement.innerHTML = `<div class="card img-fluid" style="width:100%">
                                <div class="img-blur">
                                  <img class="card-img-top" src="paper.png" alt="Card image cap">
                                </div> 
                                <div class="card-img-overlay">
                                  <div class = 'wrapper'>
                                    <h2 class="card-title"> ${element.title}</h2>
                                    <h2 class="card-text">${element.author}</h2>
                                    <input class ='checkbox' id = "${id_counter}" "checkbox" type="checkbox" ${tick} style="display: block;">
                                    ${read}
                                    <button class = "deletebutton id = "delete_btn" data-id="${id_counter}">Delete</button>
                                    <h5>Pages  ${element.pages}</h5>
                                  </div>
                                </div>
                              </div>`;
      scroll.appendChild(newElement);
    });
    //runs this after its made all books
    //activates the delete function
    delete_btn();
    //activates the read not read function
    toggles();
  }
}

function add_book(e) {
  //stops a refresh of page
  e.preventDefault();
  const form = document.querySelector("form");
  const titleFromForm = document.querySelector("#title").value;
  const authorFromForm = document.querySelector("#author").value;
  const page = document.querySelector("#pages").value;
  const radios = document.querySelector("input[name=marker]:checked").value;
  form.reset();
  const show_form = document.querySelector("#showform");
  show_form.style.display = "none";
  new_book = new Book(authorFromForm, radios, titleFromForm, page);
  library.push(new_book);
  display_library();
}

function delete_btn() {
  //Gets all delete buttons
  let delete_btn = document.querySelectorAll(".deletebutton");
  //Makes an array
  Array.from(delete_btn)
    //Adds event listners on every button
    .forEach((element) =>
      element.addEventListener("click", function () {
        //The data-id is the same as the index in the library array
        let data = element.getAttribute("data-id");
        library.splice(data, 1);
        display_library();
      })
    );
}

function showform() {
  const show_form = document.querySelector("#showform");
  if (show_form.style.display == "none") {
    show_form.style.display = "block";
  } else {
    show_form.style.display = "none";
  }
}
B;
function toggles() {
  let checkbox = document.querySelectorAll(".checkbox");
  Array.from(checkbox).forEach((element) =>
    element.addEventListener("click", function () {
      //checked if it is checked
      if (element.checked) {
        library[element.id].marker = "true";
        display_library();
      } else {
        library[element.id].marker = "false";
        display_library();
      }
    })
  );
}
