const URL = 'https://rickandmortyapi.com/api/character/'
const axios = require('axios')

const getCharById = async (req, res) => {
  try {
      const { id } = req.params; //obtengo el id de los req.params
      const { data } = await axios(`${URL}${id}`); //obtengo la data con destructuring de lo q obtengo del axios
      const { status, name, species, origin, gender, image, location, type, episode } = data //obtengo los datos q necesito de data con destructuring
    
      if(!name) throw Error(`ID: ${id} Not Found`) //si esta mal tiramos error

      const character = { //creamos el character para pasarlo al front en base al id q se pasa
        id,
        name,
        species,
        origin,
        gender,
        image,
        status,
        location,
        type, 
        episode
      };
      return res.status(200).json(character); //devolvemos el character

  } catch (error) {
    return error.message.includes('ID') //verificamos si el error message tiene ID o no
    ? res.status(404).send(error.message) //recibimos el error de arriba y lo tiramos (error del cliente)
    : res.status(500).send(error.message); //No tira error arriba por lo que tiramos el error del servidor.
  }
};

module.exports = {
getCharById,
};