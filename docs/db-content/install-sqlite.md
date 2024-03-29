# Install SQLite

*This installation tutorial was written on/for ***Windows***.  SQLite is already installed by default on ***macOS***, so if you are using a ***macOS*** machine you can skip to step 5 to verify your installation.  I also have successfully installed SQLite3 on ***Linux*** using this same process, and will try to point out where a Linux-specific change is needed in the installation process*

## Why Setup a Database?

Databases are valuable parts of any software system.  Databases allow applications to maintain data persistency after application state changes occur, hardware is turned off, and memory is cleared.  If you've written an app or website before, you know that unless if you set up persistence, when you stop the app everything that was generated by that process is lost.  It's important for any Full-Stack or Backend Software Engineer to learn how to interact with and fully leverage databases.

There are many different types of databases, database software, and database tools.  SQLite, like the name suggests, is a lightweight database management tool.  It is lightweight in that it is easy to set up, easy to learn, and easy to run (not resource-intensive).  Likewise, SQLite offers less functionality than other SQL database tools.  For development purposes, however, you may want to focus on your code and not on your database networking, resources, and other difficulties that may arise with other databases - this is where SQLite shines.

For example, I was writing a full-stack mobile application with Java on both the frontend and the backend.  At the time, I hadn't worked with Java before and wanted to focus my attention on writing the Java code and not worry about messing around with my database.  I chose to use SQLite and it was a consistent, stable solution that I didn't have to think about after installing it and configuring the tables.  

Now I'm rebuilding that application from the ground up and am comfortable with Java, but I want more out of my database experience.  I will start with SQLite again, but after the code is ready to put to production I will include a connection to a PostgreSQL database instead SQLite.  You can follow this pattern by developing the app using SQLite and deploying the app to use a different, more robust database.

## Easy macOS Tutorial (Homebrew)

1. Use the Homebrew package manager to install SQLite with the command below:

```
brew install sqlite3
```

2.  Skip to step 5 in the regular tutorial below to verify your SQLite installation

## Tutorial

1. Download the latest SQLite installation binaries for your Operating System from [the official SQLite web site](https://www.sqlite.org/download.html).  Make sure to save the file(s) to a permanent location and remember where it is saved for future steps.

2. Unzip the zip file.  There will be a directory with a `sqldiff`, `sqlite3`, and `sqlite3_analyzer` file in it.  *On Windows, the naming convention may be a little different, specifically with the `sqlite3` file being named `sqlite3.exe`.*

3. Add the unzipped directory to your `PATH`.  This will allow you to call the `sqlite3` command on the command line from anywhere in your file system without declaring the full path to the SQLite executable file.
    - For help with changing `PATH` on ***Windows***, see [this great blog post](https://medium.com/@kevinmarkvi/how-to-add-executables-to-your-path-in-windows-5ffa4ce61a53#:~:text=How%20to%20Add%20Executables%20to%20your%20PATH%20in,and%20add%20the%20file%20path%20to%20the%20list) shared by @kevinmarkvi on Medium.
    - To update `PATH` on Linux or macOS, determine what shell your terminal uses and update your `~/.<shell>_profile` file to have the line below:
```
export PATH=your-sqlite3-bin-path:$PATH
```

4. Close your previous terminal/command line window.  If on Windows, you may need to restart your computer for your command line to recognize the change to the `PATH`.

5. Verify your installation worked properly by executing the command below in the terminal:

```
sqlite3
```

If the installation went through properly, you should see some terminal output that looks like the snippet below:

```
SQLite version 3.32.3 2020-06-18 14:16:19
Enter ".help" for usage hints.
Connected to a transient in-memory database.
Use ".open FILENAME" to reopen on a persistent database.
sqlite>
```

## Outtro

Congratulations! You have installed SQLite and verified that it is working properly.  You can now establish a connection to SQLite from the terminal to create databases, tables, and store data.  This can be done from the terminal or programmatically in your code.  Happy coding!

## Troubleshooting

If you were unable to get the terminal output that shows in step 5, look in the failed terminal output for clues about what went wrong.  There may be:
 - A versioning issue.  Make sure any dependencies that SQLite might need from your system are up-to-date
 - Some incompatibility between the binaries you downloaded and the Operating system.  Make sure you downloaded the correct SQLite zip file for your operating system
 - Something wrong with your `PATH` variable not being set properly.  You can try running `echo $PATH` and checking if your SQLite directory shows up in the output of that file.
    - If the SQLite directory does not appear in the output, verify that your PATH variable actually updated.  Try starting a new terminal session or restarting your device.
    - If the SQLite directory does appear in the output, verify that an executable file called `sqlite3` or `sqlite3.exe` exists in the SQLite directory in your `PATH`.

The above troubleshooting steps should cover most things that could go wrong in your SQLite installation.  Feel free to leave a comment if you're still having trouble with the installation and we can work out what went wrong!