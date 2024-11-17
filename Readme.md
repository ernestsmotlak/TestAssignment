## RUN INSTRUCTIONS
    -   sqlcmd -S localhost -U sa -P password 
        -   za bazo
    -   dotnet run
    - docker-compose up -d

## Return here
```
 Docker and SQL Server
You’ve configured SQL Server to run inside a Docker container. Docker is a platform that allows you to run applications in isolated environments. The SQL Server instance inside the container is accessible from your .NET application via localhost:1433.

Steps for Docker:

Run SQL Server in Docker: You created and started a SQL Server container using the Docker command:
bash
Copy code
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong!Password" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server
Connect .NET to Docker SQL Server: Your application connects to the SQL Server instance running inside the Docker container via the connection string:
json
Copy code
"ConnectionStrings": {
    "DefaultConnection": "Server=localhost,1433;Database=AddressBookDB;User Id=sa;Password=YourStrong!Password;TrustServerCertificate=True;"
}

```