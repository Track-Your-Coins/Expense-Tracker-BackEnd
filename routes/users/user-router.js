const router = require("express").Router();

const Users = require("./user-model");
const Expenses = require("../expenses/expense-model");
//const restricted = require("../auth/auth-middleware");

//get all users
router.get("/", (req, res) => {
  Users.fetchUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ err, message: "Error while retrieving users" });
    });
});

//get users by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.fetchById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Sorry, that user does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ err, message: "There was an error finding that user" });
    });
});

//get user expenses by their ids
router.get("/:id/expenses", (req, res) => {
  const { id } = req.params;

  Expenses.getUserExpenses(id)
    .then(userExpense => {
      if (userExpense && userExpense.length) {
        res.status(200).json(userExpense);
      } else {
        res
          .status(404)
          .json({ message: "The expense with that userID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "There was an error retrieving the user's expense" });
    });
});

module.exports = router;
