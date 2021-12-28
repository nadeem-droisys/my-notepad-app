let addbtn = document.querySelector("#addBtn");
showNotes();
addbtn.addEventListener("click", (e) => {
  console.log("click", e);
  let addtxt = document.querySelector("#addTxt");
  let addTitle = document.querySelector("#addTitle");
  console.log(addtxt.value);
  let currentTime = String(new Date());
  let myTime = currentTime.substring(4,21)
  console.log(currentTime)
  let notes = localStorage.getItem("notes");
  if (addtxt.value != "" && addTitle.value !="") {
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let myArray = {title: addTitle.value, text: myTime, time: addtxt.value }
    notesObj.push(myArray);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtxt.value = "";
    addTitle.value = "";
    console.log(notesObj);
    showNotes();
  }
});

function showNotes(myTime) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  
  let html = "";
  notesObj.forEach((element, index) => {
    html += `<div class="noteCard card mx-3" style="margin-bottom: 2rem; width: 42%;">
        <div class="card-body">
          <h5 class="card-title">${index + 1} ${element.title}</h5>
          <p style="color: grey">${element.text}
          </p>
          <p class="card-text">${element.time}
          </p>
          <button id="${index}" onclick = "deleteNote(this.id)" id="deleteBtn" class="btn btn-primary">Delete note</button>
        </div>
      </div>`;
  });
  let notesElm = document.querySelector("#notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else if (notesObj.length == 0) {
    notesElm.innerText = `Add a note to see something!`;
  }
}
function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));   
showNotes();
}
var input = document.querySelector("#input")
input.addEventListener("input", function searchBar(){
    let a = input.value;
    console.log(a)
    let noteCard = document.getElementsByClassName("noteCard")
    Array.from(noteCard).forEach(function(element, index){
        let cardtext = document.getElementsByTagName("p")[index].innerText;
        if(cardtext.includes(a)){
            element.style.display = "block"
        }
        else{
            element.style.display = "none"
        }
    })
})

