import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN
    const GITHUB_USERNAME = 'Salman-TCM'
    
    console.log('Token exists:', !!GITHUB_TOKEN, 'Length:', GITHUB_TOKEN?.length)
    
    if (!GITHUB_TOKEN || GITHUB_TOKEN === 'YOUR_GITHUB_TOKEN') {
      // Fallback to public API if no token
      const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      const userData = await userResponse.json()
      
      const eventsResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`)
      const events = await eventsResponse.json()
      
      const pushEvents = events.filter((event: any) => event.type === 'PushEvent')
      let recentCommits = 0
      
      pushEvents.forEach((event: any) => {
        if (event.payload && event.payload.commits) {
          recentCommits += event.payload.commits.length
        }
      })
      
      // Calculate uptime
      const createdDate = new Date(userData.created_at)
      const now = new Date()
      const diffTime = Math.abs(now.getTime() - createdDate.getTime())
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      const years = Math.floor(diffDays / 365)
      const days = diffDays % 365
      
      return NextResponse.json({
        totalCommits: userData.public_repos * 15 + recentCommits,
        publicRepos: userData.public_repos,
        privateRepos: 0,
        uptime: `${years}Y ${days}D`,
        accountCreated: userData.created_at
      })
    }
    
    // Use GraphQL API with authentication - simplified query for read-only token
    const graphqlQuery = `
      query($username: String!) {
        user(login: $username) {
          createdAt
          repositories(first: 100) {
            totalCount
          }
          contributionsCollection {
            totalCommitContributions
            restrictedContributionsCount
          }
        }
      }
    `
    
    const graphqlResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { username: GITHUB_USERNAME }
      })
    })
    
    if (!graphqlResponse.ok) {
      const errorText = await graphqlResponse.text()
      console.error('GitHub API Error:', graphqlResponse.status, errorText)
      throw new Error(`GitHub API returned ${graphqlResponse.status}`)
    }
    
    const graphqlData = await graphqlResponse.json()
    
    if (!graphqlData.data || !graphqlData.data.user) {
      throw new Error('Invalid GraphQL response')
    }
    
    const user = graphqlData.data.user
    
    // Get total repositories count
    const totalRepos = user.repositories.totalCount
    
    // Calculate total commits (including private)
    const totalCommits = 
      user.contributionsCollection.totalCommitContributions + 
      user.contributionsCollection.restrictedContributionsCount
    
    // Calculate uptime
    const createdDate = new Date(user.createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - createdDate.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const years = Math.floor(diffDays / 365)
    const days = diffDays % 365
    
    return NextResponse.json({
      totalCommits: totalCommits,
      totalRepos: totalRepos,
      uptime: `${years}Y ${days}D`,
      accountCreated: user.createdAt
    })
    
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
    // Return fallback values
    return NextResponse.json({
      totalCommits: 149,
      publicRepos: 10,
      privateRepos: 5,
      uptime: '3Y 241D',
      error: true
    })
  }
}