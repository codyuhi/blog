# How to connect to PostgreSQL with Python (macOS)

*This walkthrough was written on macOS for macOS. The steps should be similar for Linux/Windows as long as you use your OS's related package management/installation platform or install the appropriate binaries from the web for your OS*

## Why connect to your database programmatically?

Database administration software/tooling exists to interact with your data in many ways.  You can interact with data using a Command Line Interface (CLI), a Graphical User Interface (GUI), and programmatically.  Each of these methods has its pros and cons.

CLI:
* Usually works right out of the box after installation and requires the least setup
* Allows you to eliminate all the fluff of interacting with your data and focus on very specific, defined commands
* Usually includes the latest features that other interfaces do not include

GUI:
* Provides a visual, user-friendly way to interact with your data
* Easiest for beginners who are not comfortable with CLIs or code
* Usually offers an intuitive way to present data for non-technical users, making presentations around data easy

Programmatically:
* Allows for automated interactions with data
* Can be triggered without user action
* Can be run at a huge scale with high efficiency

If your use-case requires programmatically accessing a database because of its pros, then you can import database packages into your code and use them to programmatically interact with your data.  This is great when you have applications that require database persistency and volume.

## Why PostgreSQL?

PostgreSQL (also called "Postgres") is an open-source, object-relational database system with extensive interactivity that builds upon Structured Query Language (SQL) standards.  Simply put, Postgres is a free, powerful solution with a lot of customizability that has become a favorite of many.  Postgres support has been added in most major programming languages as well as DevOps tools like Docker and Kubernetes.

Postgres's functionality, flexibility, and support make it a good choice for your app's database solution.

## How to install Postgres?

1. Download the `postgresql` CLI.  On macOS, you can do this with the command below (see the [official Postgres website](https://www.postgresql.org/download/) for links to download for other OS's):

```
brew install postgresql
```

2. Install the `PyGreSQL` Python library with `pip`:
```
pip3 install PyGreSQL
```

3. Create a Python file and verify you can import the `pg` Python module to interact with Postgres.  If the following command doesn't produce any output, it worked.  If it failed, there will be error output:

```
touch postgres-test.py && echo "import pg" > postgres-test.py && python3 postgres-test.py
```

4. Initialize the Postgres data directory where Postgres data will be stored.  Pass the path to a directory where you want to store the data:

```
initdb -D <your_path_to_directory>
```

5. Start the Postgres server:

```
pg_ctl -D <your_path_to_directory> start && brew services start postgresql
```

6. Verify you can connect to the Postgres server (might need sudo):

```
psql postgres
```

If you see your terminal prompt change to `postgres=#`, you know it worked properly!

7. Try creating a database that your Python script will interact with:

```
CREATE DATABASE "<your_mac_username>";
```

Now you have a Postgres server running with a database that Python can connect to.

*If there are any error messages that appeared throughout this process, try Googling the error message to find a solution to get around the error*

## How to use `pg` in Python to interact with Postgres?

This is the content of a Python file that you can use to run queries on a Postgres database.  This should be run *after* you have already completed the tutorial above about installing and running Postgres.

Read the code's comments for more information about what the code is doing

```
# Import the Postgres module
import pg

# Create a connection to the Postgres DB
# By default, it will try to connect to a database name that is the same as your username
db = pg.DB()

# You can also connect to the database using specific parameters like the following:
# db = DB(dbname='testdb', host='pgserver', port=5432, user='cody', passwd='password')

# Populate the query with whatever PostgreSQL query you want to run
db.query("""CREATE TABLE TableName (
    stringField VARCHAR(255)
);
""")

# Verify the query ran properly
db.get_tables()

db.query("""INSERT INTO TableName (
    stringField
) VALUES ('A cool string');
""")

# Print the results of the SQL Select statement
print(db.query("""SELECT * FROM TableName;"""))

```

After creating a Python file with the above content called `connect-to-postgres-w-python.py`, running the Python script should give the output below:

```
username@devicename % python3 connect-to-postgres-w-python.py
 stringfield
-------------
A cool string
(1 row)
```

And with that, you have installed, connected to, and interacted with a Postgres database!  You can find more information about the PyGreSQL [here](http://www.pygresql.org/).

## Outtro

Thank you for joining me for this tutorial on Postgres and Python.  Hopefully it was helpful for you to be able to implement databases into your app!

Happy coding :)