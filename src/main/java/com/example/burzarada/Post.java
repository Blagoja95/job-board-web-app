package com.example.burzarada;

import org.json.simple.JSONObject;

import java.util.Date;

public class Post {
    private int id;
    private String companyID;
    private String companyName;
    private String title;
    private String type;
    private String city;
    private String about;
    private String qual;
    private Date date;

    public Post(int id, String companyID, String companyName, String title, String type, String city, String about, String qual, Date date) {
        this.id = id;
        this.companyID = companyID;
        this.companyName = companyName;
        this.title = title;
        this.type = type;
        this.city = city;
        this.about = about;
        this.qual = qual;
        this.date = date;
    }

    public Post(int id, String companyID, String title, String type, String city, String about, String qual, Date date) {
        this.id = id;
        this.companyID = companyID;
        this.title = title;
        this.type = type;
        this.city = city;
        this.about = about;
        this.qual = qual;
        this.date = date;
    }

    public Post(int id, String companyID, String title, String type, String city, String about, String qual) {
    }

    ;

    public String getCompanyName() {
        return companyName;
    }

    ;

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public int getId() {
        return id;
    }

    public String getCompanyID() {
        return companyID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getQual() {
        return qual;
    }

    public void setQual(String qual) {
        this.qual = qual;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public JSONObject getPost() {
        JSONObject post = new JSONObject();

        post.put("id", getId());
        post.put("companyID", getCompanyID());
        post.put("companyName", getCompanyName());
        post.put("title", getTitle());
        post.put("type", getType());
        post.put("city", getCity());
        post.put("about", getAbout());
        post.put("qual", getQual());
        post.put("date", getDate().toString());

        return post;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", companyID=" + companyID +
                ", title='" + title + '\'' +
                ", type='" + type + '\'' +
                ", city='" + city + '\'' +
                ", about='" + about + '\'' +
                ", qual='" + qual + '\'' +
                '}';
    }
}
