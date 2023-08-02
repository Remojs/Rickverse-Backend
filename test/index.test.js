const app = require('../src/app')
const session = require('supertest')
const request = session(app)

const character = {
    id: 923,
    name: 'thiago',
    species: 'human',
    gender: 'male',
    status: 'undefined',
    origin: {
        name: 'earth'
    },
    image: 'image.jpg'
};


describe('Route Testing', () => {
    describe("GET /rickandmorty/character/:id", () => {
        it('responde con status 200', async () => {
            const response = await request.get('/rickandmorty/character/1');
            expect(response.statusCode).toBe(200);
        })

        it('responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image" ', async () => {
            const response = await request.get('/rickandmorty/character/1');
            expect(response.body).toHaveProperty('id')
            expect(response.body).toHaveProperty('name')
            expect(response.body).toHaveProperty('species')
            expect(response.body).toHaveProperty('gender')
            expect(response.body).toHaveProperty('status')
            expect(response.body).toHaveProperty('origin')
            expect(response.body).toHaveProperty('image')
        })

        it('si hay un error responde con status 500', async () => {
            const response = await request.get('/rickandmorty/character/1e14');
            expect(response.statusCode).toBe(500);
        })
    })

    describe('GET /rickandmorty/login', () => {
        it('Responde con un objeto con la propiedad access en TRUE si la ionformacion del usuario es valida', async () => {
            const response = await request.get('/rickandmorty/login?email=Thiagozambonini24@gmail.com&password=Thiago123');
            const access = {access : true}
            expect(response.body).toEqual(access)
        })

        it('Responde con un objeto con la propiedad access en FALSE si la ionformacion del usuario es valida', async () => {
            const response = await request.get('/rickandmorty/login?email=abc4@gmail.com&password=abc123');
            const access = {access : false}
            expect(response.body).toEqual(access)
        })
    })

    describe('POST /rickandmorty/fav', () => {
        it('debe guardar un personaje en favoritos', async () => {
            const response = await request.post('/rickandmorty/fav').send(character);
            expect(response.body).toContainEqual(character)
        })

        it('debe agregar personajes a favoritos sin eliminar los existentes', async () => {
            character.id = 1923
            character.name = 'aaa'
            const response = await request.post('/rickandmorty/fav').send(character);
            expect(response.body.length).toBe(2)
        })
    })

    describe('DELETE /rickandmorty/fav/:id', () => {
        it('Si el ID solicitado no existe, deberia retornar un array con todos los favoritos', async () => {
            const response = await request.delete('/rickandmorty/fav/13452');
            expect(response.body.length).toBe(2)
        })

        it('Si el ID solicitado existe, deberia eliminarlo de favoritos', async () => {
            const response = await request.delete('/rickandmorty/fav/1');
            expect(response.body.length).toBe(1)
        })
    })
})
