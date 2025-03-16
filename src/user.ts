import { password } from 'bun'
import { Cookie, Elysia, error, t } from 'elysia'

export const user = new Elysia({prefix:'/user'})

    .state({
        user: {} as Record<string,string>,
        session:{} as Record<string,string>
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
        body: t.Object({
            username:t.String({minLength:1}),
            password:t.String({minLength:8})
        })
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
        body: t.Object({
            username: t.String({minLength:1}),
            password:t.String({minLength:8})
        }),
        cookie: t.Cookie(
            {
                token:t.Number()
            },
            {
                secrets: 'seia'
            }
        )
    });
    






