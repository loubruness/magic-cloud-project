# Use the official PostgreSQL image as the base
FROM postgres:10.1

# Copy your SQL script into the container's initialization folder
COPY script.sql /docker-entrypoint-initdb.d/

# No need to override ENTRYPOINT; the base image handles running scripts in /docker-entrypoint-initdb.d/
