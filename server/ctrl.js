let idGen = 4;

let vbObjects = [
    {
        id: 0,
        type: 'img',
        value: 'https://media.giphy.com/media/26ueZpF95CyH5sWY0/giphy-downsized.gif'
    },
    {
        id: 1,
        type: 'img',
        value: 'https://graphicdesignjunction.com/wp-content/uploads/2012/08/landscape-replection-photography-12.jpg'
    },
    {
        id: 2,
        type: 'img',
        value: 'https://i.imgflip.com/v4lvq.jpg'
    },
    {
        id: 3,
        type: 'goal',
        value: 'Improve my javascript skills'
    }
];

module.exports = {
    getCompliment: (req, res) => {
    const compliments = [
        "Gee, you're a smart cookie!",
        "Cool shirt!",
        "Your Javascript skills are stellar.",
    ];
    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];
    res.status(200).send(randomCompliment);
    },
      
    getFortune: (req, res) => {
    const fortunes = [
        "The change you started already have far-reaching effects. Be ready.",
        "You have a shrewd knack for spotting insincerity.",
        "You have the power to write your own fortune.",
        "Use your eloquence where it will do the most good.",
        "Welcome change."
    ];
    // choose random fortune
    let randomIndex = Math.floor(Math.random() * fortunes.length);
    res.status(200).send(fortunes[randomIndex]);
    },
    
    getVisionBoard: (req, res) => {
    res.status(200).send(vbObjects.sort((a, b) => b.id - a.id));
    },

    postVisionBoard: (req, res) => {
        let reqBody = req.body;
        reqBody.id = idGen;
        idGen++;
        vbObjects.push(reqBody)
        res.status(200).send('Object Posted'); 
    },

    deletePost: (req, res) => {
        let idIndex = 0;
        vbObjects.forEach((ele, index) => {
            if(+req.params.id === ele.id) {
                idIndex = index;
            }
        })
        vbObjects.splice(idIndex, 1)
        res.status(200).send('Post Deleted')
    },

    editPost: (req, res) => {
        let id = +req.query.id;
        let type = '';
        let {newVal} = req.body;
        let idIndex = -1;
        vbObjects.forEach((ele, index) => {
            if(ele.id === id) {
                idIndex = index;
                type = ele.type;
            }
        })
        let newBody = {
            id: id,
            type,
            value: newVal
        }
        vbObjects.splice(idIndex, 1, newBody);
        res.status(200).send('Post Updated');
    }   
} 