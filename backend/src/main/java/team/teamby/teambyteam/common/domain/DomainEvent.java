package team.teamby.teambyteam.common.domain;

public interface DomainEvent<T> {
    T getDomainId();
}
