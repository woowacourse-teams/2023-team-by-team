-- reset PK of the table before input test data
ALTER TABLE member_team_place ALTER COLUMN id RESTART WITH 1;
ALTER TABLE member ALTER COLUMN id RESTART WITH 1;
ALTER TABLE team_place ALTER COLUMN id RESTART WITH 1;
ALTER TABLE schedule ALTER COLUMN id RESTART WITH 1;
