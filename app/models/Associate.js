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
        pc: { type: String, required: true }
    });
    var AssociateModel = mongoose.model('associate', Associate);


    var api = restify.serve(app, AssociateModel, {
        // exclude: 'text,done'
    });
    console.log(api);
};

