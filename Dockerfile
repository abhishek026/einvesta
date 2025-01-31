# Step 1: Use Node.js base image
FROM node:22 AS build

# Set the working directory inside the container
WORKDIR /app

# Step 2: Install Angular CLI globally
RUN npm install -g @angular/cli

# Step 3: Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Step 4: Copy the rest of the Angular app code
COPY . .

# Step 5: Expose the port that Angular will run on
EXPOSE 4200

# Step 6: Start Angular development server using ng serve
CMD ["ng", "serve", "--host", "0.0.0.0"]
