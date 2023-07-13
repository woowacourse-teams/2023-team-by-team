INSERT INTO team_place (name) VALUES ('대한 팀플');
INSERT INTO team_place (name) VALUES ('동서 문명의 교류 팀플');
INSERT INTO team_place (name) VALUES ('건축공학설계 팀플');
INSERT INTO team_place (name) VALUES ('유체역학 팀플');

-- 테스트 케이스
-- 1. 당일 N 시간
-- 2. 하루 종일
-- 3. N일
-- 4. 현재보다 과거의 일정
-- 5. 현재보다 미래의 일정
-- 서로 다른 팀플레이스

INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time) VALUES ('1번 팀플 N시간 일정', 1, '2023-07-12 10:00:00' ,'2023-07-12 18:00:00');
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time) VALUES ('1번 팀플 종일 일정', 1, '2023-07-12 00:00:00' ,'2023-07-12 23:59:00');
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time) VALUES ('1번 팀플 N일 일정', 1, '2023-07-12 10:00:00' ,'2023-07-15 12:00:00');
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time) VALUES ('1번 팀플 과거 일정', 1, TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP()), TIMESTAMPADD(DAY, -1, CURRENT_TIMESTAMP()));
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time) VALUES ('1번 팀플 미래 일정', 1, TIMESTAMPADD(DAY, 3, CURRENT_TIMESTAMP()), TIMESTAMPADD(DAY, 5, CURRENT_TIMESTAMP()));
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time) VALUES ('2번 팀플 N시간 일정', 2, '2023-07-12 20:00:00' ,'2023-07-12 21:00:00');
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time) VALUES ('2번 팀플 종일 일정', 2, '2023-07-13 00:00:00' ,'2023-07-13 23:59:00');
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time) VALUES ('2번 팀플 N일 일정', 2, '2023-07-14 10:00:00' ,'2023-07-17 12:00:00');
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time) VALUES ('2번 팀플 과거 일정', 2, TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP()), TIMESTAMPADD(DAY, -1, CURRENT_TIMESTAMP()));
INSERT INTO schedule (title, team_place_id, start_date_time, end_date_time) VALUES ('2번 팀플 미래 일정', 2, TIMESTAMPADD(DAY, 3, CURRENT_TIMESTAMP()), TIMESTAMPADD(DAY, 5, CURRENT_TIMESTAMP()));
