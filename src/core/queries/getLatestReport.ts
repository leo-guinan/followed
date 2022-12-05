import { Ctx } from "blitz"
import db from "db"

export default async function getLatestReport(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, role: true, subscriptionId: true },
  })

  if (!user) return null

  const subscribeAPI = process.env.API_URL + "/api/followed/latest/"

  const subscriptionResults = await fetch(subscribeAPI, {
    method: 'POST',
    headers: {
      Authorization: `Api-Key ${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subscription_id: user.subscriptionId
    })
  })
  const subscriptionJson = await subscriptionResults.json()
  console.log(subscriptionJson)
  return subscriptionJson
}
