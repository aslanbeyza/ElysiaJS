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

export const note = new Elysia()
.decorate('note', new Note())
.get('/note', ({ note }) => note.data)
//Put
.put('/note',({note,body:{data}})=>note.add(data),{
    body: t.Object({
        data:t.String()
    })
})
//Get
.get('/note/:index',({ note, params: { index }, error }) => {
    return note.data[index] ?? error(404, 'oops! :( ) ');
}
,{
    params: t.Object({
        index: t.Number()
    })
})
//delete
.delete('/note/:index',({note,params:{index},error})=>{
    if(index in note.data) return note.remove(index)
        return error(422)
},{
    params: t.Object({
        index:t.Number()
    })
})
//patch
.patch('/note/:index',({note,params:{index},body:{data},error})=>{
    if ( index in note.data) return note.update(index,data)
        return error(422)
},{
    params:t.Object({
        index:t.Number()
    }),
    body:t.Object({
        data:t.String()
    })
})
