import express from "express";
import cors from "cors";
import routes from "./routes";
import path from "path";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from "./swagger.json";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const options = {
  definition: swaggerOptions,
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(function(req, res, next) {
    console.log(`Received request: ${req.method} ${req.path}`);
    next();
});
app.use('/uploads', express.static(path.join('uploads')));

const port = 3333

app.listen(port, () => {
    console.log(`Server started on ${port}!`);
});

export default app;