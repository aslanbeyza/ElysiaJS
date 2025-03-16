import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

const app = new Elysia()
//.get("/", () => "Uygulamaya hosgeldiniz efenimm!!!")
//.get('/hello','Do you miss me')  http://localhost:3000/hello altına götürücek Do you miss me yazısını yazdırıcak
//.post('/hello', 'Do you miss me beyzoşş?') 
.use(swagger())  // http://localhost:3000/swagger altına gittiğimizde swagger dökümantasyonunu göstericek
.get('/', ({ path }) => path) // http://localhost:3000/ altına gittiğimizde / yazısını yazdırıcak
.get('/hello', ({ path }) => path) // http://localhost:3000/hello altına gittiğimizde /hello yazısını yazdırıcak
// .post('/hello', 'Do you miss me?')

.listen(3000); 

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
