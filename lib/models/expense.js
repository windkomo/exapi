import mongoose from 'mongoose'
import timestamp from 'mongoose-timestamp'

// ## //

const schema = new mongoose.Schema({
    title: String,

    description: String,

    spent: Number
})

schema.methods.override = function (hash) {
    this.title = hash.title
    this.description = hash.description
    this.spent = hash.spent
}

schema.methods.patch = function (hash) {
    this.title = hash.title
    this.description = hash.description
    this.spent = hash.spent
}

schema.plugin(timestamp)

// ## //

export default mongoose.model('Expense', schema)
