import { QueryInterface } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { SequelizeStorage, Umzug } from "umzug";

let umzug: Umzug<QueryInterface>;

export function setupMigrations(sequelize: Sequelize) {
  umzug = new Umzug({
    migrations: { glob: ["../migrations/*.ts", { cwd: __dirname }] },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: null,
  });

  (async () => {
    // Checks migrations and run them if they are not already applied. To keep
    // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
    // will be automatically created (if it doesn't exist already) and parsed.
    await umzug.up().then(function (migrations) {
      console.log("Migration complete!", {
        files: migrations.map((mig) => mig.name),
      });
    });
  })();
}

export type Migration = typeof umzug._types.migration;
