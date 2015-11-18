/**
 * Created by asheesh on 03/11/2015.
 */

module.exports = function (app, mongoose, restify) {
    var Associate = new mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        employeeCode: { type: Number, required: true },
        email: { type: String, required: true },
        userName: { type: String, required: true },
        password: { type: String, required: false },
        roles: { type: Array, required: true, default: ["Associate"] },
        pc: { type: String, required: true },
        active: { type: Boolean, required: true }
    });
    var associateModel = mongoose.model('associate', Associate);

    var api = restify.serve(app, associateModel, {
        private: ['password']
    });
    console.log(api);

    return associateModel;
};

