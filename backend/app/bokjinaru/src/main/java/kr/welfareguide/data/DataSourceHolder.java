package kr.welfareguide.data;

import org.springframework.stereotype.Component;

@Component
public class DataSourceHolder {

    public static final String SEED = "seed";
    public static final String ODCLOUD = "odcloud";

    private volatile String source = SEED;

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public boolean isOdcloud() {
        return ODCLOUD.equals(source);
    }
}
