package team.teamby.teambyteam.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.common.builder.TestFixtureBuilder;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@Transactional
public abstract class ServiceTest {

    @Autowired
    protected TestFixtureBuilder testFixtureBuilder;
}
