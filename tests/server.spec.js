const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it('GET /cafes. Comprobar status code 200 y tipo de dato', async () => {
        const response = await request(server).get("/cafes").send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object)
    })

    it('DELTE /cafes. Comprobar codifo 404 con id incorrecto en base de datos', async()=>{
        const jwt = "token";
        const idAEliminar = 100;
        const response = await request(server).delete(`/cafes/${idAEliminar}`).set("Authorization", jwt).send();
        expect(response.statusCode).toBe(404);
    })

    it('POST /cafes. Comprobar que se agregan datos correctamente y status code 201', async () => {
        const cafe = { id: Math.floor(Math.random() * 199), nombre: "Late" };
        const response = await request(server).post("/cafes").send(cafe);
        expect(response.statusCode).toBe(201);
        expect(response.body).toContainEqual(cafe);
    })

    it('PUT /cafes. Comprobar status code 400 si el id del parametro no coincide con el payload', async () => {
        const cafe = {id: 99, nombre: "Late Vainilla"};
        const response = await request(server).put("/cafes/100").send(cafe);
        expect(response.statusCode).toBe(400);
    })
});
