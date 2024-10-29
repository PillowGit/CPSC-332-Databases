# Developing

> [!IMPORTANT]  
> Anytime you see `cs332g??`, substitute with the username from canvas

## Environment setup (only need to do once):

1. Use `npm i` to install all node modules

1. Install `mysql` if you do not have it already

1. Run `mysql -u root` to enter mysql as the root user and create an account

1. Create your local database & user with the following commands (change usernames, passwords, and database names as you'd like. Do not change 'localhost' and remember what you put for each entry):

```sql
CREATE DATABASE database_name;

CREATE USER 'user_name'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON database_name.* TO 'user_name'@'localhost';

FLUSH PRIVILEGES;

exit
```

5. Exit should have returned you to the normal terminal. Log back into mysql with the user you just created with `mysql -u user_name -h localhost -p` and typing in the password you set

6. Enter the database using the command `USE database_name;`

7. From here you can use SQL commands to add tables, values, and make queries. If you have a .sql file you'd like to run, you can run `source filename.sql` to run all the queries in the file.

8. You can now create php files using the following format:

```php
<?php
$servername = "localhost";
$username = "user_name";
$password = "password";
$dbname = "database_name";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Do php things here

$conn->close();
?>
```

## How to run & host site/server locally

1. Start a local development server with `npm run dev`

1. Start a local php service with the command `php -S localhost:8080 -t .`

> [!NOTE]
> This must be done from project root, and this requires the php command which is not installed by default. Install with `brew install php` or `sudo apt-get install php`

## Adding a new php file:

1. Create a new php file at the project root

1. Add the file to the `vite.config.js` server proxy list. The vite file should look something like this (with your file added as a new entry)

```js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api.php": "http://localhost:8080",
      "/php_file_name.php": "http://localhost:8080",
    },
  },
});
```

3. These all should route to `http://localhost:8080`, as this is the port we opened the php server on

4. Run the php code and get the output on your site with js by fetching the url with the following string, replacing the parameters (which can be empty if there are none) and the filename as needed:

```js
// Declare route & parameters
const php_file_name = "api.php";
const params = {
  table: "users",
};

// Generate request url
const formatted_params =
  !params || Object.keys(params).length === 0
    ? ""
    : "?" +
      Object.entries(params)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");
const request_url = "/" + php_file_name + formatted_params;
```

## Uploading to ecs server:

1. Use `npm run build` to compile all html, css, and js files together

1. Enter the `dist` folder created by the previous command and edit `index.html`. The website hosted by ecs server will use relative file routing, so make sure all of those files are relative. For example, files like `/favicon.svg` should be converted to `./favicon.svg`.

1. Copy all the php files from the root of the project into the `dist` folder

1. Update the credentials at the top of the php files to match the credentials provided by the ecs server, i.e:

```php
<?php
$servername = "mariadb"; // This one does not change
$username = "cs332g??";
$password = "YOUR_PROVIDED_PASSWORD";
$dbname = "cs332g??";
...
```

5. scp (ssh secure copy protocol) the entire dist folder over to the ecs server with the following command:

```bash
scp -r dist cs332g??@shell.ecs.fullerton.edu:
```

6. Move all the files from the `dist` folder into the `homepage` folder (assuming you've set up your ecs server, which you should've)

7. run `chmod 604 filename` for every file and `chmod 701 foldername` for every folder you moved over

8. Check `https://ecs.fullerton.edu/~cs332g??/` (replacing the cs322g?? with your username) to see your uploaded site
