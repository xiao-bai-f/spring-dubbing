//package defaultconfig;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//@Configuration
//public class SpringMcvConfig implements WebMvcConfigurer {
//
//
////    @Override
////    public void addInterceptors(InterceptorRegistry registry) {
////        registry.addReS
////        // addPathPatterns("/**") 表示拦截所有的请求，
////        // excludePathPatterns("/login", "/register") 表示除了登陆与注册之外，因为登陆注册不需要登陆也可以访问
////    }
//
//
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/templates/js/**")
//                .addResourceLocations("classpath:/templates/js/");
//    }
//}
