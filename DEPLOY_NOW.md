# 🚀 Deploy to Server NOW

## ✅ What's Done
- [x] Built the client with latest fixes
- [x] Copied files to server/public
- [x] Committed changes to git
- [x] Pushed to GitHub

## 🎯 Next Steps - Deploy to Production Server

### Option 1: SSH into the server (If you have access)

```bash
# SSH into the server hosting spf.watermelon.icu
ssh user@server-ip

# Navigate to the app directory
cd /path/to/tradesupplies-3dconfiguration

# Pull latest changes
git pull origin main

# Restart the Node.js server (using PM2, systemd, or docker)
# Choose the appropriate command:

# If using PM2:
pm2 restart sign-panel-app
# or
pm2 restart all

# If using systemd:
sudo systemctl restart sign-panel-app

# If using Docker:
docker-compose restart

# If manual Node process:
# Find the process and kill it, then restart
pkill -f node
cd server && npm start
```

### Option 2: Auto-deployment (If set up)

If there's a CI/CD pipeline (GitHub Actions, Jenkins, etc.):
- The push to main should automatically trigger deployment
- Check GitHub Actions tab in the repository
- Monitor deployment logs

### Option 3: Contact David

If you don't have server access:
1. Tell David: "I've pushed the cart fix to GitHub main branch"
2. He needs to pull and restart the server
3. Share commit hash: `ea49d68`

## 🧪 Testing After Deployment

Once deployed, test on staging: https://sts-staging.myshopify.com

1. Go to the store
2. Configure a sign panel
3. Add to cart
4. **Verify:** Price should show calculated amount (e.g., £156.00), NOT £1.00
5. Check cart properties display correctly

## 🔍 Quick Check Commands

```bash
# Check if server is running
curl https://spf.watermelon.icu

# Check git status on server
cd /path/to/app && git log -1

# View server logs
pm2 logs sign-panel-app
# or
journalctl -u sign-panel-app -f
```

## 📝 What Was Fixed

The cart bug is now fixed:
- ✅ `_Calculated Total` property added (Shopify uses this for pricing)
- ✅ All configuration details included in properties
- ✅ Price breakdown visible in cart
- ✅ Proper line item property formatting

## 🎉 Ready to Show David!

After deployment completes, the staging store will show:
- Correct calculated prices
- Full product configuration details
- Professional cart experience
