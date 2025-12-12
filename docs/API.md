# API Documentation

**Status**: Coming Q1 2025

The Deflation Index API will provide programmatic access to historical DI data, sector breakdowns, and real-time updates.

## Planned Endpoints

### Authentication
```
API-Key: your_api_key_here
```

### Get Current DI
```
GET /api/v1/di/current
```

**Response:**
```json
{
  "date": "2024-12",
  "di": -17.0,
  "m2_growth": 2.6,
  "cpi": 2.7,
  "sectors": {
    "computing": -24.0,
    "communications": -4.0,
    "energy": -38.0
  }
}
```

### Get Historical Data
```
GET /api/v1/di/historical?start=1990&end=2024
```

**Response:**
```json
{
  "data": [
    {
      "year": 1990,
      "di": 0.0,
      "m2_growth": 7.5,
      "cpi": 5.4
    },
    ...
  ]
}
```

### Get Sector Data
```
GET /api/v1/sectors/{sector}?start=1990&end=2024
```

**Parameters:**
- `sector`: computing | communications | energy

### Calculate Purchasing Power
```
POST /api/v1/calculate/purchasing-power
```

**Request:**
```json
{
  "base_year": 1990,
  "target_year": 2024,
  "amount": 100
}
```

**Response:**
```json
{
  "tech_purchasing_power": 1500,
  "actual_purchasing_power": 55,
  "gap": 1445,
  "gap_percentage": 90.5
}
```

## Pricing Tiers (Planned)

### Free Tier
- 1,000 API calls/month
- Daily updates
- Historical data (annual)

### Pro Tier ($29/month)
- 50,000 API calls/month
- Real-time updates
- Historical data (monthly)
- Sector breakdowns

### Enterprise Tier (Custom)
- Unlimited API calls
- White-label options
- Custom data cuts
- SLA guarantees
- Priority support

## Use Cases

- Economic research and analysis
- Trading algorithms (macro indicators)
- Dashboard integrations
- Academic studies
- Policy analysis
- Financial modeling

## Early Access

Interested in API access? Join the waitlist:

**Email**: api@deflationindex.com  
**Form**: deflationindex.com/api (coming soon)

## Technical Details

### Rate Limits
- Free: 1,000/month (~33/day)
- Pro: 50,000/month (~1,600/day)
- Enterprise: Custom

### Response Format
- JSON (default)
- CSV (optional)

### Authentication
- API Key in header
- OAuth 2.0 (Enterprise)

### Status Codes
- `200`: Success
- `401`: Unauthorized (invalid API key)
- `429`: Rate limit exceeded
- `500`: Server error

## SDK Support (Planned)

- Python
- JavaScript/TypeScript
- R
- Julia

## Changelog

**Q1 2025**: Initial API release  
**Q2 2025**: Webhooks for real-time updates  
**Q3 2025**: Additional sector APIs

---

**Questions?** Contact api@deflationindex.com
