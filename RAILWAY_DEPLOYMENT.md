# Deploy to Railway

## Quick Start (5 minutes)

### 1. Create Railway Account
1. Go to https://railway.app/
2. Click "Start a New Project"
3. Sign up with GitHub (use your shaddih-dev account)

### 2. Deploy the Server
1. In Railway dashboard, click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `shaddih-dev/tradesupplies`
4. Railway will auto-detect the Node.js app

### 3. Configure Environment Variables
In Railway project settings, add these variables:

```
NODE_ENV=production
PORT=3000
SHOPIFY_API_KEY=69db3caf17c4eb5befc0055e4427fc96
SHOPIFY_API_SECRET=eeec5b0fbd7d3c1f08e0680d6f81315e
SHOPIFY_SCOPES=write_products,read_products,write_draft_orders
SHOPIFY_APP_URL=https://your-app.railway.app
HOST=your-app.railway.app
MONGODB_URL=mongodb://127.0.0.1:27017/Sign-Panel
```

### 4. Add MongoDB
1. In Railway project, click "New"
2. Select "Database" → "MongoDB"
3. Railway will provide a connection string
4. Update `MONGODB_URL` with the new connection string

### 5. Get Your Server URL
After deployment, Railway gives you a URL like:
`https://tradesupplies-production.up.railway.app`

### 6. Update Client
Update the client to use your Railway URL instead of localhost

## Alternative: Manual CLI Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

## Your Server URL
After deployment, your API will be available at:
`https://YOUR-APP.railway.app/v1/shopify/create-draft-order`
