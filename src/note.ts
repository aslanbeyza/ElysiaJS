import { Elysia, t } from 'elysia'

class Note {
    constructor(public data: string[] = ['beyza elysia ile tanisiyorrr']) {}

    add(note:string){
        this.data.push(note)
        return this.data
    }
    
    remove(index:number){
        return this.data.splice(index,1)
    }
    
    update(index:number, note:string){
        return(this.data[index] = note)
    }
}

export const note = new Elysia({prefix:'/note'})

.decorate('note', new Note())
.get('/', ({ note }) => note.data)
//Put
.put('/',({note,body:{data}})=>note.add(data),{
    body: t.Object({
        data:t.String()
    })
})
.guard({
    params:t.Object({
        index:t.Number()
    })
})
//Get
.get('/:index',({ note, params: { index }, error }) => {
    return note.data[index] ?? error(404, 'oops! :( ) ');
}
)
//delete
.delete('/:index',({note,params:{index},error})=>{
    if(index in note.data) return note.remove(index)
        return error(422)
})
//patch
.patch('/:index',({note,params:{index},body:{data},error})=>{
    if ( index in note.data) return note.update(index,data)
        return error(422)  //422:İstek sunucuya ulaşmıştır.Sunucu isteği anlamıştır.Ama içeriği işleyememektedir. ❌
},{
    body:t.Object({
        data:t.String()
    })
})
