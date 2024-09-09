**DOCKER COMMANDS:**

```
docker build -t doldadress-api .
docker run -e NODE_ENV= <environment> -p 8080:3000 --env-file .env doldadress-api
docker -p 8080:3000 --env-file .env doldadress-api
```

**TODO:**

https://vitest.dev/

- Add tests (unit and integration tests) (https://github.com/vitest-dev/vitest/blob/main/examples/fastify/package.json)
- https://www.checklyhq.com/ (Integrate into CI? We should also run related tests before scraping to see that we have the expected behavior: eg. has a page changed their html markup? trigger ratelimits to see if the pages still return the expected result etc.)
- Alternative (betterstack), we already use this for incident reporting
- Unit tests can run in parallel, Integration tests serial, I guess we need a vitest config for each test type?

**Backlog**

- Optimize docker image for build
- Implement Trigger.dev? (To discuss)
- Replace requestPromise with undici or rock-req
- Type everything (Look for @ts-ignore comments)
- Configure Swagger ([@fastify/swagger-ui](https://github.com/fastify/fastify-swagger-ui))
- Integrate Sentry, No ESM support yet though for sentry/fastify integration, would have to compile to CJS
- Send Slack notification when queue finishes with result (Total tasks, successful tasks, tasks that failed after all retries attempts), probably log this to db too for statistics purpose

**To consider**

- Do we still need to use Google Cloud async tasks?
- https://github.com/fastify/fastify-sensible
