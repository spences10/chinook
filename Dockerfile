# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.1.0
FROM oven/bun:${BUN_VERSION}-slim as base

# Declare build arguments for secrets
ARG TURSO_DB_URL
ARG TURSO_DB_AUTH_TOKEN

LABEL fly_launch_runtime="Bun"

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential ca-certificates curl pkg-config python-is-python3

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install node modules
COPY --link .npmrc bun.lockb package.json ./
RUN bun install

# Copy application code
COPY --link . .

# Build application using build arguments
RUN TURSO_DB_URL=$TURSO_DB_URL TURSO_DB_AUTH_TOKEN=$TURSO_DB_AUTH_TOKEN bun run build

# Remove development dependencies
RUN rm -rf node_modules && \
    bun install --ci


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "bun", "run", "start" ]
