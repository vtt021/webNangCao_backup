const Ajv = require("ajv").default;

module.exports = (schema) => (req, res, next) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
        console.log(validate.errors);
        return res.status(400).json(validate.errors);
    }

    next();
}