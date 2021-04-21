import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigReformed1619004331602 implements MigrationInterface {
  name = 'MigReformed1619004331602';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "coach" ("coachId" uuid NOT NULL DEFAULT uuid_generate_v4(), "playerId" uuid NOT NULL, CONSTRAINT "REL_3c0ccc147b1b82b02090328afa" UNIQUE ("playerId"), CONSTRAINT "PK_98a0f2bec36b724f8555091c7ed" PRIMARY KEY ("coachId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "match_stats_by_team" ("match_stats_by_team_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shots" smallint, "shots_on_target" smallint, "possession" smallint, "pass_accuary" smallint, "fouls" smallint, "yellow_cards" smallint, "red_cards" smallint, "offsides" smallint, "corners" smallint, "teamId" uuid, "matchId" uuid, CONSTRAINT "PK_828c2c3c3bd02f2179f135f0aa3" PRIMARY KEY ("match_stats_by_team_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "match" ("matchId" uuid NOT NULL DEFAULT uuid_generate_v4(), "finalized" boolean NOT NULL DEFAULT false, "match_history_id" uuid, "teamId" uuid, CONSTRAINT "PK_7dd6d1fec38b24c30d6907d51e2" PRIMARY KEY ("matchId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "team_stats" ("team_stats_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "matches_played" smallint NOT NULL, "wins" smallint NOT NULL, "lost_matches" smallint NOT NULL, "ties" smallint NOT NULL, "goals_for" smallint NOT NULL, "goals_against" smallint NOT NULL, "goals_difference" smallint NOT NULL, "points" smallint NOT NULL, "tournamentId" uuid, "teamId" uuid, "matchId" uuid, CONSTRAINT "REL_987ef7af0882c661a6334ab894" UNIQUE ("tournamentId"), CONSTRAINT "PK_283b2b9a4d3089aacb48f01d7eb" PRIMARY KEY ("team_stats_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "team" ("teamId" uuid NOT NULL DEFAULT uuid_generate_v4(), "team_name" character varying NOT NULL, "available" boolean NOT NULL DEFAULT true, "coachId" uuid, "tournamentTournamentId" uuid, CONSTRAINT "PK_e3c1e347fd4f0813cc7b2e2115b" PRIMARY KEY ("teamId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "device" ("deviceId" uuid NOT NULL DEFAULT uuid_generate_v4(), "fcm_token" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "userId" uuid NOT NULL, CONSTRAINT "UQ_3c4ed5801431490290b69c78c62" UNIQUE ("fcm_token"), CONSTRAINT "PK_6fe2df6e1c34fc6c18c786ca26e" PRIMARY KEY ("deviceId"))`,
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
      `CREATE TABLE "notification" ("notificationId" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "message" character varying NOT NULL, "readAt" TIMESTAMP WITH TIME ZONE, "sentAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()', "checked" boolean NOT NULL DEFAULT false, "userId" uuid, CONSTRAINT "PK_34ecf236e96be76a41929c131b7" PRIMARY KEY ("notificationId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_auth_forgotten_passwords" ("user_forgotten_pasword_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hashedToken" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()', "updatedAt" TIMESTAMP DEFAULT now(), "userId" uuid, CONSTRAINT "PK_805455d56118b556c3c07808850" PRIMARY KEY ("user_forgotten_pasword_id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "user_table_roles_enum" AS ENUM('ADMIN', 'PLAYER', 'SPECTATOR', 'COACH', 'REFEREE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_table" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()', "updatedAt" TIMESTAMP DEFAULT now(), "roles" "user_table_roles_enum" NOT NULL, "profilePath" character varying NOT NULL DEFAULT 'profile.jpg', "name" character varying NOT NULL, "lastname" character varying NOT NULL, "available" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_517f1a649ad49fa1435e54b0d5f" UNIQUE ("email"), CONSTRAINT "PK_19d4cfd316c838a502c6bc08090" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "player_contractstate_enum" AS ENUM('Free', 'Signed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "player" ("playerId" uuid NOT NULL DEFAULT uuid_generate_v4(), "contractState" "player_contractstate_enum" NOT NULL DEFAULT 'Free', "teamId" uuid, "userId" uuid, CONSTRAINT "REL_7687919bf054bf262c669d3ae2" UNIQUE ("userId"), CONSTRAINT "PK_ee365af3f201a00d9a917bc45b0" PRIMARY KEY ("playerId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "season" ("seasonId" uuid NOT NULL DEFAULT uuid_generate_v4(), "pre_season_init_date" TIMESTAMP WITH TIME ZONE NOT NULL, "pre_season_final_date" TIMESTAMP WITH TIME ZONE NOT NULL, "official_season_init_date" TIMESTAMP WITH TIME ZONE, "official_season_final_date" TIMESTAMP WITH TIME ZONE, "tournamentTournamentId" uuid, CONSTRAINT "PK_127d97d7a0dadc7b35c2a360ef9" PRIMARY KEY ("seasonId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "player_stats" ("player_stats_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "goals" smallint NOT NULL, "assists" smallint NOT NULL, "yellow_cards" smallint NOT NULL, "red_cards" smallint NOT NULL, "playerId" uuid, "seasonId" uuid, CONSTRAINT "REL_e8ecfb1db35dff1acfac953392" UNIQUE ("seasonId"), CONSTRAINT "PK_69560c5085131e624ce968bc419" PRIMARY KEY ("player_stats_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "referee" ("refereeId" uuid NOT NULL DEFAULT uuid_generate_v4(), "playerId" uuid, CONSTRAINT "REL_118d36f8998206463ffdb6c13b" UNIQUE ("playerId"), CONSTRAINT "PK_32969459d263cd8038437276f15" PRIMARY KEY ("refereeId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "match_history" ("match_history_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_time" TIMESTAMP WITH TIME ZONE, "journeyId" uuid, "refereeRefereeId" uuid, CONSTRAINT "PK_7af3d84c1c4730c6b1145a8cfde" PRIMARY KEY ("match_history_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "journey" ("journeyId" uuid NOT NULL DEFAULT uuid_generate_v4(), "tournamentId" uuid, CONSTRAINT "PK_928ffec26b046479535ec3fe1f5" PRIMARY KEY ("journeyId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tournament" ("tournamentId" uuid NOT NULL DEFAULT uuid_generate_v4(), "tournament_name" character varying NOT NULL, "invitation_code" character varying NOT NULL, "timeOfEachHalf" smallint NOT NULL, "maxOfPlayersOnCourtPerTeam" smallint NOT NULL, "maxOfPlayersRegisteredPerTeam" smallint NOT NULL, "adminId" uuid, CONSTRAINT "PK_fbec894d68c361a6aa2db4cfd4e" PRIMARY KEY ("tournamentId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "admin" ("adminId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, CONSTRAINT "REL_f8a889c4362d78f056960ca6da" UNIQUE ("userId"), CONSTRAINT "PK_abce4cc3fe598f242ab45e529b6" PRIMARY KEY ("adminId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach" ADD CONSTRAINT "FK_3c0ccc147b1b82b02090328afaa" FOREIGN KEY ("playerId") REFERENCES "player"("playerId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match_stats_by_team" ADD CONSTRAINT "FK_754dcaa968d253e0ba56e43de31" FOREIGN KEY ("teamId") REFERENCES "team"("teamId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match_stats_by_team" ADD CONSTRAINT "FK_35406533ea29d5397b7d1d45dfa" FOREIGN KEY ("matchId") REFERENCES "match"("matchId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "FK_c0f5817c588e12d08512b36eefa" FOREIGN KEY ("match_history_id") REFERENCES "match_history"("match_history_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "FK_f2d690b3cd42934a851294a40e3" FOREIGN KEY ("teamId") REFERENCES "team"("teamId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_stats" ADD CONSTRAINT "FK_987ef7af0882c661a6334ab894e" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("tournamentId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_stats" ADD CONSTRAINT "FK_9415738cb7ee19b65fb925937ca" FOREIGN KEY ("teamId") REFERENCES "team"("teamId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_stats" ADD CONSTRAINT "FK_9ea2fbb44692829dd9db93cfeee" FOREIGN KEY ("matchId") REFERENCES "match"("matchId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_4ec92b7a3b6eca6881a3f1b6341" FOREIGN KEY ("coachId") REFERENCES "coach"("coachId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_ef490329591cb46d6d8f77f7959" FOREIGN KEY ("tournamentTournamentId") REFERENCES "tournament"("tournamentId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "device" ADD CONSTRAINT "FK_9eb58b0b777dbc2864820228ebc" FOREIGN KEY ("userId") REFERENCES "user_table"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "user_table"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user_table"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_auth_forgotten_passwords" ADD CONSTRAINT "FK_7122a91f7ca674db93166e14d4b" FOREIGN KEY ("userId") REFERENCES "user_table"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD CONSTRAINT "FK_7687919bf054bf262c669d3ae21" FOREIGN KEY ("userId") REFERENCES "user_table"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD CONSTRAINT "FK_e85150e7e8a80bee7f2be3adab0" FOREIGN KEY ("teamId") REFERENCES "team"("teamId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "season" ADD CONSTRAINT "FK_6d351a8a12107add4e6e9bef2ca" FOREIGN KEY ("tournamentTournamentId") REFERENCES "tournament"("tournamentId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_stats" ADD CONSTRAINT "FK_8a1fe384eabdf0ce46a2663892c" FOREIGN KEY ("playerId") REFERENCES "player"("playerId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_stats" ADD CONSTRAINT "FK_e8ecfb1db35dff1acfac9533922" FOREIGN KEY ("seasonId") REFERENCES "season"("seasonId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "referee" ADD CONSTRAINT "FK_118d36f8998206463ffdb6c13bb" FOREIGN KEY ("playerId") REFERENCES "player"("playerId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match_history" ADD CONSTRAINT "FK_e6016a66f7bc28d043e63c6e1c3" FOREIGN KEY ("journeyId") REFERENCES "journey"("journeyId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match_history" ADD CONSTRAINT "FK_2ec243afc9c3b353060f2eda60b" FOREIGN KEY ("refereeRefereeId") REFERENCES "referee"("refereeId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "journey" ADD CONSTRAINT "FK_eac58e69074a84917a60753f60e" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("tournamentId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD CONSTRAINT "FK_6d60a03b2140b8d5dded5cd277f" FOREIGN KEY ("adminId") REFERENCES "admin"("adminId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" ADD CONSTRAINT "FK_f8a889c4362d78f056960ca6dad" FOREIGN KEY ("userId") REFERENCES "user_table"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admin" DROP CONSTRAINT "FK_f8a889c4362d78f056960ca6dad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" DROP CONSTRAINT "FK_6d60a03b2140b8d5dded5cd277f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journey" DROP CONSTRAINT "FK_eac58e69074a84917a60753f60e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match_history" DROP CONSTRAINT "FK_2ec243afc9c3b353060f2eda60b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match_history" DROP CONSTRAINT "FK_e6016a66f7bc28d043e63c6e1c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "referee" DROP CONSTRAINT "FK_118d36f8998206463ffdb6c13bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_stats" DROP CONSTRAINT "FK_e8ecfb1db35dff1acfac9533922"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_stats" DROP CONSTRAINT "FK_8a1fe384eabdf0ce46a2663892c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "season" DROP CONSTRAINT "FK_6d351a8a12107add4e6e9bef2ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" DROP CONSTRAINT "FK_e85150e7e8a80bee7f2be3adab0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" DROP CONSTRAINT "FK_7687919bf054bf262c669d3ae21"`,
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
      `ALTER TABLE "team" DROP CONSTRAINT "FK_ef490329591cb46d6d8f77f7959"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_4ec92b7a3b6eca6881a3f1b6341"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_stats" DROP CONSTRAINT "FK_9ea2fbb44692829dd9db93cfeee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_stats" DROP CONSTRAINT "FK_9415738cb7ee19b65fb925937ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_stats" DROP CONSTRAINT "FK_987ef7af0882c661a6334ab894e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" DROP CONSTRAINT "FK_f2d690b3cd42934a851294a40e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" DROP CONSTRAINT "FK_c0f5817c588e12d08512b36eefa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match_stats_by_team" DROP CONSTRAINT "FK_35406533ea29d5397b7d1d45dfa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match_stats_by_team" DROP CONSTRAINT "FK_754dcaa968d253e0ba56e43de31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach" DROP CONSTRAINT "FK_3c0ccc147b1b82b02090328afaa"`,
    );
    await queryRunner.query(`DROP TABLE "admin"`);
    await queryRunner.query(`DROP TABLE "tournament"`);
    await queryRunner.query(`DROP TABLE "journey"`);
    await queryRunner.query(`DROP TABLE "match_history"`);
    await queryRunner.query(`DROP TABLE "referee"`);
    await queryRunner.query(`DROP TABLE "player_stats"`);
    await queryRunner.query(`DROP TABLE "season"`);
    await queryRunner.query(`DROP TABLE "player"`);
    await queryRunner.query(`DROP TYPE "player_contractstate_enum"`);
    await queryRunner.query(`DROP TABLE "user_table"`);
    await queryRunner.query(`DROP TYPE "user_table_roles_enum"`);
    await queryRunner.query(`DROP TABLE "users_auth_forgotten_passwords"`);
    await queryRunner.query(`DROP TABLE "notification"`);
    await queryRunner.query(`DROP TABLE "likes"`);
    await queryRunner.query(`DROP TABLE "news_wall"`);
    await queryRunner.query(`DROP TABLE "news"`);
    await queryRunner.query(`DROP TABLE "device"`);
    await queryRunner.query(`DROP TABLE "team"`);
    await queryRunner.query(`DROP TABLE "team_stats"`);
    await queryRunner.query(`DROP TABLE "match"`);
    await queryRunner.query(`DROP TABLE "match_stats_by_team"`);
    await queryRunner.query(`DROP TABLE "coach"`);
  }
}
