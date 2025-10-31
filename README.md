# Backend (Sith scope)


## Quick start
```
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Visit `http://localhost:8000/docs` for Swagger UI.


## Migrations
```
alembic upgrade head
python -m seeds.seed_products
```


## Notes
- Inventory reservations use a 15‑minute TTL and are marked EXPIRED by a periodic check on reads; a cron/BackgroundTask can be added for proactive cleanup.
- Cart merge endpoint merges by SKU and sums quantities, preserving lowest price_snapshot.
- Admin endpoints expose minimal packing task lifecycle; courier booking webhook is handled by Chung's service.