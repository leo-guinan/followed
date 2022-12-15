// src/pages/api/auth/[...auth].ts
import { passportAuth } from "@blitzjs/auth"
import { api } from "src/blitz-server"
import TwitterStrategy from "passport-twitter"
import db from "db"

export default api(
  passportAuth(({ ctx, req, res }) => ({
    successRedirectUrl: "/",
    errorRedirectUrl: "/",
    secureProxy: true,
    strategies: [
      {
        strategy:  new TwitterStrategy(
          {
            consumerKey: process.env.TWITTER_CONSUMER_KEY as string,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET as string,
            callbackURL: process.env.TWITTER_CALLBACK_URL,
          },
          async function (token, tokenSecret, profile, done) {
            const userId = ctx.session.userId;
            if (!userId) {
              return done(null, false)
            }
            const user = await db.user.findFirst({
              where: {
                id: userId,
              }
            })
            if (!user) {
              return done(null, false)
            }

            const clientLoginAPI = process.env.API_URL + "/api/client/login/"
            let error = null
            let clientAccountId:number;
            let subscriptionId:number;

            const results = await fetch(clientLoginAPI, {
              method: 'POST',
              headers: {
                Authorization: `Api-Key ${process.env.API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                twitter_id: profile.id,
                client: "FOLLOWED",
                email: user.email,
                access_key: token,
                secret_access_key: tokenSecret,
              })
            })
            const json = await results.json()

            console.log(json)
            clientAccountId = json.client_account_id

            if (!user.subscriptionId) {
              const subscribeAPI = process.env.API_URL + "/api/followed/subscribe/"

              const subscriptionResults = await fetch(subscribeAPI, {
                method: 'POST',
                headers: {
                  Authorization: `Api-Key ${process.env.API_KEY}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  twitter_id: profile.id,
                  client_account_id: clientAccountId,
                })
              })
              const subscriptionJson = await subscriptionResults.json()
              console.log(subscriptionJson)
              subscriptionId = subscriptionJson.subscriber_id

            } else {
              subscriptionId = user.subscriptionId
            }


            await db.user.update({
              where: {
                id: userId
              },
              data: {
                name: profile.displayName,
                twitterId: profile.id,
                twitterProfilePicture: profile.photos[0].value,
                twitterUsername: profile.username,
                twitterAccessTokenKey: token,
                twitterAccessTokenSecret: tokenSecret,
                clientAccountId,
                subscriptionId

              },
            })

            const publicData = {
              userId: user.id,
              roles: [user.role],
              source: "twitter",
            }
            done(undefined, { publicData })
          }
        )
      },
    ],
  }))
)
