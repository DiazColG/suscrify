const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')
  
  const subscriptions = [
    { name: 'Netflix', category: 'Entretenimiento', logoUrl: 'https://logo.clearbit.com/netflix.com' },
    { name: 'Spotify', category: 'Música', logoUrl: 'https://logo.clearbit.com/spotify.com' },
    { name: 'Adobe Creative Cloud', category: 'Desarrollo', logoUrl: 'https://logo.clearbit.com/adobe.com' },
    { name: 'Microsoft 365', category: 'Productividad', logoUrl: 'https://logo.clearbit.com/microsoft.com' },
    { name: 'Google Drive', category: 'Almacenamiento', logoUrl: 'https://logo.clearbit.com/google.com' },
    { name: 'Dropbox', category: 'Almacenamiento', logoUrl: 'https://logo.clearbit.com/dropbox.com' },
    { name: 'Disney+', category: 'Entretenimiento', logoUrl: 'https://logo.clearbit.com/disneyplus.com' },
    { name: 'Amazon Prime', category: 'Entretenimiento', logoUrl: 'https://logo.clearbit.com/amazon.com' },
    { name: 'YouTube Premium', category: 'Video', logoUrl: 'https://logo.clearbit.com/youtube.com' },
    { name: 'Slack', category: 'Comunicación', logoUrl: 'https://logo.clearbit.com/slack.com' },
    { name: 'Notion', category: 'Productividad', logoUrl: 'https://logo.clearbit.com/notion.so' },
    { name: 'Figma', category: 'Desarrollo', logoUrl: 'https://logo.clearbit.com/figma.com' },
    { name: 'GitHub Pro', category: 'Desarrollo', logoUrl: 'https://logo.clearbit.com/github.com' },
    { name: 'Canva Pro', category: 'Desarrollo', logoUrl: 'https://logo.clearbit.com/canva.com' },
    { name: 'HBO Max', category: 'Entretenimiento', logoUrl: 'https://logo.clearbit.com/hbomax.com' },
    { name: 'Apple Music', category: 'Música', logoUrl: 'https://logo.clearbit.com/apple.com' },
    { name: 'iCloud', category: 'Almacenamiento', logoUrl: 'https://logo.clearbit.com/icloud.com' },
    { name: 'Zoom Pro', category: 'Comunicación', logoUrl: 'https://logo.clearbit.com/zoom.us' },
    { name: 'ChatGPT Plus', category: 'Productividad', logoUrl: 'https://logo.clearbit.com/openai.com' },
    { name: 'Midjourney', category: 'Desarrollo', logoUrl: 'https://logo.clearbit.com/midjourney.com' }
  ]

  for (const subscription of subscriptions) {
    await prisma.preloadedSubscription.upsert({
      where: { name: subscription.name },
      update: {},
      create: subscription
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
