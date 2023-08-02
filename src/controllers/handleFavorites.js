let myFavorites = [];

const postFav = (req, res) => {
    try{
        const character = req.body;
        const characterFound = myFavorites.find(fav => fav.id === character.id); 

    if(characterFound) throw Error('ya existe ese personaje en favoritos')

        myFavorites.push(character)
        return res.status(200).json(myFavorites)

    } catch(error){
        return res.status(404).send('ya existe ese personaje en favoritos')
    }
}

const deleteFav = (req, res) => {
    const {id} = req.params;

    myFavorites = myFavorites.filter((favorite) => favorite.id !== id)

    return res.status(200).json(myFavorites);
}

module.exports = {
    postFav,
    deleteFav
};