//HTML elements as js variables
let fortuneBtn = document.querySelector('.fortuneBtn');
let visionBoard = document.querySelector('.vision-board');
let goalBtn = document.querySelector('.goalBtn');
let picBtn = document.querySelector('.picBtn');
let goalInpt = document.querySelector('.goalInpt');
let picURL = document.querySelector('.picURL');
let deleteBtn = document.querySelectorAll('.delete');

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
        console.log(res.data, res.data.length, res.data[0].type);
        res.data.forEach(ele =>{
            console.log(ele.type === 'goal');
            if (ele.type === 'goal') {
                let newEle = document.createElement('h2');
                let delBtn = document.createElement('button');
                delBtn.textContent = 'x';
                delBtn.classList.add('delete');
                newEle.textContent = ele.value;
                visionBoard.appendChild(newEle);
                newEle.appendChild(delBtn);
            } else if (ele.type === 'img') {
                let newEle = document.createElement('img')
                // let delBtn = document.createElement('button');
                // delBtn.textContent = 'x';
                newEle.setAttribute('src', ele.value)
                visionBoard.appendChild(newEle);
                // newEle.appendChild(delBtn);
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

let deletePost = () => {
    console.log('test');
    axios.delete(`${baseURL}/post`)
    .then(res => {
        console.log(res.data)
    })
}

//Listeners
fortuneBtn.addEventListener('click', getFortune);
goalBtn.addEventListener('click', postGoal);
picBtn.addEventListener('click', postImg);
// for (let i = 0; i < deleteBtn.length; i++) {
//     deleteBtn[i].addEventListener('click', deletePost)
// };

getVisionBoard();
