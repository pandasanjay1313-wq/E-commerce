import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));



////////////////////// one //////////////////////////////
  const students = [
 {name:"John", age:20},
 {name:"Sam", age:16},
 {name:"Raj", age:22}
];

const result = students
  .filter(student => student.age > 18)
  .map(student => student.name);

console.log(result);
///////////////////////// two //////////////////////////////////////
 const studentss=[{name:'john',
  mark:50},
  {name:'ravi',
  mark:75},
{name:'kumar',
  mark:75}];

const results=studentss.filter(std =>std.mark===75)
          .map(students=>({name:students.name}));
console.log(results);

////////////////////////// three /////////////////////////////////////

const user =[{id:1, name:"sanjay", age:22, mark:82},
            {id:2, name:"mohan", age:15, mark:80},
            {id:3, name:"siddhu", age:25, mark:90},
            {id:4, name:"siddhu", age:18, mark:82}
];

const res = user.filter(user => user.age >= 18)
  .filter(user => user.mark >= 80)
  .map(user => ({ name: user.name, mark:user.mark}))
  .filter(user =>user.name === "siddhu" )
console.log(res);
//////////////////////////// four ///////////////////////////////////////////
const users =[{id:1, name:"raja", age:22},
              {id:1, name:"sanjay", age:20,},
              {id:1, name:"sri", age:18}
];

const use = users.map(uses=>({...uses,status: 'Active'}))
console.log(use);
///////////////////////////////////////////////////////////////////////
// const res = user.filter(function(user){
//   return user.age>=18;
// });

///////////////////////////// five //////////////////////////////////
const person ={
   id: 1,
  name: "Sanjay",
  age: 22
};

const newPerson ={
  ...person
};

console.log(newPerson);

///////////////////////////// six ////////////////////////////////////

const arr = [[10,20],[30,40],[50,60]];

const array = arr.flat();

console.log(array);

const ar =[1,[2,[3,[4,[5]]]]];
console.log(ar.flat(Infinity));
/////////////////////////// seven ///////////////////////////////
const dtl = [
  {name:'san',
    skill:['html','css']
  },
  {name:'raja',
    skill:['angular','typescript']
  }
];

const detl = dtl.map(d => d.skill)
              .flat();
  console.log(detl);

////////////////////////// eight ////////////////////////////////

const std = [
    {
    name: "Sanjay",
    age: 22,
    skills: ["HTML", "CSS"]
  },
  {
    name: "Mohan",
    age: 15,
    skills: ["Java"]
  },
  {
    name: "Rahul",
    age: 25,
    skills: ["Angular", "TypeScript"]
  }
];

const satd = std
        .filter(S => S.age>=18)
        .map(A => A.skills)
        .flat()

console.log(satd);        
//////////////////////////// nine ///////////////////////////////////////

const numbers= [10,20,30];
console.log(Array.isArray(numbers));

const name = "sanjay";
console.log(Array.isArray(name));

const obj = [   {
    name: "Sanjay",
    age: 22,
    skills: ["HTML", "CSS"]
  },
  {
    name: "Mohan",
    age: 15,
    skills: ["Java"]
  },
  {
    name: "Rahul",
    age: 25,
    skills: ["Angular", "TypeScript"]
  }];

  console.log(Array.isArray(obj));

//////////////////////////////// ten //////////////////////////////////////
  const sub =[   {
    name: "Sanjay",
    age: 22,
    skills: ["HTML", "CSS"]
  },
  {
    name: "Mohan",
    age: 15,
    skills: ["Java"]
  },
  {
    name: "Sahul",
    age: 25,
    skills: ["Angular", "TypeScript"]
  }];

  const subj = sub.filter(subje => subje.name.startsWith("S"))
                .map(subje=>subje.name);
  console.log(subj);