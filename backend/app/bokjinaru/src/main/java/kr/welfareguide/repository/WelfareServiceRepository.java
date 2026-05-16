package kr.welfareguide.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import kr.welfareguide.domain.WelfareService;
import org.springframework.stereotype.Repository;

@Repository
public class WelfareServiceRepository {

    private final Map<String, WelfareService> store = new ConcurrentHashMap<>();

    public void saveAll(List<WelfareService> services) {
        services.forEach(service -> store.put(service.getId(), service));
    }

    public List<WelfareService> findAll() {
        return new ArrayList<>(store.values());
    }

    public Optional<WelfareService> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }
}
