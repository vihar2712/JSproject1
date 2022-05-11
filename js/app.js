console.log("welcome to notes app.this is app.js");
showNotes();

let addBtn = document.getElementById('addBtn');

addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = 
    {
        title:addTitle.value,
        text: addTxt.value
    };
    if(myObj.title =='' ||myObj.text =='')
    {
        return false;
    }
    else{
        notesObj.push(myObj);
    }
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    // let addTitle = document.getElementById('addTitle');
    // let title = localStorage.getItem('title');
    //     if (title == null) {
    //         titleObj = [];
    //     }
    //     else {
    //         titleObj = JSON.parse(title);
    //     }
    //     titleObj.push(addTitle.value);
    //     localStorage.setItem("title", JSON.stringify(titleObj));
    addTitle.value='';
    console.log(notesObj);
    showNotes();
});


// function to show elements from local storage
function showNotes(element,index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    // let title = localStorage.getItem('title');
    //     if (title == null) {
    //         titleObj = [];
    //     }
    //     else {
    //         titleObj = JSON.parse(title);
    //     }
    let html = "";
    notesObj.forEach(function (element,index) {

        html += `<div class="noteCard mx-2 my-2 card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title"> ${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id = "${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    <button id = "${index + 1}"   onclick="impNote(this.id)" ondblclick="unmark(this.id)" class="btn btn-primary" style="background-color:#a83262;">Mark as IMPORTANT</button>
                    </div>
                </div>`;
                addTitle.value = "";
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show here. Use the "Add a Note" section.`;
        // alert("notes can not be empty");
    }

}

// function to delete notes

function deleteNote(index) {
    console.log('I am deleting note', index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    // titleObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // localStorage.setItem("title", JSON.stringify(titleObj));
    showNotes();
}
 
// search notes
let search = document.getElementById("searchTxt");

search.addEventListener("input", function (element) {
    let inputval = search.value.toLowerCase();
    console.log(`input query fired`, inputval);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let cardTitle = element.getElementsByTagName("h5")[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(inputval) || cardTitle.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
    
});

// mark as imp note
function impNote(ind) {
    console.log("marking it as an important note", ind);

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element, index) {
        if (index == ind - 1) {
            element.style.backgroundColor = '#d66364';
            element.getElementsByTagName("button")[1].innerHTML = 'marked as IMP';
        }
    });
}

// unmark the marked imp note


// localStorage.clear();