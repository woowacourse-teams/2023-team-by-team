package team.teamby.teambyteam.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.event.ApplicationEvents;
import org.springframework.test.context.event.RecordApplicationEvents;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.common.builder.TestFixtureBuilder;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@RecordApplicationEvents
@Transactional
@Sql({"/h2-truncate.sql"})
public abstract class ServiceTest {

    @Autowired
    protected TestFixtureBuilder testFixtureBuilder;

    @Autowired
    protected ApplicationEvents applicationEvents;
}
