import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";


class Note { 
  constructor(public data: string[] = ['Beyzoşş']) {} 
} 

const app = new Elysia()

.use(swagger()) 
.decorate('note', new Note()) 
.get('/note', ({ note }) => note.data) 
.listen(3000); 

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
