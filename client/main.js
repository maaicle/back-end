//HTML elements as js variables
let fortuneBtn = document.querySelector('.fortuneBtn');
let visionBoard = document.querySelector('.vision-board');
let postBtn = document.querySelector('.postBtn');
let picBtn = document.querySelector('.picBtn');
let goalInpt = document.querySelector('.goalInpt');
let picURL = document.querySelector('.picURL');
let firstGoal = document.querySelector('h2');
let form = document.querySelector('form');

//Other js variables
const baseURL = 'http://localhost:4000/api';

//Functions
document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
  };

let getFortune = () => {
    axios.get(`${baseURL}/fortune`)
    .then(res => alert(res.data))
};

let getVisionBoard = () => {
    visionBoard.innerHTML = '';
    axios.get(`${baseURL}/visionBoard`)
    .then(res => {
        res.data.forEach(ele =>{
            if (ele.type === 'goal') {
                // create image container
                let newDiv = document.createElement('form')
                newDiv.classList.add('post-div');
                visionBoard.appendChild(newDiv);
                //Add the text, delete and edit buttons to the new div
                newDiv.innerHTML =
                    `<h2>${ele.value}</h2>` +
                    `<div>` +
                    `<button class='delete postBtn' id=${ele.id}></button>` +
                    `<button class='edit goal-post' id=${ele.id}></button>` +
                    '</div>';
            } else if (ele.type === 'img') {
                //Same as above but for image
                let newDiv = document.createElement('div')
                newDiv.classList.add('post-div');
                visionBoard.appendChild(newDiv);
                newDiv.innerHTML = 
                    `<img src=${ele.value}>` +
                    `<div>` +
                    `<button class='delete' id=${ele.id}></button>` +
                    `<button class='edit img-post' id=${ele.id}></button>` +
                    '</div>';
            }
        })        
    }) 
};

let createPost = event => {
    event.preventDefault();
    //set variables
    let tar = event.target;
    let selected = tar.querySelector('select').value;
    let input = tar.querySelector('input').value;
    let imgType = input.split('.').pop().toLowerCase();
    let validImage = ['jpeg', 'gif', 'jpg', 'png', 'bmp'];
    let isImage = validImage.includes(imgType);
    let validationNode = tar.querySelector('h3');
    let body = {
        type: selected,
        value: input
    }
    //Remove old validation message
    if(validationNode) {
        tar.removeChild(validationNode);
    }
    //Validate the post then create if no errors. 
    if (!input) {
        let newEle = document.createElement('h3');
        newEle.textContent = 'Must enter a value';
        tar.appendChild(newEle);
    } else if (selected === 'img' && !isImage) {
        let newEle = document.createElement('h3');
        newEle.textContent = 'Submit a valid image';
        tar.appendChild(newEle);
    } else {
        axios.post(`${baseURL}/visionBoard`, body)
        .then(res => {
            console.log(res.data);
            getVisionBoard();
        })
    }
    tar.querySelector('input').value = '';
}

let deletePost = event => {
    event.preventDefault();
    axios.delete(`${baseURL}/post/${event.target.id}`)
    .then(res => {
        console.log(res.data);
        getVisionBoard();
    })
}

//changes the post into an edit form
let editForm = event => {
    event.preventDefault();
    let tar = event.target;
    let btnId = tar.id;
    let classList = tar.classList;
    //Set default value for goal posts edits
    if (classList.contains('goal-post')) {
        let curText = tar.parentNode.parentNode.querySelector('h2').textContent;
        tar.parentNode.innerHTML = 
        `<input class='editInpt' value="${curText}"">` +
        `<button class='submit-edit' id=${btnId}>Submit</button>` +
        `<button class='cancel'>Cancel</button>`;
    //Set default value for image posts edits
    } else if (classList.contains('img-post')) {
        let curSrc = tar.parentNode.parentNode.querySelector('img').src;
        tar.parentNode.innerHTML = 
        `<input class='editInpt' value="${curSrc}"">` +
        `<button class='submit-edit' id=${btnId}>Submit</button>` +
        `<button class='cancel'>Cancel</button>`;
    }
}

//Sends the edited field to the back end to update "database"
let submitEdit = event => {
    event.preventDefault();
    let newVal = event.target.parentNode.querySelector('input').value;
    let body = {
        newVal: newVal
    };
    axios.put(`${baseURL}/post/?id=${event.target.id}`, body)
    .then(res => {
        console.log(res.data);
        getVisionBoard();
    })
}

//This function is a catch all function to add functionality to elements added to the DOM (edit & delete buttons).
let newTargets = event => {
    // event.preventDefault();
    let ele = event.target;
    //Call function for the delete button.
    if(ele.classList.contains('delete')) {
        deletePost(event);
    //Call function for the edit button
    } else if(ele.classList.contains('edit')) {
        editForm(event);
    //Call function for the submit edit button
    } else if(ele.classList.contains('submit-edit')) {
        submitEdit(event);
    //Resets teh vision board
    } else if(ele.classList.contains('cancel')) {
        getVisionBoard();
    }
}

//Listeners
fortuneBtn.addEventListener('click', getFortune);
form.addEventListener('submit', createPost);
//Listens anytime anything is clicked in the document. newTargets function deciphers the target.
document.addEventListener('click', newTargets);


getVisionBoard();


