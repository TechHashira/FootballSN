import { MigrationInterface, QueryRunner } from 'typeorm';

export class ThirdMig1617693057271 implements MigrationInterface {
  name = 'ThirdMig1617693057271';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "match" ("matchId" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_time" TIMESTAMP WITH TIME ZONE NOT NULL, "match_data" jsonb NOT NULL, "journeyId" uuid, CONSTRAINT "PK_7dd6d1fec38b24c30d6907d51e2" PRIMARY KEY ("matchId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "journey" ("journeyId" uuid NOT NULL DEFAULT uuid_generate_v4(), "tournamentId" uuid, CONSTRAINT "PK_928ffec26b046479535ec3fe1f5" PRIMARY KEY ("journeyId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tournament" ("tournamentId" uuid NOT NULL DEFAULT uuid_generate_v4(), "tournament_name" character varying NOT NULL, "init_date" TIMESTAMP WITH TIME ZONE, "final_date" TIMESTAMP WITH TIME ZONE, "invitation_code" character varying NOT NULL, "adminId" uuid, CONSTRAINT "PK_fbec894d68c361a6aa2db4cfd4e" PRIMARY KEY ("tournamentId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "device" ("deviceId" uuid NOT NULL DEFAULT uuid_generate_v4(), "fmcToken" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "userId" uuid, CONSTRAINT "PK_6fe2df6e1c34fc6c18c786ca26e" PRIMARY KEY ("deviceId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "news" ("newsId" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()', "updatedAt" TIMESTAMP DEFAULT now(), "text" character varying NOT NULL, "imgPath" character varying NOT NULL, "adminId" uuid, "news_wall_id" uuid, CONSTRAINT "REL_416832097e4dc483a1e1395162" UNIQUE ("adminId"), CONSTRAINT "PK_b5589be2edde9e2a404d413c35b" PRIMARY KEY ("newsId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "news_wall" ("news_wall_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tournamentId" uuid, CONSTRAINT "REL_130aa485f51ff169cf2ba58856" UNIQUE ("tournamentId"), CONSTRAINT "PK_a5eeae2cf34f2d2678fe4ad89db" PRIMARY KEY ("news_wall_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "likes" ("likeId" uuid NOT NULL DEFAULT uuid_generate_v4(), "likeAt" TIMESTAMP NOT NULL DEFAULT 'NOW()', "newsId" uuid, "userId" uuid, CONSTRAINT "PK_f1adfd27aaa74667194baab8318" PRIMARY KEY ("likeId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "notification" ("notificationId" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "message" character varying NOT NULL, "readAt" TIMESTAMP WITH TIME ZONE, "sentAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" uuid, CONSTRAINT "PK_34ecf236e96be76a41929c131b7" PRIMARY KEY ("notificationId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_auth_forgotten_passwords" ("user_forgotten_pasword_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hashedToken" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()', "updatedAt" TIMESTAMP DEFAULT now(), "userId" uuid, CONSTRAINT "PK_805455d56118b556c3c07808850" PRIMARY KEY ("user_forgotten_pasword_id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "user_roles_enum" AS ENUM('user', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()', "updatedAt" TIMESTAMP DEFAULT now(), "roles" "user_roles_enum" array NOT NULL DEFAULT '{user}', "profilePath" character varying NOT NULL, "name" character varying NOT NULL, "lastname" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "admin" ("adminId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userUserId" uuid, CONSTRAINT "REL_c446b7836cdf28fc0056aa555c" UNIQUE ("userUserId"), CONSTRAINT "PK_abce4cc3fe598f242ab45e529b6" PRIMARY KEY ("adminId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "player" ("playerId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "REL_7687919bf054bf262c669d3ae2" UNIQUE ("userId"), CONSTRAINT "PK_ee365af3f201a00d9a917bc45b0" PRIMARY KEY ("playerId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "player_stats" ("player_stats_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "goals" smallint NOT NULL, "assists" smallint NOT NULL, "yellow_cards" smallint NOT NULL, "red_cards" smallint NOT NULL, "playerId" uuid, "tournamentId" uuid, CONSTRAINT "REL_05b9696f56d24a76e074bc073c" UNIQUE ("tournamentId"), CONSTRAINT "PK_69560c5085131e624ce968bc419" PRIMARY KEY ("player_stats_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "team_stats" ("team_stats_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "matches_played" smallint NOT NULL, "wins" smallint NOT NULL, "lost_matches" smallint NOT NULL, "ties" smallint NOT NULL, "goals_for" smallint NOT NULL, "goals_against" smallint NOT NULL, "goals_difference" smallint NOT NULL, "points" smallint NOT NULL, "tournamentId" uuid, "teamId" uuid, CONSTRAINT "REL_987ef7af0882c661a6334ab894" UNIQUE ("tournamentId"), CONSTRAINT "PK_283b2b9a4d3089aacb48f01d7eb" PRIMARY KEY ("team_stats_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "team" ("teamId" uuid NOT NULL DEFAULT uuid_generate_v4(), "team_name" character varying NOT NULL, "coachId" uuid, CONSTRAINT "PK_e3c1e347fd4f0813cc7b2e2115b" PRIMARY KEY ("teamId"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "contract_contract_state_enum" AS ENUM('Free', 'Signed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "contract" ("contractId" uuid NOT NULL DEFAULT uuid_generate_v4(), "contract_state" "contract_contract_state_enum" NOT NULL DEFAULT 'Free', "contract_worksheet_id" uuid DEFAULT null, "playerId" uuid, CONSTRAINT "REL_c9ed2470b4a95aefbbe04d05fa" UNIQUE ("playerId"), CONSTRAINT "PK_6b91fc9f9dfe3ad77af696e14c0" PRIMARY KEY ("contractId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contract_worksheet" ("contract_worksheet_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "team_worksheet_id" uuid, CONSTRAINT "PK_d74481d6d67d36faf5963514a0f" PRIMARY KEY ("contract_worksheet_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "team_worksheet" ("team_worksheet_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "teamId" uuid, CONSTRAINT "REL_b1ff1b44b6a738ec31d1633719" UNIQUE ("teamId"), CONSTRAINT "PK_f60c0269bd76d322966172beb53" PRIMARY KEY ("team_worksheet_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "coach" ("coachId" uuid NOT NULL DEFAULT uuid_generate_v4(), "playerId" uuid, CONSTRAINT "REL_3c0ccc147b1b82b02090328afa" UNIQUE ("playerId"), CONSTRAINT "PK_98a0f2bec36b724f8555091c7ed" PRIMARY KEY ("coachId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "player_tournaments_tournament" ("playerPlayerId" uuid NOT NULL, "tournamentTournamentId" uuid NOT NULL, CONSTRAINT "PK_48ec3951958e2ef837ac5966310" PRIMARY KEY ("playerPlayerId", "tournamentTournamentId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6cb7545b1da8f1d3a3b077875e" ON "player_tournaments_tournament" ("playerPlayerId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1f77835708d1b4c0347548cbf0" ON "player_tournaments_tournament" ("tournamentTournamentId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "team_tournaments_tournament" ("teamTeamId" uuid NOT NULL, "tournamentTournamentId" uuid NOT NULL, CONSTRAINT "PK_65ea9145a697a6b151240531dbc" PRIMARY KEY ("teamTeamId", "tournamentTournamentId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_43105100533eadd216da4c878c" ON "team_tournaments_tournament" ("teamTeamId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9557e516ca910a978486dd39eb" ON "team_tournaments_tournament" ("tournamentTournamentId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "FK_0d8640b1738714b761d22c1ab83" FOREIGN KEY ("journeyId") REFERENCES "journey"("journeyId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "journey" ADD CONSTRAINT "FK_eac58e69074a84917a60753f60e" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("tournamentId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD CONSTRAINT "FK_6d60a03b2140b8d5dded5cd277f" FOREIGN KEY ("adminId") REFERENCES "admin"("adminId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "device" ADD CONSTRAINT "FK_9eb58b0b777dbc2864820228ebc" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_416832097e4dc483a1e13951627" FOREIGN KEY ("adminId") REFERENCES "admin"("adminId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_28137d7c69b8f3ab5a0871c3f54" FOREIGN KEY ("news_wall_id") REFERENCES "news_wall"("news_wall_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "news_wall" ADD CONSTRAINT "FK_130aa485f51ff169cf2ba58856d" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("tournamentId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_895dfb4af021cd59efe826a2999" FOREIGN KEY ("newsId") REFERENCES "news"("newsId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_auth_forgotten_passwords" ADD CONSTRAINT "FK_7122a91f7ca674db93166e14d4b" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" ADD CONSTRAINT "FK_c446b7836cdf28fc0056aa555c7" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD CONSTRAINT "FK_7687919bf054bf262c669d3ae21" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_stats" ADD CONSTRAINT "FK_8a1fe384eabdf0ce46a2663892c" FOREIGN KEY ("playerId") REFERENCES "player"("playerId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_stats" ADD CONSTRAINT "FK_05b9696f56d24a76e074bc073ce" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("tournamentId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_stats" ADD CONSTRAINT "FK_987ef7af0882c661a6334ab894e" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("tournamentId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_stats" ADD CONSTRAINT "FK_9415738cb7ee19b65fb925937ca" FOREIGN KEY ("teamId") REFERENCES "team"("teamId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_4ec92b7a3b6eca6881a3f1b6341" FOREIGN KEY ("coachId") REFERENCES "coach"("coachId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract" ADD CONSTRAINT "FK_c9ed2470b4a95aefbbe04d05faa" FOREIGN KEY ("playerId") REFERENCES "player"("playerId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract" ADD CONSTRAINT "FK_bef91905671a24464cc876f7dc1" FOREIGN KEY ("contract_worksheet_id") REFERENCES "contract_worksheet"("contract_worksheet_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract_worksheet" ADD CONSTRAINT "FK_324d54af70b240fa308be3a2d25" FOREIGN KEY ("team_worksheet_id") REFERENCES "team_worksheet"("team_worksheet_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_worksheet" ADD CONSTRAINT "FK_b1ff1b44b6a738ec31d16337199" FOREIGN KEY ("teamId") REFERENCES "team"("teamId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach" ADD CONSTRAINT "FK_3c0ccc147b1b82b02090328afaa" FOREIGN KEY ("playerId") REFERENCES "player"("playerId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_tournaments_tournament" ADD CONSTRAINT "FK_6cb7545b1da8f1d3a3b077875ed" FOREIGN KEY ("playerPlayerId") REFERENCES "player"("playerId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_tournaments_tournament" ADD CONSTRAINT "FK_1f77835708d1b4c0347548cbf0f" FOREIGN KEY ("tournamentTournamentId") REFERENCES "tournament"("tournamentId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_tournaments_tournament" ADD CONSTRAINT "FK_43105100533eadd216da4c878c3" FOREIGN KEY ("teamTeamId") REFERENCES "team"("teamId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_tournaments_tournament" ADD CONSTRAINT "FK_9557e516ca910a978486dd39ebd" FOREIGN KEY ("tournamentTournamentId") REFERENCES "tournament"("tournamentId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "team_tournaments_tournament" DROP CONSTRAINT "FK_9557e516ca910a978486dd39ebd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_tournaments_tournament" DROP CONSTRAINT "FK_43105100533eadd216da4c878c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_tournaments_tournament" DROP CONSTRAINT "FK_1f77835708d1b4c0347548cbf0f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_tournaments_tournament" DROP CONSTRAINT "FK_6cb7545b1da8f1d3a3b077875ed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach" DROP CONSTRAINT "FK_3c0ccc147b1b82b02090328afaa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_worksheet" DROP CONSTRAINT "FK_b1ff1b44b6a738ec31d16337199"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract_worksheet" DROP CONSTRAINT "FK_324d54af70b240fa308be3a2d25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract" DROP CONSTRAINT "FK_bef91905671a24464cc876f7dc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract" DROP CONSTRAINT "FK_c9ed2470b4a95aefbbe04d05faa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_4ec92b7a3b6eca6881a3f1b6341"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_stats" DROP CONSTRAINT "FK_9415738cb7ee19b65fb925937ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_stats" DROP CONSTRAINT "FK_987ef7af0882c661a6334ab894e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_stats" DROP CONSTRAINT "FK_05b9696f56d24a76e074bc073ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_stats" DROP CONSTRAINT "FK_8a1fe384eabdf0ce46a2663892c"`,
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
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_895dfb4af021cd59efe826a2999"`,
    );
    await queryRunner.query(
      `ALTER TABLE "news_wall" DROP CONSTRAINT "FK_130aa485f51ff169cf2ba58856d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" DROP CONSTRAINT "FK_28137d7c69b8f3ab5a0871c3f54"`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" DROP CONSTRAINT "FK_416832097e4dc483a1e13951627"`,
    );
    await queryRunner.query(
      `ALTER TABLE "device" DROP CONSTRAINT "FK_9eb58b0b777dbc2864820228ebc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" DROP CONSTRAINT "FK_6d60a03b2140b8d5dded5cd277f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journey" DROP CONSTRAINT "FK_eac58e69074a84917a60753f60e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" DROP CONSTRAINT "FK_0d8640b1738714b761d22c1ab83"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_9557e516ca910a978486dd39eb"`);
    await queryRunner.query(`DROP INDEX "IDX_43105100533eadd216da4c878c"`);
    await queryRunner.query(`DROP TABLE "team_tournaments_tournament"`);
    await queryRunner.query(`DROP INDEX "IDX_1f77835708d1b4c0347548cbf0"`);
    await queryRunner.query(`DROP INDEX "IDX_6cb7545b1da8f1d3a3b077875e"`);
    await queryRunner.query(`DROP TABLE "player_tournaments_tournament"`);
    await queryRunner.query(`DROP TABLE "coach"`);
    await queryRunner.query(`DROP TABLE "team_worksheet"`);
    await queryRunner.query(`DROP TABLE "contract_worksheet"`);
    await queryRunner.query(`DROP TABLE "contract"`);
    await queryRunner.query(`DROP TYPE "contract_contract_state_enum"`);
    await queryRunner.query(`DROP TABLE "team"`);
    await queryRunner.query(`DROP TABLE "team_stats"`);
    await queryRunner.query(`DROP TABLE "player_stats"`);
    await queryRunner.query(`DROP TABLE "player"`);
    await queryRunner.query(`DROP TABLE "admin"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "user_roles_enum"`);
    await queryRunner.query(`DROP TABLE "users_auth_forgotten_passwords"`);
    await queryRunner.query(`DROP TABLE "notification"`);
    await queryRunner.query(`DROP TABLE "likes"`);
    await queryRunner.query(`DROP TABLE "news_wall"`);
    await queryRunner.query(`DROP TABLE "news"`);
    await queryRunner.query(`DROP TABLE "device"`);
    await queryRunner.query(`DROP TABLE "tournament"`);
    await queryRunner.query(`DROP TABLE "journey"`);
    await queryRunner.query(`DROP TABLE "match"`);
  }
}
