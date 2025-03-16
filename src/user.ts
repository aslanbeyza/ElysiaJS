import { Elysia, t } from 'elysia'


export const user = new Elysia({prefix:'/user'})

    .state({
        user: {} as Record<string,string>,
        session:{} as Record<number,string>
    })

    .model({
        signIn : t.Object({
            username:t.String({minLength:1}),
            password:t.String({minLength:8})

        }),
        session:t.Cookie(
            {
                token:t.Number()
            },
            {
                secrets:'seia'
            }
        ),
        optionalSession : t.Optional(t.Ref('session'))
    })

.put('/sign-up',async({body:{username,password} ,store ,error}) => { 
    if(store.user[username])
        return error(400,{
        success:false,
        message:'User already exists'
})
    store.user[username] = await Bun.password.hash(password)
    return{
        success:true,
        message:'User created'
    }},{
       body:'signIn'
    })

    .post('/sign-in', async ({
        store: { user, session },
        error,
        body: { username, password },
        cookie: { token }
    }) => {
        // Kullanıcı adı kontrolü ve şifre doğrulama
        if (!user[username] || !(await Bun.password.verify(password, user[username]))) {
            return error(400, {
                success: false,
                message: 'Invalid username or password'
            });
        }
    
        // Rastgele session key oluştur
        const key = crypto.getRandomValues(new Uint32Array(1))[0]; // Parantez hatası düzeltildi
        session[key] = username; // Session dizinine doğru atama yapıldı
        token.value = key; // Cookie'ye atama yapıldı
    
        return {
            success: true,
            message: `Signed in as ${username}`
        };
    },{
        body:'signIn',
        cookie:'session'
    });
    
 user.get('/sign-out',({cookie: {token}})=>{
    token.remove()
    return{
        success:true,
        message:'Sign out'
    }
},{
    cookie:'session'
})

user.get('/profile', ({cookie: {token}, store:{session},error}) => {
    if (!token?.value) {
        return error(401, {
            success: false,
            message: 'Unauthorized'
        });
    }
    const username = session[token.value]
    if(!username)
        return error(401,{
            success:false,
            message:'Unauthorized'
        })
        return{
            success: true,
            username
        }
},{
    cookie:'session'
})


