package com.example.posting.database;

import com.example.posting.post.PostModel;
import com.example.posting.user.User;
import java.sql.*;
import java.util.LinkedList;
import java.util.List;

public class DbAccess
{
	private final String CONNECTIONURL = "jdbc:mysql://job-board-mysql:3306/jobPostingsDB", // TODO: change port if necessary (this is primitive will be updated when docker container for tomcat is made and docker compose is used)
			USERNAME = "root",
			PASSWORD = "mydbpassword";

	public List<User> getAllUsers()
	{

		List<User> users = new LinkedList<>();

		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");

			Connection connection = DriverManager.getConnection(this.CONNECTIONURL, this.USERNAME, this.PASSWORD);

			Statement statement = connection.createStatement();

			ResultSet resultSet = statement.executeQuery("SELECT * FROM users;");


			while (resultSet.next())
			{
				users.add(new User(resultSet.getInt("id"), resultSet.getString("name"), resultSet.getString("hashPass"), resultSet.getString("email"), resultSet.getString("about"), resultSet.getString("username"), resultSet.getString("city")));
			}

			connection.close();

		} catch (ClassNotFoundException | SQLException e)
		{
			e.printStackTrace();
		}

		if (users.size() > 0)
		{
			return users;
		}
		else
		{
			return null;
		}
	}

	public List<User> getUser(String parameter, String value)
	{
		List<User> users = new LinkedList<>();

		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");

			Connection connection = DriverManager.getConnection(this.CONNECTIONURL, this.USERNAME, this.PASSWORD);

			Statement statement = connection.createStatement();

			ResultSet resultSet = statement.executeQuery("SELECT * FROM users WHERE " + parameter + "='" + value + "';");


			while (resultSet.next())
			{
				users.add(new User(resultSet.getInt("id"), resultSet.getString("name"), resultSet.getString("hashPass"), resultSet.getString("email"), resultSet.getString("about"), resultSet.getString("username"), resultSet.getString("city")));
			}

			connection.close();

		} catch (ClassNotFoundException | SQLException e)
		{
			e.printStackTrace();
		}

		if (users.size() > 0)
		{
			return users;
		}
		else
		{
			return null;
		}
	}

	public void createUser(User user)
	{

		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");

			Connection connection = DriverManager.getConnection(this.CONNECTIONURL, this.USERNAME, this.PASSWORD);

			PreparedStatement preparedStatement = connection.prepareStatement(
					"insert into users (id, name, hashPass, email, about, username, city) values (?, ?, ?, ?, ?, ?, ?);"
			);

			preparedStatement.setInt(1, user.getId());
			preparedStatement.setString(2, user.getName());
			preparedStatement.setString(3, user.getHashPass());
			preparedStatement.setString(4, user.getEmail());
			preparedStatement.setString(5, user.getAbout());
			preparedStatement.setString(6, user.getUsername());
			preparedStatement.setString(7, user.getCity());

			preparedStatement.executeUpdate();

			connection.close();

		} catch (ClassNotFoundException | SQLException e)
		{
			e.printStackTrace();
		}
	}

	public void updateUser(User user)
	{
		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");

			Connection connection = DriverManager.getConnection(this.CONNECTIONURL, this.USERNAME, this.PASSWORD);

			PreparedStatement preparedStatement = connection.prepareStatement(
					"UPDATE users SET name=?, email=?, city=?, about=? WHERE id=?"
			);

			preparedStatement.setString(1, user.getName());
			preparedStatement.setString(2, user.getEmail());
			preparedStatement.setString(3, user.getCity());
			preparedStatement.setString(4, user.getAbout());
			preparedStatement.setInt(5, user.getId());
			preparedStatement.executeUpdate();

			connection.close();

		} catch (ClassNotFoundException | SQLException e)
		{
			e.printStackTrace();
		}
	}

	public int deleteUser(String id)
	{
		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");

			Connection connection = DriverManager.getConnection(this.CONNECTIONURL, this.USERNAME, this.PASSWORD);

			PreparedStatement preparedStatement = connection.prepareStatement(
					"DELETE FROM users WHERE id=?;"
			);

			preparedStatement.setString(1, id);

			int resp = preparedStatement.executeUpdate();

			connection.close();

			return resp;

		} catch (ClassNotFoundException | SQLException e)
		{
			e.printStackTrace();
		}

		return 0;
	}

	public List<PostModel> getAllPosts()
	{

		List<PostModel> posts = new LinkedList<>();

		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");

			Connection connection = DriverManager.getConnection(this.CONNECTIONURL, this.USERNAME, this.PASSWORD);

			Statement statement = connection.createStatement();

			// TODO: if necessary make a new method
//            ResultSet resultSet = statement.executeQuery("SELECT * FROM posts;");
			ResultSet resultSet = statement.executeQuery("select posts.id, posts.title, posts.type, posts.city, posts.about, posts.qual, posts.companyID, posts.date, users.name from posts join users on users.id = posts.companyID;");

			while (resultSet.next())
			{
				posts.add(new PostModel(resultSet.getInt("id"),
						resultSet.getString("companyID"),
						resultSet.getString("name"),
						resultSet.getString("title"),
						resultSet.getString("type"),
						resultSet.getString("city"),
						resultSet.getString("about"),
						resultSet.getString("qual"),
						resultSet.getDate("date")));
			}

			connection.close();

		} catch (ClassNotFoundException | SQLException e)
		{
			e.printStackTrace();
		}

		if (posts.size() > 0)
		{
			return posts;
		}
		else
		{
			return null;
		}
	}

	public List<PostModel> getPost(String parameter, String value)
	{
		List<PostModel> posts = new LinkedList<>();

		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");

			Connection connection = DriverManager.getConnection(this.CONNECTIONURL, this.USERNAME, this.PASSWORD);

			Statement statement = connection.createStatement();

			ResultSet resultSet = statement.executeQuery("SELECT posts.id, posts.title, posts.type, posts.city, posts.about, posts.qual, posts.companyID, posts.date, users.name FROM posts JOIN users ON users.id = posts.companyID WHERE posts." + parameter + "='" + value + "';");

			while (resultSet.next())
			{
				posts.add(new PostModel(resultSet.getInt("id"),
						resultSet.getString("companyID"),
						resultSet.getString("name"),
						resultSet.getString("title"),
						resultSet.getString("type"),
						resultSet.getString("city"),
						resultSet.getString("about"),
						resultSet.getString("qual"),
						resultSet.getDate("date")));
			}

			connection.close();

		} catch (ClassNotFoundException | SQLException e)
		{
			e.printStackTrace();
		}

		if (posts.size() > 0)
		{
			return posts;
		}
		else
		{
			return null;
		}
	}

	public List<PostModel> searchPost(String value)
	{
		List<PostModel> posts = new LinkedList<>();

		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");

			Connection connection = DriverManager.getConnection(this.CONNECTIONURL, this.USERNAME, this.PASSWORD);

			Statement statement = connection.createStatement();

			ResultSet resultSet = statement.executeQuery("SELECT posts.id, posts.title, posts.type, posts.city, posts.about, posts.qual, posts.companyID, posts.date, users.name FROM posts JOIN users ON users.id = posts.companyID WHERE posts.title LIKE '%" + value + "%';");

			while (resultSet.next())
			{
				posts.add(new PostModel(resultSet.getInt("id"),
						resultSet.getString("companyID"),
						resultSet.getString("name"),
						resultSet.getString("title"),
						resultSet.getString("type"),
						resultSet.getString("city"),
						resultSet.getString("about"),
						resultSet.getString("qual"),
						resultSet.getDate("date")));
			}

			connection.close();

		} catch (ClassNotFoundException | SQLException e)
		{
			e.printStackTrace();
		}

		if (posts.size() > 0)
		{
			return posts;
		}
		else
		{
			return null;
		}
	}

	public void updatePostSingle(String what, String value1, String where, String value2)
	{
		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");

			Connection connection = DriverManager.getConnection(this.CONNECTIONURL, this.USERNAME, this.PASSWORD);

			PreparedStatement preparedStatement = connection.prepareStatement(
					"UPDATE posts SET " + what + "=? WHERE " + where + "=?"
			);

			preparedStatement.setString(1, value1);
			preparedStatement.setString(2, value2);

			preparedStatement.executeUpdate();

			connection.close();

		} catch (ClassNotFoundException | SQLException e)
		{
			e.printStackTrace();
		}
	}

	public void updatePost(PostModel post)
	{
		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");

			Connection connection = DriverManager.getConnection(this.CONNECTIONURL, this.USERNAME, this.PASSWORD);

			PreparedStatement preparedStatement = connection.prepareStatement(
					"UPDATE posts SET title=?, type=?, city=?, qual=?, about=? WHERE id=?"
			);

			preparedStatement.setString(1, post.getTitle());
			preparedStatement.setString(2, post.getType());
			preparedStatement.setString(3, post.getCity());
			preparedStatement.setString(4, post.getQual());
			preparedStatement.setString(5, post.getAbout());
			preparedStatement.setInt(6, post.getId());
			preparedStatement.executeUpdate();

			connection.close();

		} catch (ClassNotFoundException | SQLException e)
		{
			e.printStackTrace();
		}
	}

	public int deletePost(String id)
	{
		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");

			Connection connection = DriverManager.getConnection(this.CONNECTIONURL, this.USERNAME, this.PASSWORD);

			PreparedStatement preparedStatement = connection.prepareStatement(
					"DELETE FROM posts WHERE id=?;"
			);

			preparedStatement.setString(1, id);

			int response = preparedStatement.executeUpdate();

			connection.close();

			return response;

		} catch (ClassNotFoundException | SQLException e)
		{
			e.printStackTrace();
		}

		return 0;
	}

	public void createPost(PostModel post)
	{
		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");

			Connection connection = DriverManager.getConnection(this.CONNECTIONURL, this.USERNAME, this.PASSWORD);

			PreparedStatement preparedStatement = connection.prepareStatement(
					"insert into posts (id, title, type, city, about, qual, companyID, date) values (?, ?, ?, ?, ?, ?, ?, ?);"
			);

			preparedStatement.setInt(1, post.getId());
			preparedStatement.setString(2, post.getTitle());
			preparedStatement.setString(3, post.getType());
			preparedStatement.setString(4, post.getCity());
			preparedStatement.setString(5, post.getAbout());
			preparedStatement.setString(6, post.getQual());
			preparedStatement.setString(7, post.getCompanyID());

			// TODO: how to set time (hh:mm:ss)
			preparedStatement.setDate(8, java.sql.Date.valueOf(java.time.LocalDate.now()));

			preparedStatement.executeUpdate();

			connection.close();

		} catch (ClassNotFoundException | SQLException e)
		{
			e.printStackTrace();
		}
	}

	/**
	 * Check if row exist
	 *
	 * @param parameters [table, where key, where value]<br>
	 *                   Example: parameters = ["users", "username", "boris1"]<br>
	 *                   generates SQL statement SELECT * FROM users WHERE username='boris1';
	 * @return -1 if List or list items are empty or null<br>
	 * 0 does not exist<br>
	 * 1 do exist
	 * @Autor Boris Blagojevic
	 */
	public int checkIfExist(List<String> parameters)
	{
		if (parameters.isEmpty() || parameters.size() < 3)
		{
			return -1;
		}

		for (String i : parameters)
		{
			if (i == null || i.isEmpty())
			{
				return -1;
			}
		}

		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");

			Connection conn = DriverManager.getConnection(this.CONNECTIONURL, this.USERNAME, this.PASSWORD);

			Statement statment = conn.createStatement();


			ResultSet resultSet = statment.executeQuery("SELECT * FROM " + parameters.get(0) + " WHERE " + parameters.get(1) + "='" + parameters.get(2) + "';");

			int resp = resultSet.next() ? 1 : 0;

			conn.close();

			return resp;

		} catch (ClassNotFoundException | SQLException e)
		{
			e.printStackTrace();
		}

		return 0;
	}
}
