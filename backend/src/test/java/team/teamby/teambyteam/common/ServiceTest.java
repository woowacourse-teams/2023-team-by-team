package team.teamby.teambyteam.common;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@Transactional
@Sql(value = {"/h2-reset-pk.sql", "/h2-data.sql"})
public abstract class ServiceTest {



}
