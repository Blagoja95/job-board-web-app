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

    public List<User> getUser(String parameter, String value) {
        List<User> users = new LinkedList<>();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection connection = DriverManager.getConnection(CONNECTIONURL, USERNAME, PASSWORD);

            Statement statement = connection.createStatement();

            ResultSet resultSet = statement.executeQuery("SELECT * FROM users WHERE " + parameter + "='" + value + "';");


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

    public void createUser(User user) {

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection connection = DriverManager.getConnection(CONNECTIONURL, USERNAME, PASSWORD);

            PreparedStatement preparedStatement = connection.prepareStatement(
                    "insert into users (id, name, hashPass, email, about, username, city) values (?, ?, ?, ?, ?, ?, ?);"
            );

            preparedStatement.setInt(1, user.getId());
            preparedStatement.setString(2, user.getName());
            preparedStatement.setInt(3, user.getHashPass());
            preparedStatement.setString(4, user.getEmail());
            preparedStatement.setString(5, user.getAbout());
            preparedStatement.setString(6, user.getUsername());
            preparedStatement.setString(7, user.getCity());

            preparedStatement.executeUpdate();

            connection.close();

        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }

    public void updateUser(String what, String value1, String where, String value2) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection connection = DriverManager.getConnection(CONNECTIONURL, USERNAME, PASSWORD);

            PreparedStatement preparedStatement = connection.prepareStatement(
                    "UPDATE users SET " + what + "=? WHERE " + where + "=?"
            );

            preparedStatement.setString(1, value1);
            preparedStatement.setString(2, value2);

            preparedStatement.executeUpdate();

            connection.close();

        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteUser(String id) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection connection = DriverManager.getConnection(CONNECTIONURL, USERNAME, PASSWORD);

            PreparedStatement preparedStatement = connection.prepareStatement(
                    "DELETE FROM users WHERE id=?;"
            );

            preparedStatement.setString(1, id);

            preparedStatement.executeUpdate();

            connection.close();

        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Post> getAllPosts() {

        List<Post> posts = new LinkedList<>();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection connection = DriverManager.getConnection(CONNECTIONURL, USERNAME, PASSWORD);

            Statement statement = connection.createStatement();

            ResultSet resultSet = statement.executeQuery("SELECT * FROM posts;");


            while (resultSet.next()) {
                posts.add(new Post(resultSet.getInt("id"), resultSet.getInt("companyID"), resultSet.getString("title"), resultSet.getString("type"), resultSet.getString("city"), resultSet.getString("about"),  resultSet.getString("qual"), resultSet.getDate("date")));
            }

            connection.close();

        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }

        if (posts.size() > 0)
            return posts;
        else
            return null;
    }

    public List<Post> getPost(String parameter, String value) {
        List<Post> posts = new LinkedList<>();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection connection = DriverManager.getConnection(CONNECTIONURL, USERNAME, PASSWORD);

            Statement statement = connection.createStatement();

            ResultSet resultSet = statement.executeQuery("SELECT * FROM posts WHERE " + parameter + "='" + value + "';");


            while (resultSet.next()) {
                posts.add(new Post(resultSet.getInt("id"), resultSet.getInt("companyID"), resultSet.getString("title"), resultSet.getString("type"), resultSet.getString("city"), resultSet.getString("about"),  resultSet.getString("qual"), resultSet.getDate("Date")));
            }

            connection.close();

        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }

        if (posts.size() > 0)
            return posts;
        else
            return null;
    }

    public void updatePost(String what, String value1, String where, String value2) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection connection = DriverManager.getConnection(CONNECTIONURL, USERNAME, PASSWORD);

            PreparedStatement preparedStatement = connection.prepareStatement(
                    "UPDATE posts SET " + what + "=? WHERE " + where + "=?"
            );

            preparedStatement.setString(1, value1);
            preparedStatement.setString(2, value2);

            preparedStatement.executeUpdate();

            connection.close();

        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }

    public void deletePost(String id) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection connection = DriverManager.getConnection(CONNECTIONURL, USERNAME, PASSWORD);

            PreparedStatement preparedStatement = connection.prepareStatement(
                    "DELETE FROM posts WHERE id=?;"
            );

            preparedStatement.setString(1, id);

            preparedStatement.executeUpdate();

            connection.close();

        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
}
