# GitHub Stats Setup Guide

To display your complete GitHub statistics (including private repositories), follow these steps:

## 1. Generate a GitHub Personal Access Token

1. Go to [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Give it a descriptive name like "Portfolio Stats"
4. Set expiration (recommended: No expiration for portfolio)
5. Select these scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `read:user` (Read user profile data)
   
6. Click **"Generate token"**
7. **Important:** Copy the token immediately (you won't see it again!)

## 2. Add Token to Your Project

1. Open `.env.local` file in your project root
2. Replace `YOUR_GITHUB_TOKEN` with your actual token:
   ```
   GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
   ```

## 3. Restart Your Development Server

```bash
npm run dev
```

## What This Enables

- ✅ Total commit count (public + private repositories)
- ✅ Real account uptime based on GitHub join date
- ✅ Private repository statistics
- ✅ Contribution data from all repositories
- ✅ Auto-refresh every 5 minutes
- ✅ Offline caching for better performance

## Security Notes

- Never commit your `.env.local` file (it's already in .gitignore)
- The token is only used server-side in the API route
- Consider using GitHub Fine-grained tokens for better security
- Rotate your token periodically for security

## Fallback Behavior

If no token is provided, the app will:
- Use GitHub's public API (limited data)
- Show only public repository statistics
- Cache results locally for offline access