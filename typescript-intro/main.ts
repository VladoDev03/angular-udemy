console.log('Hello, World!')

const age: number = 19
const firstName: string = 'Vladimir'
const isStudent: boolean = true

const hobbies: string[] = ['Gym', 'Guitar', 'Blender', 'Photography']

const person: {
    name: string
    age: number
} = {name: 'Vladi', age: 20}

const friends: {
    name: string
    age: number
}[] = [{name: 'Vladi', age: 20}, {name: 'Ani', age: 18}, {name: 'Dancho', age: 13}]

// let course = 'Angular - The Complete Guide'
// course = 100 -> It is not going to compile!

// let id: string | number = '1'
// id = 1 -> Union types

type Student = {
    name: string,
    universityName: string,
    major: string
    age: number,
}

const student: Student = {
    name: 'Vladimir',
    universityName: 'NBU',
    major: 'Informatics',
    age: 19
}

function add(a: number, b: number): number {
    return a + b
}

console.log(add(10, 15))

function insertAtBeginning<T>(array: T[], value: T) {
    const newArray = [value, ...array]
    return newArray
}

const demoArray1 = [1, 2, 3]
const updatedArray1 = insertAtBeginning(demoArray1, -1) // [-1, 1, 2, 3]
Math.pow(updatedArray1[0], 2)

const demoArray2 = ['1, 2, 3', 'one', 'text']
const updatedArray2 = insertAtBeginning(demoArray2, '-1') // ['-1', '1, 2, 3', 'one', 'text']
updatedArray2[0].split('')

class Pet {
    public name: string
    public age: number
    public isArtificial: boolean
    private technologies: string[]

    constructor(name: string, age: number, isArtificial: boolean, technologies: string[]) {
        this.name = name
        this.age = age
        this.isArtificial = isArtificial
        this.technologies = technologies
    }

    giveInfo() {
        console.log(`Hello, I am ${this.name} and I am ${this.age} years old.`)
        console.log(`I am ${this.isArtificial ? 'artificial' : 'real'} and I was build with these technologies:`)

        for (let i = 0; i < this.technologies.length; i++) {
            console.log(`${i + 1}. ${this.technologies[i]}`)
        }
    }
}

const roboPet = new Pet('Robo', 1, true, ['C#', 'C++', 'Python'])
roboPet.giveInfo()

// class Pet {
//     constructor(public name: string,
//         public age: number,
//         public isArtificial: boolean,
//         private technologies: string[]
//     ) {}

//     giveInfo() {
//         console.log(`Hello, I am ${this.name} and I am ${this.age} years old.`)
//         console.log(`I am ${this.isArtificial ? 'artificial' : 'real'} and I was build with these technologies:`)

//         for (let i = 0; i < this.technologies.length; i++) {
//             console.log(`${i + 1}. ${this.technologies[i]}`)
//         }
//     }
// }

interface Human {
    firstName: string
    age: number

    greet: () => void
}

const vladi: Human = {
    firstName: 'Vladi',
    age: 19,
    greet() {
        console.log('Hi!')
    }
}

class Professor implements Human {
    firstName: string
    age: number
    greet() {
        console.log('Exaaams for everybodyyy!')
    }
}
