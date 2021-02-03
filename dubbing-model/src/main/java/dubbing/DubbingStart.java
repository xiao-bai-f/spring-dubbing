package dubbing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"dubbing","test"})
public class DubbingStart {
    public static void main(String[] args) {
        SpringApplication.run(DubbingStart.class,args);
    }
}
