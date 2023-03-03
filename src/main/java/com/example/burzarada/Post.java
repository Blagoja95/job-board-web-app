package com.example.burzarada;

import org.json.simple.JSONObject;

public class Post {
    private int id;
    private int companyID;
    private String title;
    private String type;
    private String city;
    private String about;
    private String qual;
    private Date date;

    public Post(int id, int companyID, String title, String type, String city, String about, String qual) {
        this.id = id;
        this.companyID = companyID;
        this.title = title;
        this.type = type;
        this.city = city;
        this.about = about;
        this.qual = qual;
    };

    public int getId() {
        return id;
    }

    public int getCompanyID() {
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

    public JSONObject getPost(){
        JSONObject post = new JSONObject();

        post.put("id", getId());
        post.put("companyID", getCompanyID());
        post.put("title", getTitle());
        post.put("type", getType());
        post.put("city", getCity());
        post.put("about", getAbout());
        post.put("qual", getQual());

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
