const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');

const usersRoutes = require('./routes/users');

const algorithmsRoutes = require('./routes/algorithms');

const teamsRoutes = require('./routes/teams');

const federationRoutes = require('./routes/federation');

const projectsRoutes = require('./routes/projects');

const paymentsRoutes = require('./routes/payments');

const trainingRoutes = require('./routes/training');

const deploymentRoutes = require('./routes/deployment');

const monitoringRoutes = require('./routes/monitoring');

const model_exchangeRoutes = require('./routes/model_exchange');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'AISTUDIO FEDERATED',
      description:
        'AISTUDIO FEDERATED Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/algorithms',
  passport.authenticate('jwt', { session: false }),
  algorithmsRoutes,
);

app.use(
  '/api/teams',
  passport.authenticate('jwt', { session: false }),
  teamsRoutes,
);

app.use(
  '/api/federation',
  passport.authenticate('jwt', { session: false }),
  federationRoutes,
);

app.use(
  '/api/projects',
  passport.authenticate('jwt', { session: false }),
  projectsRoutes,
);

app.use(
  '/api/payments',
  passport.authenticate('jwt', { session: false }),
  paymentsRoutes,
);

app.use(
  '/api/training',
  passport.authenticate('jwt', { session: false }),
  trainingRoutes,
);

app.use(
  '/api/deployment',
  passport.authenticate('jwt', { session: false }),
  deploymentRoutes,
);

app.use(
  '/api/monitoring',
  passport.authenticate('jwt', { session: false }),
  monitoringRoutes,
);

app.use(
  '/api/model_exchange',
  passport.authenticate('jwt', { session: false }),
  model_exchangeRoutes,
);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
