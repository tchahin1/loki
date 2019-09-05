package com.pragmatio.mojaepbih.util;


import java.util.Properties;

import com.pragmatio.mojaepbih.hibernate.entity.Failure;
import com.pragmatio.mojaepbih.hibernate.entity.Measurement;
import com.pragmatio.mojaepbih.hibernate.entity.Notification;
import com.pragmatio.mojaepbih.hibernate.entity.PlaceOfMeasurement;
import com.pragmatio.mojaepbih.hibernate.entity.User;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.cfg.Environment;
import org.hibernate.service.ServiceRegistry;

public class HibernateUtil {
    private static SessionFactory sessionFactory = null;
    public static SessionFactory getSessionFactory() {
        if (sessionFactory == null) {
            try {
                Configuration configuration = new Configuration();
                // Hibernate settings equivalent to hibernate.cfg.xml's properties
                Properties settings = new Properties();
                settings.put(Environment.DRIVER, "com.mysql.jdbc.Driver");
                settings.put(Environment.URL, "jdbc:mysql://localhost:3306/mojaepbih?useSSL=false");
                settings.put(Environment.USER, "pragmatio");
                settings.put(Environment.PASS, "pragmatio");
                settings.put(Environment.DIALECT, "org.hibernate.dialect.MySQL5Dialect");
                settings.put(Environment.SHOW_SQL, "true");
                settings.put("allowPublicKeyRetrieval", "true");
                settings.put(Environment.CURRENT_SESSION_CONTEXT_CLASS, "thread");
                settings.put(Environment.HBM2DDL_AUTO, "update");
                configuration.setProperties(settings);
                configuration.addAnnotatedClass(User.class);
                configuration.addAnnotatedClass(Measurement.class);
                configuration.addAnnotatedClass(PlaceOfMeasurement.class);
                configuration.addAnnotatedClass(Failure.class);
                configuration.addAnnotatedClass(Notification.class);
                ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
                        .applySettings(configuration.getProperties()).build();
                sessionFactory = configuration.buildSessionFactory(serviceRegistry);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return sessionFactory;
    }
}
