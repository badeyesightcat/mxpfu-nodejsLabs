const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(JSON.stringify({users},null,4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email;
  let filtered_users = users.filter(user => user.email === email);
  res.send(JSON.stringify({filtered_users}, null, 4));
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  const { firstName, lastName, email, DOB } = req.query;
  const generated = {
    firstName,
    lastName,
    email,
    DOB
  };
  users.push(generated);
  res.send(`The user ${firstName} ${lastName} has been added!`);
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_users = users.filter(user => user.email === email);

  if (filtered_users.length > 0) {
    let filtered_user = filtered_users[0];
    let firstName = req.query.firstName;
    let lastName = req.query.lastName;
    let DOB = req.query.DOB;

    if (firstName) filtered_user.firstName = firstName;
    if (lastName) filtered_user.lastName = lastName;
    if (DOB) filtered_user.DOB = DOB;

    users = users.filter(user => user.email !== email);
    users.push(filtered_user);
    res.send(`User with the email ${email} updated.`);
  } else {
    res.send('Unable to find the user!');
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter(user => user.email !== email);
  res.send(`User with the email ${email} deleted`);
});


// GET request: Retrieve all users with the particular last name
router.get("/lastName/:lastName", (req, res) => {
    const lastName = req.params.lastName;

    const filtered_users = users.filter(user => user.lastName === lastName);

    res.send(filtered_users);
});

const getDateFromString = (dateStr) => {
    let [dd, mm, yyyy] = dateStr.split('-');
    return new Date(`${yyyy}/${mm}/${dd}`);
};

router.get("/sort/dob", (req, res) => {
    const sort = (a, b) => a.DOB - b.DOB;

    const modifiedDatesUsers = users.map(user => ({
        ...user,
        DOB: getDateFromString(user.DOB),
    }));
    const sorted_users = modifiedDatesUsers.sort(sort);

    res.send(sorted_users);
});


module.exports=router;
