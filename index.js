const express=require('express');
const Joi=require('joi');

const app= express();


app.use(express.json());

const courses=[
    {
        id:1,
        name:"Python for beginners"
    },
    {
        id:2,
        name:"JS for beginners"
    },
    {
        id:3,
        name:"Ruby for beginners"
    },

]


app.get('/',(req,res)=>{
   res.send("Hello World");
});

//get all courses
app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

//get one course
app.get('/api/courses/:id',(req,res)=>{
  const course =courses.find(c=>c.id===parseInt(req.params.id));
  if(!course) return res.send("Course not found");
  res.send(course);

  
});

//create new course
app.post('/api/courses',(req,res)=>{

  const schema={
      name:Joi.string().min(3).required()
  }

  const {error}=validateCourse(req.body);

  if(error){
      res.status(400).send(error.details[0].message);
  }

  const course={
      id: courses.length +1,
      name:req.body.name
  };

  courses.push(course);

  res.send(course);
});



//update a course

app.put('/api/courses/:id',(req,res)=>{

    //lookup the course
    const course =courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found");


    //validate the input
    const {error} = validateCourse(req.body);

    if (error){
        res.status(400).send(error.details[0].message);
    }

    course.name=req.body.name;

    res.send(course);

});

const validateCourse=(course)=>{
    const schema={
        name:Joi.string().min(3).required()
    }
  
    return Joi.validate(course,schema);

};

//delete the course
app.delete('/api/courses/:id',(req,res)=>{
    //lookup the course
    const course =courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found");
    
    

    //delete the course

    const index=courses.indexOf(course);

    courses.splice(index,1); //delete a course

    res.send(course);
});

const port =(process.env.PORT||3000);
app.listen(port,()=>{
   console.log("Listening on port "+port);
   
});