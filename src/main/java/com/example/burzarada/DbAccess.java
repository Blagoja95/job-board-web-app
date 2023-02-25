package com.example.burzarada;

import java.sql.*;
import java.util.LinkedList;
import java.util.List;

public class DbAccess {
    private final String CONNECTIONURL = "jdbc:mysql://localhost:3306/jobPostingsDB",
            USERNAME = "root",
            PASSWORD = "";

    public List<User> getAllUsers() {

        List<User> users = new LinkedList<>();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection connection = DriverManager.getConnection(CONNECTIONURL, USERNAME, PASSWORD);

            Statement statement = connection.createStatement();

            ResultSet resultSet = statement.executeQuery("SELECT * FROM users;");


            while (resultSet.next()) {
                users.add(new User(resultSet.getInt("id"), resultSet.getString("name"), resultSet.getInt("hashPass"), resultSet.getString("email"), resultSet.getString("about"), resultSet.getString("username"), resultSet.getString("city")));
            }

            connection.close();

        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }

        if (users.size() > 0)
            return users;
        else
            return null;
    }
}
