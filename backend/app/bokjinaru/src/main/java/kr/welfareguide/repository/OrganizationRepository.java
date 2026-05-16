package kr.welfareguide.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import kr.welfareguide.domain.Organization;
import kr.welfareguide.domain.Region;
import org.springframework.stereotype.Repository;

@Repository
public class OrganizationRepository {

    private final Map<String, Organization> store = new ConcurrentHashMap<>();

    public void saveAll(List<Organization> organizations) {
        organizations.forEach(org -> store.put(org.getId(), org));
    }

    public List<Organization> findAll() {
        return new ArrayList<>(store.values());
    }

    public List<Organization> findByRegion(Region region) {
        return store.values().stream()
                .filter(org -> region == null
                        || org.getRegion() == region
                        || org.getRegion() == Region.NATIONWIDE)
                .toList();
    }

    public Optional<Organization> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }
}
