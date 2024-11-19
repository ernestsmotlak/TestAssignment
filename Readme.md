## Sql Docker
 
 ```docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=4Matematika." \
-p 1433:1433 --name sqlserver \
-v $(pwd)/db:/var/opt/mssql/backup \
-d mcr.microsoft.com/mssql/server:2022-latest

docker exec -it sqlserver /opt/mssql-tools/bin/sqlcmd \
-S localhost -U SA -P '4Matematika.' \
-Q "RESTORE DATABASE [AddressBookDB] FROM DISK = N'/var/opt/mssql/backup/AddressBookDB.bak' WITH MOVE 'AddressBookDB' TO '/var/opt/mssql/data/AddressBookDB.mdf', MOVE 'AddressBookDB_Log' TO '/var/opt/mssql/data/AddressBookDB_Log.ldf', REPLACE"

docker exec -it sqlserver /opt/mssql-tools/bin/sqlcmd \
-S localhost -U SA -P '4Matematika.' -d AddressBookDB \
-Q "SELECT * FROM sys.tables"
```

```Access the Database
Host: localhost
Port: 1433
Username: SA
Password: 4Matematika.
Database Name: AddressBookDB
```

## Next

# Pagination

![Pagination](https://github.com/ernestsmotlak/TestAssignment/blob/main/Gifs/PaginationGif.gif)

# Create New User
![Create New User](https://github.com/ernestsmotlak/TestAssignment/blob/main/Gifs/CreateNewUserGif.gif)

# Search

![Search](https://github.com/ernestsmotlak/TestAssignment/blob/main/Gifs/SearchGif.gif)

# Update Contact

![Update Contact](https://github.com/ernestsmotlak/TestAssignment/blob/main/Gifs/UpdateContactGif.gif)