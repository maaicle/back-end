let vbObjects = [
    {
        type: 'goal',
        value: 'Be better'
    },
    {
        type: 'img',
        value: 'https://i.imgflip.com/v4lvq.jpg'
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
    res.status(200).send(vbObjects);
    },

    postVisionBoard: (req, res) => {
        vbObjects.push(req.body)
        console.log(vbObjects)
        res.status(200).send('Object Posted'); 
    },

    deletePost: (req, res) => {
        res.status(200).send('Object Deleted')
    }
}