"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const helmet = require("fastify-helmet");
const pointOfView = require("point-of-view");
const handlebars = require("handlebars");
const cookie_1 = require("@fastify/cookie");
const cors = require('@fastify/cors');
const PORT = process.env.PORT || 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.useStaticAssets({ root: (0, path_1.join)(__dirname, '..', 'public') });
    app.register(helmet);
    app.register(pointOfView, {
        engine: {
            handlebars,
        },
        templates: 'views',
    });
    const swagger_options = new swagger_1.DocumentBuilder()
        .setTitle('NestJS test API')
        .setDescription('https://github.com/PanteleevDmitriy/NestJS.git')
        .setVersion('1.0')
        .addTag('users')
        .addTag('auth')
        .addTag('others')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swagger_options);
    swagger_1.SwaggerModule.setup('/swagger_doc', app, document);
    await app.register(cookie_1.default, {
        secret: 'my-secret-cookie-qwerty'
    });
    app.register(cors, {
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204,
    });
    await app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server has been started on http://localhost:${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map