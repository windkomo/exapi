import express from 'express'
import Expense from '../models/expense'

const resource = express.Router()

resource
    .route('/')

    .get(
        (req, res, next) => {
            Expense
                .findAsync()
                .then( expenses => res.send(expenses))
                .catch(next)
        }
    )

    .post(
        (req, res, next) => {
            let expense = new Expense()

            expense.override(req.body)
            expense.saveAsync()
                .then( newExpense => res.send(newExpense))
                .catch(next)
        }
    )

resource
    .route('/:id')

    .get(
        (req, res, next) => {
            Expense
                .findByIdAsync(req.params.id)
                .then(expense => expense ? res.send(expense) : res.send(404))
                .catch(next)
        }
    )

    .put(
        (req, res, next) => {
            Expense
                .findByIdAsync(req.params.id)
                .then( expense => {
                        if (!expense) {
                            return res.send(404)
                        }

                        expense.override(req.body)

                        return expense.saveAsync()
                            .then( expense => res.send(expense))
                })
                .catch( (err) => {
                    console.trace(err)
                    res.send(500)
                })
        }
    )

    .patch(
        (req, res, next) => {
            Expense
                .findByIdAsync(req.params.id)
                .then( expense => {
                        if (!expense) {
                            return res.send(404)
                        }

                        expense.patch(req.body)

                        return expense.saveAsync()
                            .then( expense => res.send(expense))
                })
                .catch( err => {
                    console.trace(err)
                    res.send(500)
                })
        }
    )

// ## //

export default resource
