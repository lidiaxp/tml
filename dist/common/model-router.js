"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const mongoose = require("mongoose");
const restify_errors_1 = require("restify-errors");
// criando um tipo generico que só vai ser usado em rumtime
class ModelRouter extends router_1.Router {
    constructor(model) {
        super();
        this.model = model;
        this.pageSize = 4;
        this.validateId = (req, resp, next) => {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                next(new restify_errors_1.NotFoundError('Document not found 2'));
            }
            else {
                next();
            }
        };
        // metodo get
        // metodo get por Id
        this.findById = (req, resp, next) => {
            this.model.findOne({ _id: req.params.id });
            this.prepareOne(this.model.findOne({ _id: req.params.id }))
                .then(this.render(resp, next)).catch(next);
        };
        // metodo Post
        this.save = (req, resp, next) => {
            let document = new this.model(req.body);
            document.save().then(this.render(resp, next)).catch(next);
        };
        // metodo Pacht
        this.replace = (req, resp, next) => {
            const options = { runValidators: true, overwrite: true };
            this.model.update({ _id: req.params.id }, req.body, options).exec().then(result => {
                if (result.n) {
                    return this.model.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
            }).then(this.render(resp, next)).catch(next);
        };
        // metodo update
        this.update = (req, resp, next) => {
            const options = { runValidators: true, new: true };
            this.model.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp, next)).catch(next);
        };
        this.delete = (req, resp, next) => {
            this.model.remove({ _id: req.params.id }).exec().then((cmdResult) => {
                if (cmdResult.n) {
                    resp.send(204);
                    return next();
                }
                else {
                    resp.send(200);
                    //throw new NotFoundError('Documento não encontrado')
                }
                return next();
            }).catch(next);
        };
    }
    prepareOne(query) {
        return query;
    }
    envelope(document) {
        let resource = Object.assign({ _links: {} }, document.toJSON());
        return resource;
    }
}
exports.ModelRouter = ModelRouter;
