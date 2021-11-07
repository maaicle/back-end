const helpCont = document.querySelector('.help-cont');
const overlayCont = document.querySelector('.overlay-cont');

let focusDiv = null;
let helpText = null;
let helpPic = null;
let helpBtnDiv = null;

let helpStep = 1;

const runHelp = () => {
    console.log(helpStep);
    if (helpStep === 0) {
        removeFocusDiv();
        helpCont.removeAttribute('style')
        helpCont.innerHTML = '';
        overlayCont.innerHTML = '';
    } else if (helpStep === 1) {
        setFocusDiv('home');
        helpCont.innerHTML = '';
        overlayCont.innerHTML = '';
        let helpEle = document.createElement('div');
        let overlay = document.createElement('div');
        helpEle.classList.add('help');
        overlay.classList.add('overlay');

        helpEle.innerHTML =
            "<div class='help-card'>" +
                "<p class='help-text'>" +
                    "Welcome! This is a tutorial of my webpage. The <button class='help-exit help-btn'></button> button " +
                    "will exit the tutorial and the <button class='help-next help-btn'></button> button " +
                    "will go to the next card. The home button restarts the tutorial." +
                "</p>" +
                "<div class='help-pic'></div>" +
                "<div class='help-btn-div'>" +
                    "<button class='help-exit help-btn'></button>" +
                    "<button class='help-next help-btn'></button>" +
                "</div>" +
            "</div>"

        helpCont.appendChild(helpEle);
        overlayCont.appendChild(overlay);
        helpText = document.querySelector('.help-text');
        helpPic = document.querySelector('.help-pic');
        helpCard = document.querySelector('.help-card');
        helpBtnDiv = document.querySelector('.help-btn-div');

    } else if (helpStep === 2) {
        removeFocusDiv();
        helpText.textContent = "I've seperated the tutorial styling and script into seperate files" +
            " so that they are not mixed in with the files for the actual assignment.";
        helpPic.style["content"] = 'url(../pics/tutorial-files.png)';

    } else if (helpStep === 3) {
        setFocusDiv('headBtns');
        helpPic.removeAttribute('style');
        helpText.textContent = "These buttons will go to the backend to pull a random compliment or fortune. That value is returned" +
            " to the front end and displayed as an alert.";

    } else if (helpStep === 4) {
        removeFocusDiv();
        setFocusDiv('post-div');
        helpCard.style.width = '350px'
        helpText.innerHTML = "Custom function #1 - getVisionBoard<br><br>" +
        "This is a post.<br><br>" +
        "Posts are stored on the back end in an array.<br><br>" +
        "There is a get call that returns all posts from the back end and sends them to the front end.<br><br>" +
        "They are stored in what is called the vision board.";
    } else if (helpStep === 5) {
        removeFocusDiv();
        setFocusDiv('post-form');
        helpCard.removeAttribute('style');
        helpText.innerHTML = "Custom function #2 - createPost<br><br>" +
        "You can add posts through this form.<br><br>" +
        "The drop down defaults to Goal. While this option is selected enter a goal text and click post to submit it to the vision board.<br><br>" +
        "Select image and post an image URL to send an image to the vision board.<br><br>" +
        "Errors return when trying to post an empty value or when an invalid image file is selected.<br><br>" +
        "The post button invokes the createPost function. This sends a body containing the value and type of post to the back end.<br><br>" +
        "The back end gives it an ID and adds it to the post array.<br><br>" +
        "createPost will then invoke the getVisionBoard function to display the new post.<br><br>";
    } else if (helpStep === 6) {
        removeFocusDiv();
        setFocusDiv('delete');
        helpCont.style.right = "20px";
        helpCont.style.left = 'auto';
        helpText.innerHTML = "Custom Function #3 - deletePost<br><br>" +
        "The X button at the bottom of every post invokes the deletePost function.<br><br>" +
        "deletePost will remove the post by sending a delete call to the back end with a parameter value of the post's ID.<br><br>" +
        "The back end will splice the post out of the post array.<br><br>" +
        "The getVisionBoard function is invoked to return the current array of posts.<br><br>";
    } else if (helpStep === 7) {
        removeFocusDiv();
        setFocusDiv('edit');
        helpText.innerHTML = "Custom Function #4 - editPost<br><br>" +
        "The pencil button at the bottom of every post will create an edit form.<br><br>" +
        "This form asks for a new value to replace the current one. When the edit form is submitted it invokes the editPost function.<br><br>" +
        "editPost sends a put call with a body and query to the backend. The query contains the ID where the body contains the new value.<br><br>" +
        "The back end updates the appropriate object in the post array.<br><br>" +
        "The getVisionBoard function is invoked to return the current array of posts.<br><br>"
        helpPic.style["content"] = 'url(../pics/edit-form.png)'; 
    } else if (helpStep === 8) {
        removeFocusDiv();
        helpPic.removeAttribute('style');
        helpBtnDiv.removeChild(helpBtnDiv.childNodes[1]);
        helpText.innerHTML = "Give it a whirl! Have fun!"
    }
}

const removeFocusDiv = () => {
    focusDiv.removeAttribute('style');
}

const setFocusDiv = htmlClass => {
    focusDiv = document.querySelector(`.${htmlClass}`);
    focusDiv.style['z-index'] = '101';
    focusDiv.style['box-shadow'] = '0px 0px 15px 5px rgba(255, 255, 190, .75)';
};


let helpTargets = event => {
    let ele = event.target;

    if(ele.classList.contains('home')) {
        helpStep = 1;
        runHelp(); 
    } else if (ele.classList.contains('help-exit')) {
        helpStep = 0;
        runHelp();
        console.log('exit');
    } else if (ele.classList.contains('help-next')) {
        helpStep++;
        runHelp();
    }
}

document.addEventListener('click', helpTargets);

runHelp();