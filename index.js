const express = require('express');
const app = express();
const express_graphql = require('express-graphql');
const { buildSchema }   = require('graphql'); 

//data
const { courses } = require('./data.json');

const schema = buildSchema(`
    type Query {
      course(id: Int!): Course
      courses(topic: String): [Course]
    }

    type Course{
        id: Int
        tittle: String
        author: String
        topic: String
        url: String
    }

    `);

let getCourse = (args) =>{
    let id = args.id;
    return courses.filter(course => {
      return course.id == id;
    })[0];
}
let getCourses = (args) =>{
    if(args.topic){
        let topic = args.topic;
        return courses.filter(course => course.topic === topic);
    }else{
        return courses;
    }
}
const root   = {
    course: getCourse,
    courses: getCourses
};
app.use('/graphql', express_graphql({
    schema:schema,
    rootValue:root,
    graphiql:true
}));

app.listen(
    3000,
    () => console.log("Server started")
);