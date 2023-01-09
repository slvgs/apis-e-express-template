import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, student } from './database'
import { TCourse, TStudent } from './types'

const app = express()



app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

//Primeiro EndPoint

app.get('/courses', (req: Request, res: Response) => {
    res.status(200).send(courses)

})

//SEGUNDO ENDPOINT

app.get('/courses/search', (req: Request, res: Response) => {

    const q = req.query.q as string

    const result = courses.filter((course) => {

        return course.name.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    })

    res.status(200).send(result)

})

//TERCEIRO ENDPOINT

app.post('/courses', (req: Request, res: Response) => {

    //       FORMA MAIS VERBOSA
    // const id = req.body.id as string
    // const name = req.body.name as string
    // const lessons = req.body.lessons as number
    // const stack = req.body.stack as COURSE_STACK

    //         FORMA DE DESISTRUTURAÇÃO (mais simples):
    const {id, name, lessons, stack} = req.body as TCourse

    const newCourse = {
        id,
        name,
        lessons,
        stack
    }

    courses.push(newCourse)

    res.status(201).send("Curso registrado com sucesso <3")
})

app.get('/student', (req: Request, res: Response) => {
    res.status(200).send(student)
})

app.get('/student/search', (req: Request, res: Response) => {
     
    const q = req.query.q as string

    const result = student.filter((stu) => {
        return stu.name.toLocaleLowerCase().includes(q)
    })

    res.status(201).send(result)

})

app.post('/student', (req: Request, res: Response) => {
    const {name, age, id} = req.body as TStudent

    const newStudent = {
        name, 
        age,
        id
    }

    student.push(newStudent)

    res.status(201).send("Aluno registrado com sucesso!")
})