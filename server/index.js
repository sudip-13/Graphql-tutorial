const express=require('express');
const { ApolloServer } =require('@apollo/server');
const {expressMiddleware} = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors=require('cors');
const {default:axios} = require('axios');
const {User}=require('./User');
const {Todo}=require('./Todo');

async function startServer(){
    const app=express();
    const server = new ApolloServer({
        typeDefs:`
        type Todo{
            id:ID!
            title:String!
            completed:Boolean
            user:User
        }
        type User
        {
            id:ID!
            name:String!
            username:String!
            email:String!
            phone:String!
            website:String!
        
        }
        type Query{
            getTodos:[Todo]
            getUser:[User]
            getUserById(id:ID!):User
        }`,
        resolvers:{
            Todo:{
                user:(todo)=>
                     User.find(e=>e.id===todo.id)

            },
            Query:{
                getTodos:()=>
                     Todo,
                getUser:()=>User,
               
                getUserById:(parent,{id})=>
                User.find(e=>e.id===id)
            }
        }
      });
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    await server.start();
    app.use('/graphql',expressMiddleware(server));

    app.listen(4000,()=>{
        console.log('Server is running on port 4000');
    });
}
startServer();