//HTML elements as js variables
let fortuneBtn = document.querySelector('.fortuneBtn');
let visionBoard = document.querySelector('.vision-board');
let goalBtn = document.querySelector('.goalBtn');
let picBtn = document.querySelector('.picBtn');
let goalInpt = document.querySelector('.goalInpt');
let picURL = document.querySelector('.picURL');
let firstGoal = document.querySelector('h2');

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
                let newDiv = document.createElement('div')
                visionBoard.appendChild(newDiv);
                //Add the text, delete and edit buttons to the new div
                newDiv.innerHTML =
                    `<h2>${ele.value}</h2>` +
                    `<button class='delete' id=${ele.id}>x</button>` +
                    `<button class='edit goal-post' id=${ele.id}>edit</button>`;
            } else if (ele.type === 'img') {
                //Same as above but for image
                let newDiv = document.createElement('div')
                visionBoard.appendChild(newDiv);
                newDiv.innerHTML = 
                    `<img src=${ele.value}>` +
                    `<button class='delete' id=${ele.id}>x</button>` +
                    `<button class='edit img-post' id=${ele.id}>edit</button>`;
            }
        })        
    
    })     
};

let postGoal = () => {
    if (goalInpt.value) {
        let body = {
            type: 'goal',
            value: goalInpt.value
        }
        axios.post(`${baseURL}/visionBoard`, body)
        .then(res => {
            getVisionBoard();
        })
    } else {
    console.log('No value submitted')
    }
}

let postImg = () => {
    if (picURL.value) {
        let body = {
            type: 'img',
            value: picURL.value
        }
        axios.post(`${baseURL}/visionBoard`, body)
        .then(res => {
            getVisionBoard();
        })
    } else {
    console.log('No value submitted')
    }
}

let deletePost = event => {
    axios.delete(`${baseURL}/post/${event.target.id}`)
    .then(res => {
        console.log(res.data)
        getVisionBoard();
    })
}

let editForm = event => {
    let tar = event.target;
    let btnId = tar.id;
    let classList = tar.classList;
    if (classList.contains('goal-post')) {
        let curText = tar.parentNode.querySelector('h2').textContent;
        tar.parentNode.innerHTML = 
        `<input class='editInpt' value="${curText}"">` +
        `<button class='submit-edit' id=${btnId}>Submit</button>` +
        `<button class='cancel'>Cancel</button>`;
    } else if (classList.contains('img-post')) {
        let curSrc = tar.parentNode.querySelector('img').src;
        tar.parentNode.innerHTML = 
        `<input class='editInpt' value="${curSrc}"">` +
        `<button class='submit-edit' id=${btnId}>Submit</button>` +
        `<button class='cancel'>Cancel</button>`;
    }
}

let submitEdit = event => {
    let newVal = event.target.parentNode.querySelector('input').value;
    let body = {
        newVal: newVal
    };
    axios.put(`${baseURL}/post/?id=${event.target.id}`, body)
    .then(res => getVisionBoard())
}

//This function is a catch all function to add functionality to elements added to the DOM (edit & delete buttons).
let newTargets = event => {
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
goalBtn.addEventListener('click', postGoal);
picBtn.addEventListener('click', postImg);
//Listens anytime anything is clicked in the document. newTargets function deciphers the target.
document.addEventListener('click', newTargets);


getVisionBoard();


