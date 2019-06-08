"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const portfolio_model_1 = require("../model/portfolio.model");
class PortifolioRouter extends model_router_1.ModelRouter {
    constructor() {
        super(portfolio_model_1.Portfolio);
        this.findAll = (req, resp, next) => {
            this.model.find()
                .then(this.renderAll(resp, next))
                .catch(next);
        };
    }
    applyRoutes(application) {
        application.get('/portfolio', this.findAll);
        application.get('/portfolio/:id', [this.validateId, this.findById]);
        application.post('/portfolio', this.save);
        application.put('/portfolio/:id', this.validateId, this.replace);
        application.patch('/portfolio/:id', this.update);
        application.del('/portfolio/:id', this.validateId, this.delete);
    }
}
exports.portifolioRouter = new PortifolioRouter();
