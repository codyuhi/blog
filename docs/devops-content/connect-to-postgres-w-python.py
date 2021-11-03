# Import the Postgres module
import pg

# Create a connection to the Postgres DB
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
