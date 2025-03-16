import { Elysia, t } from 'elysia'

class Note {
    constructor(public data: string[] = ['Moonhalo']) {}
}

export const note = new Elysia()
.decorate('note', new Note())
.get('/note', ({ note }) => note.data)
.get('/note/:index',({ note, params: { index }, error }) => {
    return note.data[index] ?? error(404, 'oops! :( ) ');
}
,{
    params: t.Object({
        index: t.Number()
    })
})
