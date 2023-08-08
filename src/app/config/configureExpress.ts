import "reflect-metadata";
import express, { Application } from "express";
import { AppDependencies } from "./AppDependencies";

export function configureExpress(app: Application) {
    
    const routes = [CustomerController, TransactionController, InstalmentController];

    const container = new AppDependencies().init();
    
    app.use(express.json());
    
    useContainer(container);
    
    useExpressServer(app, {
        controllers: routes
    })
    return container
}