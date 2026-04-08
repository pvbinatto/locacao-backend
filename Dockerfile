# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Install build dependencies
# (If you had native dependencies, you'd add them here)

# Copy package files for better caching
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:22-alpine AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Copy built files from the builder stage
COPY --from=builder /app/dist ./dist

# Create a non-root user for security
RUN addgroup -S nodejs && adduser -S nestjs -G nodejs
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose the application port
EXPOSE 3000

# Healthcheck to ensure the container is running correctly
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:${PORT:-3000}/api || exit 1

# Start the application
CMD ["node", "dist/main"]
