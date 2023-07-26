INSERT INTO member (name, email, profile_image_url, created_at, updated_at) VALUES ('james', 'abcd@gmail.com', './test.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member (name, email, profile_image_url, created_at, updated_at) VALUES ('andy', 'aaa23213@gmail.com', './test.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member (name, email, profile_image_url, created_at, updated_at) VALUES ('philip', 'sdf3244@gmail.com', './test.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member (name, email, profile_image_url, created_at, updated_at) VALUES ('seongha', 'safd234@gmail.com', './test.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member (name, email, profile_image_url, created_at, updated_at) VALUES ('rulu', 'dfg345@gmail.com', './test.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member (name, email, profile_image_url, created_at, updated_at) VALUES ('tomas', 'htr35@gmail.com', './test.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member (name, email, profile_image_url, created_at, updated_at) VALUES ('youth', 'sag345@gmail.com', './test.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO team_place (name, created_at, updated_at) VALUES ('대한 팀플', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO team_place (name, created_at, updated_at) VALUES ('동서 문명의 교류 팀플', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO team_place (name, created_at, updated_at) VALUES ('건축공학설계 팀플', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO team_place (name, created_at, updated_at) VALUES ('유체역학 팀플', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO member_team_place (member_id, team_place_id, created_at, updated_at) VALUES (1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member_team_place (member_id, team_place_id, created_at, updated_at) VALUES (2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member_team_place (member_id, team_place_id, created_at, updated_at) VALUES (3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member_team_place (member_id, team_place_id, created_at, updated_at) VALUES (3, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member_team_place (member_id, team_place_id, created_at, updated_at) VALUES (4, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member_team_place (member_id, team_place_id, created_at, updated_at) VALUES (5, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member_team_place (member_id, team_place_id, created_at, updated_at) VALUES (6, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member_team_place (member_id, team_place_id, created_at, updated_at) VALUES (1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member_team_place (member_id, team_place_id, created_at, updated_at) VALUES (2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member_team_place (member_id, team_place_id, created_at, updated_at) VALUES (3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member_team_place (member_id, team_place_id, created_at, updated_at) VALUES (5, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member_team_place (member_id, team_place_id, created_at, updated_at) VALUES (7, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO member_team_place (member_id, team_place_id, created_at, updated_at) VALUES (7, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 테스트 케이스
-- 1. 당일 N 시간
-- 2. 하루 종일
-- 3. N일
-- 4. 현재보다 과거의 일정
-- 5. 현재보다 미래의 일정
-- 서로 다른 팀플레이스

INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('1번 팀플 N시간 일정', 1, '2023-07-12 10:00:00' ,'2023-07-12 18:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('1번 팀플 종일 일정', 1, '2023-07-12 00:00:00' ,'2023-07-12 23:59:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('1번 팀플 N일 일정', 1, '2023-07-12 10:00:00' ,'2023-07-15 12:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('1번 팀플 과거 일정', 1, TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP()), TIMESTAMPADD(DAY, -1, CURRENT_TIMESTAMP()), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('1번 팀플 미래 일정', 1, TIMESTAMPADD(DAY, 3, CURRENT_TIMESTAMP()), TIMESTAMPADD(DAY, 5, CURRENT_TIMESTAMP()), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('2번 팀플 N시간 일정', 2, '2023-07-12 20:00:00' ,'2023-07-12 21:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('2번 팀플 종일 일정', 2, '2023-07-13 00:00:00' ,'2023-07-13 23:59:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('2번 팀플 N일 일정', 2, '2023-07-14 10:00:00' ,'2023-07-17 12:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('2번 팀플 과거 일정', 2, TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP()), TIMESTAMPADD(DAY, -1, CURRENT_TIMESTAMP()), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('2번 팀플 미래 일정', 2, TIMESTAMPADD(DAY, 3, CURRENT_TIMESTAMP()), TIMESTAMPADD(DAY, 5, CURRENT_TIMESTAMP()), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('2번 팀플 6월 첫날', 2, '2023-06-01 10:00:00' ,'2023-06-01 20:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('2번 팀플 6월 어느날', 2, '2023-06-24 10:00:00' ,'2023-06-26 12:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('3번 팀플 A', 3, '2023-06-14 10:00:00' ,'2023-06-17 12:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('3번 팀플 B', 3, '2023-06-25 10:00:00' ,'2023-07-02 12:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('3번 팀플 C', 3, '2023-07-01 10:00:00' ,'2023-07-01 12:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('3번 팀플 D', 3, '2023-07-29 10:00:00' ,'2023-08-30 12:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('3번 팀플 E', 3, '2023-07-28 10:00:00' ,'2023-08-30 12:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('3번 팀플 F', 3, '2023-08-14 10:00:00' ,'2023-08-17 12:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('3번 팀플 5월 첫날', 3, '2023-05-01 00:00:00' ,'2023-05-01 12:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('3번 팀플 5월 마지막날', 3, '2023-05-31 00:00:00' ,'2023-05-31 23:59:59', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('3번 팀플 6월 첫날', 3, '2023-06-01 00:00:00' ,'2023-06-01 12:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('1번 팀플 6월 일정', 1, '2023-06-12 10:00:00' ,'2023-06-12 18:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time, created_at, updated_at) VALUES ('1번 팀플 장기 일정', 1, '2023-06-22 10:00:00' ,'2023-08-12 18:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
