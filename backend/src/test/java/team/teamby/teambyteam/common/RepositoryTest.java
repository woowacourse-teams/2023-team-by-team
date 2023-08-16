package team.teamby.teambyteam.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.jdbc.Sql;
import team.teamby.teambyteam.common.builder.BuilderSupporter;
import team.teamby.teambyteam.common.builder.TestFixtureBuilder;

@DataJpaTest
@Import(value = {TestFixtureBuilder.class, BuilderSupporter.class})
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Sql(value = {"/h2-truncate.sql"})
public abstract class RepositoryTest {

    @Autowired
    protected TestFixtureBuilder testFixtureBuilder;
}
