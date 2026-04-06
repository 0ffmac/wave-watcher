# Agent Task: Fix KV Stale Data — Two Changes in entry.py

## What Is Wrong

The network response for Mandiri Beach shows timestamps from 2026-03-29 while
today is 2026-04-06 — 8 days stale. The Worker IS being called (Cache-Control
is working), but it reads the stale KV entry and returns it without checking
whether the data is current.

Two bugs compound each other:

### Bug 1 — `expiration_ttl` kwarg is silently ignored by the JS KV bridge
The Cloudflare Workers Python runtime wraps the JS KV API. The JS KV `put()`
expects an options object as the third argument: `{expirationTtl: 3600}`.
Passing `expiration_ttl=3600` as a Python keyword argument does NOT correctly
translate to this JS options object — it is silently ignored. As a result, KV
entries are written with NO expiration and live forever until manually deleted.

### Bug 2 — No staleness check on KV reads
Even if TTL were working, there is no safety net. If KV returns data whose
timestamps are in the past (stale from a previous day), the Worker should
discard it and fetch fresh data rather than serve it blindly.

---

## ⚠️ Hard Rules
- Touch **only** `entry.py`.
- Change **only** the two locations shown below.
- Do not change any other logic, imports, or structure.
- Run `wrangler deploy` after saving.

---

## Change 1 — Fix KV `put` to correctly pass expiration via JS options object

Find:
```python
            final_json = json.dumps(payload)
            await self.env.SURF_CACHE.put(
                cache_key_with_source, final_json, expiration_ttl=3600
            )
            return Response(final_json, headers=cors_headers)
```

Replace with:
```python
            final_json = json.dumps(payload)
            put_options = Object.fromEntries(to_js({"expirationTtl": 3600}))
            await self.env.SURF_CACHE.put(
                cache_key_with_source, final_json, put_options
            )
            return Response(final_json, headers=cors_headers)
```

**Why:** The JS KV API requires `put(key, value, {expirationTtl: 3600})`.
`Object.fromEntries(to_js({...}))` is the correct Pyodide pattern to pass a
JS options object — the same pattern already used for `no_cache` on line 724.

---

## Change 2 — Add staleness check before serving KV data

Find:
```python
            if req_url.searchParams.get("bypass_cache") != "true":
                cached = await self.env.SURF_CACHE.get(cache_key_with_source)
                if cached:
                    return Response(cached, headers=cors_headers)
```

Replace with:
```python
            if req_url.searchParams.get("bypass_cache") != "true":
                cached = await self.env.SURF_CACHE.get(cache_key_with_source)
                if cached:
                    try:
                        cached_data = json.loads(cached)
                        cached_times = cached_data.get("hourly", {}).get("times", [])
                        if cached_times:
                            # Check the last timestamp in the cached data.
                            # If it is in the past, the data is stale — discard
                            # and fetch fresh regardless of KV TTL.
                            last_time_str = cached_times[-1].replace("T", " ")
                            last_time = datetime.strptime(last_time_str, "%Y-%m-%d %H:%M")
                            hours_old = (datetime.utcnow() - last_time).total_seconds() / 3600
                            if hours_old < 6:
                                # Data still has at least 6 hours of future forecasts
                                return Response(cached, headers=cors_headers)
                            # else: data is stale, fall through to fresh fetch
                    except Exception:
                        # If parsing fails for any reason, fall through to fresh fetch
                        pass
```

**Why:** This checks the last timestamp in the cached hourly array. If all
forecasts are within 6 hours of being exhausted, the Worker discards the KV
entry and fetches fresh data from Open-Meteo — even if KV hasn't expired yet.
This is a permanent safety net that works regardless of TTL behavior.

---

## After deploying — flush the stale KV entries manually

After `wrangler deploy`, the old stale entries (written without TTL) are still
sitting in KV. They will never expire on their own. Delete them manually:

```bash
# Delete stale entry for each spot you know was cached
wrangler kv key delete --namespace-id=<YOUR_KV_NAMESPACE_ID> "forecast_mandiri_beach_open-meteo"
wrangler kv key delete --namespace-id=<YOUR_KV_NAMESPACE_ID> "forecast_ujung_bocur_open-meteo"
wrangler kv key delete --namespace-id=<YOUR_KV_NAMESPACE_ID> "forecast_krui_left_open-meteo"
wrangler kv key delete --namespace-id=<YOUR_KV_NAMESPACE_ID> "forecast_jennys_right_open-meteo"
wrangler kv key delete --namespace-id=<YOUR_KV_NAMESPACE_ID> "forecast_krui_right_open-meteo"
wrangler kv key delete --namespace-id=<YOUR_KW_NAMESPACE_ID> "forecast_way_jambu_open-meteo"
wrangler kv key delete --namespace-id=<YOUR_KV_NAMESPACE_ID> "forecast_ujung_walur_open-meteo"
```

Or delete ALL keys at once via the Cloudflare dashboard:
1. dash.cloudflare.com → Workers & Pages → KV
2. Select your SURF_CACHE namespace
3. Delete all forecast_ keys manually (or use "Delete all" if available)

After deletion, the next request for each spot will fetch fresh data and write
a new KV entry — this time with the correct `expirationTtl: 3600`.

---

## Verify after deploy + KV flush

```bash
# Should return today's date as the first timestamp
curl "https://surf-forecast-api.comblog.workers.dev/forecast?spot=mandiri_beach" \
  | python3 -c "import json,sys; d=json.load(sys.stdin); print('First:', d['hourly']['times'][0], 'Last:', d['hourly']['times'][-1])"
```

Expected: `First: 2026-04-06T00:00  Last: 2026-04-13T23:00`

---

## Files modified

| File | Changes |
|---|---|
| `entry.py` | Fix KV put options (1 block) + add staleness guard (1 block) |

**Total: 1 file, 2 changes. Run `wrangler deploy` then flush KV entries.**
