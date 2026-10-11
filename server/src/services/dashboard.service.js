import { prisma } from '../lib/prisma.js'

export async function getDashboard() {
  const [newEnquiries, totalEnquiries, recentEnquiries, collections, media] = await Promise.all([
    prisma.enquiry.count({ where: { status: 'new' } }),
    prisma.enquiry.count(),
    prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.item.groupBy({ by: ['collection'], _count: true }),
    prisma.media.count(),
  ])
  return {
    newEnquiries,
    totalEnquiries,
    recentEnquiries,
    media,
    collections: Object.fromEntries(collections.map((c) => [c.collection, c._count])),
  }
}
