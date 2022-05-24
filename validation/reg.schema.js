const joi= require("@hapi/joi")
const regSchema = joi.object({
    username: joi.string().min(3).required(),
    password: joi.string().required()
})

module.exports = {
    regSchema,
}