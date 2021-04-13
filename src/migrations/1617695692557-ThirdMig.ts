import { MigrationInterface, QueryRunner } from 'typeorm';

export class ThirdMig1617695692557 implements MigrationInterface {
  name = 'ThirdMig1617695692557';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "device" DROP CONSTRAINT "FK_9eb58b0b777dbc2864820228ebc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_auth_forgotten_passwords" DROP CONSTRAINT "FK_7122a91f7ca674db93166e14d4b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" DROP CONSTRAINT "FK_c446b7836cdf28fc0056aa555c7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" DROP CONSTRAINT "FK_7687919bf054bf262c669d3ae21"`,
    );
    await queryRunner.query(
      `CREATE TYPE "user_table_roles_enum" AS ENUM('user', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_table" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()', "updatedAt" TIMESTAMP DEFAULT now(), "roles" "user_table_roles_enum" array NOT NULL DEFAULT '{user}', "profilePath" character varying NOT NULL DEFAULT 'profile.jpg', "name" character varying NOT NULL, "lastname" character varying NOT NULL, CONSTRAINT "UQ_517f1a649ad49fa1435e54b0d5f" UNIQUE ("email"), CONSTRAINT "PK_19d4cfd316c838a502c6bc08090" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT 'NOW()'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract" DROP CONSTRAINT "FK_bef91905671a24464cc876f7dc1"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "contract"."contract_worksheet_id" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract" ALTER COLUMN "contract_worksheet_id" SET DEFAULT null`,
    );
    await queryRunner.query(
      `ALTER TABLE "device" ADD CONSTRAINT "FK_9eb58b0b777dbc2864820228ebc" FOREIGN KEY ("userId") REFERENCES "user_table"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "user_table"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user_table"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_auth_forgotten_passwords" ADD CONSTRAINT "FK_7122a91f7ca674db93166e14d4b" FOREIGN KEY ("userId") REFERENCES "user_table"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" ADD CONSTRAINT "FK_c446b7836cdf28fc0056aa555c7" FOREIGN KEY ("userUserId") REFERENCES "user_table"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD CONSTRAINT "FK_7687919bf054bf262c669d3ae21" FOREIGN KEY ("userId") REFERENCES "user_table"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract" ADD CONSTRAINT "FK_bef91905671a24464cc876f7dc1" FOREIGN KEY ("contract_worksheet_id") REFERENCES "contract_worksheet"("contract_worksheet_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contract" DROP CONSTRAINT "FK_bef91905671a24464cc876f7dc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" DROP CONSTRAINT "FK_7687919bf054bf262c669d3ae21"`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" DROP CONSTRAINT "FK_c446b7836cdf28fc0056aa555c7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_auth_forgotten_passwords" DROP CONSTRAINT "FK_7122a91f7ca674db93166e14d4b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`,
    );
    await queryRunner.query(
      `ALTER TABLE "device" DROP CONSTRAINT "FK_9eb58b0b777dbc2864820228ebc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract" ALTER COLUMN "contract_worksheet_id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "contract"."contract_worksheet_id" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract" ADD CONSTRAINT "FK_bef91905671a24464cc876f7dc1" FOREIGN KEY ("contract_worksheet_id") REFERENCES "contract_worksheet"("contract_worksheet_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-06 07:49:47.78274'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT '2021-04-06 07:49:47.78274'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-06 07:49:47.78274'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
    await queryRunner.query(`DROP TABLE "user_table"`);
    await queryRunner.query(`DROP TYPE "user_table_roles_enum"`);
    await queryRunner.query(
      `ALTER TABLE "player" ADD CONSTRAINT "FK_7687919bf054bf262c669d3ae21" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" ADD CONSTRAINT "FK_c446b7836cdf28fc0056aa555c7" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_auth_forgotten_passwords" ADD CONSTRAINT "FK_7122a91f7ca674db93166e14d4b" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "device" ADD CONSTRAINT "FK_9eb58b0b777dbc2864820228ebc" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
