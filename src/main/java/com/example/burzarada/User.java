package com.example.burzarada;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class User {

    private int id;
    private String name;
    private int hashPass;
    private String email;
    private String about;
    private String username;

    private String city;

    public User() {
    }

    ;

    public User(int id, String name, int hashPass, String email, String about, String username, String city) {
        this.id = id;
        this.name = name;
        this.hashPass = hashPass;
        this.email = email;
        this.about = about;
        this.username = username;
        this.city = city;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getHashPass() {
        return hashPass;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public JSONObject getUser() {
        JSONObject user = new JSONObject();

        user.put("id", getId());
        user.put("name", getName());
        user.put("username", getUsername());
        user.put("email", getEmail());
        user.put("about", getAbout());
        user.put("city", getCity());

        return user;
    }

    public JSONArray getUserLogin() {
        JSONArray userLogin = new JSONArray();

        userLogin.add(getUsername());
        userLogin.add(getHashPass());

        return userLogin;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", hashPass=" + hashPass +
                ", email='" + email + '\'' +
                ", about='" + about + '\'' +
                ", username='" + username + '\'' +
                '}';
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
