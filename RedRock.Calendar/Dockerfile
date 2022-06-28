#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["RedRock.Calendar/RedRock.Calendar.Host.csproj", "RedRock.Calendar/"]
COPY ["RedRock.Calendar.Modules.Events.Service/RedRock.Calendar.Modules.Events.Service.csproj", "RedRock.Calendar.Modules.Events.Service/"]
COPY ["RedRock.Calendar.Modules.Events.Business/RedRock.Calendar.Modules.Events.Business.csproj", "RedRock.Calendar.Modules.Events.Business/"]
COPY ["RedRock.Calendar.Modules.Events.Contract/RedRock.Calendar.Modules.Events.Contract.csproj", "RedRock.Calendar.Modules.Events.Contract/"]
COPY ["RedRock.Calendar.Modules.Finance.Contract/RedRock.Calendar.Modules.Finance.Contract.csproj", "RedRock.Calendar.Modules.Finance.Contract/"]
COPY ["RedRock.Calendar.Modules.Finance.Service/RedRock.Calendar.Modules.Finance.Service.csproj", "RedRock.Calendar.Modules.Finance.Service/"]
COPY ["RedRock.Calendar.Modules.Finance.Business/RedRock.Calendar.Modules.Finance.Business.csproj", "RedRock.Calendar.Modules.Finance.Business/"]
COPY ["RedRock.Calendar.Modules.Users.Contract/RedRock.Calendar.Modules.Users.Contract.csproj", "RedRock.Calendar.Modules.Users.Contract/"]
COPY ["RedRock.Calendar.Modules.Finance.Api/RedRock.Calendar.Modules.Finance.Api.csproj", "RedRock.Calendar.Modules.Finance.Api/"]
COPY ["RedRock.Calendar.Modules.Users.Service/RedRock.Calendar.Modules.Users.Service.csproj", "RedRock.Calendar.Modules.Users.Service/"]
COPY ["RedRock.Calendar.Modules.Users.Buseness/RedRock.Calendar.Modules.Users.Buseness.csproj", "RedRock.Calendar.Modules.Users.Buseness/"]
COPY ["HashingHelpers/HashingHelpers.csproj", "HashingHelpers/"]
COPY ["RedRock.Calendar.Modules.Users.Api/RedRock.Calendar.Modules.Users.Api.csproj", "RedRock.Calendar.Modules.Users.Api/"]
COPY ["RedRock.Calendar.Modules.Events.Api/RedRock.Calendar.Modules.Events.Api.csproj", "RedRock.Calendar.Modules.Events.Api/"]
COPY ["RedRock.Calendar.ExternalFiles/libwkhtmltox.dll", "RedRock.Calendar.ExternalFiles/"]
COPY ["RedRock.Calendar.ExternalFiles/libwkhtmltox.dylib", "RedRock.Calendar.ExternalFiles/"]
COPY ["RedRock.Calendar.ExternalFiles/libwkhtmltox.so", "RedRock.Calendar.ExternalFiles/"]
RUN dotnet restore "RedRock.Calendar/RedRock.Calendar.Host.csproj"
COPY . .
WORKDIR "/src/RedRock.Calendar"
RUN dotnet build "RedRock.Calendar.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RedRock.Calendar.Host.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RedRock.Calendar.Host.dll"]