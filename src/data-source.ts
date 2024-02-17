import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nest',
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // entities: ['src/**/*.entity.ts'],
  // migrations: ['src/migrations/*{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
